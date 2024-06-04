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

function ChangeAva(){
    const [loading,setLoading] = useState(false)
    const {store} = useContext(Context)
    const imageRef = useRef(null)
    const message = useMessage()
    const [t13,setT13] = useState([])
    const [worker,setWorker] = useState(null)

    const [empty,setEmpty] = useState([])

    const [avatar,setAvatar] = useState('')

    const [selected,setSelected] = useState(null)

    const loadingHandler = async () => {
        try {
            setLoading(true)
            const {data} = await UserService.getUnphotoWorkers()
            //const onphoto = await UserService.getPrereg()
            console.log(data)
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

        n[0] = !!!avatar.trim().length
        n[1] = !!!worker

        if(n[0]) message(`Вы забыли загрузить аватар ${store.user.id === 41 ? 'Душнила травит': 'Фиксик не молодец'}`)
        const hasTrueValue = n.some(value => value === true)
        if( hasTrueValue ) setEmpty(n)
        else setEmpty([])
        return hasTrueValue
    }

    const cancelHandler = () => {
        setWorker(null)
        setAvatar('')
    }
    const sendAva = async () => {
        try {
            setLoading(true)
            if(!checkEmpty()){
                const {data} = await UserService.setAvaFix(worker,avatar)
                if(data) {
                    cancelHandler()
                    message('Юзерпик доставлен, красава')
                }
            }else {
                message('Выбери персонажа браат')
            }
        }catch (e) {
            console.log(e)
        }finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        loadingHandler()
    },[])
    return (
        <div className={`register`}>
            <h4>Поиск персонажей без образа</h4>
            <CmsSelect placeholder={"Введите имя или табельный номер сотрудника"} onChange={setWorker} empty={empty[1]} value={worker} options={t13} radius={'5px'} />
            <hr/>

            <h4>Загрузите юзерпик персонажа {worker ? worker.full_name : null}</h4>
            <div className={`workshop avablock`}>
                <div className={`reg-form avablock ${worker ? 'green-border' : null}`}>
                    <div className={`photo-img ${empty[2] && 'red-solid-border'}`}>
                        <div className="photo" onClick={() => imageRef.current.click()} style={avatar ? {backgroundImage:`url(/files/profile/${avatar}`}:{}}>
                            <input onChange={(e) => loadImage(e)} ref={imageRef} className='hidden-upload' type='file'/>
                            {!avatar ? <><i className="fa-solid fa-image"/></> : null}
                        </div>
                    </div>
                    <div className={`buttons ava`}>
                        <div onClick={() => sendAva()} className={`button`}><i className="up fa-solid fa-download"></i></div>
                        <div onClick={() => cancelHandler()} className={`button`}><i className="fa-solid fa-xmark"></i></div>
                    </div>
                </div>
            </div>
            {loading ? (<LoadingSpinner/>) : null}
        </div>
    )
}

export default observer(ChangeAva)