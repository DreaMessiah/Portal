import {MainHeader} from "../../components/header/Mainheader";
import {WorkPage} from "../../components/workpage/WorkPage";
import {Mainnavbar} from "../../components/navbar/Mainnavbar";
import React from "react";
import {TabelformNew} from "../../components/welding/tabelwelding/TabelformNew";

export function WelTabel(){
    return (
        <div className='new_container'>
            <div className="up_path"><MainHeader /></div>
            <div className="main_path">
                <Mainnavbar />
                <WorkPage data={<TabelformNew  />}/>
            </div>
        </div>
    )
}