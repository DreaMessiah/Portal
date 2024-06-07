import React from "react";
import Buttons from "../../components/economist/Buttons";

export function Menu(){
    return (
        <div className={`menu`}>
            <Buttons text={'Список и тарифы по транспорту'} icon={`fa-solid fa-car`} url={`/ogmprice`}/>
            <Buttons text={'Список и тарифы рабочим'} icon={'fa-solid fa-person-walking'} url={`/workprice`}/>
            <Buttons text={'Таблица T13'} icon={'fa-solid fa-t'} url={`/t13`}/>
            <Buttons text={'Коэфициэнт трудового участия'} icon={'fa-solid fa-k'} url={`/ktu`}/>
            <Buttons text={'Итоговый табель'} icon={'fa-solid fa-table-list'} url={`/itogtabel`}/>
            <Buttons text={'Все табеля'} icon={'fa-solid fa-toilets-portable'} url={`/alltabels`}/>
            <Buttons text={'Расчетный лист'} icon={'fa-solid fa-file-invoice-dollar'} url={`/loadpayslip`}/>
            <Buttons text={'СРТО'} icon={'fa-solid fa-filter-circle-dollar'} url={`/srto`}/>
        </div>
    )
}
