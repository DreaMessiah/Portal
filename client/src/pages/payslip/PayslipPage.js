import './payslip.scss'
import React, {useState, useEffect, useContext} from 'react';
import NewsNavbar from "../../components/NewsNavbar"
import {Link,useLocation} from "react-router-dom";
import NewsFooter from "../../components/NewsFooter";
import Select from 'react-select'
import {DataContext} from "../../context/DataContext";


export const PayslipPage = () => {
    const addLeadingZero = (number) => (number < 10 ? '0' : '') + number;

    const {getMonthName,optionsMonth} = useContext(DataContext)

    const getNowMonthName = () => {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth()

        return getMonthName(currentMonth)
    }
    const getNowMonthNum = () => {
        const currentDate = new Date();
        return currentDate.getMonth()
    }

    const mandays = {
        1: 0,
        2: 1,
        3: 0,
        4: 0,
        5: 1,
        6: 1,
        7: 1,
        8: 0,
        9: 1,
        10: 0,
        11: 0,
        12: 0,
        13: 1,
        14: 1,
        15: 1,
        16: 1,
        17: 1,
        18: 1,
        19: 1,
        20: 1,
        21: 1,
        22: 1,
        23: 1,
        24: 1,
        25: 1,
        26: 1,
        27: 1,
        28: 1,
        29: 1,
        30: 1,
        31: 1,
    }

    const toBack = () => {
        window.history.back()
    }

    const optionsYear = [
        { value: '1', label: '2023' },
        { value: '2', label: '2024' },
        { value: '3', label: '2025' }
    ]

    const fullDaysArray = [];
    function getSixWeeksArray() {
        const today = new Date();
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const firstDayOfWeek = firstDayOfMonth.getDay(); // 0 - воскресенье, 1 - понедельник, и так далее
        const startDay = new Date(today.getFullYear(), today.getMonth(), 0);
        while (startDay.getDay() !== 1) {
            startDay.setDate(startDay.getDate() - 1);
        }

        const daysArray = [];
        for (let i = 0; i < 6 * 7; i++) {
            const currentDay = new Date(startDay.getFullYear(), startDay.getMonth(), startDay.getDate() + i);
            fullDaysArray.push(`${addLeadingZero(currentDay.getDate())}.${addLeadingZero(currentDay.getMonth() + 1)}.${currentDay.getFullYear()}`)
            daysArray.push(currentDay.getDate());
        }
        return daysArray;
    }
    function getCurrentMouth(){
        const today = new Date();
        const monthName = getNowMonthName();
        const year = today.getFullYear();
        return `${monthName} ${year}`;
    }
    function getToday() {
        const today = new Date();
        const day = today.getDate();
        const month = today.getMonth() + 1; // Прибавляем 1, так как месяцы начинаются с 0
        const year = today.getFullYear();
        return `${day < 10 ? '0' : ''}${day}.${month < 10 ? '0' : ''}${month}.${year}`
    }

    const resultArray = getSixWeeksArray();
    let classname = []

    fullDaysArray.map( function (item,index){
        if(item === getToday()){
            classname[index] = 'today'
        }else{
            classname[index] = 'hov'
        }
    })

    const monthNow = getNowMonthNum()
    let startItem = false
    let styleee = `dayview0`
    return (
        <div className='thispage'>
            <div className='newspage'>
                <div className='main_path'>
                    <NewsNavbar/>
                    <div className='new_back'>
                        <div className='info_news'>
                            <div className='info between min300'>
                                <Link className='toback' onClick={()=>toBack()}>НАЗАД</Link>
                                <div className="select_block">
                                    <div className="select_block_title">МЕСЯЦ</div>
                                    <Select className='select' defaultValue={optionsMonth[monthNow]} options={optionsMonth}/>
                                </div>

                                <div className="select_block">
                                    <div className="select_block_title">ГОД</div>
                                    <Select className='select' defaultValue={optionsYear[1]} options={optionsYear}/>
                                </div>
                            </div>
                            {/*<div className='polosa'></div>*/}
                            <div className='info min300'>
                                <p>ФИО: Барахтянский Владимир Алексеевич</p>
                                <p>Должность: Разрабочик ПО</p>
                                <p>Подразделение: Отдел управления инновационной деятельностью</p>
                                <p>Внутренний телефон: 116</p>
                                <p>Стаж работы: 2 года 5 месяцев</p>
                            </div>
                        </div>
                        <div className='info_news'>
                            <div className='size_calendar'>
                                <div className="calendar_content_payslip">
                                    <h4>{getCurrentMouth()}</h4>
                                    <div className='dates'>
                                        {
                                            resultArray.map( (item,index) => {
                                                if(item === 1){
                                                    startItem = !startItem
                                                }
                                                startItem ? styleee = `dayview${mandays[item]}` : styleee = `dayview0`
                                                return (
                                                <div key={index} className={classname[index]+' '+ styleee}><p>{item}</p></div>
                                        )})}
                                    </div>
                                </div>
                                <div className='itogy_days'>
                                    <div className='itogy_days_title'>Итого отработано:</div>
                                    <div className='itogy_days_total'>21 дней</div>
                                </div>

                                <div className="ktu">
                                    <div className="ktu_line"></div>
                                    <div className="ktu_title">КТУ</div>
                                    <div className="ktu_result">0,8</div>
                                    <div className="ktu_description">Пронос алкосодержащих веществ на территоррию базы</div>
                                </div>

                                <div className="ktu">
                                    <div className="ktu_line"></div>
                                    <div className="ktu_title">КТУ</div>
                                    <div className="ktu_result">1,3</div>
                                    <div className="ktu_description">Доплата за совмещение Главного бухгалтера</div>
                                </div>

                            </div>
                            {/*<div className='polosa'></div>*/}

                            <div className='info between'>
                                <div className='payslip_right'>
                                    <p>ФИО: Барахтянский Владимир Алексеевич</p>
                                    <p>Должность: Разрабочик ПО</p>
                                    <p>Подразделение: Отдел управления инновационной деятельностью</p>
                                    <p>Внутренний телефон: 116</p>
                                    <p>Стаж работы: 2 года 5 месяцев</p>
                                </div>

                            </div>

                        </div>
                        <div className='rows_news'>

                        </div>
                    </div>
                </div>


            </div>
            <NewsFooter/>
            <div className='backimg'>
                <div className='backcol'></div>
            </div>
        </div>
    )
}