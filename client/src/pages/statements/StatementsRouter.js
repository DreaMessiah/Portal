import React,{useEffect, useState} from "react";

import {MainHeader} from "../../components/header/Mainheader";
import {WorkPage} from "../../components/workpage/WorkPage";
import {Mainnavbar} from "../../components/navbar/Mainnavbar";

import '../economist/econom.scss'
import StatementsMenu from "./StatementsMenu";
import StatementsList from "./StatementsList";
import StatementsProtocols from "./StatementsProtocols";

export default function StatementsRouter({page= 1}){
    return (
        <div className='new_container'>
            <div className="up_path"><MainHeader /></div>
            <div className="main_path">
                <Mainnavbar />
                {page === 1 && <WorkPage data={<StatementsMenu />}/>}
                {page === 2 && <WorkPage data={<StatementsList />}/>}
                {page === 3 && <WorkPage data={<StatementsProtocols />}/>}
            </div>
        </div>
    )
}
