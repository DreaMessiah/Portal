import React,{useContext, useEffect, useState} from "react";
import PollsService from "../../services/PollsService";
import {create} from "axios";
import formatDate from "../../components/functions/formatDate";
import {Link} from "react-router-dom";
import {DataContext} from "../../context/DataContext";
import ModalFiles from "../../components/modalwin/ModalFiles";
import {useMessage} from "../../hooks/message.hook";

export default function CmsPage(){
    const [surveys,setSurveys] = useState(null)
    const [activeDeleteM,setActiveDeleteM] = useState(false)
    const [deleteIndex,setDeleteIndex] = useState(0)
    const message = useMessage()

    const loadingHandler = async () => {
        try{
            const response = await PollsService.fetchPolls()
            console.log(response.data)
            if(response.data){
                setSurveys(response.data)
            }
        }catch (e){
            console.log(e.message+': Проблема загрузки списка опросов')
        }
    }

    const deleteHandler = (index) => {
        setActiveDeleteM(true)
        setDeleteIndex(index)
    }
    function Delete() {
        const removeHandler = async () => {
            try{
                if(deleteIndex >= 0){
                    const response = await PollsService.removeSurvey(surveys[deleteIndex].id)
                    if(response.data){
                        console.log(response.data)
                        message('Опрос удалён')
                        const newArray = [...surveys.slice(0, deleteIndex), ...surveys.slice(deleteIndex + 1)];
                        setSurveys(newArray);
                        exitDeleteHandler()
                    }
                }

            }catch (e){
                console.log(e.message+': Проблема удаления опроса')
            }
        }
        const exitDeleteHandler = () => {
            setActiveDeleteM(false)
            setDeleteIndex(-1)
        }
        return(
            <>
                <div className='copy'>
                    <h4>Вы действительно хотели бы удалить опрос номер {deleteIndex +1}</h4>
                    <div className='buttons'>
                        <div onClick={() => removeHandler()} className='button da'>Да</div>
                        <div onClick={() => exitDeleteHandler()} className='button'>Нет</div>
                    </div>
                </div>
            </>
        )
    }

    useEffect(() => {
        const load = loadingHandler()

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
                            <Link to={!survey.answers ? `/polls/cms?survey=${surveys[index].id}` : null} className="column с4"><i style={survey.answers ? {color:'#999'}:null} className="fa-solid fa-gear"></i></Link>
                        </div>
                    )) : null}
                </div>
                <div className='next'>
                    <Link to='/polls/cms?survey=new' className='button'>Добавить опрос</Link>
                </div>

                <ModalFiles data={<Delete index={deleteIndex}/>} active={activeDeleteM} setActive={setActiveDeleteM}/>
            </div>
        </>
    )
}
