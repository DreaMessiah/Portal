import React,{useState} from "react";
import SearchObj from "../../SearchObj";
import ChangeObj from "../../ChangeObj";
import WrapButtonsObj from "../../WrapButtonsObj";
import "./viewobj.scss";

const wrap_buttons = [
    {
        text:'Добавить объект',
        icon:'fa-regular fa-plus'
    }
]

const objs = [
    {
        id:5,
        name:'390',
        description:'"Участок магистрального нефтепровода "Нижневартовск-Курган-Куйбышев" 284км. - 332км. Ду1200. Замена трубы на ППМТ 294км. р.М.Балык (пойма/русло). Нефтеюганское УМН. Реконструкция"',
        dateinto: '16-04-2024'
    },
    {
        id:5,
        name:'391',
        description:'Участок магистрального нефтепровода "Сургут-Полоцк" 76 км-137 км. Замена трубы на участке 87-100км. DN1200. Нефтеюганское УМН. Реконструкция',
        dateinto: '17-04-2024'
    },
    {
        id:5,
        name:'392',
        description:'"Участок магистрального нефтепровода "Усть-Балык-Нижневартовск" 276км. Пр.Б.Юганская (пойма/русло). Реконструкция"',
        dateinto: '20-04-2024'
    },
    {
        id:5,
        name:'393',
        description:'"Участок магистрального нефтепровода "Усть-Балык-Нижневартовск" 233км-280км. Нефтеюганское УМН."',
        dateinto: '14-04-2024'
    },
    {
        id:5,
        name:'394',
        description:'Нижневартовск" 233км-280км. Нефтеюганское УМН.""Основная нитка, Ду1020. Замена трубы на ППМН, 233км р.Обь(пойма)',
        dateinto: '22-04-2024'
    },
    {
        id:5,
        name:'395',
        description:'"Участок магистрального нефтепровода "Усть-Балык-Нижневартовск" 219км-233км. Сургутское УМН."',
        dateinto: '25-04-2024'
    },
    {
        id:5,
        name:'396',
        description:'РВСП 20000 м3 №4 НПС "Холмогоры". Ноябрьское УМН. Техническое перевооружение',
        dateinto: '24-04-2024'
    }
]

export const Viewobj = () => {
    return (
        <div className='right-block-objwelding'>
            <div className='top-box'>
                <div className='left-box'>
                    <WrapButtonsObj mass={wrap_buttons}/>
                    <SearchObj/>
                </div>
                <div className='right-box'>
                    <ChangeObj/>
                </div>
            </div>
            <div className='next-box'>
            </div>
        </div>
    )
}