import React,{useEffect, useState} from "react";
import "./viewobj.scss";
import {Link, useLocation, useParams} from "react-router-dom";
import WeldingService from "../../../../services/WeldingService";
import {useContext} from "react";
import {Context} from "../../../../index";
import {observer} from "mobx-react-lite";
import {useMessage} from "../../../../hooks/message.hook";
import {useMonth} from "../../../../hooks/month.hook";
import Select from "react-select";

export const WelThisObj = () => {

    const location = useLocation();
    console.log(location)
    const searchParams = new URLSearchParams(location.search);
    const message = useMessage()
    const idstore = searchParams.get('id');

    console.log(idstore)

    const getNameMonth = useMonth()

    const arr_welding_tabel = [
        {
            id: 1,
            year: 2024,
            idobj: 1,
            months: [

                {
                    id: 2,
                    shifr: '386',
                    year: '2024',
                    month: 'январь',
                    inn: '8617014209'
                },

                {
                    id: 1,
                    shifr: '386',
                    year: '2024',
                    month: 'февраль',
                    inn: '8617014209'
                }
            ]
        },
        {
            id: 2,
            year: 2023,
            idobj: 1,
            months: [

                {
                    id: 6,
                    shifr: '386',
                    year: '2023',
                    month: 'март',
                    inn: '8617014209'
                },

                {
                    id: 7,
                    shifr: '386',
                    year: '2023',
                    month: 'апрель',
                    inn: '8617014209'
                },

                {
                    id: 8,
                    shifr: '386',
                    year: '2023',
                    month: 'май',
                    inn: '8617014209'
                },

                {
                    id: 9,
                    shifr: '386',
                    year: '2023',
                    month: 'июнь',
                    inn: '8617014209'
                },

                {
                    id: 10,
                    shifr: '386',
                    year: '2023',
                    month: 'июль',
                    inn: '8617014209'
                },

                {
                    id: 11,
                    shifr: '386',
                    year: '2023',
                    month: 'август',
                    inn: '8617014209'
                },

                {
                    id: 12,
                    shifr: '386',
                    year: '2023',
                    month: 'сентябрь',
                    inn: '8617014209'
                },

                {
                    id: 13,
                    shifr: '386',
                    year: '2023',
                    month: 'октябрь',
                    inn: '8617014209'
                },

                {
                    id: 14,
                    shifr: '386',
                    year: '2023',
                    month: 'ноябрь',
                    inn: '8617014209'
                },

                {
                    id: 15,
                    shifr: '386',
                    year: '2023',
                    month: 'декабрь',
                    inn: '8617014209'
                }
            ]
        },



    ];

    const  {store} = useContext(Context)
    const inn = store.user.inn
    const login = store.user.login

    const [ymonth, setYmonth] = useState([])
    const [newmonth, setNewmonth] = useState('stop')
    const [newyear, setNewyear] = useState('stop')
    // const [listMans, setListMans] = useState([])
    // const [thisMans, setThisMans] = useState([])


    const plusTabel = async (e) => {
        try{
            if(newmonth !== 'stop' && newyear !== 'stop'){
                const response = await WeldingService.crYM({inn, idstore, newmonth, newyear})
                console.log(response.data)
                    const itog = response.data
                if(itog === 'error') {
                    message('Такой табель уже существует')
                }else{
                    message(response.data.message)
                    createList()
                }
                console.log(newmonth)
                console.log(newyear)
            } else {
                message("Выбирете месяц и год")
            }
        }catch(e){

        }


    }

    const createList = async (e) => {
        const response = await WeldingService.getYM({inn, idstore})

        setYmonth(response.data)
        if(response){
            const listYears = []
            response.data.forEach(ymonth => {
                if(!listYears.includes(ymonth.year)){
                    listYears.push(ymonth.year)
                }
            })
            const resultList = []
            listYears.map((year, index) => {

                const yearObj = {
                    id: index,
                    year: year,
                    idobj: idstore,
                    months: []
                }
                let pushThis = []
                response.data.forEach(ymonth => {
                    if(ymonth.year === year){
                        pushThis.push({
                            id: ymonth.id,
                            shifr: ymonth.shifr,
                            year: ymonth.year,
                            month: ymonth.month,
                            inn: inn
                        })
                    }
                })
                yearObj.months = pushThis
                resultList.push(yearObj)
            })

            console.log(resultList)
            setYmonth(resultList)
        }
    }

    useEffect(() => {
        createList()
    },[])

    return (
        <div className='right-block-ymweldings'>
            <div className='ymwelding_head'>
                <Link to='/objectsportal' className='back-button'>Назад к объектам</Link>
                <div className='ymwelding_head_nameobj'><span>386</span>        РВСП 20000м3 №3 ЛПДС "Южный Балык". Нефтеюганское УМН. Техническое перевооружение"</div>
                <div className='back-button'>Передать</div>
            </div>
            <div className='ymwelding_controller'>
                <div className='ymwelding_controller_ym'>
                    {/*<Select className='select' onChange={(e) => setThisMans(listMans[e.index])} value={thisMans} options={listMans}/>*/}

                    <select className='ymwelding_controller_ym_select' onChange={(e)=>setNewmonth(e.target.value)}>
                        <option></option>
                        <option value={0}>январь</option>
                        <option value={1}>февраль</option>
                        <option value={2}>март</option>
                        <option value={3}>апрель</option>
                        <option value={4}>май</option>
                        <option value={5}>июнь</option>
                        <option value={6}>июль</option>
                        <option value={7}>август</option>
                        <option value={8}>сентябрь</option>
                        <option value={9}>октябрь</option>
                        <option value={10}>ноябрь</option>
                        <option value={11}>декабрь</option>
                    </select>
                    <select className='ymwelding_controller_ym_select' onChange={(e)=>setNewyear(e.target.value)} >
                        <option value={0}></option>
                        <option value={2023}>2023</option>
                        <option value={2024}>2024</option>
                        <option value={2025}>2025</option>
                    </select>
                    <div className='back-button' onClick={()=>plusTabel()}>Создать</div>
                </div>
                <div className='ymwelding_controller_sistembtns'>
                    <div className='back-button'>Звенья / Бригады</div>
                    <div className='back-button'>Отчеты</div>
                    <div className='back-button'>Виды работ</div>
                </div>
            </div>
            <div className='ymwelding_slice'></div>
            {ymonth.map((year,index) => (
            <div key={index} className='ymwelding_years'>
                <div className='ymwelding_years_head'>{year.year}</div>
                <div className='ymwelding_years_body'>{  year.months.map((month,index) => (
                    <div key={index}>
                        <Link key={index} to={`/tab-welding/?id=${index}&shifr=${month.shifr}&month=${month.month}&year=${month.year}`} className='ymwelding_years_body_month'>
                            <div className='ymwelding_years_body_month_text'>{getNameMonth(month.month)}</div>
                            <div className='ymwelding_years_body_month_settings'> ... </div>
                        </Link>
                    </div>
                        ))}
                </div>
            </div>
            ))
            }
            
        </div>
    )
}