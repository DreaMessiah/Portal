import {MainHeader} from "../../components/header/Mainheader";
import {WorkPage} from "../../components/workpage/WorkPage";
import {Mainnavbar} from "../../components/navbar/Mainnavbar";
import React from "react";
import {NewCrewS} from "../../components/welding/crews/NewCrew";

export function WelSett(){
    return (
        <div className='new_container'>
            <div className="up_path"><MainHeader /></div>
            <div className="main_path">
                <Mainnavbar />
                <WorkPage data={<NewCrewS />}/>
            </div>
        </div>
    )
}