
import React, {useEffect, useState} from 'react';
import {useContext} from "react";
import {Context} from "../../index";
import "./style.scss"
import Select from "react-select";
import PhonesService from "../../services/PhonesService";
import {useMessage} from "../../hooks/message.hook";

export const QuestionDirector = ({setActive}) => {
    const {store} = useContext(Context)
    const [aup, setAup] = useState({})
    const [empty,setEmpty] = useState([])
    const [title,setTitle] = useState('')
    const [text,setText] = useState('')
    const [managers,setManagers] = useState([])
    const message = useMessage()


    const postMess = async () => {
        try {
            if(!checkEmpty()){
                const mail = await PhonesService.sendMail(aup.mail,title,text,aup.tn)
                message(mail.data.message)
                setActive(false)
            }else{
                message('Заполните все необходимые поля')
            }
        }catch (e) {
            console.log('Ошибка отправки')
        }
    }
    const checkEmpty = () => {
        const n = [...empty]
        n[0] = !!!text.trim().length
        n[1] = !!!title.trim().length
        n[2] = !!!aup.id

        const hasTrueValue = n.some(value => value === true);
        if( hasTrueValue ) setEmpty(n)
        else setEmpty([])
        return hasTrueValue
    }
    const loadingHandler = async () => {
        try {
            const response = await PhonesService.getManagers()
            if(response.data) setManagers(response.data)
        }catch (e){
            console.log(e)
        }
    }

    useEffect(() => {
        loadingHandler()
    },[])
    return (
        <div className="quest_director" style={{color: '#454545'}}>
            <div className="quest_director_up">
                <div className="quest_director_up_title">Задать вопрос</div>
                <div className="quest_director_up_customer">
                    <div className="quest_director_up_customer_name">Кому: </div>
                    <div className="hall_edit_tumbler">
                        <Select className={`select ${empty[2] && 'red-solid-border'}`} onChange={(e) => setAup(e)} value={aup} options={managers}/>
                        {/*<Select className='select' />*/}
                        <p style={{margin: '0 0 10px 0'}}></p>
                    </div>
                </div>
                <div className="quest_director_up_theme">
                    <div className="quest_director_up_theme_name">Тема: </div>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} className={`quest_director_up_theme_input ${empty[0] && 'red-solid-border'}`} type="text" id='title' placeholder="Тема обращения" required></input>
                </div>
                <div className="quest_director_up_question">
                    <div className="quest_director_up_question_name">Текст обращения:</div>
                    <textarea value={text} onChange={(e) => setText(e.target.value)} className={`quest_director_up_question_textarea ${empty[1] && 'red-solid-border'}`} id='mess' required></textarea>
                </div>
            </div>
            <div className="quest_director_btns">
                <div className="quest_director_btns_cancel" onClick={(e) => setActive(false)}>Отмена</div>
                <div className="quest_director_btns_post" onClick={(e) => postMess()}>Отправить</div>
            </div>
        </div>
    )
}
