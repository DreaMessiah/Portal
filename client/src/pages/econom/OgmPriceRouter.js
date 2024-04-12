import {MainHeader} from "../../components/newportal/header/Mainheader";
import {WorkPage} from "../../components/newportal/workpage/WorkPage";
import {Mainnavbar} from "../../components/newportal/navbar/Mainnavbar";

import {useEffect, useState} from "react";
import '../newportal/economist/econom.scss'
import WorkPricePage from "./WorkPricePage";
import OgmPricePage from "./OgmPricePage";
import T13Page from "./T13Page";
import KtuPage from "./KtuPage";
import KtuListPage from "./KtuListPage";

export default function OgmPriceRouter({page= 1}){
    return (
        <div className='new_container'>
            <div className="up_path"><MainHeader /></div>
            <div className="main_path">
                <Mainnavbar />
                {page === 1 && <WorkPage data={<OgmPricePage />}/>}
                {page === 2 && <WorkPage data={<WorkPricePage />}/>}
                {page === 3 && <WorkPage data={<T13Page />}/>}
                {page === 4 && <WorkPage data={<KtuPage />}/>}
                {page === 5 && <WorkPage data={<KtuListPage />}/>}
            </div>
        </div>
    )
}
