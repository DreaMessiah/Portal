import {MainHeader} from "../../components/header/Mainheader";
import {WorkPage} from "../../components/workpage/WorkPage";
import {Mainnavbar} from "../../components/navbar/Mainnavbar";
import React from "react";
import {ControllWeldingNew} from "../../components/welding/control/ControllWeldingNew";

export function WelControll(){
    return (
        <div className='new_container'>
            <div className="up_path"><MainHeader /></div>
            <div className="main_path">
                <Mainnavbar />
                <WorkPage data={<ControllWeldingNew />}/>
            </div>
        </div>
    )
}

