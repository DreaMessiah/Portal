import React, { useState } from 'react';
import { ReactMic } from 'react-mic';
import './voiceRecorder.scss';
const VoiceRecorder = ({openrec, setOpenRec, record,setRecord,audioURL,setAudioURL}) => {

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
        setAudioURL(recordedBlob.blobURL);
    };

    return (
        <div className="glass" style={(openrec)?{display: 'flex', flexDirection: 'column'}:{display: 'none'}}>
            <div className='spherevoice' onClick={() => {stopRecording(); }}>
                <ReactMic
                    record={record}
                    className="sound-wave"
                    onStop={onStop}
                    onData={onData}
                    strokeColor="rgb(18, 19, 56)"
                    backgroundColor="#F1F1F1"
                />
            </div>
            {audioURL && <>
                <audio src={audioURL} controls />
                <div className="history_mess_pen_btn" onClick={()=>{
                    setOpenRec(!openrec);
                    setAudioURL('');}   }>Отправить <i className="fa-regular fa-paper-plane"/></div>
            </>
            }

        </div>
    );
};

export default VoiceRecorder;