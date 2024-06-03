import './fixers.scss'
import React, {useContext, useEffect, useRef, useState} from "react";
import UserService from "../../services/UserService";
import CmsSelect from "../../components/inputs/CmsSelect";
import FilesService from "../../services/FilesService";
import {useMessage} from "../../hooks/message.hook";
import checkPassword from "../../components/functions/checkPassword";
import isCorrectLogin from "../../components/functions/isCorrectLogin";
import LoadingSpinner from "../../components/loading/LoadingSpinner";
import ModalFiles from "../../components/modalwin/ModalFiles";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";

function Registration(){
    const [loading,setLoading] = useState(false)
    const {store} = useContext(Context)
    const imageRef = useRef(null)
    const message = useMessage()
    const [t13,setT13] = useState([])
    const [worker,setWorker] = useState(null)
    const [zas,setZas] = useState([])
    const [empty,setEmpty] = useState([])

    const [name,setName] = useState('')
    const [login,setLogin] = useState('')
    const [pass1,setPass1] = useState('')
    const [pass2,setPass2] = useState('')
    const [mail,setMail] = useState('')
    const [tel,setTel] = useState('')
    const [comment,setComment] = useState('')
    const [avatar,setAvatar] = useState('')

    const [delActive,setDelActive] = useState(false)
    const [changeActive,setChangeActive] = useState(false)

    const [selected,setSelected] = useState(null)

    const loadingHandler = async () => {
        try {
            setLoading(true)
            const {data} = await UserService.getUnregWorkers()
            const prereg = await UserService.getPrereg()
            if(prereg.data) setZas(prereg.data)
            console.log(prereg.data)
            setT13(data)
        }catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }
    const loadImage = async (e) => {
        setLoading(true)
        try {
            const {data,err} = await FilesService.loadAvatarImage(e.target.files[0])
            if(err) message('Файл не является изображением')
            if(data){
                console.log(data.path)
                setAvatar(data.path)
            }
            if(empty.length) checkEmpty()
        }catch (e) {
            console.log(e)
        }finally {
            setLoading(false)
        }
    }

    const checkEmpty = () => {
        const n = [...empty]

        const correctLogin = isCorrectLogin(login,pass1)
        const checkPass = checkPassword(pass1,pass2)
        if(correctLogin.err) message(correctLogin.message)
        if(checkPass.err) message(checkPass.message)

        n[0] = !!!name.trim().length
        n[1] = checkPass.err
        n[2] = !!!avatar.trim().length
        n[3] = correctLogin.err

        if(n[0]) message(`Введите ФИО. ${store.user.id === 41 ? 'Душнила травит': 'Фиксик не молодец'}`)
        if(n[2]) message(`Вы забыли загрузить аватар ${store.user.id === 41 ? 'Душнила травит': 'Фиксик не молодец'}`)
        const hasTrueValue = n.some(value => value === true)
        if( hasTrueValue ) setEmpty(n)
        else setEmpty([])
        return hasTrueValue
    }
    const createPre = async () => {
        try {
            if(!checkEmpty()){
                const {data} = await UserService.createPreReg({name,login,password:pass1,mail,tel,comment,avatar})
                setZas([...zas,data])
                message(`Заявка оформлена ${store.user.id === 41 ? 'Душнила умница': 'Фиксик молодец'}`)
                cancelHandler()
            }
        }catch (e) {
            console.log(e)
        }finally {
            setLoading(false)
        }
    }

    const register = async (user=null) => {
        try {
            setLoading(true)
            const User = user ? user : {name,login,password:pass1,mail,tel,avatar}
            const Empty = user ? true : !checkEmpty()
            if(Empty){
                const {data} = await UserService.register(User.name,User.login,User.password,User.mail,User.tel,User.avatar)
                if(data){
                    const newZas = user ? zas.filter(item => item.id !== user.id) : zas
                    setZas(newZas)
                    message(`Пользователь зарегистрирован ${store.user.id === 41 ? 'Душнила молодец': 'Фиксик умница'}`)
                    cancelHandler()
                }
            }
        }catch (e) {
            console.log(e)
            message(e?.response?.data?.message)
        }finally {
            setLoading(false)
        }
    }
    const onDel = (user) => {
        setDelActive(true)
        setSelected(user)
    }
    const onChange = (user) => {
        setChangeActive(true)
        setSelected(user)
        setName(user.name)
        setLogin(user.login)
        setPass1(user.password)
        setPass2(user.password)
        setMail(user.mail)
        setTel(user.tel)
        setComment(user.comment)
        setAvatar(user.avatar)
    }
    const deleteZa = async () => {
        try{
            if(selected){
                setLoading(true)
                const {data} = await UserService.removeZa(selected.id)
                if(data){
                    const newZas = zas.filter(item => item.id !== selected.id)
                    setZas(newZas)
                    message(`Заявка удалена. ${store.user.id === 41 ? 'Душнила ниче ты дерзкий': 'Фиксик по легче'}`)
                    closeModals()
                }
            }
        }catch (e) {
            console.log(e)
        }finally {
            setLoading(false)
        }
    }
    const changeZa = async () => {
        try {
            setLoading(true)
            if(!checkEmpty() && selected){
                const {data} = await UserService.changeZa({id:selected.id,name,login,password:pass1,mail,tel,comment,avatar})
                if(data){
                    message(`Карта обнавлена. ${store.user.id === 41 ? 'Душнила красава': 'Фиксик умница'}`)
                    loadingHandler()
                    exitChange()
                }
            }
        }catch (e) {
            console.log(e)
        }finally {
            setLoading(false)
        }
    }
    const cancelHandler = () => {
        setName('')
        setMail('')
        setComment('')
        setAvatar('')
        setPass1('')
        setPass2('')
        setLogin('')
        setTel('')
        setWorker(null)
    }
    const exitChange = () => {
        cancelHandler()
        closeModals()
    }
    const closeModals = () => {
        setDelActive(false)
        setChangeActive(false)
    }
    useEffect(() => {
        loadingHandler()
    },[])

    useEffect(() => {
        setName(worker ? worker.name : '')
    },[worker])

    function RemoveZa(){
        return (
            <div>
                {selected ?
                    <div className={`modal-del`}>
                        <div className={`text`}>Вы дейтвительно решили удалить заявку на имя {selected.name}?</div>
                        <div className={`buttons`}>
                            <div onClick={deleteZa} className={`button da`}>Да</div>
                            <div onClick={closeModals} className={'button'}>Нет</div>
                        </div>
                    </div>
                    : null}
            </div>
        )
    }

    return (
        <div className={`register`}>
            <h4>Поиск сотрудника в таблице Т13</h4>
            <CmsSelect placeholder={"Введите имя или табельный номер сотрудника"} onChange={setWorker} value={worker} options={t13} radius={'5px'} />
            <hr/>

            <h4>Форма для душнилы и фиксика</h4>
            <div className={`workshop`}>
                <div className={`reg-form`}>
                    <div className={`photo-img ${empty[2] && 'red-solid-border'}`}>
                        <div className="photo" onClick={() => imageRef.current.click()} style={avatar ? {backgroundImage:`url(/files/profile/${avatar}`}:{}}>
                            <input onChange={(e) => loadImage(e)} ref={imageRef} className='hidden-upload' type='file'/>
                            {!avatar ? <><i className="fa-solid fa-image"/></> : null}
                        </div>
                    </div>
                    <div className={`inputs`}>
                        <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder={'Введите ФИО сотрудника'} className={`textinp ${empty[0] && 'red-solid-border'}`}/>
                        <input type='text' value={login} onChange={(e) => setLogin(e.target.value)} placeholder={'Введите логин сотрудника'} className={`textinp ${empty[3] && 'red-solid-border'}`}/>
                        <input type='text' value={pass1} onChange={(e) => setPass1(e.target.value)} placeholder={'Введите пароль сотрудника'} className={`textinp ${empty[1] && 'red-solid-border'}`}/>
                        <input type='text' value={pass2} onChange={(e) => setPass2(e.target.value)} placeholder={'Повторите пароль сотрудника'} className={`textinp ${empty[1] && 'red-solid-border'}`}/>
                        <input type='text' value={mail} onChange={(e) => setMail(e.target.value)} placeholder={'Введите E-Mail сотрудника (не обязательно)'} className={'textinp'}/>
                        <input type='text' value={tel} onChange={(e) => setTel(e.target.value)} placeholder={'Введите телефон сотрудника (не обязательно)'} className={'textinp'}/>
                        {!worker ? <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder={'Если нужно, введите коментарий для заявки'}/> : null}
                    </div>
                    {!changeActive ?
                        <div className={`buttons`}>
                            <div onClick={createPre} className={`button ${worker && 'unuse'}`}>Создать заявку</div>
                            <div onClick={() => register()} className={`button ${!worker && 'unuse'}`}>Зарегистрировать</div>
                        </div>
                    :
                        <div className={`buttons`}>
                            <div onClick={() => changeZa()} className={`button ${worker && 'unuse'}`}>Изменить заявку</div>
                            <div onClick={() => exitChange()} className={`button`}>Закрыть карту</div>
                        </div>
                    }
                </div>

                <div className={`zas`}>
                    <h4>Список заявок</h4>
                    <div className="table-container">
                        <div className="table-row table-header">
                            <div className="table-cell-pre c1">АВА</div>
                            <div className="table-cell-pre c2">ФИО</div>
                            <div className="table-cell-pre c3">Табельный номер</div>
                            <div className="table-cell-pre c4">Посмотреть</div>
                            <div className="table-cell-pre c5">Активировать</div>
                            <div className="table-cell-pre c5">Удалить</div>
                        </div>
                        {zas ?
                        <>
                            {zas.map((item, index) => (
                                <div key={index} className="table-row">
                                    <div className="table-cell-pre c1"><div className={`avatar`} style={{backgroundImage:`url(/files/profile/${item.avatar})`}}></div></div>
                                    <div className="table-cell-pre c2">{item.name}</div>
                                    <div className="table-cell-pre c3">{item.tn ? item.tn : 'В ожидании получения ТН'}</div>
                                    <div onClick={() => onChange(item)} className="table-cell-pre c4 change"><i className="fa-solid fa-pencil "></i></div>
                                    <div onClick={item.tn ? () => register(item) : () => console.log('no')} className={`table-cell-pre c5 ${item.tn && 'change act-but'}`}>{item.tn ? <i className="fa-solid fa-flag-checkered "></i> : <i className="fa-regular wait fa-hourglass-half"></i>}</div>
                                    <div onClick={() => onDel(item)} className="table-cell-pre c6 change del-but"><i className="fa-solid fa-trash "></i></div>
                                </div>
                            ))}
                        </> : null}
                    </div>
                </div>
            </div>
            <ModalFiles data={RemoveZa()} active={delActive} setActive={setDelActive} />
            {loading ? (<LoadingSpinner/>) : null}
        </div>
    )
}

export default observer(Registration)