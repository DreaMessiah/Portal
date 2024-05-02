import React from "react";
import Buttons from "../../components/economist/Buttons";

export default function EditorMenu(){
    return (
        <div className={`menu`}>
            <Buttons text={'Статистика регистраций и входов'} icon={`fa-solid fa-people-group`} url={`/peoplesstat`}/>
            <Buttons text={'Управление социальными программами'} icon={`fa-solid fa-hand-holding-hand`} url={`/sociality`}/>
        </div>
    )
}
