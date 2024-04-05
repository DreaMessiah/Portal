import {MainHeader} from "../../components/newportal/header/Mainheader";
import {WorkPage} from "../../components/newportal/workpage/WorkPage";
import {Mainnavbar} from "../../components/newportal/navbar/Mainnavbar";

import {useEffect, useState} from "react";
import CreateTask from "./CreateTask";
import CreateTaskGroup from "./CreateTaskGroup";
import TaskList from "./TackList";


export default function TaskRouter({page= 1}){
    console.log(page)
    return (
        <div className='new_container'>
            <div className="up_path"><MainHeader /></div>
            <div className="main_path">
                <Mainnavbar />
                {page === 1 && <WorkPage data={<CreateTask />}/>}
                {page === 2 && <WorkPage data={<CreateTaskGroup />}/>}
                {page === 3 && <WorkPage data={<TaskList />}/>}
            </div>
        </div>
    )
}
