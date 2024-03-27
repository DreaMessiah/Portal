import {Link} from "react-router-dom";
import React, {useState} from 'react';
import {useContext} from "react";
import {Context} from "../../../index";
import "./style.scss"
import Select from "react-select";


export const QuestionDirector = () => {
    const {store} = useContext(Context)
    const [aup, setAup] = useState({})

    const listDev = [
        {label: 'Генеральный директор', value: 0},
        {label: 'Исполнительный диретор', value: 1},
        {label: 'Отдел кадров', value: 2},
        {label: 'Бухгалтерия', value: 3}
    ]

    const postMess = (to) => {
        const thismess = {}
        const valuemess = document.getElementById('mess')
        const valuetitle = document.getElementById('title')

        thismess.towhom = aup
        thismess.title = valuemess.value
        thismess.message = valuetitle.value

        console.log(thismess)

        // const
    }

    return (
        <div className="quest_director" style={{color: '#454545'}}>
            <div className="quest_director_up">
                <div className="quest_director_up_title">Задать вопрос управляющему составу</div>
                <div className="quest_director_up_customer">
                    <div className="quest_director_up_customer_name">Кому: </div>
                    <div className="hall_edit_tumbler">
                        <Select className='select' onChange={(e) => setAup(e)} value={aup} options={listDev}/>
                        {/*<Select className='select' />*/}
                        <p  style={{margin: '0 0 10px 0'}}></p>
                    </div>
                </div>
                <div className="quest_director_up_theme">
                    <div className="quest_director_up_theme_name">Тема: </div>
                    <input className="quest_director_up_theme_input" type="text" id='title' placeholder="Тема обращения" required></input>
                </div>
                <div className="quest_director_up_question">
                    <div className="quest_director_up_question_name">Текст обращения:</div>
                    <textarea className="quest_director_up_question_textarea" id='mess' required></textarea>
                </div>
            </div>
            <div className="quest_director_btns">
                <div className="quest_director_btns_cancel">Отмена</div>
                <div className="quest_director_btns_post" onClick={()=>postMess(aup)}>Отправить</div>
            </div>
        </div>
    )
}
