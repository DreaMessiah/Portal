import React from "react";
import Buttons from "../../components/economist/Buttons";

export default function AnalyticsMenu(){
    return (
        <div className={`menu`}>
            <Buttons text={'Опрос отдела кадров'} icon={`fa-solid fa-users-viewfinder`} url={`/hrmanalytics`}/>
            <Buttons text={'Статистика увольнений'} icon={`fa-solid fa-person-walking-luggage`} url={`/byeanalytics`}/>
            <Buttons text={'Dashboard'} icon={`fa-solid fa-chart-simple`} url={`/dashboard`}/>
        </div>
    )
}
