import React, {useEffect, useState, useRef, useContext} from 'react';
import styles from './Messager.module.scss';
import SearchSelect from "../../components/inputs/SearchSelect";
import LoadingSpinner from "../../components/loading/LoadingSpinner";
import UserService from "../../services/UserService";
import getOnlineStatus from "../../components/functions/getOnlineStatus";
import getTimeString from "../../components/functions/getTimeString";
import MessagesMultySelect from "../../components/inputs/MessagesMultySelect";
import {getSocket} from "../../http/socket";
import MessagesService from "../../services/MessagesService";
import {useMessage} from "../../hooks/message.hook";
import FilesService from "../../services/FilesService";
import {Context} from "../../index";
import getTime from "../../components/functions/getTime";
import datingMessages from "../../components/functions/datingMessages";

const Messager = () => {
    const {store} = useContext(Context)
    const [loading,setLoading] = useState(false)
    const [users,setUsers] = useState(false)
    const [usersLoaded, setUsersLoaded] = useState(false)

    const [selectedUser,setSelectedUser] = useState(null)
    const [online,setOnline] = useState(null)

    const [selectedUsersGroup,setSelectedUsersGroup] = useState([])
    const [onSelectGroup,setOnSelectGroup] = useState(false)

    const [message,setMessage] = useState('')
    const [audio,setAudio] = useState(null)
    const [files,setFiles] = useState([])

    const [groupname,setGroupName] = useState('')
    const [groupimage,setGroupImage] = useState('')

    const [selectedChat,setSelectedChat] = useState(null)

    const [listMessages,setListMessages] = useState([])
    const [listChats,setListChats] = useState([])

    const textareaRef = useRef(null)
    const groupFaceRef = useRef(null)
    const messagesEndRef = useRef(null)

    const messageHook = useMessage()

    const loadingHandler = async () => {
        try {
            setLoading(true)
            const users = await UserService.getUsers()
            if(users.data) {
                setUsers(users.data)
                setUsersLoaded(true)
            }
            await getChats()
        }catch (e) {
            console.log(e)
        }finally {
            setLoading(false)
        }
    }
    const changeHandler = (e) => {
        setMessage(e.target.value)
    }
    const cancelHandler = () => {
        clearHandler()
        setListMessages([])
        setGroupImage('')
        setGroupName('')
        setSelectedUser(null)
        setSelectedUsersGroup([])
        setSelectedChat(null)
        setOnSelectGroup(false)
        //getChats()
    }
    const clearHandler = () => {
        setMessage('')
    }
    const createChat = async () => {
        try {
            setLoading(true)
            if(selectedUser || selectedUsersGroup){
                if(selectedUsersGroup.length === 1) {
                    setSelectedUser(selectedUsersGroup[0])
                    setSelectedUsersGroup([])
                }
                const {data} = await MessagesService.createChat(selectedUser,selectedUsersGroup,groupname,groupimage)
                console.log(data)
                setSelectedChat(data)
                setOnSelectGroup(false)
            }
        }catch (e) {
            console.log(e)
        }finally {
            setLoading(false)
        }
    }
    const sendMessage = async () => {
        try {
            if( (message.length || audio) && selectedChat){
                setLoading(true)
                const {data} = await MessagesService.sendChatMessage(message,selectedUser,selectedUsersGroup,selectedChat,files,audio)
                if(data){
                    clearHandler()
                    const updatedChat = JSON.parse(JSON.stringify(selectedChat))
                    updatedChat.cmessages = data
                    setSelectedChat(updatedChat)
                    scrollToBottom()
                    //messageHook("")
                }
            }
        }catch (e) {
            console.log(e)
        }finally {
            setLoading(false)
        }
    }
    const getMessages = async () => {
        try {
            setLoading(true)
            const {data} = await MessagesService.getMessages(selectedChat)
            if(data) {
                setListMessages(data)
            }
        }catch (e) {
            console.log(e)
        }finally {
            setLoading(false)
        }
    }
    const getChats = async () => {
        try {
            setLoading(true)
            const {data} = await MessagesService.getChats()
            if(data) {
                console.log(data)
                setListChats(data)
            }
        }catch (e) {
            console.log(e)
        }finally {
            setLoading(false)
        }
    }

    const selectChat = async (chat) => {
        if(!chat.ongroup) {
            const selUser = users.find(user => user.id === chat.inchat[0].user.id)
            console.log(selUser)
            setSelectedUser(selUser)
        }
        chat.cmessages.map( message => {
            if (!message.sees.includes(store.user.id)) {
                message.sees.push(store.user.id)
            }
        })
        setSelectedChat(chat)
        try{
            await MessagesService.iSee(chat.id)
        }catch (e) {
            console.log(e)
        }
    }
    const loadImage = async (e) => {
        setLoading(true)
        try {
            const response = await MessagesService.loadAvatarImage(e.target.files[0])
            if(response){
                console.log(response.data)
                if(response.err) messageHook(response.message)
                else {
                    console.log(response.data.path)
                    setGroupImage(response.data.path)
                }
            }
        }catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }
    function countUnreadMessages(messages) {
        return messages.filter(message =>
            !message.sees.includes(store.user.id) && message.author_id !== store.user.id && !message.service
        ).length
    }

    useEffect( () => {
        loadingHandler()
        const socket = getSocket()
        socket.emit('online', {data:'get online users'},(response) => {
            setOnline(response)
        })
        socket.on('receiveMessage', (data) => {
            console.log('i have new message')
            console.log(data)
        })
    },[])
    useEffect(() => {
        const textarea = textareaRef.current
        const maxHeight = 200
        const minHeight = 30
        if(textarea){
            textarea.style.height = textarea ? 'auto' : null
            const newHeight = Math.min(Math.max(textarea.scrollHeight-20, minHeight), maxHeight)
            textarea.style.height = `${newHeight}px`
        }
    }, [message])
    useEffect(() => {
        console.log(online)
        if(online && usersLoaded){
            const temp = [...users]
            online.map(item => {
                const index = users.findIndex(u => u.tn === item)
                if(index !== -1) {
                    temp[index] = { ...temp[index], socket: true }
                }
            })
            setOnline(online)
            setUsers(temp)
        }
    },[online,usersLoaded])
    useEffect(() => {
        if(selectedUser && !selectedChat){
            console.log(selectedUser)
            createChat()
        }
    },[selectedUser])
    useEffect(() => {
        if(selectedChat) {
            //getMessages()
            scrollToBottom()
        }
    },[selectedChat])
    return (
        <div className={styles.container}>
            <div className={styles.chatlist}>
                <div className={styles.header}>
                    {selectedChat ?
                        !selectedChat.ongroup && selectedUser ?
                            <div className={styles.opened}>
                                <div className={styles.back} onClick={cancelHandler}>
                                    <i className="fa-solid fa-angle-left"></i>
                                    <div>назад</div>
                                </div>
                                <div className={styles.center}>
                                    <div className={styles.name}>{selectedUser.label}</div>
                                    <div className={styles.status}>{!selectedUser.socket ? getOnlineStatus(selectedUser.gender,selectedUser.online) : 'Онлайн'}</div>
                                </div>
                                <div className={styles.right}>
                                    <div style={{backgroundImage:`url(/files/profile/${selectedUser.avatar ? selectedUser.avatar : 'face.png'})`}} className={styles.ava}>{selectedUser.socket ? <span className={styles.greencircle}></span> : null}</div>
                                </div>
                            </div>
                            :
                            <div className={styles.opened}>
                                <div className={styles.back} onClick={cancelHandler}>
                                    <i className="fa-solid fa-angle-left"></i>
                                    <div>назад</div>
                                </div>
                                <div className={styles.center}>
                                    <div className={styles.name}>{selectedChat.name.length ? selectedChat.name : `Групповой чат ${selectedChat.id}`}</div>
                                    <div className={styles.status}>{'3 участника'}</div>
                                </div>
                                <div className={styles.right}>
                                    <div style={{backgroundImage:`url(/files/profile/${selectedChat.image ? selectedChat.image : 'faceg.png'})`}} className={styles.ava}></div>
                                </div>
                            </div>
                        : onSelectGroup ?
                            <>
                                <div className={styles.left}>
                                    <div>Создание чата</div>
                                </div>
                                <div className={styles.right}>
                                    <i onClick={cancelHandler} className="fa-solid fa-xmark"></i>
                                </div>
                            </>
                            :
                            <>
                                <div className={styles.left}>
                                    <SearchSelect defaultValue={null} value={selectedUser} onChange={setSelectedUser} options={users} online={online} placeholder={'поиск'} />
                                </div>
                                <div className={styles.right}>
                                    <i onClick={() => setOnSelectGroup(!onSelectGroup)} className="fa-regular fa-pen-to-square"></i>
                                    <i className="fa-solid fa-ellipsis"></i>
                                </div>
                            </>
                    }

                </div>
                <div className={styles.chats}>
                    {selectedChat ?
                            <>
                                <div className={styles.messages}>
                                    <>
                                        {selectedChat.cmessages ? datingMessages(selectedChat.cmessages.reverse()).map( (item,index) => (
                                            <div key={index} className={styles.messagein}>
                                                {item.service ?
                                                    <div className={styles.status}>{item.text}</div>
                                                    :
                                                    <>
                                                        <div style={item.user.avatar.length ? {backgroundImage:`url(files/profile/${item.user.avatar})`}  : {backgroundImage:`url(files/profile/face.png)`} } className={styles.ava}></div>
                                                        <div className={styles.bodymessage}>
                                                            <div className={styles.name}>{item.user.full_name} <span>{getTime(item.createdAt)}</span></div>
                                                            <div className={styles.text}>{item.text}</div>
                                                        </div>
                                                    </>}
                                            </div>
                                        )) : null}
                                        <div ref={messagesEndRef} />
                                    </>
                                </div>

                                <div className={styles.textbox}>
                                    <div className={styles.right}><div className={styles.circle}><i className="fa-solid fa-paperclip"></i></div></div>
                                    <div className={styles.textarea}>
                                        <textarea ref={textareaRef} rows="1" cols="50" value={message} onChange={changeHandler} placeholder="Напишите сообщение"/>
                                    </div>
                                    <div className={styles.left}><div className={styles.circle}>{!loading ? <i onClick={() => sendMessage()} className="fa-solid fa-paper-plane"></i> : <i className="fa-solid fa-hourglass-half"></i>}</div></div>
                                </div>
                            </>
                        : listChats.length && !onSelectGroup ?
                        <div className={styles.list}>
                            {listChats.map( (item,index) => (
                                <div key={index} onClick={() => selectChat(item)} className={styles.chat}>
                                    {item.ongroup ?
                                        <div style={item.image.length ? {backgroundImage:`url(files/profile/${item.image})`} : {backgroundImage:`url(files/profile/faceg.png)`} } className={styles.ava}></div>
                                    : <div style={item.inchat[0].user.avatar.length ? {backgroundImage:`url(files/profile/${item.inchat[0].user.avatar})`}  : {backgroundImage:`url(files/profile/face.png)`} } className={styles.ava}></div>}
                                    <div className={styles.chatlabel}>
                                        <div className={styles.chatname}>{item.ongroup ? item.name.length ? item.name : `Групповой чат ${item.id}` : item.inchat[0].user.full_name}</div>
                                        <div className={styles.message}>{item.cmessages[0].text}</div>
                                    </div>

                                    <div className={styles.chatdate}>
                                        <div className={styles.date}>{getTimeString(item.cmessages[0].createdAt)} </div>
                                        {countUnreadMessages(item.cmessages)>0 ? <div className={styles.bluecircle}>{countUnreadMessages(item.cmessages)}</div> : null }
                                    </div>
                                </div>
                                ))}
                        </div> : null
                    }
                    {onSelectGroup ?
                        <div className={styles.multy}>
                            <MessagesMultySelect options={users} online={online} placeholder={'Введите имя или фамилию'} heigth={'auto'} setOptions={setSelectedUsersGroup} values={selectedUsersGroup} />
                            <div className={styles.messages}>
                                <div ref={messagesEndRef} />
                            </div>
                            <div className={styles.groupcontrol}>
                                <div className={styles.control}>
                                    <div onClick={(e) => groupFaceRef.current.click()} style={groupimage.length ? {backgroundImage:`url(files/profile/${groupimage})`} : {backgroundImage:`url(files/profile/faceg.png)`}} className={styles.groupimage}></div>
                                    <input onChange={(e) => loadImage(e)} ref={groupFaceRef} className='hidden-upload' type='file'/>
                                    <input value={groupname} onChange={(e) => setGroupName(e.target.value)} placeholder={`Введите имя чата`}/>
                                    <div onClick={() => createChat()} className={styles.button}>создать чат</div>
                                </div>
                            </div>
                        </div>
                        :
                        <> </>
                    }
                </div>
            </div>

            <div className={styles.menu}>
                <div className={styles.control}>
                    <div>Все чаты</div>
                    <div>Непрочитанные</div>
                </div>
                <div className={styles.opened}>

                </div>
            </div>
            {loading ? (<LoadingSpinner/>) : null}
        </div>

    )
}

export default Messager