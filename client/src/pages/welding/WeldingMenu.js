import React from "react";
import Buttons from "../../components/economist/Buttons";

export function WeldingMenu(){
    return (
        <div className={`menu`}>
            <Buttons text={'Список Звеньв и Бригад'} icon={`fa-solid fa-people-group`} url={`/weldingsett`}/>
            <Buttons text={'Загрузка видов работ'} icon={'fa-solid fa-person-digging'} url={`/weldingloadtypes`}/>
        </div>
    )
}
