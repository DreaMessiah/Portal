import {useContext, useEffect, useState} from "react";
import PollsService from "../../services/PollsService";
import {create} from "axios";
import formatDate from "../../components/functions/formatDate";
import {Link} from "react-router-dom";
import {DataContext} from "../../context/DataContext";
import {Context} from "../../index";
export default function PollsList(){
    const [surveys,setSurveys] = useState(null)
    const {store} = useContext(Context)
    const loadingHandler = async () => {
        try{
            const response = await PollsService.fetchPolls()
            if(response.data){
                setSurveys(response.data)
            }

        }catch (e){
            console.log(e.message+': Проблема загрузки списка опросов')
        }
    }
    const createHandler = async () => {
        try{
            const title = 'Рабочий график'
            const text = 'Довольны ли Вы своим рабочим графиком'
            const response = await PollsService.createSurvey(text,title)
            if(response.data){
                console.log(response.data)
            }
        }catch (e){
            console.log(e.message+': Проблема создания опроса')
        }
    }

    useEffect(() => {
        loadingHandler()
    },[])

    const rule = store.user.unit

    return (
        <>
            <div className="survey-table">
                <div className="table_list_cap"></div>
                <div className="survey-table-header">
                    <div className="column с1">Дата</div>
                    <div className="column с2">Текст опроса</div>
                    <div className="column с3">Статус</div>
                    <div className="column с4">Результат</div>
                </div>
                <div className="survey-table-body">
                    {surveys ? surveys.map((survey, index) => (
                        <Link to={`/polls?survey=${survey.id}`} className="survey-row" key={index}>
                            <div className="column с1">{formatDate(survey.createdAt)}</div>
                            <div className="column с2">{survey.title}</div>
                            <div className="column с3">{survey.status ? <i className="fa-solid fa-check"></i> : <i className="fa-regular fa-clock"></i> }</div>
                            <div className="column с4">Посмотреть результат</div>
                        </Link>
                    )) : null}
                </div>

                { (rule === 99 || store.user.account==='superadmin') ?
                    <div className='next'>
                        <Link to='/polls/cms' className='button'>Редактор</Link>
                    </div>
                : null}

            </div>
        </>
    )
}
