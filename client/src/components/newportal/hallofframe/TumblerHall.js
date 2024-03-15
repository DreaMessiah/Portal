import {Link} from "react-router-dom";
import ObjsService from "../../../services/ObjsService";
import {useContext, useEffect, useState} from "react";
import {Context} from "../../../index";
import React from "react";

export const TumblerHall = () => {

    const [listMans, setListMans] = useState([])

    const months = [
        'январь', 'февраль', 'март', 'апрель', 'май', 'июнь',
        'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'
    ];
    const  {store} = useContext(Context)
    const inn = store.user.inn

    const currentDate = new Date();
    const year = currentDate.getFullYear() + '';
    console.log(year)
    const currentMonth = currentDate.getMonth(); // Получаем номер текущего месяца
    const month = months[currentMonth];
    console.log(month)
    const t13List = async (e) => {
        try {
            const listMans = await ObjsService.getT13({inn, month, year})
            setListMans(listMans.data)
            console.log(listMans.data)
        } catch {
            alert('ебобо скрипт проверь')
        }
    }

    useEffect(() => {
        t13List()
    }, [])

    return (
        <div className="hall_edit">
            <div className="hall_edit_tumbler">
                <div className="tabwelding_header_newcrewblock">
                    <select className="tabwelding_header_newcrewblock_select">
                        {/*<select className="tabwelding_header_newcrewblock_select" onChange={handleSelect}>*/}
                        <option></option>
                        {listMans.map((man, index) => {return(
                            <option key={index} value={man.tn}>{man.name} | {man.developer}</option>
                        )})}
                    </select>
                    <div className="tabwelding_header_newcrewblock_plusbtn">Добавить сотрудника</div>
                    {/*<div className="tabwelding_header_newcrewblock_plusbtn" onClick={() => setCrew(!crew)}>Добавить звено</div>*/}
                </div>
                <select className="hall_edit_tumbler_itr">
                    <option></option>
                    <option>Рабочие</option>
                    <option>ИТР</option>
                </select>
            </div>
            <div className="hall_edit_visual"></div>
        </div>
    )
}