import {MainHeader} from "../../components/header/Mainheader";
import {WorkPage} from "../../components/workpage/WorkPage";
import {Mainnavbar} from "../../components/navbar/Mainnavbar";

import {useEffect, useState} from "react";
import '../economist/econom.scss'
import WorkPricePage from "./WorkPricePage";
import OgmPricePage from "./OgmPricePage";
import T13Page from "./T13Page";
import KtuPage from "./KtuPage";
import KtuListPage from "./KtuListPage";
import LoadPayslip from "./LoadPayslip";

export default function EditorRouter({page= 1}){
    return (
        <div className='new_container'>
            <div className="up_path"><MainHeader /></div>
            <div className="main_path">
                <Mainnavbar />
                {page === 1 && <WorkPage data={<OgmPricePage />}/>}

            </div>
        </div>
    )
}
