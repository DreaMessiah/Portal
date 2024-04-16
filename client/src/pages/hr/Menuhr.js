import React from "react";
import Buttons from "../../components/economist/Buttons";

export function Menuhr(){
    return (
        <div className={`menu`}>
            <Buttons text={'Добавить сотрудника'} icon={`fa-solid fa-person-circle-plus`} url={`/gpkh`}/>
        </div>
    )
}
