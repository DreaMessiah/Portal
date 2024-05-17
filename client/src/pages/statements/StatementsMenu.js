import React from "react";
import Buttons from "../../components/economist/Buttons";

export default function StatementsMenu(){
    return (
        <div className={`menu`}>
            <Buttons text={'Список заявлений'} icon={`fa-solid fa-rectangle-list`} url={`/statementslist`}/>
            <Buttons text={'Протоколы и приказы'} icon={`fa-solid fa-file-signature`} url={`/protocol`}/>
        </div>
    )
}
