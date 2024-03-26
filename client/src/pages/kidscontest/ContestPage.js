import {MainHeader} from "../../components/newportal/header/Mainheader";
import {WorkPage} from "../../components/newportal/workpage/WorkPage";
import {Mainnavbar} from "../../components/newportal/navbar/Mainnavbar";
import '../survey/polls.scss'
import './contest.scss'
import ListContest from "./ListContest";
import {useEffect, useState} from "react";

export default function ContestPage(){
    return (
        <div className='new_container'>
            <div className="up_path"><MainHeader /></div>
            <div className="main_path">
                <Mainnavbar />
                <WorkPage data={<ListContest />}/>
            </div>
        </div>
    )
}
