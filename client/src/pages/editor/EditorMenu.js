import React from "react";
import Buttons from "../../components/economist/Buttons";

export default function EditorMenu(){
    return (
        <div className={`menu`}>
            <Buttons text={'Статистика регистраций и входов'} icon={`fa-solid fa-people-group`} url={`/peoplesstat`}/>
            <Buttons text={'Управление социальными программами'} icon={`fa-solid fa-hand-holding-hand`} url={`/sociality`}/>
            <Buttons text={'Подать заявление'} icon={`fa-regular fa-square-plus`} url={`/createsocial`}/>
            <Buttons text={'Отделы и обьекты'} icon={`fa-solid fa-code-branch`} url={`/userbranchs`}/>
            <Buttons text={'Редактирование структуры компании'} icon={`fa-solid fa-folder-tree`} url={`/cmsstructure`}/>
            <Buttons text={'Управление уведомлениями'} icon={`fa-solid fa-bell`} url={`/cmsnotifications`}/>
            <Buttons text={'Результаты конкурса'} icon={`fa-solid fa-flag-checkered`} url={`/resultscontest`}/>
            <Buttons text={'Статистика по конкурсу'} icon={`fa-solid fa-heart-crack`} url={`/conteststat`}/>
        </div>
    )
}
