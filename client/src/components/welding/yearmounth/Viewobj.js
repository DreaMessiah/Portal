import React,{useState} from "react";
import "./viewobj.scss";

export const Viewobj = () => {
    return (
        <div className='right-block-ymwelding'>
            <div className='ymwelding_head'>
                <div className='ymwelding_head_btnlast'>Назад к объектам</div>
                <div className='ymwelding_head_nameobj'>386        РВСП 20000м3 №3 ЛПДС "Южный Балык". Нефтеюганское УМН. Техническое перевооружение"</div>
                <div className='ymwelding_head_passobj'>Передать</div>
            </div>
            <div className='ymwelding_controller'>
                <div className='ymwelding_controller_ym'>
                    <select className='ymwelding_controller_ym_select'>
                        <option>январь</option>
                        <option>февраль</option>
                    </select>
                    <select className='ymwelding_controller_ym_select'>
                        <option>2023</option>
                        <option>2024</option>
                    </select>
                    <div className='ymwelding_controller_ym_pluss'>Создать</div>
                </div>
                <div className='ymwelding_controller_sistembtns'>
                    <div className='ymwelding_controller_sistembtns_crews'>Звенья / Бригады</div>
                    <div className='ymwelding_controller_sistembtns_itogs'>Отчеты</div>
                    <div className='ymwelding_controller_sistembtns_viewsjob'>Виды работ</div>
                </div>
            </div>
            <div className='ymwelding_years'>
                <div className='ymwelding_years_head'>2024</div>
                <div className='ymwelding_years_body'>
                    <div className='ymwelding_years_body_mounth'>
                        <div className='ymwelding_years_body_mounth_text'>январь</div>
                        <div className='ymwelding_years_body_mounth_settings'> ... </div>
                    </div>
                </div>
            </div>
        </div>
    )
}