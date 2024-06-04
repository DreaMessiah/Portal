import React from "react";
import Buttons from "../../components/economist/Buttons";

export default function FixersMenu(){
    return (
        <div className={`menu`}>
            <Buttons text={'Регистрация сотрудников'} icon={`fa-solid fa-users-gear`} url={`/registration`}/>
            <Buttons text={'Фото для пользователей'} icon={`fa-solid fa-camera-retro`} url={`/changeava`}/>
            <Buttons text={'Статистика регистраций и входов'} icon={`fa-solid fa-people-group`} url={`/peoplesstat`}/>
            <Buttons text={'Статистика увольнений'} icon={`fa-solid fa-person-walking-luggage`} url={`/byeanalytics`}/>

        </div>
    )
}
