import React, {useContext, useEffect, useState} from "react";
import "./tabelform.scss";
import "./tabviewwork1920.scss";
import "./tabviewwork1550.scss";
import "./tabviewwork1080.scss";
import {TabelViewsWork} from "./TabelViewsWork";
import {TabelMans} from "./TabelMans";
import {NewCrewModal} from "./modalactive/NewCrewModal";
import {Link, useLocation} from "react-router-dom";
import WeldingService from "../../../services/WeldingService";
import {useMonth} from "../../../hooks/month.hook";
import ModalFiles from "../../modalwin/ModalFiles";
import {useMessage} from "../../../hooks/message.hook";
import Select from "react-select";
import ObjsService from "../../../services/ObjsService";
import {Context} from "../../../index";

export const TabelformNew = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const months = [
        'январь', 'февраль', 'март', 'апрель', 'май', 'июнь',
        'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'
    ]
    const thisMonth = useMonth()
    let getId = searchParams.get('id');
    let getShifr = searchParams.get('shifr');
    let getMonth = searchParams.get('month');
    let getYear = searchParams.get('year');

    const message = useMessage()

    const [thisobj, setThisobj] = useState({})

    const getParamObj = async (e) => {
        try {
            const {data} = await WeldingService.getObgForHook({getShifr})
            if(data) setThisobj(data)
            else message('Ошибка загрузки')
        }catch (e) {
            console.log(e)
        }
    }

    const [crew, setCrew] = useState(false)
    const [crewName, setCrewName] = useState('')
    const [select, setSelect] = useState('отсутствует')
    const [views, setViews] = useState([])
    const [mans, setMans] = useState([])
    const [tabelView,setTabelView] = useState([])
    const [mycrews,setMycrews] = useState([])
    const [tabMans,setTabelMans] = useState([])
    const [allcrews,setAllcrews] = useState([])
    const [weldingcrews, setWeldingcrew] = useState([])

    const [listMans, setListMans] = useState([])
    const [thisMans, setThisMans] = useState([])

    const [listWorks, setListWorks] = useState([])
    const [thisView, setThisView] = useState([])
    const [thisselcrew, setThisselcrew] = useState([])

    const  {store} = useContext(Context)
    const inn = store.user.inn

    const getViewsWork = async () => {
        try{
            const idshifr = +getShifr
            const viewsv = await WeldingService.getViewWorkSV({idshifr})
            let viewswork = viewsv.data
            viewswork.sort((a, b) => a.id - b.id);
            let i = 0;
            viewswork.forEach(view => {
                view.label = view.viewname
                view.value = view.id
                view.index = i
                i++
            })
            setListWorks(viewswork)
        }catch(e){
            console.log(e)
        }
    }
    const handleSelect = e => {

        const value = e.target.value
        console.log(value)
        const arr = value.split('|')
        setSelect({id: arr[1],crewname: arr[0]})
    }
    let btnsNameCrews
    const currentDate = new Date();
    const year = currentDate.getFullYear() + '';
    const currentMonth = currentDate.getMonth(); // Получаем номер текущего месяца

    const t13List = async (e) => {
        let month = months[currentMonth];
        try {
            const listMan = await ObjsService.getT13({inn, month, year})
            let i = 0
            if (listMan.data.length !== 0){
                listMan.data.forEach(man => {
                    man.label = man.name + '  ' + man.developer
                    man.value = man.tn
                    man.index = i
                    i++
                })
                setListMans(listMan.data)
            } else {
                month = months[currentMonth - 1];
                try{
                    const listMan = await ObjsService.getT13({inn, month, year})
                    listMan.data.forEach(man => {
                        man.label = man.name + '  ' + man.developer
                        man.value = man.tn
                        man.index = i
                        i++
                    })
                    setListMans(listMan.data)
                } catch(e){
                    console.log(e)
                }
            }
        } catch {
            alert('ебобо скрипт проверь')
        }
    }
    const activetedCrew = (button, crew) => {
        if(button){
            btnsNameCrews = document.querySelectorAll('.tabwelding_crews_block')
            button.classList = 'tabwelding_crews_block bgactive'
            btnsNameCrews.forEach(btn => {
                if(button !== btn) {
                    btn.classList = 'tabwelding_crews_block'
                }
            })
        }
        weldingcrews.forEach(crews => {
            if(crews.crew === crew){
                setViews([...crews.views])
                setMans([...crews.mans])
                setCrewName(crews.crew)
            }
        })
    }

    const getMyCrews = async () => {
            try{
                const obj = await WeldingService.getObgForHook({getShifr})
                const shifr = obj.data.shifr
                const response = await WeldingService.getMyCrews({object_id: getShifr, shifr, getMonth, getYear})
                setMycrews(response.data)
                console.log(response.data)
                const month = months[getMonth]
                const tabel = await WeldingService.getTabelSv({object_id: getShifr, shifr, month, getYear})
                const listtabels = tabel.data

                const crews = []
                const crewsman = []
                listtabels.forEach(item => {
                    if(!crews.includes(item.crew)){
                        crews.push(item.crew)
                    }
                })

                crews.forEach(crew=>{
                    const zveno = {
                        crew: crew
                    }
                    const mans = []
                    const views = []
                    listtabels.forEach(item=>{
                        if(crew === item.crew && item.checkin === 'man'){
                            mans.push(item)
                        }
                        if(crew === item.crew && item.checkin === 'view'){
                            views.push(item)
                        }
                    })
                    views.sort((a, b) => a.id - b.id);
                    mans.sort((a, b) => a.id - b.id);
                    zveno.mans = mans
                    zveno.views = views
                    crewsman.push(zveno)
                })
                setWeldingcrew([...crewsman])
                setAllcrews([...crews])
            }catch(e){
                console.log(e)
            }

    }
    const plusView = async () => {
        try{
            const month = months[getMonth]
            const {data} = await WeldingService.plusVW({thisView, objid: getShifr, crew: crewName, month, year: getYear})
            console.log(data)
            if(data) setViews([...views,data])
            else message('Ошибка добавления вида работ')
        }catch(e){
            console.log(e)
        }
    }
    const addManHandler = async () => {
        try {
            console.log(thisobj)
            if (thisMans){
                const {data} = await WeldingService.addMan({...thisMans,crew:crewName,shifr:thisobj.shifr,object_id:thisobj.id})
                if(data){
                    setMans([...mans,thisMans])
                }
            }
        }catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        views.forEach(tabel => {
            if(tabel.year === getYear && tabel.month === getMonth) {
                setTabelView(tabel.types)
                setTabelMans(tabel.peoples)
            }
        })
        getViewsWork()
        t13List()
        getParamObj()
        getMyCrews()
    },[views])
    return (
        <div className='right-block-tabwelding'>
            <div className="tabwelding_header">
                <div className="tabwelding_header_upper">
                    <Link to={`/welwel?id=${getShifr}`} className="back-button">Назад</Link>
                    <div className="tabwelding_header_upper_title"><span>{thisobj.shifr}</span> {thisMonth(getMonth)} {getYear}</div>
                    <Link to={`/welcontroll?id=${getId}&shifr=${getShifr}&month=${getMonth}&year=${getYear}`} className="back-button">Контроль</Link>
                </div>
                <div className="tabwelding_header_newcrewblock">
                    {/*<select className="tabwelding_header_newcrewblock_select" onChange={handleSelect}>*/}
                    {/*    <option></option>*/}
                    {/*    {mycrews.map( (item,index) =>(*/}
                    {/*        <option defaultValue={item.namecrew+'|'+item.id} key={index}>{item.namecrew}</option>*/}
                    {/*    ))}*/}
                    {/*</select>*/}
                    <Select placeholder='Выбрать звено' onChange={(e) => setThisselcrew(mycrews[e.index])} value={thisselcrew} options={mycrews} styles={{container:(baseStyles, state) => ({...baseStyles,width:'236px',marginRight:' 6px'})}}/>

                    <div className="back-button" onClick={() => setCrew(!crew)}>Добавить звено</div>
                </div>
            </div>
            <div className="tabwelding_slice"></div>
            <div className="tabwelding_crews">
                {allcrews.map( (item,index) =>(
                <div className="tabwelding_crews_block" key={index} onClick={e => {activetedCrew(e.target, item)}}>{item}</div>
                ))}
            </div>
            <div className="tabwelding_slice"></div>
            <div className="tabwelding_viewswork" style={(crewName==='')?{display: 'none'}:{display: 'flex'}}>
                <div className="tabwelding_viewswork_upper">
                    <Select placeholder='Выбрать вид работы' onChange={(e) => setThisView(listWorks[e.index])} value={thisView} options={listWorks} styles={{container:(baseStyles, state) => ({...baseStyles,width:'250px'})}}/>
                    {/*<div className="tabwelding_viewswork_upper_title">Виды работ</div>*/}
                    <div className="back-button" style={{margin: '0 10px'}} onClick={()=>{plusView()}}>Добавить вид</div>
                    <div onClick={() => alert(tabelView)} className="tabwelding_viewswork_upper_date">сегодня: 01-01-2024</div>
                </div>
            </div>
            <TabelViewsWork getTabel={views} setTabel={setViews} active={crewName} idobj={getId} shifr={getShifr} month={getMonth} year={getYear}/>
            <div className="tabwelding_slice"></div>
            <div className="tabwelding_tabel" style={(crewName==='')?{display: 'none'}:{display: 'flex'}}>
                <div className="tabwelding_tabel_upper">
                    <Select placeholder='Выбрать сотрудника' onChange={(e) => setThisMans(listMans[e.index])} value={thisMans} options={listMans} styles={{container:(baseStyles, state) => ({...baseStyles,width:'250px'})}}/>
                    {/*<div className="tabwelding_tabel_upper_title">Табель</div>*/}
                    <div onClick={(e) => addManHandler()} className="back-button">Добавить</div>
                </div>
                <TabelMans peoples={mans} setPeoples={setMans} active={crewName} idobj={getId} shifr={getShifr} month={getMonth} year={getYear}/>
            </div>

            <ModalFiles data={<NewCrewModal sel={thisselcrew} active={crew} setActive={setCrew} monther={getMonth} year={getYear} idobj={getShifr}  allcrews={allcrews} setAllcrews={setAllcrews} setWeldingcrew={setWeldingcrew} setMycrews={setMycrews}/>} active={crew} setActive={setCrew}/>
        </div>
    )
}