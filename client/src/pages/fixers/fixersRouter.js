import React,{useEffect, useState} from "react";

import {MainHeader} from "../../components/header/Mainheader";
import {WorkPage} from "../../components/workpage/WorkPage";
import {Mainnavbar} from "../../components/navbar/Mainnavbar";

import '../economist/econom.scss'
import Registration from "./Registration";
import FixersMenu from "./FixersMenu";
import ChangeAva from "./ChangeAvatar";

export default function FixersRouter({page= 1}){
    return (
        <div className='new_container'>
            <div className="up_path"><MainHeader /></div>
            <div className="main_path">
                <Mainnavbar />
                {page === 1 && <WorkPage data={<FixersMenu />}/>}
                {page === 2 && <WorkPage data={<Registration />}/>}
                {page === 3 && <WorkPage data={<ChangeAva />}/>}
            </div>
        </div>
    )
}
