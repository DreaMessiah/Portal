import React, {useContext, useState, useRef, useEffect} from "react";
import { DataContext } from '../../context/DataContext';
import Navbar from "../../components/Navbar";
import BridgeLeftBar from "../../components/leftbar/BridgeLeftBar";

import Peer from "simple-peer"
import io from "socket.io-client"
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {useMessage} from "../../hooks/message.hook";

function ChatPage(){
    const { mass_create, menu_mass} = useContext(DataContext)
    const { store } = useContext(Context)
    const [socket, setSocket] = useState(null);
    const [me,setMe] = useState('')
    const [stream,setStream] = useState()
    const [receivingCall,setReceivingCall] = useState('')
    const [caller,setCaller] = useState('')
    const [callerSignal,setCallerSignal] = useState('')
    const [callAccepted,setCallAccepted] = useState(false)
    const [idToCall,setIdToCall] = useState('')
    const [callEnded,setCallEnded] = useState(false)
    const [name,setName] = useState('')
    const [users,setUsers] = useState()
    const message = useMessage()
    const myVideo = useRef()
    const userVideo = useRef()
    const connectionRef = useRef()

    useEffect( () => {

        try{
            const socket = io.connect('https://192.168.0.166:5000',{
                query: {
                    username: store.user.full_name
                }
            });
            setSocket(socket)

            navigator.mediaDevices.getUserMedia({video:true,audio:true}).then( stream => {
                setStream(stream)
                if (myVideo.current) {
                    myVideo.current.srcObject = stream;
                }
            })

            socket.on('me',id => {
                setMe(id)
            })
            socket.on('clients',clients => {
                setUsers(clients)
                console.log(clients)
            })

            socket.on("callUser", data => {
                setReceivingCall(true)
                setCaller(data.from)
                setName(data.name)
                setCallerSignal(data.signal)
            })
        }catch (e) {
            console.log('Ошибка системы хуй')
        }

    },[])

    const callUser = id => {
        try {
            const peer = new Peer({
                initiator: true,
                trickle: false,
                stream: stream
            })
            peer.on("signal", data => {
                socket.emit("callUser", {
                    userToCall: id,
                    signalData: data,
                    from: me,
                    name: name
                })
            })

            peer.on("stream", stream => {
                userVideo.current.srcObject = stream
            })
            socket.on("callAccepted", signal => {
                setCallAccepted(true)
                peer.signal(signal)
            })
            peer.on("close", () => {
                connectionRef.current = null
                setCallAccepted(false)
            })
            connectionRef.current = peer
        }
        catch (e) {
            message(e)
        }
    }
    const answerCall = () => {
        try {
            setCallAccepted(true)
            const peer = new Peer({
                initiator: false,
                trickle: false,
                stream: stream
            })
            peer.on('signal', data => {
                socket.emit("answerCall", {signal: data, to: caller})
            })
            peer.on('stream', stream => {
                userVideo.current.srcObject = stream
            })
            peer.on("close", () => {
                connectionRef.current = null
                setCallAccepted(false)
            })
            peer.signal(callerSignal)
            connectionRef.current = peer
        }
        catch (e) {
            message(e)
        }
    }
    const leaveCall = () => {
        try {
            setCallEnded(true)
            connectionRef.current = null
        }catch (e) {
            message(e)
        }

    }
    const setUserHandler = id => {
        setIdToCall(id)
    }
    return (
        <div className='container'>
            <Navbar/>
            <div id='ObjectPage' className='chat'>
                <BridgeLeftBar arrcreate={mass_create} arrmenu={menu_mass}/>
                <div className='right-block'>
                    <div className='top-box'>
                        <div className='left-box'>
                            <div className='video'>
                                <div id='myID'></div>
                                {stream && <video autoPlay muted playsInline ref={myVideo}/>}
                            </div>
                            <div className='video'>
                                <div id='callierID'></div>
                                {callAccepted && !callEnded ? <video autoPlay playsInline ref={userVideo}/> : null }
                            </div>

                        </div>
                        <div className='right-box'>
                            <div className='users-list'>
                                <h1>Пользователи</h1>
                                {users ? users.map( (item,index) => (
                                        <div key={index} onClick={(e) => setUserHandler(item[1]) } className={item[1] === idToCall ? 'user selected' : 'user'}>
                                            <p>{item[0]}</p>
                                        </div>
                                    ))
                                    : null}
                            </div>
                        </div>
                    </div>
                    <div className='next-box'>
                        <div className='buttons'>
                            <div onClick={() => callUser(idToCall)} className='button'>Позвонить</div>
                            <div onClick={leaveCall} className='button'>Отключиться</div>
                        </div>
                        {receivingCall && !callAccepted ? (
                            <div className="caller">
                                <h1 >Входящий звонок от {name}</h1>
                                <div color="primary" onClick={answerCall}>Ответить</div>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default observer(ChatPage)