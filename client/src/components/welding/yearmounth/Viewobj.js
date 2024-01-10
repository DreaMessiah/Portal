import React,{useState} from "react";
import "./viewobj.scss";
import {Link} from "react-router-dom";

const arr_years = ['2024', '2023'];

const arr_tabel = [
    

    {
        id: 1,
        shifr: '386',
        year: '2024',
        mounth: 'январь',
        inn: '8617014209'
    },

    {
        id: 1,
        shifr: '386',
        year: '2024',
        mounth: 'февраль',
        inn: '8617014209'
    },

    {
        id: 1,
        shifr: '386',
        year: '2023',
        mounth: 'март',
        inn: '8617014209'
    },

    {
        id: 1,
        shifr: '386',
        year: '2023',
        mounth: 'апрель',
        inn: '8617014209'
    },

    {
        id: 1,
        shifr: '386',
        year: '2023',
        mounth: 'май',
        inn: '8617014209'
    },

    {
        id: 1,
        shifr: '386',
        year: '2023',
        mounth: 'июнь',
        inn: '8617014209'
    },

    {
        id: 1,
        shifr: '386',
        year: '2023',
        mounth: 'июль',
        inn: '8617014209'
    },

    {
        id: 1,
        shifr: '386',
        year: '2023',
        mounth: 'август',
        inn: '8617014209'
    },

    {
        id: 1,
        shifr: '386',
        year: '2023',
        mounth: 'сентябрь',
        inn: '8617014209'
    },

    {
        id: 1,
        shifr: '386',
        year: '2023',
        mounth: 'октябрь',
        inn: '8617014209'
    },

    {
        id: 1,
        shifr: '386',
        year: '2023',
        mounth: 'ноябрь',
        inn: '8617014209'
    },

    {
        id: 1,
        shifr: '386',
        year: '2023',
        mounth: 'декабрь',
        inn: '8617014209'
    }


];

let itemMounth = 0;

export const Viewobj = () => {
    return (
        <div className='right-block-ymwelding'>
            <div className='ymwelding_head'>
                <div className='ymwelding_head_btnlast'>Назад к объектам</div>
                <div className='ymwelding_head_nameobj'><span>386</span>        РВСП 20000м3 №3 ЛПДС "Южный Балык". Нефтеюганское УМН. Техническое перевооружение"</div>
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
            <div className='ymwelding_slice'></div>
            {arr_years.map((year,index) => (
            <div key={index} className='ymwelding_years'>
                <div className='ymwelding_years_head'>{year}</div>
                <div className='ymwelding_years_body'>{  arr_tabel.map((mounth,index) => (
                    <div key={index}>
                        {year === mounth.year ?
                        <Link key={index} to={`/tabelwelding`} className='ymwelding_years_body_mounth'>
                            <div className='ymwelding_years_body_mounth_text'>{mounth.mounth}</div>
                            <Link key={index} to={`/tabelwelding/`} className='ymwelding_years_body_mounth_settings'> ... </Link>
                        </Link>
                         : '' }
                    </div>
                        ))}
                </div>
            </div>
            ))
            }
            
        </div>
    )
}