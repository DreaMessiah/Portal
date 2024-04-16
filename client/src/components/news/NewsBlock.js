import "./style.scss"
import {Link} from "react-router-dom";
import SurveyPage from "../../pages/survey/SurveyPage";
import {SinglePost} from "./SinglePost";
import React, {useContext, useEffect, useState} from "react";
import PostService from "../../services/PostService";
import {Context} from "../../index";

export const NewsBlock = () => {
    const [blocks,setBlocks] = useState()
    const {store} = useContext(Context)
    const loadingHandler = async () => {
        try{
            const response = await PostService.fetchBlocks()
            if(response.data) setBlocks(response.data)
        }catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        loadingHandler()
    },[])

    const rule = store.user.unit
    return (
        <div className="news_block">
            <div className="news_block_title">
                <div className="news_block_title_name">НОВОСТИ</div>
                <Link to="/alllistnews" className="news_block_title_more">больше новостей</Link>
                {rule === 3 && <>
                    <Link to="/createnews" className="news_block_title_create">СОЗДАТЬ</Link>
                    <Link to="/settingmain" className="news_block_title_create">РЕДАКТИРОВАТЬ</Link>
                </> }
            </div>
            <div className="news_block_list">
                {blocks && blocks.map( (item,index) => (
                    <React.Fragment key={index}>
                        {item.type ===1 ?
                            <SinglePost id={item.block_id}/>
                            :
                            <div className="news_block_list_box">
                                <SurveyPage flag={true} id={item.block_id}/>
                            </div>
                        }
                    </React.Fragment>
                ))}
            </div>
        </div>
    )
}