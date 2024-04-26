import React from "react";
import Buttons from "../../components/economist/Buttons";

export default function EditorMenu(){
    return (
        <div className={`menu`}>
            <Buttons text={'Статистика регистраций и входов'} icon={`fa-solid fa-people-group`} url={`/peoplesstat`}/>
        </div>
    )
}
