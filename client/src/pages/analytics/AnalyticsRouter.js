import React,{useEffect, useState} from "react";

import {MainHeader} from "../../components/header/Mainheader";
import {WorkPage} from "../../components/workpage/WorkPage";
import {Mainnavbar} from "../../components/navbar/Mainnavbar";

import '../economist/econom.scss'
import AnalyticsMenu from "./AnalyticsMenu";
import HrmAnalyticsPage from "./HrmAnalyticsPage";
import AnalyticsBye from "./AnalyticsBye";
import Dashboard from "./Dashboard";
import History from "./History";
import AnalyticsCms from "./AnalyticsCms";
import Survey73 from "./Survey73";

export default function AnalyticsRouter({page= 1}){
    return (
        <div className='new_container'>
            <div className="up_path"><MainHeader /></div>
            <div className="main_path">
                <Mainnavbar />
                {page === 1 && <WorkPage data={<AnalyticsMenu />}/>}
                {page === 2 && <WorkPage data={<HrmAnalyticsPage />}/>}
                {page === 3 && <WorkPage data={<AnalyticsBye />}/>}
                {page === 4 && <WorkPage data={<Dashboard />}/>}
                {page === 5 && <WorkPage data={<History />}/>}
                {page === 6 && <WorkPage data={<AnalyticsCms />}/>}
                {page === 7 && <WorkPage data={<Survey73 />}/>}
            </div>
        </div>

    )
}
