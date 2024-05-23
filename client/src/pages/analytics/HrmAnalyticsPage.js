import React, {useContext, useEffect, useRef, useState} from "react"
import {observer} from "mobx-react-lite"
import "../econom/ogm.scss"
import "./analitics.scss"
import UserService from "../../services/UserService"
import LoadingSpinner from "../../components/loading/LoadingSpinner"
import '../editor/editor.scss'
import {useMessage} from "../../hooks/message.hook";
import {Context} from "../../index";
import ModalFiles from "../../components/modalwin/ModalFiles";

function HrmAnalyticsPage(){
    const [loading,setLoading] = useState(false)
    const [answers,setAnswers] = useState([])
    const [selected,setSelected] = useState(-1)
    const [activeModal,setActiveModal] = useState(false)
    const {store} = useContext(Context)

    const message = useMessage()

    const loadingHandler = async () => {
        try {
            setLoading(true)
            const {data} = await UserService.getHrmAnswers()
            if(data) {
                setAnswers(data)
                console.log(data)
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
    const setAnswerHandler = (index) => {
        setSelected(index)
        setActiveModal(true)
    }
    const cancelHandler = () => {
        setSelected(-1)
        setActiveModal(false)
    }
    function AnswersBox(){
        return (
            <>
                {answers[selected] && answers[selected].report && (
                    <div className={`answers-box`}>
                        <h3>Расскажите, пожалуйста, что входит в Ваши основные обязанности?</h3>
                        <div className={'answer'}>{answers[selected].report[0]}</div>
                        <h3>С какими основными трудностями вы сталкиваетесь в вашей ежедневной работе?</h3>
                        <h4>Сложности с управлением документооборотом (1С и т.д.) - {answers[selected].report[1].split(',')[0] === 'true' ? 'Да' : 'Нет'}</h4>
                        <h4>Проблемы с коммуникацией внутри отдела  - {answers[selected].report[1].split(',')[1] === 'true' ? 'Да' : 'Нет'}</h4>
                        <h4>Трудности в координации с другими отделами - {answers[selected].report[1].split(',')[2] === 'true' ? 'Да' : 'Нет'}</h4>
                        <h4>Недостаток автоматизации процессов - {answers[selected].report[1].split(',')[3] === 'true' ? 'Да' : 'Нет'}</h4>
                        <h4>Сложности в поиске и найме сотрудников - {answers[selected].report[1].split(',')[4] === 'true' ? 'Да' : 'Нет'}</h4>
                        <h4>Другие - {answers[selected].report[1].split(',')[5] === 'true' ? 'Да' : 'Нет'}</h4>
                        {answers[selected].report[1].split(',')[5] === 'true' ? <h4>{answers[selected].report[2]}</h4> : null}

                        <h3>Какие процессы в вашем отделе занимают больше всего времени и требуют автоматизации?</h3>
                        <div className={'answer'}>{answers[selected].report[3]}</div>
                        <h3>Как вы оцениваете текущий уровень автоматизации в вашем отделе?</h3>
                        <div className={'answer'}>{answers[selected].report[4]}</div>
                        <h3>Какие технологии или инструменты, на ваш взгляд, могли бы улучшить вашу работу?</h3>
                        <div className={'answer'}>{answers[selected].report[5]}</div>
                        <h3>Какие функции или возможности вы хотели бы видеть в новой системе для вашего отдела?</h3>
                        <div className={'answer'}>{answers[selected].report[6]}</div>
                        <h3>С какими отделами у вас наиболее частая координация и какие сложности возникают в процессе взаимодействия?</h3>
                        <div className={'answer'}>{answers[selected].report[7]}</div>
                        <h3>Какие меры можно предпринять для улучшения координации с другими отделами?</h3>
                        <div className={'answer'}>{answers[selected].report[8]}</div>
                        <h3>Есть ли у вас конкретные предложения по улучшению рабочих процессов в вашем отделе с помощью инноваций и технологий?</h3>
                        <div className={'answer'}>{answers[selected].report[9]}</div>
                        <div className={`buttons`}>
                            <div onClick={cancelHandler} className={'button'}>выход</div>
                        </div>
                    </div>
                )}
            </>

        )
    }

    return (
        <div className='workers'>
            <div className={`title`}>
                <h3>Отчет</h3>

                <div className="answers-list">
                    <div className="answers-list-line first-line header">
                        <div className="answers-list-row c1 first-row">ФИО</div>
                        <div className="answers-list-row c2 ">Должность</div>
                        <div className="answers-list-row c3 borderrightnone">Стаж работы</div>
                    </div>

                    {answers.length ? answers.map( (item,index) => (
                        <div key={index} onClick={() => setAnswerHandler(index)} className="answers-list-line bordertopnone data">
                            <div className="answers-list-row first-row c1">{item.t13uni.name}</div>
                            <div className="answers-list-row c2">{item.t13uni.developer}</div>
                            <div className="answers-list-row c3 last">{store.createStazh(item.t13uni.onboard)}</div>
                        </div>
                    )) :null}

                </div>
            </div>
            {loading ? (<LoadingSpinner/>) : null}
            <ModalFiles data={AnswersBox()} active={activeModal} setActive={setActiveModal} heigth={'80%'}/>
        </div>
    )
}
export default observer(HrmAnalyticsPage)