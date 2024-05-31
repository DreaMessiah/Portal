import React, {useContext, useEffect, useRef, useState} from "react"
import {observer} from "mobx-react-lite"
import "../econom/ogm.scss"
import "./editor.scss"
import {Context} from "../../index"
import LoadingSpinner from "../../components/loading/LoadingSpinner"
import {useMessage} from "../../hooks/message.hook";
import ModalFiles from "../../components/modalwin/ModalFiles";
import FilesService from "../../services/FilesService";

function CmsNotifications(){
    const [loading,setLoading] = useState(false)
    const message = useMessage()
    const imageRef = useRef(null)

    const [empty,setEmpty] = useState([])

    const [typename,setTypeName] = useState('')
    const [typeimg,setTypeImg] = useState(null)

    const [activeAddType,setActiveAddType] = useState(false)

    const {store} = useContext(Context)
    const loadingHandler = async () => {
        try {
            setLoading(true)

        }catch (e) {
            console.log(e)
        }finally {
            setLoading(false)
        }
    }
    const checkEmpty = () => {
        const n = [...empty]

        n[0] = !!!typename.trim().length
        n[1] = !!typeimg

        const hasTrueValue = n.some(value => value === true);
        if( hasTrueValue ) setEmpty(n)
        else setEmpty([])
        return hasTrueValue
    }
    const sendAllMails = async () => {
        // try {
        //     setLoading(true)
        //     const message = 'Просим Вас в срок до 09.06.2024 года загрузить Ваше портретное фото в личном кабинете. Благодарим заранее!'
        //     const {data} = await NotificationsService.sendAll(message)
        //     console.log(data)
        // }catch (e) {
        //     console.log(e)
        // }finally {
        //     setLoading(false)
        // }
    }

    const loadImage = async (e) => {
        setLoading(true)
        try {
            const {data,err} = await FilesService.loadImage(e.target.files[0],'notifications')
            if(err) message('Файл не является изображением')
            if(data){
                console.log(data.path)
                setTypeImg(data.path)
            }
            if(empty.length) checkEmpty()
        }catch (e) {
            console.log(e)
        }finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadingHandler()
    },[])

    const sendType = async () =>{
        console.log(checkEmpty())
    }
    const addTypeHandler = () => {
        setActiveAddType(true)
    }
    const cancelHandler = () => {
        setActiveAddType(false)
        setTypeImg(null)
        setTypeName('')
    }
    function AddType(){
        return (
            <>
                <div className={`noti-types`}>
                    <h4>Добавить тип уведомления</h4>
                    <div className={`inputs`}>
                        <label>Введите заголовок уведомления</label>
                        <input value={typename} onChange={(e) => setTypeName(e.target.value)} placeholder={'Введите заголовок'}/>
                        <label>Выберете иконку для данного типа</label>
                        <div onClick={() => imageRef.current.click()} style={typeimg ? {backgroundImage:`url(/files/notifications/images/${typeimg})`}:{}} className={`select-img`}>{!typeimg ? <i className="fa-solid fa-image"></i> : null}</div>
                        <input onChange={(e) => loadImage(e)} ref={imageRef} className='hidden-upload' type='file'/>
                    </div>
                    <div style={{justifyContent:'space-between'}} className={'buttons'}>
                        <div onClick={sendType} className={'button'}>Добавить</div>
                        <div onClick={cancelHandler} className={'button'}>Отменить</div>
                    </div>
                </div>
            </>
        )
    }

    return (
        <div className='workers'>
            <div className={`title`}>
                <h3>Управление уведомлениями</h3>
                <div className={`buttons-cms`}>
                    <h3>Типы уведомлений</h3>
                    <div className={`button`} onClick={addTypeHandler}>Добавить</div>
                    <div className={`button`}>Редактировать</div>
                    {/*<div onClick={()=>sendAllMails()} className={`button`}>Рассылка Сообщений</div>*/}
                </div>
            </div>
            <ModalFiles heigth={'50vh'} active={activeAddType} setActive={setActiveAddType} data={AddType()} />
            {loading ? (<LoadingSpinner/>) : null}

        </div>
    )
}

export default observer(CmsNotifications)