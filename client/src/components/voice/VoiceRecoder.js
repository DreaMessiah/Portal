import React, {useEffect, useState} from 'react';
import { ReactMic } from 'react-mic';
import './voiceRecorder.scss';
import MessagesService from "../../services/MessagesService";
import {useContext} from "react";
import {Context} from "../../index";
const VoiceRecorder = ({thisMans, reload, setReload, openrec, setOpenRec, record,setRecord,audioURL,setAudioURL}) => {

    const [thisvoice, setThisvoice] = useState({})
    const {store} = useContext(Context)
    const userstore = store.user
    const my_tn = store.user.tn
    const [friend_tn, setFriend_tn] = useState('999999999')

    const searchMans = () => {
        const randommess = thisMans
        if(randommess){
            console.log(randommess)
            if(randommess.tn_to === my_tn){
                setFriend_tn(randommess.tn_from)
            }else{
                setFriend_tn(randommess.tn_to)
            }
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
    const sendRecord = async () => {
        setOpenRec(false)
        setRecord(false)
        // messVoice();
        setAudioURL('')
        messVoice()
    }
    const isAudio = (fileName) => {
        const audioExtensions = ['.mp3', '.wav', '.ogg', '.m4a', '.flac'];
        const lowerCaseFileName = fileName.toLowerCase();
        return audioExtensions.some(extension => lowerCaseFileName.endsWith(extension));
    }
    const messVoice = async () =>{
        try{
            if (thisvoice.blobURL) {
                const { data } = await MessagesService.messVoice(thisvoice, my_tn, friend_tn)
                console.log(data)
                setThisvoice({})
            } else {
                console.log("The file is not an audio file.");
            }
        }catch(e){
            console.log(e)
        }
    }

    useEffect(() => {
        console.log(reload)
    },[reload])

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
    );
};

export default VoiceRecorder;