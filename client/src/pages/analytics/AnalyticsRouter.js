import React,{useEffect, useState} from "react";

import {MainHeader} from "../../components/header/Mainheader";
import {WorkPage} from "../../components/workpage/WorkPage";
import {Mainnavbar} from "../../components/navbar/Mainnavbar";

import '../economist/econom.scss'
import AnalyticsMenu from "./AnalyticsMenu";
import HrmAnalyticsPage from "./HrmAnalyticsPage";
import AnalyticsBye from "./AnalyticsBye";
export default function AnalyticsRouter({page= 1}){
    return (
        <div className='new_container'>
            <div className="up_path"><MainHeader /></div>
            <div className="main_path">
                <Mainnavbar />
                {page === 1 && <WorkPage data={<AnalyticsMenu />}/>}
                {page === 2 && <WorkPage data={<HrmAnalyticsPage />}/>}
                {page === 3 && <WorkPage data={<AnalyticsBye />}/>}
            </div>
        </div>

    )
}
