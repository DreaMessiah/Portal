import React, {useContext, useEffect, useRef, useState} from "react"
import {observer} from "mobx-react-lite"
import "./analitics.scss"
import LoadingSpinner from "../../components/loading/LoadingSpinner";
import HistoryService from "../../services/HistoryService";
import formatDateTime from "../../components/functions/formatDateTime";
import CmsSelect from "../../components/inputs/CmsSelect";
import {DatePicker} from "rsuite";
import UserService from "../../services/UserService";
import CmsDatePicket from "../../components/inputs/CmsDatePicket";
import AuthService from "../../services/AuthService";


function History(){
    const [loading,setLoading] = useState(false)
    const [direction,setDirection] = useState(false)

    const [history,setHistory] = useState([])
    const [length,setLength] = useState(0)

    const [sorti,setSorti] = useState('abc')
    const [selectedPage,setSelectedPage] = useState(0)
    const [selectedType,setSelectedType] = useState(null)
    const [selectedDate,setSelectedDate] = useState(null)
    const [selectedUser,setSelectedUser] = useState(null)

    const [steps,setSteps] = useState([])
    const [types,setTypes] = useState([])
    const [peoples,setPeoples] = useState([])
    const loadingHandler = async (sort='abc',page=0) => {
        try {
            setLoading(true)
            const {data} = await HistoryService.getHistory(sort,direction,page,selectedType,selectedDate,selectedUser)
            console.log(data)
            if(data){
                setHistory(data.history)
                setLength(data.length)
                const pagination = []
                for (let i = 0; i < data.length/1000; i++) {
                    pagination.push(i+1)
                }
                setSteps(pagination)
            }
        }catch (e) {
            console.log(e)
        }finally {
            setLoading(false)
        }
    }
    const getTypes = async () => {
        try {
            setLoading(true)
            const {data} = await HistoryService.getTypes()
            //const workers = await UserService.getAllPeoples()
            const workers = await AuthService.getusers()
            setPeoples(workers.data.users)
            setTypes(data)
        }catch (e) {
            console.log(e)
        }finally {
            setLoading(false)
        }
    }
    const sortHandler = (sort) => {
        setDirection(!direction)
        setSorti(sort)
        loadingHandler(sort)

    }
    const changePageHandler = (index) => {
        setSelectedPage(index)
        loadingHandler(sorti,index)
    }
    const cancelHandler = () => {
        setSelectedPage(0)
        setSelectedDate(null)
        setSelectedType(null)
        setSelectedUser(null)
        setSorti('abc')
        setDirection(false)
    }
    useEffect(() => {
        loadingHandler()
        getTypes()
    },[])

    useEffect(() => {
        loadingHandler(sorti)
    },[selectedType,selectedUser,selectedDate])

    return (
        <>
            <div>
                <h1>История событий</h1>
                <div className={`sort-selects`}>
                    <CmsSelect value={selectedType} placeholder={'Выберите тип'} onChange={setSelectedType} options={types} />
                    <CmsSelect value={selectedUser} placeholder={'Выберите сотрудника'} onChange={setSelectedUser} options={peoples} />
                    <CmsDatePicket placeholder="Выберите дату" onChange={setSelectedDate} />
                    <div style={{margin:'0'}} className={'buttons'}>
                        <div onClick={cancelHandler}  className={'small-button'}>Сбросить поиск</div>
                    </div>
                </div>
                <div className={`sort history-sort`}>
                    <div className={`title text`}>Всего {length} строк</div>
                    <div className={`title text`}>Сортировать</div>
                    <div onClick={() => sortHandler('abc')} className={`sortbtn text`}>По порядку</div>
                    <div onClick={() => sortHandler('type')} className={`sortbtn text`}>По типу</div>
                    <div onClick={() => sortHandler('action')} className={`sortbtn text`}>По действию</div>
                    <div onClick={() => sortHandler('time')} className={`sortbtn text`}>По времени</div>
                    <div onClick={() => sortHandler('marker')} className={`sortbtn text`}>По маркеру</div>
                </div>
                <div className="table-container-history">
                    <div className="table-header">
                        <div className="table-cell">ФИО</div>
                        <div className="table-cell">Тип</div>
                        <div className="table-cell">Действие</div>
                        <div className="table-cell">Время</div>
                        <div className="table-cell">Маркер</div>
                    </div>
                    <div className="table-row pusto">
                    </div>
                    {history.map((row) => (
                        <div className="table-row" key={row.id}>
                            <div className="table-cell">{row.user.full_name}</div>
                            <div className="table-cell">{row.historytype.name}</div>
                            <div className="table-cell">{row.action}</div>
                            <div className="table-cell">{formatDateTime(row.createdAt)}</div>
                            <div className="table-cell">{row.marker===1 ? <i className="red fa-solid fa-triangle-exclamation"></i> : <i className="fa-solid fa-arrow-pointer"></i> }  - {row.marker}</div>
                        </div>
                    ))}
                </div>
                {length>1000 ?
                    <div className={`pagination`}>
                        {steps.map( (item,index) => (
                            <div onClick={() => changePageHandler(index)} key={index} className={`step ${selectedPage === index && 'selected'}`}>{item}</div>
                        ))}
                    </div>
                    :null
                }

            </div>
            {loading ? (<LoadingSpinner/>) : null}
        </>
    )
}
export default observer(History)