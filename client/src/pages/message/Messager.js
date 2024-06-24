import React, {useEffect, useState, useRef} from 'react';
import styles from './Messager.module.scss';
import SearchSelect from "../../components/inputs/SearchSelect";
import LoadingSpinner from "../../components/loading/LoadingSpinner";
import UserService from "../../services/UserService";
import getOnlineStatus from "../../components/functions/getOnlineStatus";
import MessagesMultySelect from "../../components/inputs/MessagesMultySelect";

const Messager = () => {
    const [loading,setLoading] = useState(false)
    const [users,setUsers] = useState(false)

    const [selectedUser,setSelectedUser] = useState(null)

    const [selectedUsersGroup,setSelectedUsersGroup] = useState([])
    const [onSelectGroup,setOnSelectGroup] = useState(false)

    const [message,setMessage] = useState('')
    const [audio,setAudio] = useState(null)
    const [files,setFiles] = useState([])

    const textareaRef = useRef(null)

    const loadingHandler = async () => {
        try {
            setLoading(true)
            const users = await UserService.getUsers()
            if(users.data) setUsers(users.data)
            console.log(users.data)
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
        setSelectedUser(null)
        setSelectedUsersGroup([])
        setOnSelectGroup(false)
    }
    useEffect( () => {
        loadingHandler()
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

    return (
        <div className={styles.container}>
            <div className={styles.chatlist}>
                <div className={styles.header}>
                    {!onSelectGroup ?
                        selectedUser ?
                            <div className={styles.opened}>
                                <div className={styles.back} onClick={cancelHandler}>
                                    <i className="fa-solid fa-angle-left"></i>
                                    <div>назад</div>
                                </div>
                                <div className={styles.center}>
                                    <div className={styles.name}>{selectedUser.label}</div>
                                    <div className={styles.status}>{getOnlineStatus(selectedUser.gender,selectedUser.online)}</div>
                                </div>
                                <div className={styles.right}>
                                    <div style={{backgroundImage:`url(/files/profile/${selectedUser.avatar ? selectedUser.avatar : 'face.png'})`}} className={styles.ava}></div>
                                </div>
                            </div>
                            :
                            <>
                                <div className={styles.left}>
                                    <SearchSelect defaultValue={null} value={selectedUser} onChange={setSelectedUser} options={users} placeholder={'поиск'} />
                                </div>
                                <div className={styles.right}>
                                    <i onClick={() => setOnSelectGroup(!onSelectGroup)} className="fa-regular fa-pen-to-square"></i>
                                    <i className="fa-solid fa-ellipsis"></i>
                                </div>
                            </>
                        :
                        <>
                            <div className={styles.left}>
                                <div>Создание чата</div>
                            </div>
                            <div className={styles.right}>
                                <i onClick={cancelHandler} className="fa-solid fa-xmark"></i>
                            </div>
                        </>
                    }

                </div>
                <div className={styles.chats}>
                    {selectedUser ?
                        <>
                            <div className={styles.messages}>

                            </div>

                            <div className={styles.textbox}>
                                <div className={styles.right}><div className={styles.circle}><i className="fa-solid fa-paperclip"></i></div></div>
                                <div className={styles.textarea}>
                                    <textarea ref={textareaRef} rows="1" cols="50" value={message} onChange={changeHandler} placeholder="Напишите сообщение"/>
                                </div>
                                <div className={styles.left}><div className={styles.circle}>{!loading ? <i className="fa-solid fa-paper-plane"></i> : <i className="fa-solid fa-hourglass-half"></i>}</div></div>
                            </div>
                        </>
                        :
                        <> </>
                    }
                    {onSelectGroup ?
                        <div className={styles.multy}>
                            <MessagesMultySelect options={users} placeholder={'Введите имя или фамилию'} heigth={'auto'} setOptions={setSelectedUsersGroup} values={selectedUsersGroup} />
                            <div className={styles.userslist}>

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