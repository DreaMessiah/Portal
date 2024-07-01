import React from "react";
import Buttons from "../../components/economist/Buttons";

export default function AnalyticsMenu(){
    return (
        <div className={`menu`}>
            <Buttons text={'Опрос отдела кадров'} icon={`fa-solid fa-users-viewfinder`} url={`/hrmanalytics`}/>
            <Buttons text={'Статистика увольнений'} icon={`fa-solid fa-person-walking-luggage`} url={`/byeanalytics`}/>
            <Buttons text={'Графики активности'} icon={`fa-solid fa-chart-simple`} url={`/dashboard`}/>
            <Buttons text={'История'} icon={`fa-solid fa-book-atlas`} url={`/history`}/>
            <Buttons text={'Настройки'} icon={`fa-solid fa-gear`} url={`/analyticscms`}/>
            <Buttons text={'Опросы'} icon={`fa-solid fa-headset`} url={`/analyticsopenai`}/>
        </div>
    )
}
