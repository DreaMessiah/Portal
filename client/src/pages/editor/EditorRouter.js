import React,{useEffect, useState} from "react";

import {MainHeader} from "../../components/header/Mainheader";
import {WorkPage} from "../../components/workpage/WorkPage";
import {Mainnavbar} from "../../components/navbar/Mainnavbar";

import '../economist/econom.scss'
import PeoplesStat from "./PeoplesStat";
import BranchUsers from "./BranchUsers";
import EditorMenu from "./EditorMenu";
import Sociality from "./Sociality";
import Createsocial from "./Createsocial";
import CmsStructure from "./CmsStructure";
import CmsNotifications from './CmsNotifications'
import ResultsKidsContest from "../kidscontest/ResultsKidsContest";
export default function EditorRouter({page= 1}){
    return (
        <div className='new_container'>
            <div className="up_path"><MainHeader /></div>
            <div className="main_path">
                <Mainnavbar />
                {page === 1 && <WorkPage data={<EditorMenu />}/>}
                {page === 2 && <WorkPage data={<PeoplesStat />}/>}
                {page === 3 && <WorkPage data={<Sociality />}/>}
                {page === 4 && <WorkPage data={<Createsocial />}/>}
                {page === 5 && <WorkPage data={<BranchUsers />}/>}
                {page === 6 && <WorkPage data={<CmsStructure />}/>}
                {page === 7 && <WorkPage data={<CmsNotifications />}/>}
                {page === 8 && <WorkPage data={<ResultsKidsContest />}/>}
            </div>
        </div>
    )
}
