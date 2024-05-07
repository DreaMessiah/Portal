import React,{useEffect, useState} from "react";

import {MainHeader} from "../../components/header/Mainheader";
import {WorkPage} from "../../components/workpage/WorkPage";
import {Mainnavbar} from "../../components/navbar/Mainnavbar";

import '../economist/econom.scss'
import PeoplesStat from "./PeoplesStat";
import BranchUsers from "./BranchUsers";
import EditorMenu from "./EditorMenu";

export default function EditorRouter({page= 1}){
    return (
        <div className='new_container'>
            <div className="up_path"><MainHeader /></div>
            <div className="main_path">
                <Mainnavbar />
                {page === 1 && <WorkPage data={<EditorMenu />}/>}
                {page === 2 && <WorkPage data={<PeoplesStat />}/>}
                {page === 3 && <WorkPage data={<BranchUsers />}/>}
            </div>
        </div>
    )
}