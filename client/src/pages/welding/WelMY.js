import {MainHeader} from "../../components/header/Mainheader";
import {WorkPage} from "../../components/workpage/WorkPage";
import {Mainnavbar} from "../../components/navbar/Mainnavbar";
import React from "react";
import {WelThisObj} from "../../components/welding/yearmounth/WelThisObj";

export function WelMY(){
    return (
        <div className='new_container'>
            <div className="up_path"><MainHeader /></div>
            <div className="main_path">
                <Mainnavbar />
                <WorkPage data={<WelThisObj />}/>
            </div>
        </div>
    )
}