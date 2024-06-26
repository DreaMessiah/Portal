import React,{useEffect, useState} from "react";
import "./viewobj.scss";
import {Link, useLocation, useParams} from "react-router-dom";
import WeldingService from "../../../services/WeldingService";
import {useContext} from "react";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import {useMessage} from "../../../hooks/message.hook";
import {useMonth} from "../../../hooks/month.hook";
import Select from "react-select";
import ObjsService from "../../../services/ObjsService";

export const WelThisObj = () => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const message = useMessage()
    const idstore = searchParams.get('id');

    const getNameMonth = useMonth()

    const  {store} = useContext(Context)
    const inn = store.user.inn
    const login = store.user.login

    const [ymonth, setYmonth] = useState([])
    const [newmonth, setNewmonth] = useState('stop')
    const [newyear, setNewyear] = useState('stop')
    const [activecrew, setActiveCrew] = useState(false)
    const [activeview, setActiveView] = useState(false)
    const [listcrew, setListcrew] = useState([])
    const [allcrews, setAllcrews] = useState([])
    const [thiscrews, setThiscrew] = useState([])
    const [thisobj, setThisobj] = useState({})


    const getThisObj = async () => {
        try{
            const {data} = await ObjsService.thisObj({object_id: idstore})
            setThisobj(data[0])
        }catch(e){
            console.log(e)
        }
    }


    const getListCrew = async () => {
        try{
            allCrews()
            const {data} = await WeldingService.getCrewForObject({object_id: idstore})
            setListcrew(data)
        }catch(e){
            console.log(e)
        }
    }

    const delCrewOfList = async idcrew => {
        try{
            const del = await WeldingService.delCrewForObject({idcrew})
            if(del.data.del){
                message(del.data.message)
                getListCrew()
            }else{
                message(del.data.message)
            }

        }catch(e){
            console.log(e)
        }

    }

    const allCrews = async () => {
        try{

            const list = await WeldingService.getCrew()
            let i = 0
            const newarr = list.data
            list.data.forEach(crew => {
                crew.label = crew.crewname
                crew.value = crew.id
                crew.index = i
                i++
            })
            setAllcrews(newarr)
        }catch(e){
            console.log(e)
        }
    }

    const plusTabel = async (e) => {
        try{
            if(newmonth !== 'stop' && newyear !== 'stop'){
                const response = await WeldingService.crYM({inn, idstore, newmonth, newyear})
                    const itog = response.data
                if(itog === 'error') {
                    message('Такой табель уже существует')
                }else{
                    message(response.data.message)
                    createList()
                }
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

            setYmonth(resultList)
        }
    }

    const plusCrewOfObj = async () => {
        const plus = await WeldingService.plusCrewOnObj({object_id: idstore,crew: thiscrews})
        if(plus.data){
            getListCrew()
            message('Звено добавлено')
        }else{
            message('данное звено уже существует')
        }

    }

    const [nameview, setNameview] = useState('')
    const [costview, seCostview] = useState('')
    const [unitview, setUnitview] = useState('')
    const [normaview, setNormaview] = useState('')

    const plusViewwork = async () => {
        if(nameview !== '' && costview !== '' && unitview !== '' && normaview !== ''){
            try{
                const {data} = await WeldingService.createViewWork({shifr: thisobj.shifr, viewname: nameview, volume: costview, unit: unitview, norma: normaview})
                message('Вид работ: '+nameview+', успешно добавлен')
                setNameview('')
                seCostview('')
                setUnitview('')
                setNormaview('')
            }catch(e){
                console.log(e)
                message('что-то пошло не так')
            }

        }else{
            message('не все поля заполнены')
        }

    }

    useEffect(() => {
        getThisObj()
        createList()
        getListCrew()
    },[])

    return (
        <div className='right-block-ymweldings'>
            <div className='ymwelding_head'>
                <Link to='/objectsportal' className='back-button'>Назад к объектам</Link>
                <div className='ymwelding_head_nameobj'><span>{thisobj.shifr}</span>{thisobj.nameobject}</div>
                {/*<div className='back-button'>Передать</div>*/}
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
                    <div className='back-button' onClick={()=>{setActiveCrew(!activecrew)}}>Звенья / Бригады</div>
                    <div className='back-button'>Отчеты</div>
                    <div className='back-button' onClick={()=>{setActiveView(!activeview)}}>Виды работ</div>
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
            <div className="modalcrew" style={(activecrew)?{display: 'flex'}:{display: 'none'}}>
                <div className="modalcrew_white">
                    <div className="modalcrew_white_krestik">
                        <i className="fa-solid fa-xmark"  onClick={()=>{setActiveCrew(!activecrew)}}/>
                    </div>
                    <div className="modalcrew_white_modal">
                        <div className="modalcrew_white_modal_title">Звенья/Бригады на объекте</div>
                        <div className="modalcrew_white_modal_plus">Добавить звено / бригаду</div>
                        <Select placeholder='Выбрать звено' onChange={(e) => setThiscrew(allcrews[e.index])} value={thiscrews} options={allcrews}/>
                        <div className="modalcrew_white_modal_btn" onClick={()=>plusCrewOfObj()}>Добавить</div>
                        <div className="modalcrew_white_modal_list">
                            {listcrew.map((crew, index)=>(
                                <div key={index} className="modalcrew_white_modal_list_crew">
                                    <div className="modalcrew_white_modal_list_crew_name">{crew.namecrew}</div>
                                    <div className="modalcrew_white_modal_list_crew_krest">
                                        <i className="fa-solid fa-xmark" onClick={()=>delCrewOfList(crew.id)}/>
                                    </div>
                                </div>
                            ))}


                        </div>
                    </div>
                </div>
            </div>

            <div className="modalcrew" style={(activeview)?{display: 'flex'}:{display: 'none'}}>
                <div className="modalcrew_white">
                    <div className="modalcrew_white_krestik">
                        <i className="fa-solid fa-xmark"  onClick={()=>{setActiveView(!activeview)}}/>
                    </div>
                    <div className="modalcrew_white_modal position">
                        <div className="modalcrew_white_modal_title">Добавить вид работ</div>

                        <div className="modalcrew_white_modal_plus">Название вида работ</div>
                        <input type="text" className='modalcrew_white_modal_inputs' value={nameview} onChange={(e)=>setNameview(e.target.value)} placeholder="Введите название вида работ"/>
                        <div className="modalcrew_white_modal_plus">Объём</div>
                        <input type="text" className='modalcrew_white_modal_inputs' value={costview} onChange={(e)=>seCostview(e.target.value)} placeholder="Введите объём / кол-во"/>
                        <div className="modalcrew_white_modal_plus">Ед.изм.</div>
                        <input type="text" className='modalcrew_white_modal_inputs' value={unitview} onChange={(e)=>setUnitview(e.target.value)} placeholder="Введите единицу измерения"/>
                        <div className="modalcrew_white_modal_plus">Норма времени</div>
                        <input type="text" className='modalcrew_white_modal_inputs' value={normaview} onChange={(e)=>setNormaview(e.target.value)} placeholder="Время на выполнение"/>
                        <div className="modalcrew_white_modal_btn" onClick={()=>{plusViewwork(); (nameview !== '' && costview !== '' && unitview !== '' && normaview !== '')&&setActiveView(!activeview)}}>Добавить</div>

                    </div>
                </div>
            </div>
        </div>
    )
}