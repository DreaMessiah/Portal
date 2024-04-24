
import "./style.scss"
import Select from "react-select";
import {useState} from "react";
import {useEffect} from "react";
import AuthServise from "../../services/AuthService";
import {useMessage} from "../../hooks/message.hook";
import {useContext} from "react";
import {Context} from "../../index";
import FilesService from "../../services/FilesService";
import MessagesService from "../../services/MessagesService";


export const ListMessages = () => {
    const [newmess, setNewmess] = useState(false)
    const [users, setUsers] = useState([])
    const [thisMans, setThisMans] = useState()
    const [openmess, setOpenmess] = useState(false)
    const [customer, setCustomer] = useState({})
    const [textarea, setTextarea] = useState('')
    const [thismess, setThismess] = useState([])
    const [allchats, setAllChats] = useState([])

    const message = useMessage()
    const  {store} = useContext(Context)
    const userstore = store.user
    const my_tn = store.user.tn
    // console.log(my_tn)
    const getChats = async () => {
        try {
            const response = await MessagesService.getMyChats(my_tn)
            const result = response.data
            console.log(response.data)
            const toarr = []
            const to_mess = []


            result.forEach(mess => {
                if(!toarr.includes(mess.tn_to)){
                    toarr.push(mess.tn_to)
                    to_mess.push(mess)
                }
            })
            // console.log(to_mess)

            const fromarr = []
            const from_mess = []

            result.forEach(mess => {
                if(!fromarr.includes(mess.tn_from)){
                    fromarr.push(mess.tn_from)
                    from_mess.push(mess)
                }
            })
            let allListChats = [... to_mess, ... from_mess]
            allListChats = [...new Set(allListChats)];
            const recoveArr = []
            const itogyArr = []
            allListChats.forEach(mess => {
                if(recoveArr.includes(mess.tn_from+mess.tn_to) || recoveArr.includes(mess.tn_to+mess.tn_from)){

                } else {
                    recoveArr.push(mess.tn_from+mess.tn_to)
                    if(mess.tn_to === my_tn){
                        const to = mess.tn_to
                        const from = mess.tn_from
                        mess.tn_to = from
                        mess.tn_from = from
                    }

                    itogyArr.push(mess)
                }
            })

            const full_chats = []

            itogyArr.forEach(chat => {
                users.forEach(user => {
                    if(chat.tn_to === user.tn){
                        if(user.avatar === ''){
                            chat.ava_to = 'face.png'
                        } else {
                            chat.ava_to = user.avatar
                        }

                        chat.name_to = user.full_name
                        chat.full_name = user.full_name
                    }
                    if(chat.tn_from === user.tn){
                        if(user.avatar === ''){
                            chat.ava_from = 'face.png'
                        } else {
                            chat.ava_from = user.avatar
                        }
                        chat.name_from = user.full_name
                    }
                })
                full_chats.push(chat)
            })

            // console.log(recoveArr)
            // console.log(full_chats)
            setAllChats(full_chats)

        } catch(e){
            console.log(e)
        }

    }

    const openChat = () => {

    }
    const passMess = async () => {
        // console.log(textarea)
        if(textarea !== '' && thisMans){
            thisMans.message = textarea
            thisMans.tn_from = userstore.tn
            thisMans.tn_to = thisMans.tn_to
            thisMans.title = ''
            thisMans.files = []
            thisMans.trash = false
            thisMans.read = false
            // console.log(thisMans.tn_to)


            const mess = {}
            try{
                const response = await MessagesService.pushMess(thisMans)
                const result = response.data
                // console.log(result)
                result.forEach(mess => {
                    let avatar = ''
                    let full_name = ''
                    users.forEach(man => {
                        if(mess.tn_from === man.tn){
                            avatar = man.avatar
                            full_name = man.full_name
                        }
                    })
                    if(avatar == ''){
                        mess.avatar = 'face.png'
                    } else {
                        mess.avatar = avatar
                    }

                    mess.full_name = full_name
                })
                setThismess([... result])

            }catch(e){
                console.log(e)
            }

            const textMessage = document.getElementById('textmess')
            // console.log(textMessage.value)
            textMessage.value = ''
            setTextarea('')
        } else {
            message('Нельзя отправить пустое сообщение')
        }
    }

    const getMessages = async () => {
        try{
            const response = await MessagesService.getMess(thisMans)
            const result = response.data
            result.forEach(mess => {
                let avatar = ''
                let full_name = ''
                users.forEach(man => {
                    if(mess.tn_from === man.tn){
                        avatar = man.avatar
                        full_name = man.full_name
                    }
                })
                if(avatar == ''){
                    mess.avatar = 'face.png'
                } else {
                    mess.avatar = avatar
                }

                mess.full_name = full_name
            })
            setThismess([... result])
        }catch{

        }

    }

    const listUsers = async () => {
        const list = await AuthServise.getusers()
        // console.log(list.data.users)
        const newList = [];
        list.data.users.forEach(user => {
            user.value = user.tn
            user.label = user.full_name
            newList.push(user)
        })
        setUsers([... newList])

    }

    const downSett = () => {
        setOpenmess(false)
        setNewmess(false)
        setThisMans('')
        setThismess([])
        getChats()
    }

    const makeLetter = async (bull, chatman) => {
        if(thisMans && chatman === undefined){
            setOpenmess(bull)
            setTextarea('')
                thisMans.tn_from = userstore.tn
                thisMans.tn_to = thisMans.tn

            try{
                const response = await MessagesService.getMess(thisMans)
                const result = response.data
                // console.log(result)
                result.forEach(mess => {
                    let avatar = ''
                    let full_name = ''
                    users.forEach(man => {
                        if(mess.tn_from === man.tn){
                            avatar = man.avatar
                            full_name = man.full_name
                        }
                    })
                    if(avatar == ''){
                        mess.avatar = 'face.png'
                    } else {
                        mess.avatar = avatar
                    }

                    mess.full_name = full_name
                })
                setThismess([... result])
            }catch{

            }

        } else if(chatman !== undefined){

            // console.log(chatman)
            users.forEach(user => {
                if(user.tn === chatman.tn_to){
                    setThisMans(user);
                }
            })

            setOpenmess(bull)
            setTextarea('')
            chatman.tn_from = my_tn
            chatman.tn_to = chatman.tn_to
            setThisMans(chatman);

            try{
                const response = await MessagesService.getMess(chatman)
                const result = response.data
                // console.log(result)
                result.forEach(mess => {
                    let avatar = ''
                    let full_name = ''
                    users.forEach(man => {
                        if(mess.tn_from === man.tn){
                            avatar = man.avatar
                            full_name = man.full_name
                        }
                    })
                    if(avatar == ''){
                        mess.avatar = 'face.png'
                    } else {
                        mess.avatar = avatar
                    }

                    mess.full_name = full_name
                })
                setThismess([... result])
            }catch{

            }
        } else {
            message('Не выбран получатель')
        }

    }

    const backDate = fulldate => {
        const utcDate = new Date(fulldate);
        // const datetimearr = utcDate.split('T')
        const date = utcDate.toLocaleDateString('ru-RU')
        const options = { hour: 'numeric', minute: 'numeric' };
        const time = utcDate.toLocaleTimeString('ru-RU', options)

        return date + ' ' + time
    }
    useEffect(()=>{
        listUsers()
        // console.log(users)
    }, [])
    useEffect(()=>{
        getChats()
    }, [users])
    return (
        <div className="list_mess">
        <div className="list_messages">

            <div className="grayfon"></div>
            <div className="list_messages_col">

                <div className={`list_messages_col_title ${(openmess === false) ? 'activate' : ''}`}>
                    <div className={`new_mess ${(newmess === true) ? 'new_mess_active' : ''}`} >
                        <div className="new_mess_title">
                            <div className="new_mess_title_createname">Выберите кому написать</div>
                            <div className="new_mess_title_close" onClick={()=>downSett()}><i className="fa-solid fa-xmark"/></div>
                        </div>
                        <div className="new_mess_create">
                            <div className="new_mess_create_select">
                            <Select classNamePrefix='custom-select' placeholder="Выбрать получателя" onChange={e=>setThisMans(e)} value={thisMans} options={users}/>
                            </div>
                            <div className="new_mess_create_btn" onClick={()=>makeLetter(true)}><i className="fa-solid fa-magnifying-glass"/><div class="name-btns">Написать</div></div>
                        </div>
                    </div>
                    <div className="list_messages_col_title_left">
                        <div className="list_messages_col_title_left_sel">
                            {/*<Select classNamePrefix='custom-select' placeholder="Поиск"/>*/}
                        </div>
                    </div>
                    <div className="list_messages_col_title_right">
                        <div className="list_messages_col_title_right_new" onClick={()=>setNewmess(true)}><i className="fa-regular fa-pen-to-square"/></div>
                        <div className="list_messages_col_title_right_sett"><i className="fa-solid fa-ellipsis"/></div>
                    </div>
                </div>
                {allchats.map((chat, index)=>(
                    <div key={index} className="list_messages_col_str" onClick={()=>{ makeLetter(true, chat)}} style={(openmess === false) ? {display:'flex'} : {display:'none'}}>
                        <div className="list_messages_col_str_ava" style={{backgroundImage: `url("/files/profile/${chat.ava_to}")`}}></div>
                        <div className="list_messages_col_str_mess">
                            <div className="list_messages_col_str_mess_left">
                                <div className="list_messages_col_str_mess_left_name">{chat.name_to}</div>
                                <div className="list_messages_col_str_mess_left_text" style={{fontSize: '10pt'}}>автор: - {chat.name_from}</div>
                                <div className="list_messages_col_str_mess_left_text">{chat.text}</div>
                            </div>
                            <div className="list_messages_col_str_mess_right"><div className="list_messages_col_str_mess_right_date">{backDate(chat.createdAt)}</div></div>

                        </div>
                    </div>
                ))}






                {/*----------------------------------------------------------------------*/}

                <div className={`list_messages_col_title ${(openmess === true) ? 'activate' : ''}`}>

                    <div className="list_messages_col_title_left">
                        <div className="list_messages_col_title_left_sel">
                            {(thisMans)&&thisMans.full_name}
                        </div>
                    </div>
                    <div className="list_messages_col_title_right">
                        <div className="list_messages_col_title_right_new" onClick={()=>downSett()}><i className="fa-solid fa-xmark"/></div>
                    </div>
                </div>

                {/*autorch*/}
                <div className={`history_mess ${(openmess === true) ? 'activate' : ''}`} >
                    <div className="history_mess_pen" >
                        <textarea className="history_mess_pen_letter" id='textmess' onChange={(e)=>setTextarea(e.target.value)}>{textarea}</textarea>
                        <div className="history_mess_pen_btn" onClick={()=>passMess()}>Отправить <i className="fa-regular fa-paper-plane"/></div>
                    </div>
                    <div className="history_mess_list" >
                        {thismess.map((mess, index) => (
                            <div className="history_mess_list_block " key={index}>
                                <div className="history_mess_list_block_ava" style={{backgroundImage: `url("files/profile/${mess.avatar}")` }}></div>
                                <div className="history_mess_list_block_content" >
                                    <div className="history_mess_list_block_content_name" >{mess.full_name}</div>
                                    <div className="history_mess_list_block_content_message" >{mess.text}</div>
                                    <div className="history_mess_list_block_content_dateandstatus" >
                                        <div className="history_mess_list_block_content_date" >{backDate(mess.createdAt)}</div>
                                        <div className="history_mess_list_block_content_status" >
                                            {(mess.tn_from === my_tn && !mess.read)?'Отправлено':'Новое______'}
                                            </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>


                {/*-------------------------------------------------------------------------------*/}

                <div className="list_messages_col_bottom" ></div>
            </div>



        </div>
            <div className="menu_mess">
                <div className="menu_mess_list">
                    <div className="menu_mess_list_btn">Все чаты</div>
                    <div className="menu_mess_list_btn">Непрочитанные</div>
                    <div className="menu_mess_list_btn">Архив</div>
                </div>
            </div>
        </div>
    )
}