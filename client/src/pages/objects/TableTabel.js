import {MainHeader} from "../../components/header/Mainheader";
import {WorkPage} from "../../components/workpage/WorkPage";
import {Mainnavbar} from "../../components/navbar/Mainnavbar";
import React from "react";
import {TimeSheepPortal} from "../../components/tabletabel/TimeSheep";

export function ThisTableTabel(){
    return (
        <div className='new_container'>
            <div className="up_path"><MainHeader /></div>
            <div className="main_path">
                <Mainnavbar />
                <WorkPage data={<TimeSheepPortal />}/>
            </div>
        </div>
    )
}

