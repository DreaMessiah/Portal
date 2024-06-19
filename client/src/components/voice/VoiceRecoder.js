import React, {useEffect, useState} from 'react';
import { ReactMic } from 'react-mic';
import './voiceRecorder.scss';
import MessagesService from "../../services/MessagesService";
import {useContext} from "react";
import {Context} from "../../index";
import {useMessage} from "../../hooks/message.hook";
const VoiceRecorder = ({users, thismess, setThismess, thisMans, reload, setReload, openrec, setOpenRec, record,setRecord,audioURL,setAudioURL}) => {

    const [thisvoice, setThisvoice] = useState({})
    const {store} = useContext(Context)
    const userstore = store.user
    const my_tn = store.user.tn
    const [friend_tn, setFriend_tn] = useState('999999999')
    const message = useMessage()

    const searchMans = () => {
        const randommess = thisMans
        console.log(thisMans)
        if(randommess){
            randommess.tn ? setFriend_tn(randommess.tn) : setFriend_tn(randommess.tn_to)
/*            console.log(randommess)
            if(randommess.tn_to === my_tn){
                setFriend_tn(randommess.tn_from)
            }else{
                setFriend_tn(randommess.tn_to)
            }*/
        }
    }

    const startStop = control => {
        if(control){
            startRecording();
            setReload(!control)
        }else{
            stopRecording();
            setReload(!control)
        }

    }

    const startRecording = () => {
        setRecord(true);
    };

    const stopRecording = () => {
        setRecord(false);
    };

    const onData = (recordedBlob) => {
        console.log('Chunk of real-time data is: ', recordedBlob);
    };

    const onStop = (recordedBlob) => {
        console.log('Recorded blob is: ', recordedBlob);
        setThisvoice(recordedBlob)
        setAudioURL(recordedBlob.blobURL);
    };

    const clearHandler = () => {
        setOpenRec(false)
        setRecord(false)
    }
    const messVoice = async () =>{
        try{
            if (thisvoice.blobURL) {
                console.log(thisvoice, my_tn, friend_tn)
                const { data } = await MessagesService.messVoice(thisvoice, my_tn, friend_tn)
                if(data.err){
                    message('Аудио не записалось, попробуйте позже')
                }else{
                    data.forEach(mess => {
                        let avatar = ''
                        let full_name = ''
                        users.forEach(man => {
                            if(mess.tn_from === man.tn){
                                avatar = man.avatar
                                full_name = man.full_name
                            }
                        })
                        if(avatar == '' || avatar === null || avatar === undefined){
                            mess.avatar = 'face.png'
                        } else {
                            mess.avatar = avatar
                        }

                        mess.full_name = full_name
                    })
                    setThismess([...data])
                }
                setThisvoice({})
            } else {
                console.log("The file is not an audio file.");
            }
        }catch(e){
            console.log(e)
        }
    }
    const sendRecord = async () => {
        setOpenRec(false)
        setRecord(false)
        // messVoice();
        setAudioURL('')
        await messVoice()
    }
    const isAudio = (fileName) => {
        const audioExtensions = ['.mp3', '.wav', '.ogg', '.m4a', '.flac'];
        const lowerCaseFileName = fileName.toLowerCase();
        return audioExtensions.some(extension => lowerCaseFileName.endsWith(extension));
    }

    useEffect(()=>{
        searchMans()
    },[thisMans])

    return (
        <div className="glass" style={(openrec)?{display: 'flex', flexDirection: 'column'}:{display: 'none'}}>
            <div className='spherevoice' >
                <div onClick={() => { startStop(reload)}}>
                    <ReactMic
                    record={record}
                    className="sound-wave"
                    onStop={onStop}
                    onData={onData}
                    strokeColor="rgb(18, 19, 56)"
                    backgroundColor="#F1F1F1"
                />
                </div>

                <div className="reload" style={(reload)?{display:'flex'}:{display: 'none'}}
                     onClick={() => { startStop(reload)}}
                //     onClick={clearHandler}
                ><i className="fa-solid fa-rotate-left"/></div>
                <div className="tit">Press to STOP</div>
                {audioURL && <div className="control">
                    <audio src={audioURL} controls />
                    <div className="history_mess_pen_btn" onClick={sendRecord}> Отправить <i className="fa-regular fa-paper-plane"/></div>
                </div>
                }
            </div>


        </div>
    )
}

export default VoiceRecorder