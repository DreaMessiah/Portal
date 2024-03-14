import React,{useContext, useEffect, useState} from "react";
import PollsService from "../../services/PollsService";
import {create} from "axios";
import formatDate from "../../components/functions/formatDate";
import {Link} from "react-router-dom";
import {DataContext} from "../../context/DataContext";
import ModalFiles from "../../components/modalwin/ModalFiles";
import Select from "react-select";
import {ModalWin} from "../../components/modalwin/ModalWin";
export default function CmsPage(){
    const [surveys,setSurveys] = useState(null)
    const [activeDeleteM,setActiveDeleteM] = useState(false)
    const [deleteIndex,setDeleteIndex] = useState(0)

    const loadingHandler = async () => {
        try{
            const response = await PollsService.fetchPolls()
            if(response.data){
                setSurveys(response.data)
                console.log(response.data)
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

    const deleteHandler = (index) => {
        setActiveDeleteM(true)
        setDeleteIndex(index)
    }
    function Delete() {
        return(
            <>
                <div className='copy'>
                    <h4>Вы действительно хотели бы удалить опрос номер {deleteIndex +1}</h4>
                    <div className='button'>Да</div>
                </div>
            </>
        )
    }

    useEffect(() => {
        const load = loadingHandler()
        console.log(load)
    },[])

    const rule = 3

    return (
        <>
            <div className="survey-table">
                <div className="table_list_cap"></div>
                <div className="survey-table-header">
                    <div className="column с1">Дата</div>
                    <div className="column с2">Текст опроса</div>
                    <div className="column с3">Удалить</div>
                    <div className="column с4">Редактировать</div>
                </div>
                <div className="survey-table-body">
                    {surveys ? surveys.map((survey, index) => (
                        <div className="survey-row" key={index}>
                            <div className="column с1">{formatDate(survey.createdAt)}</div>
                            <div className="column с2">{survey.title}</div>
                            <div onClick={(e) => deleteHandler(index)} className="column с3"><i className="fa-solid fa-trash"></i></div>
                            <div className="column с4"><i className="fa-solid fa-gear"></i></div>
                        </div>
                    )) : null}
                </div>
                <div className='next'>
                    <Link to='/polls/cms' className='button'>Добавить опрос</Link>
                </div>

                <ModalFiles data={<Delete index={deleteIndex}/>} active={activeDeleteM} setActive={setActiveDeleteM}/>
            </div>
        </>
    )
}
