
import "./style.scss"
import Select from "react-select";
import {useState} from "react";
import {useEffect} from "react";
import AuthServise from "../../../services/AuthService";
import {useMessage} from "../../../hooks/message.hook";
import {useContext} from "react";
import {Context} from "../../../index";


export const ListMessages = () => {
    const [newmess, setNewmess] = useState(false)
    const [users, setUsers] = useState([])
    const [thisMans, setThisMans] = useState()
    const [openmess, setOpenmess] = useState(false)
    const [customer, setCustomer] = useState({})
    const [textarea, setTextarea] = useState('')

    const message = useMessage()
    const  {store} = useContext(Context)
    const userstore = store.user
    const passMess = () => {
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

    }

    const makeLetter = (bull) => {
        if(thisMans){
            setOpenmess(bull)
        } else {
            message('Не выбран получатель')
        }

    }
    useEffect(()=>{
        listUsers()
        console.log(users)
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


                <div className={`history_mess ${(openmess === true) ? 'activate' : ''}`} >
                    <div className="history_mess_pen" >
                        <textarea className="history_mess_pen_letter" onChange={(e)=>setTextarea(e.target.value)}>{textarea}</textarea>
                        <div className="history_mess_pen_btn" onClick={()=>passMess()}>Отправить <i className="fa-regular fa-paper-plane"/></div>
                    </div>
                    <div className="history_mess_list" >
                        <div className="history_mess_list_block " >
                            <div className="history_mess_list_block_ava" style={{backgroundImage: `url("files/profile/face.png")` }}></div>
                            <div className="history_mess_list_block_content" >
                                <div className="history_mess_list_block_content_name" >Абдуллаев Алишер Абдумаджидович</div>
                                <div className="history_mess_list_block_content_message" >Текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст</div>
                                <div className="history_mess_list_block_content_dateandstatus" >
                                    <div className="history_mess_list_block_content_date" >14 мар</div>
                                    <div className="history_mess_list_block_content_status" >Прочитано</div>
                                </div>
                            </div>
                        </div>
                        <div className="history_mess_list_block " >
                            <div className="history_mess_list_block_ava" style={{backgroundImage: `url("files/profile/face.png")` }}></div>
                            <div className="history_mess_list_block_content autorch" >
                                <div className="history_mess_list_block_content_name" >Барахтянский Владимир Алексеевич</div>
                                <div className="history_mess_list_block_content_message" >Текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст</div>
                                <div className="history_mess_list_block_content_dateandstatus" >
                                    <div className="history_mess_list_block_content_date" >14 мар</div>
                                    <div className="history_mess_list_block_content_status" >Прочитано</div>
                                </div>
                            </div>
                        </div>
                        <div className="history_mess_list_block " >
                            <div className="history_mess_list_block_ava" style={{backgroundImage: `url("files/profile/face.png")` }}></div>
                            <div className="history_mess_list_block_content" >
                                <div className="history_mess_list_block_content_name" >Абдуллаев Алишер Абдумаджидович</div>
                                <div className="history_mess_list_block_content_message" >Текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст</div>
                                <div className="history_mess_list_block_content_dateandstatus" >
                                    <div className="history_mess_list_block_content_date" >14 мар</div>
                                    <div className="history_mess_list_block_content_status" >Прочитано</div>
                                </div>
                            </div>
                        </div>
                        <div className="history_mess_list_block " >
                            <div className="history_mess_list_block_ava" style={{backgroundImage: `url("files/profile/face.png")` }}></div>
                            <div className="history_mess_list_block_content autorch" >
                                <div className="history_mess_list_block_content_name" >Барахтянский Владимир Алексеевич</div>
                                <div className="history_mess_list_block_content_message" >Текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст</div>
                                <div className="history_mess_list_block_content_dateandstatus" >
                                    <div className="history_mess_list_block_content_date" >14 мар</div>
                                    <div className="history_mess_list_block_content_status" >Прочитано</div>
                                </div>
                            </div>
                        </div>
                        <div className="history_mess_list_block " >
                            <div className="history_mess_list_block_ava" style={{backgroundImage: `url("files/profile/face.png")` }}></div>
                            <div className="history_mess_list_block_content" >
                                <div className="history_mess_list_block_content_name" >Абдуллаев Алишер Абдумаджидович</div>
                                <div className="history_mess_list_block_content_message" >Текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст</div>
                                <div className="history_mess_list_block_content_dateandstatus" >
                                    <div className="history_mess_list_block_content_date" >14 мар</div>
                                    <div className="history_mess_list_block_content_status" >Прочитано</div>
                                </div>
                            </div>
                        </div>
                        <div className="history_mess_list_block " >
                            <div className="history_mess_list_block_ava" style={{backgroundImage: `url("files/profile/face.png")` }}></div>
                            <div className="history_mess_list_block_content autorch" >
                                <div className="history_mess_list_block_content_name" >Барахтянский Владимир Алексеевич</div>
                                <div className="history_mess_list_block_content_message" >Текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст</div>
                                <div className="history_mess_list_block_content_dateandstatus" >
                                    <div className="history_mess_list_block_content_date" >14 мар</div>
                                    <div className="history_mess_list_block_content_status" >Прочитано</div>
                                </div>
                            </div>
                        </div>

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