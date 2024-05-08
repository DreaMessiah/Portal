import React from "react";
import Buttons from "../../components/economist/Buttons";

export default function EditorMenu(){
    return (
        <div className={`menu`}>
            <Buttons text={'Статистика регистраций и входов'} icon={`fa-solid fa-people-group`} url={`/peoplesstat`}/>
            <Buttons text={'Управление социальными программами'} icon={`fa-solid fa-hand-holding-hand`} url={`/sociality`}/>
            <Buttons text={'Подать заявление'} icon={`fa-regular fa-square-plus`} url={`/createsocial`}/>
            <Buttons text={'Отделы и обьекты'} icon={`fa-solid fa-code-branch`} url={`/userbranchs`}/>
        </div>
    )
}
