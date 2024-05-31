import './fixers.scss'
import React, {useEffect, useRef, useState} from "react";
import UserService from "../../services/UserService";
import CmsSelect from "../../components/inputs/CmsSelect";
import FilesService from "../../services/FilesService";
import {useMessage} from "../../hooks/message.hook";

export default function Registration(){
    const [loading,setLoading] = useState(false)
    const imageRef = useRef(null)
    const message = useMessage()
    const [t13,setT13] = useState([])
    const [worker,setWorker] = useState(null)
    const [zas,setZas] = useState([])

    const [name,setName] = useState('')
    const [login,setLogin] = useState('')
    const [pass1,setPass1] = useState('')
    const [pass2,setPass2] = useState('')
    const [mail,setMail] = useState('')
    const [tel,setTel] = useState('')
    const [about,setAbout] = useState('')
    const [avatar,setAvatar] = useState('')

    const loadingHandler = async () => {
        try {
            const {data} = await UserService.getUnregWorkers()
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
            const {data,err} = await FilesService.loadImage(e.target.files[0],'profile')
            if(err) message('Файл не является изображением')
            if(data){
                console.log(data.path)
                setAvatar(data.path)
            }
            //if(empty.length) checkEmpty()
        }catch (e) {
            console.log(e)
        }finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        loadingHandler()
    },[])

    useEffect(() => {
        setName(worker ? worker.name : '')
    },[worker])

    return (
        <div className={`register`}>
            <h4>Поиск сотрудника в таблице Т13</h4>
            <CmsSelect placeholder={"Введите имя или табельный номер сотрудника"} onChange={setWorker} value={worker} options={t13} radius={'5px'} />
            <hr/>

            <h4>Форма для душнилы и фиксика</h4>
            <div className={`workshop`}>
                <div className={`reg-form`}>
                    <div className={`photo-img`}>
                        <div className="photo" style={avatar ? {backgroundImage:`url(/files/profile/${avatar}`}:{}}>
                            <input onChange={(e) => loadImage(e)} ref={imageRef} className='hidden-upload' type='file'/>
                            {!avatar ? <><i className="fa-solid fa-image"/></> : null}
                        </div>
                    </div>
                    <div className={`inputs`}>
                        <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder={'Введите ФИО сотрудника'} className={'textinp'}/>
                        <input type='text' value={login} onChange={(e) => setLogin(e.target.value)} placeholder={'Введите логин сотрудника'} className={'textinp'}/>
                        <input type='password' value={pass1} onChange={(e) => setPass1(e.target.value)} placeholder={'Введите пароль сотрудника'} className={'textinp'}/>
                        <input type='password' value={pass2} onChange={(e) => setPass2(e.target.value)} placeholder={'Повторите пароль сотрудника'} className={'textinp'}/>
                        <input type='text' value={mail} onChange={(e) => setMail(e.target.value)} placeholder={'Введите E-Mail сотрудника (не обязательно)'} className={'textinp'}/>
                        <input type='text' value={tel} onChange={(e) => setTel(e.target.value)} placeholder={'Введите телефон сотрудника (не обязательно)'} className={'textinp'}/>
                        {!worker ? <textarea value={about} onChange={(e) => setAbout(e.target.value)} placeholder={'Если нужно, введите коментарий для заявки'}/> : null}
                    </div>
                    <div className={`buttons`}>
                        <div className={`button ${worker && 'unuse'}`}>Создать заявку</div>
                        <div className={`button ${!worker && 'unuse'}`}>Зарегистрировать</div>
                    </div>
                </div>

                <div className={`zas`}>
                    <h4>Список заявок</h4>
                    <div className="table-container">
                        <div className="table-row table-header">
                            <div className="table-cell">ФИО</div>
                            <div className="table-cell">Табельный номер</div>
                            <div className="table-cell">Посмотреть</div>
                            <div className="table-cell">Активировать</div>
                        </div>
                        {/*{rows.map((row, rowIndex) => (*/}
                        {/*    <div key={rowIndex} className="table-row">*/}
                        {/*        {row.map((cell, cellIndex) => (*/}
                        {/*            <div key={cellIndex} className="table-cell">{cell}</div>*/}
                        {/*        ))}*/}
                        {/*    </div>*/}
                        {/*))}*/}
                    </div>
                </div>
            </div>

        </div>
    )
}