import "./style.scss"
import {Link} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import PostService from "../../services/PostService";
import formatDate from "../functions/formatDate";
import shortenText from "../functions/shortenText";
import ModalFiles from "../modalwin/ModalFiles";

import PollsService from "../../services/PollsService";
import {useMessage} from "../../hooks/message.hook";
import {Context} from "../../index";

export const SettingPost = () => {
    const [posts,setPosts] = useState([])
    const {store} = useContext(Context)
    const [activeDeleteM,setActiveDeleteM] = useState(false)
    const [deleteIndex,setDeleteIndex] = useState(-1)
    const message = useMessage()
    const loadingHandler = async () => {
        try{
            const response = await PostService.fetch()
            if(response.data){
                setPosts(response.data)
            }
        }catch (e) {
            console.log(e?.message)
        }
    }
    useEffect(() => {
        loadingHandler()
    },[])

    const deleteHandler = (index) => {
        setActiveDeleteM(true)
        setDeleteIndex(index)
    }
    function Delete() {
        const removeHandler = async () => {
            try{
                if(deleteIndex >= 0){
                    const response = await PostService.removePost(posts[deleteIndex].id)
                    if(response.data){
                        message('Новость удалена')
                        const newArray = [...posts.slice(0, deleteIndex), ...posts.slice(deleteIndex + 1)];
                        setPosts(newArray);
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
    const rule = store.user.unit
    return (
        <>
        {(rule === 99 || store.user.account==='superadmin') ?
            <>
                <div className='cms-head'>
                    <Link to='/alllistnews' style={{marginBottom:'30px'}} className='back-button'><i className="fa-solid fa-arrow-left"></i>Назад</Link>
                    <h5>Здесь Вы можете создавать и редактировать новости</h5>
                </div>
                <div className="survey-table">
                    <div className="table_list_cap"></div>
                    <div className="survey-table-header">
                        <div className="column с1">Дата</div>
                        <div className="column с2">Текст опроса</div>
                        <div className="column с3">Удалить</div>
                        <div className="column с4">Редактировать</div>
                    </div>
                    <div className="survey-table-body">
                        {posts ? posts.map((item, index) => (
                            <div className="survey-row" key={index}>
                                <div className="column с1">{formatDate(item.createdAt)}</div>
                                <div className="column с2">{item.title}</div>
                                <div onClick={(e) => deleteHandler(index)} className="column с3"><i className="fa-solid fa-trash"></i></div>
                                <Link to={`/createnews?post=${item.id}`} className="column с4"><i className="fa-solid fa-gear"></i></Link>
                            </div>
                        )) : null}
                    </div>
                    <div className='next'>
                        <Link to='/createnews' className='button'>Добавить новость</Link>
                    </div>

                    <ModalFiles data={<Delete index={deleteIndex}/>} active={activeDeleteM} setActive={setActiveDeleteM}/>
                </div>
            </>
            :
            <div>У Вас нет прав на просмотр данного ресурса</div>
        }
        </>
    )
}
