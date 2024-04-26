import React,{useEffect, useState} from "react";

import {MainHeader} from "../../components/header/Mainheader";
import {WorkPage} from "../../components/workpage/WorkPage";
import {Mainnavbar} from "../../components/navbar/Mainnavbar";
import {WeldingMenu} from "./WeldingMenu";

import WeldingLoadTypes from "./WeldingLoadTypes";
import {NewCrewS} from "../../components/welding/crews/NewCrew";

export default function WeldingRouter({page= 1}){
    return (
        <div className='new_container'>
            <div className="up_path"><MainHeader /></div>
            <div className="main_path">
                <Mainnavbar />
                {page === 1 && <WorkPage data={<WeldingMenu />}/>}
                {page === 2 && <WorkPage data={<NewCrewS />}/>}
                {page === 3 && <WorkPage data={<WeldingLoadTypes />}/>}
            </div>
        </div>
    )
}
