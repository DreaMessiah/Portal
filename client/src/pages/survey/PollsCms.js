import {MainHeader} from "../../components/header/Mainheader";
import {WorkPage} from "../../components/workpage/WorkPage";
import {Mainnavbar} from "../../components/navbar/Mainnavbar";
import SettingPage from "./SettingPage";
import {useLocation} from "react-router-dom";
import './polls.scss'
import CmsPage from "./CmsPage";
import PollsService from "../../services/PollsService";

import React,{useContext, useEffect, useState} from "react";
import {Context} from "../../index";


export default function PollsCms(){
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search)
    const getSurvey = searchParams.get('survey') ? searchParams.get('survey') : 0
    const {store} = useContext(Context)
    const rule = store.user.unit

    function updateQueryStringParameter(key, value) {
        const { protocol, host, pathname, search, hash } = window.location;
        const queryParams = new URLSearchParams(search);
        queryParams.set(key, value);
        const newUrl = `${protocol}//${host}${pathname}?${queryParams}${hash}`;
        window.history.pushState({ path: newUrl }, '', newUrl);
    }

    const checkExist = async () => {
        try {
            const response = await PollsService.checkExist(getSurvey)
            if(!response.data.exist){
                updateQueryStringParameter('survey','new')
            }
        }catch (e) {
            updateQueryStringParameter('survey','new')
            console.log('Ошибка проверки')
        }
    }
    useEffect(() => {
        if(getSurvey && getSurvey !== 'new' && !isNaN(+getSurvey) ){
            checkExist()
        }
    },[getSurvey])


    return (
        <div className='new_container'>
            <div className="up_path"><MainHeader /></div>
            <div className="main_path">
                <Mainnavbar />
                { (rule === 99 || store.user.account==='superadmin') ?
                <>
                    {!getSurvey ? <WorkPage data={<CmsPage />}/> : <WorkPage data={<SettingPage idd={getSurvey}/>}/>}
                </>
                :
                    <div style={{marginLeft:'270px',marginTop:'20px'}}>Доступ к данному ресурсу запрещен</div>
                }
            </div>
        </div>
    )
}
