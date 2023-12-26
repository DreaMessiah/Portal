import {Link} from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.css';
import {useEffect, useState} from "react";


export default function selectmonth({selectedMonth,onRightClick,onLeftClick}) { // получается массив обьектов
    const months = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь']

    return (
        <div className='selectmonth'>
            <div onClick={onLeftClick} className='icon l'><i className="fa-solid fa-caret-left"></i></div>
            <div className='select'><p>{months[selectedMonth-1]} 2023</p></div>
            <div onClick={onRightClick} className='icon r'><i className="fa-solid fa-caret-right"></i></div>
        </div>
    )
}