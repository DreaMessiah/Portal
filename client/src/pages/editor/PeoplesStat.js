import React, {useContext, useEffect, useRef, useState} from "react"
import {observer} from "mobx-react-lite"
import "../econom/ogm.scss"
import {Link} from "react-router-dom";
import Select from "react-select";
import {Context} from "../../index";
import {DataContext} from "../../context/DataContext";
import UserService from "../../services/UserService";
import formatDate from "../../components/functions/formatDate";
import UsersTable from "../../components/tables/UsersTableObj";


function PeoplesStat(){
    const {getMonthName,optionsMonth,optionsYear} = useContext(DataContext)
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

    const [allUsers,setAllUsers] = useState(0)
    const [monthState,setMonthState] = useState(optionsMonth[monthNow])
    const [yearState,setYearState] = useState(optionsYear[2])
    const [calendar,setCalendar] = useState(getSixWeeksArray())
    const [loading,setLoading] = useState(false)
    const [daysState,setDaysState] = useState(mandays)
    const [usersList,setUsersList] = useState([])

    const [userSort,setUserSort] = useState('full_name')

    const [selectedDay,setSelectedDay] = useState({})

    const [stat,setStat] = useState([])

    const {store} = useContext(Context)
    const loadingHandler = async () => {
        try {
            setLoading(true)
            const {data} = await UserService.getStat()
            if(data) {
                setAllUsers(data.numall)
                setStat(data.stat)
                setSelectedDay(data.stat.find(item => item.id === -1))
            }
            loadUsersHandler('full_name')
        }catch (e) {
            console.log(e)
        }finally {
            setLoading(false)
        }
    }
    const refreshMonth = () => {
        if(stat.length){
            const newDaysState = {...mandays}
            stat.forEach(item => {
                const date = new Date(item.date)
                const itemYear = date.getFullYear()
                const itemMonth = date.getMonth()
                if (itemYear === +yearState.label && itemMonth === +monthState.value) {
                    const day = date.getDate();
                    if (newDaysState.hasOwnProperty(day)) {
                        newDaysState[day] = 1;
                    }
                }
            })
            setDaysState(newDaysState)
        }
    }
    const selectDayHandler = (day) => {
        if(daysState[day] === 1 && stat.length){
            const result = stat.find(item => {
                const itemDate = new Date(item.date);
                return itemDate.getFullYear() === +yearState.label && itemDate.getMonth() === +monthState.value && itemDate.getDate() === day;
            })
            setSelectedDay(result)
        }
    }
    const loadUsersHandler = async (sort) => {
        try {
            setLoading(true)
            const users = await UserService.getStatUsers(sort)
            if(users.data){
                setUsersList(users.data.users)
            }
        }catch (e) {
            console.log(e)
        }finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        loadingHandler()
    },[])
    useEffect(() => {
        setCalendar(getSixWeeksArray(+yearState.label,monthState.value))
        refreshMonth()
    },[monthState,yearState])
    useEffect(()=> {
        refreshMonth()
    },[stat])
    return (
        <div className='new_back'>
            <h4 className={`main-title`}>Здесь Вы можете посмотреть статистику регистраций и входов в систему</h4>
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
                    <p>Всего пользователей: {allUsers}</p>

                </div>
            </div>

            <div className='info_news'>
                <div className='info size_calendar'>
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
                                        <div key={index} onClick={(e) => selectDayHandler(item)} className={styleee}><p>{item}</p></div>
                                    )})}
                        </div>
                    </div>
                </div>
                <div className='info between'>
                    <div className='payslip_right'>
                        <h4>Данные на {formatDate(selectedDay.date)}</h4>
                        <h5>Пользователей в моменте: {selectedDay.numall}</h5>
                        <h5>Зарегистрировались: {selectedDay.numreg}</h5>
                        <h5>Заходили: {selectedDay.numinp}</h5>

                    </div>
                </div>
            </div>
            <h4 className={`main-title`}>Список пользователей</h4>
            <div className={`sort`}>Сортировать <span onClick={(e) => loadUsersHandler('full_name')}>по алфовиту</span> <span onClick={(e) => loadUsersHandler('createdAt')}>по дате создания</span></div>
            {usersList.length && <UsersTable data={usersList}/>}

        </div>
    )
}

export default observer(PeoplesStat)