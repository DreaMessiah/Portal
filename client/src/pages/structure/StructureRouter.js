import {MainHeader} from "../../components/header/Mainheader";
import {WorkPage} from "../../components/workpage/WorkPage";
import {Mainnavbar} from "../../components/navbar/Mainnavbar";

import {useEffect, useState} from "react";
import StructurePage from "./StructurePage";

const pages = 1

export default function StructureRouter(){
    return (
        <div className='new_container'>
            <div className="up_path"><MainHeader /></div>
            <div className="main_path">
                <Mainnavbar />
                {pages === 1 && <WorkPage data={<StructurePage />}/>}

            </div>
        </div>
    )
}
