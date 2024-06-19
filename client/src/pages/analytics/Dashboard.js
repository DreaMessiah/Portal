import React, {useContext, useEffect, useState} from 'react';
import { Line } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js'
import {observer} from "mobx-react-lite"
import "../econom/ogm.scss"
import "./analitics.scss"
import '../editor/editor.scss'
import ActivityChart from "../../components/charts/ActivityChart"
import LoadingSpinner from "../../components/loading/LoadingSpinner"
import {DataContext} from "../../context/DataContext"
import HistoryService from "../../services/HistoryService";
import CmsDatePicket from "../../components/inputs/CmsDatePicket";
import CmsSelect from "../../components/inputs/CmsSelect";

Chart.register(...registerables)

function Dashboard(){
    const {hourlyLabels,optionsMonth} = useContext(DataContext)
    const month = new Date().getMonth()

    const [loading,setLoading] = useState(false)

    const [hourlyData,setHourlyData] = useState([])
    const [selectedDate,setSelectedDate] = useState(null)
    const [selectedMonth,setSelectedMonth] = useState(null)

    const [weeklyData,setWeeklyData] = useState([])
    const [week,setWeek] = useState([])

    const [monthlyData,setMonthlyData] = useState([])
    const [monthLabels,setMonthLabels] = useState([])

    //const hourlyData = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120];
    const loadingHandler = async () => {
        try {
            setLoading(true)
            await loadingDay()
            await loadingMonth()
        }catch (e) {
            console.log(e)
        }finally {
            setLoading(false)
        }
    }
    const loadingDay = async (day = new Date()) => {
        try {
            setLoading(true)
            const {data} = await HistoryService.getHoursHistory(day,month)
            setHourlyData(data.hours)
            const weekDays = []
            const weekData = []
            data.days.map(item => {
                weekDays.push(item.day)
                weekData.push(item.count)
            })
            setWeek(weekDays)
            setWeeklyData(weekData)
        }catch (e) {
            console.log(e)
        }finally {
            setLoading(false)
        }
    }
    const loadingMonth = async (month = new Date().getMonth()) => {
        try {
            setLoading(true)
            const {data} = await HistoryService.getMonthHistory(month)
            const monthDays = []
            const monthData = []
            data.map(item => {
                monthDays.push(item.day)
                monthData.push(item.count)
            })
            setMonthlyData(monthData)
            setMonthLabels(monthDays)
        }catch (e) {
            console.log(e)
        }finally {
            setLoading(false)
        }
    }

    useEffect( () => {
        loadingHandler()
    },[])
    useEffect(() => {
        if(selectedDate){
            loadingDay(selectedDate)
        }
    },[selectedDate])
    useEffect(() => {
        if(selectedMonth){
            loadingMonth(selectedMonth)
        }
    },[selectedMonth])
    return (
        <>
            <div>
                <h1 style={{marginBottom:'10px'}}>Активность пользователей</h1>
                <h2 style={{marginBottom:'10px'}}>Дневные показатели</h2>
                <CmsDatePicket placeholder="Выберите дату" onChange={setSelectedDate} />
                <ActivityChart data={hourlyData} labels={hourlyLabels} />
                <h2 style={{marginBottom:'10px'}}>Недельные показатели</h2>
                <ActivityChart data={weeklyData} labels={week} />
                <h2 style={{marginBottom:'10px'}}>Месячные показатели</h2>
                <CmsSelect options={optionsMonth} onChange={setSelectedMonth} value={selectedMonth} placeholder={'Выберете месяц'}/>
                <ActivityChart data={monthlyData} labels={monthLabels} />
            </div>
            {loading ? (<LoadingSpinner/>) : null}
        </>
    )
}
export default observer(Dashboard)