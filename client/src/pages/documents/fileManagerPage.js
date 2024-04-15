import React, {useContext, useEffect, useState} from "react";
import {DataContext} from "../../context/DataContext";
import "../../components/OldComponents/listtasks/listtask3.scss";
import FileManager from "./fileManager";
import {MainHeader} from "../../components/header/Mainheader";
import {Mainnavbar} from "../../components/navbar/Mainnavbar";
import {WorkPage} from "../../components/workpage/WorkPage";

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