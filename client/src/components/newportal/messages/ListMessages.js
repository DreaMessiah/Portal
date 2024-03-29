
import "./style.scss"
import Select from "react-select";
import {useState} from "react";
import {useEffect} from "react";
import AuthServise from "../../../services/AuthService";
import {useMessage} from "../../../hooks/message.hook";
import {useContext} from "react";
import {Context} from "../../../index";
import FilesService from "../../../services/FilesService";
import MessagesService from "../../../services/MessagesService";


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
    console.log(my_tn)
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
            console.log(to_mess)

            const fromarr = []
            const from_mess = []

            result.forEach(mess => {
                if(!fromarr.includes(mess.tn_from)){
                    fromarr.push(mess.tn_from)
                    from_mess.push(mess)
                }
            })
            const allListChats = [... to_mess, ... from_mess]

            console.log(from_mess)
        } catch(e){
            console.log(e)
        }

    }

    const passMess = async () => {
        console.log(textarea)
        if(textarea !== '' && thisMans){
            thisMans.message = textarea
            thisMans.tn_from = userstore.tn
            thisMans.tn_to = thisMans.tn
            thisMans.title = ''
            thisMans.files = []
            thisMans.trash = false
            thisMans.read = false
            console.log(thisMans.tn_to)


            const mess = {}
            try{
                const response = await MessagesService.pushMess(thisMans)
                const result = response.data
                console.log(result)
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
            console.log(textMessage.value)
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
        console.log(list.data.users)
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
    }

    const makeLetter = async (bull) => {
        if(thisMans){
            setOpenmess(bull)
            setTextarea('')
                thisMans.tn_from = userstore.tn
                thisMans.tn_to = thisMans.tn

            try{
                const response = await MessagesService.getMess(thisMans)
                const result = response.data
                console.log(result)
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
        console.log(users)
        getChats()
    }, [])
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
                            <div className="new_mess_create_btn" onClick={()=>makeLetter(true)}>Написать</div>
                        </div>
                    </div>
                    <div className="list_messages_col_title_left">
                        <div className="list_messages_col_title_left_sel">
                            <Select classNamePrefix='custom-select' placeholder="Поиск"/>
                        </div>
                    </div>
                    <div className="list_messages_col_title_right">
                        <div className="list_messages_col_title_right_new" onClick={()=>setNewmess(true)}><i className="fa-regular fa-pen-to-square"/></div>
                        <div className="list_messages_col_title_right_sett"><i className="fa-solid fa-ellipsis"/></div>
                    </div>
                </div>
                <div className="list_messages_col_str" style={(openmess === false) ? {display:'flex'} : {display:'none'}}>
                    <div className="list_messages_col_str_ava" style={{backgroundImage: `url("/files/profile/face.png")`}}></div>
                    <div className="list_messages_col_str_mess">
                        <div className="list_messages_col_str_mess_left">
                            <div className="list_messages_col_str_mess_left_name">Марафон в «Шагах»</div>
                            <div className="list_messages_col_str_mess_left_text">Воу, что это за движение? Это «Весеннее умножение»!</div>
                        </div>
                        <div className="list_messages_col_str_mess_right"><div className="list_messages_col_str_mess_right_date">14мар</div></div>

                    </div>
                </div>
                <div className="list_messages_col_str" style={(openmess === false) ? {display:'flex'} : {display:'none'}}>
                    <div className="list_messages_col_str_ava" style={{backgroundImage: `url("/files/profile/face.png")`}}></div>
                    <div className="list_messages_col_str_mess">
                        <div className="list_messages_col_str_mess_left">
                            <div className="list_messages_col_str_mess_left_name">Марафон в «Шагах»</div>
                            <div className="list_messages_col_str_mess_left_text">Воу, что это за движение? Это «Весеннее умножение»!</div>
                        </div>
                        <div className="list_messages_col_str_mess_right"><div className="list_messages_col_str_mess_right_date">14мар</div></div>

                    </div>
                </div>
                <div className="list_messages_col_str" style={(openmess === false) ? {display:'flex'} : {display:'none'}}>
                    <div className="list_messages_col_str_ava" style={{backgroundImage: `url("/files/profile/face.png")`}}></div>
                    <div className="list_messages_col_str_mess">
                        <div className="list_messages_col_str_mess_left">
                            <div className="list_messages_col_str_mess_left_name">Марафон в «Шагах»</div>
                            <div className="list_messages_col_str_mess_left_text">Воу, что это за движение? Это «Весеннее умножение»!</div>
                        </div>
                        <div className="list_messages_col_str_mess_right"><div className="list_messages_col_str_mess_right_date">14мар</div></div>

                    </div>
                </div>




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
                                        <div className="history_mess_list_block_content_status" >Прочитано</div>
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