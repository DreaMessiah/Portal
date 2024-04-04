import {MainHeader} from "../../components/newportal/header/Mainheader";
import {WorkPage} from "../../components/newportal/workpage/WorkPage";
import {Mainnavbar} from "../../components/newportal/navbar/Mainnavbar";

import {useEffect, useState} from "react";
import CreateTask from "./CreateTask";
import CreateTaskGroup from "./CreateTaskGroup";

const pages = 1

export default function TaskRouter(){
    return (
        <div className='new_container'>
            <div className="up_path"><MainHeader /></div>
            <div className="main_path">
                <Mainnavbar />
                {pages === 1 && <WorkPage data={<CreateTask />}/>}
                {pages === 2 && <WorkPage data={<CreateTaskGroup />}/>}
            </div>
        </div>
    )
}
