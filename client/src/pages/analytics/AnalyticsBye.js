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
import formatDate from "../../components/functions/formatDate";
import CmsSelect from "../../components/inputs/CmsSelect";
import {Link} from "react-router-dom";
import Select from "react-select";
import {DataContext} from "../../context/DataContext";

function AnalyticsBye(){
    const {getMonthName,optionsMonth,optionsYear} = useContext(DataContext)

    const getNowMonthNum = () => {
        const currentDate = new Date();
        return currentDate.getMonth()
    }
    const monthNow = getNowMonthNum()

    const [loading,setLoading] = useState(false)
    const [answers,setAnswers] = useState([])
    const [byes,setByes] = useState([])
    const [news,setNews] = useState([])

    const [selected,setSelected] = useState(-1)
    const [activeModal,setActiveModal] = useState(false)
    const [peoples,setPeoples] = useState([])
    const [activePeoples,setActivePeoples] = useState(false)

    const [monthState,setMonthState] = useState(optionsMonth[monthNow])
    const [yearState,setYearState] = useState(optionsYear[2])

    const {store} = useContext(Context)

    const message = useMessage()

    const toBack = () => {
        window.history.back()
    }

    const loadingHandler = async () => {
        try {
            setLoading(true)
            const {data} = await UserService.getByeAnswers()
            if(data) setAnswers(data)
            const term = await UserService.getTermUsers()
            if(term.data){
                let monthTerm = []
                term.data.map(item => {
                    if(parseInt(item.term.split('.')[1]) === parseInt(monthState.value)+1 && item.term.split('.')[2] === yearState.label) monthTerm.push(item)
                })
                setByes(monthTerm)
            }
            const newusers = await UserService.getNewPeoples()
            if(newusers.data){
                let monthOnboard = []
                newusers.data.map(item => {
                    if(parseInt(item.onboard.split('.')[1]) === parseInt(monthState.value)+1 && item.onboard.split('.')[2] === yearState.label) monthOnboard.push(item)
                })
                setNews(monthOnboard)
            }
        }catch (e) {
            console.log(e)
        }finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadingHandler()
    },[monthState,yearState])
    const setAnswerHandler = (index) => {
        setSelected(index)
        setActiveModal(true)
    }
    const cancelHandler = () => {
        setSelected(-1)
        setPeoples([])
        setActiveModal(false)
        setActivePeoples(false)
    }
    const selectPeoplesHandler = (type) => {
        if(type) setPeoples(news)
        else setPeoples(byes)
        setActivePeoples(true)
    }
    function AnswersBox(){
        return (
            <>
                {answers[selected] && answers[selected].text && (
                    <div className={`answers-box`}>
                        <h3>Расскажите пожалуйста какие причины увольнения были наиболее значимы для Вас?</h3>
                        <div className={'answer'}>{answers[selected].text}</div>
                        <h3>Как Вы оцениваете процесс увольнения?</h3>
                        <div className={'answer'}>{answers[selected].num}</div>
                        <div className={`buttons`}>
                            <div onClick={cancelHandler} className={'button'}>выход</div>
                        </div>
                    </div>
                )}
            </>

        )
    }
    function PeoplesBox(){
        return (
            <>
                {peoples.length ?
                    <div>
                        <div className="answers-list modal-list">
                            <h4 className={``}>Результаты ответов на анкету для уволившихся сотрудников</h4>
                            <div className="answers-list-line first-line header">
                                <div className="answers-list-row c1 first-row">ФИО</div>
                                <div className="answers-list-row c2 ">Должность</div>
                                <div className="answers-list-row c3 borderrightnone"><>Дата</></div>
                            </div>
                            { peoples.length ? peoples.map( (item,index) => (
                                <div key={index} onClick={() => setAnswerHandler(index)} className="answers-list-line bordertopnone data">
                                    {item ?
                                        <>
                                            <div className="answers-list-row first-row c1">{item.name}</div>
                                            <div className="answers-list-row c2">{item.developer}</div>
                                            <div className="answers-list-row c3 last">{item.term ? item.term : item.onboard}</div>
                                        </>
                                        : null}
                                </div>
                            )) : null }

                        </div>
                    </div>
                    : null}
            </>
        )
    }
    return (
        <>
            <div className='new_back'>
                <h4 className={`main-title`}>Здесь Вы можете посмотреть статистику увольнений и результаты ответов на анкету для уволившихся сотрудников</h4>
                <h5 style={{marginTop:'-20px',width:'100%',textAlign:"left",justifyContent:'left',fontSize:'0.7rem'}}>Статистика ведется от 01.05.2024</h5>
                <div className='info_news'>
                    <div className='info between min300'>
                        <Link className='toback' onClick={()=>toBack()}>НАЗАД</Link>
                        <div className="select_block">
                            <div className="select_block_title">МЕСЯЦ</div>
                            <Select className='select' onChange={(e) => setMonthState(optionsMonth[e.value])} value={monthState} options={optionsMonth}/>
                        </div>

                        <div className="select_block">
                            <div className="select_block_title">ГОД</div>
                            <Select className='select' onChange={(e) => setYearState(optionsYear[e.value])} value={yearState} options={optionsYear}/>
                        </div>
                    </div>
                    <div className='min300 analyt'>
                        <>Статистика за {monthState.label} месяц {yearState.label} год</> {news.length || byes.length ? null : <> отсутствует</> }
                        <p>{news.length ? <> Устроилось на работу: <span>{news.length}</span> человек </> : null}</p>
                        {news.length ? <div onClick={() => selectPeoplesHandler(true)} className={`button`}>Посмотреть </div> : null}
                        <p>{byes.length ? <> Уволилось: <span>{byes.length}</span> человек </> : null}</p>
                        {byes.length ? <div onClick={() => selectPeoplesHandler(false)} className={`button`}>Посмотреть </div> : null}
                        <p>{answers.length ? <> Оставили отзыв: <span>{answers.length}</span> человек </> : null}</p>
                    </div>
                </div>
            </div>
            <div className='workers'>
                <div className="answers-list">
                    <h4 className={`main-title`}>Результаты ответов на анкету для уволившихся сотрудников</h4>
                    <div className="answers-list-line first-line header">
                        <div className="answers-list-row c1 first-row">ФИО</div>
                        <div className="answers-list-row c2 ">Должность</div>
                        <div className="answers-list-row c3 borderrightnone">Дата увольнения</div>
                    </div>

                    { answers.length ? answers.map( (item,index) => (
                        <div key={index} onClick={() => setAnswerHandler(index)} className="answers-list-line bordertopnone data">
                            {item.t13bye ?
                                <>
                                    <div className="answers-list-row first-row c1">{item.t13bye.name}</div>
                                    <div className="answers-list-row c2">{item.t13bye.developer}</div>
                                    <div className="answers-list-row c3 last">{item.term}</div>
                                </>
                                : null}
                        </div>
                    )) : null }

                </div>
            </div>

            {loading ? (<LoadingSpinner/>) : null}
            <ModalFiles data={AnswersBox()} active={activeModal} setActive={setActiveModal}/>
            <ModalFiles data={PeoplesBox()} active={activePeoples} setActive={setActivePeoples} heigth={'80%'}/>

        </>

    )
}
export default observer(AnalyticsBye)