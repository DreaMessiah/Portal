import React,{useEffect, useState} from "react"
import PollsService from "../../services/PollsService"
import CircleChart from "../../components/graphs/CircleChart"
import {useContext} from "react"
import {DataContext} from "../../context/DataContext"
import {useMessage} from "../../hooks/message.hook"

export default function SurveyPage({id}){
    const [survey,setSurvey] = useState(null)
    const [questions,setQuestions] = useState(null)
    const [selected,setSelected] = useState(-1)
    const [answer,setAnswer] = useState(null)
    const [stat,setStat] = useState(null)
    const [perc,setPerc] = useState(null)
    const [image,setImage] = useState(null)
    const {COLORS} = useContext(DataContext)
    const message = useMessage()
    const loadingHandler = async () => {
        try{
            const response = await PollsService.fetchSurvey(id)
            if(response.data){
                setSurvey(response.data.surveys)
                setQuestions(response.data.questions)
                setAnswer(response.data.answers)
                setImage(response.data.surveys.image)
            }
            const statres = await PollsService.fetchStat(id)
            console.log(statres.data)
            if(statres.data){
                setStat(statres.data)
            }
        }catch (e){
            console.log(e.message+': Проблема загрузки опроса')
        }
    }

    const voteHandler = async () => {
        try{
            if(selected >= 0 && questions.length && survey !== null){
                const response = await PollsService.vote(survey.id,questions[selected].id)
                if(response.data){
                    message('Ваш голос принят')
                    loadingHandler()
                }
            }else{
                message('Выберете подходящий вариант ответа')
            }
        }catch (e){
            console.log(e.message+': Ошибка обработки голоса')
        }
    }
    const selectHandler = (index) => {
        if(!answer){
            setSelected(index)
        }
    }
    useEffect(() => {
        const load = loadingHandler()
        console.log(load)
    },[])
    useEffect(() => {
        if(answer){
            questions.map((item,index) => {
                if(answer.question_id === item.id) setSelected(index)
            })
        }
    },[answer])
    useEffect(() => {
        if(stat){
            console.log(stat)
            stat.forEach(item => {
                if(item.percent){
                    setPerc(prevState => ({
                        ...prevState,
                        [item.text]: item.percent
                    }))
                }
            })
            console.log(perc)
        }
    },[stat])

    return (
        <>
            {survey ?
            <div className='survey-block' style={{backgroundImage:`url("/polls/${survey.image}")`}}>
                <div className='title'>
                    <h3>{survey.title}</h3>
                </div>
                <div className='survey-box'>
                    <div className='image' ></div>
                    <div className='text'>
                        <h4>{survey.text}</h4>
                    </div>
                    {questions ?
                        <>
                            {survey.type === 1 ?
                                <div className='scale'>
                                    {questions.map((item,index) => (
                                        <div key={index} onClick={(e) => selectHandler(index)} className={ answer ? selected===index ? 'item selected' : 'item' : selected===index ? 'item selected' : 'item itemhover'}>
                                            {item.text}
                                        </div>
                                    ))}
                                </div>
                                :
                                <div className="radio-button-container">
                                    {questions.map((item,index) => (
                                        <label key={index} className="radio-button">
                                            <input
                                                type="radio"
                                                value={selected}
                                                checked={selected === index}
                                                onChange={(e) => setSelected(index)}
                                                disabled={!!answer}
                                            />
                                            <span className="radio-button-text">{item.text}</span>
                                        </label>
                                    ))}
                                </div>
                            }
                        </>
                        : null}
                    <div className='next'>
                        {!answer ? <div onClick={(e) => voteHandler()} className='button'>Проголосовать</div> : <div className='text'>Вы уже проголосовали</div> }
                    </div>
                    {answer ?
                        <div className='statistics'>
                            {stat ?
                                <div className='answers'>
                                    <div className='survey-table'>
                                        <div className="table_list_cap"></div>
                                        <div className="survey-table-header">
                                            <div className="column с1">Ответ</div>
                                            <div className="column с2">Количество</div>
                                            <div className="column с3">Процент</div>
                                        </div>
                                        {stat.map((item,index) => (
                                            <div key={index} className={selected===index ? 'item selected' : 'item'}>
                                                <div className="column с1">
                                                    <div className='ic'> <i style={{color:COLORS[index]}} className="fa-solid fa-circle"></i></div>
                                                    <div className='text'>{item.text}</div>
                                                </div>
                                                <div className="column с2"><p>{item.total}</p></div>
                                                <div className="column с3"><p>{item.percent.toFixed(2)}%</p></div>
                                            </div>

                                        ))}
                                    </div>

                                    <div className='schedule'>
                                        {perc ?
                                            <>
                                                <CircleChart values={perc} />
                                            </>
                                            : null}

                                    </div>
                                </div>

                                : null}
                        </div>
                        : null}
                </div>

            </div>
            : null }
        </>
    )
}
