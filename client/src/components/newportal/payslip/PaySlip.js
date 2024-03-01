import './payslip.scss'
import React, {useState, useEffect, useContext} from 'react';
import {Link,useLocation} from "react-router-dom";
import Select from 'react-select'
import {DataContext} from "../../../context/DataContext";
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
import PayslipService from "../../../services/PayslipService";

function PayslipPage () {
    const {store} = useContext(Context)
    const {getMonthName,optionsMonth} = useContext(DataContext)

    const addLeadingZero = (number) => (number < 10 ? '0' : '') + number;
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
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0,
        10: 0,
        11: 0,
        12: 0,
        13: 0,
        14: 0,
        15: 0,
        16: 0,
        17: 0,
        18: 0,
        19: 0,
        20: 0,
        21: 0,
        22: 0,
        23: 0,
        24: 0,
        25: 0,
        26: 0,
        27: 0,
        28: 0,
        29: 0,
        30: 0,
        31: 0
    }

    const toBack = () => {
        window.history.back()
    }

    const optionsYear = [
        { value: '0', label: '2022' },
        { value: '1', label: '2023' },
        { value: '2', label: '2024' }
    ]

    const fullDaysArray = [];
    function getSixWeeksArray(year=2024,month=1) {
        const today = new Date(year,month,1);
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
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        return `${day < 10 ? '0' : ''}${day}.${month < 10 ? '0' : ''}${month}.${year}`
    }

    const monthNow = getNowMonthNum()
    let startItem = false
    let styleee = `dayview0`

    const [monthState,setMonthState] = useState(optionsMonth[monthNow])
    const [yearState,setYearState] = useState(optionsYear[2])
    const [daysState,setDaysState] = useState(mandays)
    const [info,setInfo] = useState([])
    const [actual,setActual] = useState(false)
    const [calendar,setCalendar] = useState(getSixWeeksArray())
    const [daysNum,setDaysNum] = useState(0)
    const [ktus,setKtus] = useState([])
    const loading = async () => {
        try {
            const promise = await PayslipService.getPayslipData(store.user.tn,monthState.label,yearState.label)
            setDaysState(promise.data.days)
            setKtus(promise.data.ktu)
            if(promise.data.info[0].cost) setInfo(promise.data.info)
            else{
                setInfo([])
                setActual(false)
            }
            if(info.length) setActual(true)
        }catch (e) {
            setInfo([])
            setDaysState(mandays)
            setActual(false)
            console.log(e?.message)
        }
    }
    const handlePrevMonth = async () => {
        setMonthState(optionsMonth[monthNow-1])
        setYearState(optionsYear[2])
    }
    useEffect(() => {
        const promise = loading()
        setCalendar(getSixWeeksArray(+yearState.label,monthState.value))
    },[monthState,yearState])

    useEffect(() => {
        if (info.length) setActual(true);
        else setActual(false);
    }, [info]);
    useEffect(()=> {
        if(daysState) {
            let int = 0
            Object.keys(daysState).map(key => {
                if(daysState[key] === 1) int++
            })
            setDaysNum(int)
        }else{
            setDaysNum(0)
        }
    },[daysState])
    return (
        <div className='new_back'>
            <div className='info_news'>
                <div className='info between min300'>
                    <Link className='toback' onClick={()=>toBack()}>НАЗАД</Link>
                    <div className="select_block">
                        <div className="select_block_title">МЕСЯЦ</div>
                        <Select className='select' onChange={(e) => setMonthState(optionsMonth[e.value])} value={monthState} options={optionsMonth}/>
                    </div>

                    <div className="select_block">
                        <div className="select_block_title">ГОД</div>
                        <Select className='select' onChange={(e) => setYearState(optionsYear[e.value])} value={yearState} options={optionsYear}/>
                    </div>
                </div>
                <div className='info min300'>
                    <p>ФИО: {store.user.full_name}</p>
                    <p>Должность: {store.t13.developer}</p>
                    <p>Подразделение: {store.t13.branch}</p>
                    <p>Стаж работы: {store.onboard}</p>
                </div>
            </div>
            <div className='info_news'>
                <div className='size_calendar'>
                    <div className="calendar_content_payslip">
                        <h4>{monthState.label} {yearState.label}</h4>
                        <div className='dates'>
                            {
                                calendar.map( (item,index) => {
                                    if(item === 1){
                                        startItem = !startItem
                                    }
                                    startItem ? styleee = `dayview${daysState[item]}` : styleee = `dayview0`
                                    return (
                                        <div key={index} className={styleee}><p>{item}</p></div>
                                    )})}
                        </div>
                    </div>
                    <div className='itogy_days'>
                        <div className='itogy_days_title'>Итого отработано:</div>
                        <div className='itogy_days_total'>{daysNum} дней</div>
                    </div>
                    {ktus.length ? (<div>
                        {ktus.map((item,index) => (
                            <div key={index} className="ktu">
                                <div className="ktu_line"></div>
                                <div className="ktu_title">КТУ</div>
                                <div className="ktu_result">{item.ktu}</div>
                                <div className="ktu_description">{item.content}</div>
                            </div>
                        ))}
                    </div>) : ''}
                </div>
                <div className='info between'>
                    <div className='payslip_right'>
                        <h4>Сегодня {getToday()}</h4>
                        <h5>Расчетный лист за <span>{monthState.label}</span> месяц <span>{yearState.label}</span> год</h5>
                        {actual ? info.map( (item,index) => (
                                <div key={index}>
                                    <h5>Тип начисления: <span>{item.type}</span> </h5>
                                    <p>КТУ: {item.cost}</p>
                                    <p>Месяц: {item.month}</p>
                                    <p>Количество дней: {item.days}</p>
                                    <p>Период: {item.uchet}</p>
                                    <p>{item.stazh}</p>
                                </div>
                            ))
                            : <div>
                                <p>Расчетный лист за {monthState.label} месяц {yearState.label} года находится в работе или был положен в архив. Ожидайте расчетный лист 28-29 числа, текущего месяца или обратитесь в службу поддержки...</p>
                                <div className='button-next'><p onClick={handlePrevMonth} className='link'>Посмотреть расчетный лист за прошлый актуальный месяц<i className={'s1 fa-solid fa-arrow-right'}></i></p> </div>
                            </div>}
                    </div>
                </div>
            </div>
            <div className='rows_news'>

            </div>
        </div>

    )
}
export default observer(PayslipPage)