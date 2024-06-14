import React, {useContext, useEffect, useRef, useState} from "react"
import {observer} from "mobx-react-lite"
import "../econom/ogm.scss"
import "./editor.scss"
import {Context} from "../../index"
import LoadingSpinner from "../../components/loading/LoadingSpinner"
import {useMessage} from "../../hooks/message.hook";
import ModalFiles from "../../components/modalwin/ModalFiles";
import FilesService from "../../services/FilesService";
import NotificationsService from "../../services/NotificationsService";

function CmsNotifications(){
    const [loading,setLoading] = useState(false)
    const message = useMessage()
    const imageRef = useRef(null)

    const [empty,setEmpty] = useState([])

    const [types,setTypes] = useState([])
    const [group,setGroup] = useState([])

    const [typeName,setTypeName] = useState('')
    const [typeImg,setTypeImg] = useState(null)

    const [selected,setSelected] = useState(-1)
    const [activeDelType,setActiveDelType] = useState(false)

    const [activeAddType,setActiveAddType] = useState(false)
    const [activeAddGroup,setActiveAddGroup] = useState(false)

    const {store} = useContext(Context)

    const loadingHandler = async () => {
        try {
            setLoading(true)
            const {data} = await NotificationsService.loadTypes()
            if(data) {
                console.log(data)
                setTypes(data)
            }
        }catch (e) {
            console.log(e)
        }finally {
            setLoading(false)
        }
    }
    const checkEmpty = () => {
        const n = [...empty]

        n[0] = !!!typeName.trim().length
        n[1] = !!!typeImg

        const hasTrueValue = n.some(value => value === true);
        if( hasTrueValue ) setEmpty(n)
        else setEmpty([])
        return hasTrueValue
    }
/*    const sendAllMails = async () => {
        try {
            setLoading(true)
            const message = "Дорогие друзья!\n\nЭто Ваш последний шанс!\nВремя голосования на нашем конкурсе детского рисунка подходит к концу, и ваш голос может стать решающим!\n\nНе упустите возможность поддержать талантливых детей и помочь им выиграть заслуженные призы.\nКаждый голос имеет значение и может стать тем самым, который определит победителя.\n\nПроголосовать очень просто: перейдите по ссылке на главной странице портала и выберите лучшие, на ваш взгляд, работы.\nНе откладывайте, ведь время ограничено!\n\nСпасибо за ваше участие и поддержку юных художников!"
            const {data} = await NotificationsService.sendAll(message)
            console.log(data)
        }catch (e) {
            console.log(e)
        }finally {
            setLoading(false)
        }
    }*/

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
        try {
            setLoading(true)
            if(!checkEmpty()){
                const {data} = await NotificationsService.createType(typeName,typeImg)
                console.log(data)
                loadingHandler()
                cancelHandler()
            }else{
                message('Заполните форму')
            }
        }catch (e) {
            console.log(e)
        }finally {
            setLoading(false)
        }

    }
    const removeType = async () => {
        try {
            if(selected>=0){
                setLoading(true)
                const {data} = await NotificationsService.removeType(types[selected].id)
                if(data) {
                    message('Удаление успешно')
                    loadingHandler()
                    cancelHandler()
                }
            }else {
                message('Ошибка, попробуйте позже')
            }
        }catch (e) {
            console.log(e)
        }finally {
            setLoading(false)
        }
    }

    const addGroupHandler = () => {
        setActiveAddGroup(true)
    }
    const addTypeHandler = () => {
        setActiveAddType(true)
    }
    const deleteTypeHandler = (index) => {
        setActiveDelType(true)
        setSelected(index)
    }
    const cancelHandler = () => {
        setActiveAddType(false)
        setActiveDelType(false)
        setTypeImg(null)
        setTypeName('')
        setSelected(-1)
    }
    function AddType(){
        return (
            <>
                <div className={`noti-types`}>
                    <h4>Добавить тип уведомления</h4>
                    <div className={`inputs`}>
                        <label>Введите заголовок уведомления</label>
                        <input value={typeName} onChange={(e) => setTypeName(e.target.value)} placeholder={'Введите заголовок'} className={`${empty[0] ? 'red-solid-border' : ''}`}/>
                        <label>Выберете иконку для данного типа</label>
                        <div onClick={() => imageRef.current.click()} style={typeImg ? {backgroundImage:`url(/files/notifications/images/${typeImg})`}:{}} className={`${empty[1] ? 'red-solid-border' : ''} select-img`}>{!typeImg ? <i className="fa-solid fa-image"></i> : null}</div>
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
    function DeleteType(){
        return (
            <>
                <div className={`noti-types`}>
                    <h4>Удалить тип уведомления</h4>
                    <div className={`inputs`}>
                        <label>Вы дейтвительно решили удалить уведомление: <span> {selected>=0 ? types[selected].name : null} </span>?</label>
                    </div>
                    <div style={{justifyContent:'space-between'}} className={'buttons'}>
                        <div onClick={removeType} className={'button'}>Удалить</div>
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
{/*                    <div onClick={()=>sendAllMails()} className={`button`}>Рассылка Сообщений</div>*/}
                </div>
                <div className={`types-table`}>
                    <h3>Список типов</h3>
                    {types ? types.map((item,index) => (
                            <div key={index} className={`row`}>
                                <div className={'column icon'} style={item.img.length ? {backgroundImage:`url(/files/notifications/images/${item.img})`} : {}}></div>
                                <div className={`column`}>{item.name}</div>
                                <i onClick={() => deleteTypeHandler(index)} className="fa-solid fa-trash"></i>
                            </div>
                        ))
                    : null}
                </div>
            </div>
            <div className={`title`}>
                <div className={`buttons-cms`}>
                    <h3>Аудитории</h3>
                    <div className={`button`} onClick={addGroupHandler}>Добавить</div>
                </div>
            </div>
            <div className={`types-table`}>
                <h3>Список типов</h3>
                {types ? types.map((item,index) => (
                        <div key={index} className={`row`}>
                            <div className={'column icon'} style={item.img.length ? {backgroundImage:`url(/files/notifications/images/${item.img})`} : {}}></div>
                            <div className={`column`}>{item.name}</div>
                            <i onClick={() => deleteTypeHandler(index)} className="fa-solid fa-trash"></i>
                        </div>
                    ))
                    : null}
            </div>

            <ModalFiles heigth={'50vh'} active={activeAddType} setActive={setActiveAddType} data={AddType()} />
            <ModalFiles heigth={'30vh'} active={activeDelType} setActive={setActiveDelType} data={DeleteType()} />
            {loading ? (<LoadingSpinner/>) : null}

        </div>
    )
}

export default observer(CmsNotifications)