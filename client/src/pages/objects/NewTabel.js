import {MainHeader} from "../../components/header/Mainheader";
import {WorkPage} from "../../components/workpage/WorkPage";
import {Mainnavbar} from "../../components/navbar/Mainnavbar";
import {useContext} from "react";
import {DataContext} from "../../context/DataContext";
import React from "react";
import {TimeSheep} from "../../../components/tabletabel/TimeSheep";

export default function NewTabel(){
    return (
        <div className='new_container'>
            <div className="up_path"><MainHeader /></div>
            <div className="main_path">
                <Mainnavbar />
                <WorkPage data={<TimeSheep />}/>
            </div>
        </div>
    )
}
