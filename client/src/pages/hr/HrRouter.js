import {MainHeader} from "../../components/header/Mainheader";
import {WorkPage} from "../../components/workpage/WorkPage";
import {Mainnavbar} from "../../components/navbar/Mainnavbar";

import {useEffect, useState} from "react";
import '../economist/econom.scss'
import NewPersonHR from "./NewPersonHR";

export default function HrRouter({page= 1}){
    return (
        <div className='new_container'>
            <div className="up_path"><MainHeader /></div>
            <div className="main_path">
                <Mainnavbar />
                {page === 1 && <WorkPage data={<NewPersonHR />}/>}
            </div>
        </div>
    )
}
