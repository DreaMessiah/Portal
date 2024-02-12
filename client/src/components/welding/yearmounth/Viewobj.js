import React,{useEffect, useState} from "react";
import "./viewobj.scss";
import {Link, useLocation, useParams} from "react-router-dom";
import WeldingService from "../../../services/WeldingService";
import {useContext} from "react";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import {useMessage} from "../../../hooks/message.hook";
import {useMonth} from "../../../hooks/month.hook";




export const Viewobj = () => {

    const location = useLocation();
    console.log(location)
    const searchParams = new URLSearchParams(location.search);

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
            {ymonth.map((year,index) => (
            <div key={index} className='ymwelding_years'>
                <div className='ymwelding_years_head'>{year.year}</div>
                <div className='ymwelding_years_body'>{  year.months.map((month,index) => (
                    <div key={index}>
                        <Link key={index} to={`/tabelwelding/?id=${index}&shifr=${month.shifr}&month=${month.month}&year=${month.year}`} className='ymwelding_years_body_month'>
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