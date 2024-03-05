import React, {useContext, useEffect, useState} from "react";
import {DataContext} from "../../context/DataContext";
import "../../components/listtasks/listtask3.scss";
import FileManager from "./fileManager";
import {MainHeader} from "../../components/newportal/header/Mainheader";
import {Mainnavbar} from "../../components/newportal/navbar/Mainnavbar";
import {WorkPage} from "../../components/newportal/workpage/WorkPage";

function FileManagerPage(){
    return(
        <div className='new_container'>
            <div className="up_path"><MainHeader /></div>
            <div className="main_path">
                <Mainnavbar />
                <WorkPage data={<FileManager />}/>
            </div>
        </div>
    )
}
export default FileManagerPage