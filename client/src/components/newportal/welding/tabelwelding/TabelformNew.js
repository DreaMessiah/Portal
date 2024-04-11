import React, {useContext, useEffect, useState} from "react";
import "./tabelform.scss";
import "./tabviewwork1920.scss";
import "./tabviewwork1550.scss";
import "./tabviewwork1080.scss";
import {TabelViewsWork} from "./TabelViewsWork";
import {TabelMans} from "./TabelMans";
import {ModalWin} from "../../../modalwin/ModalWin";
import {NewCrewModal} from "./modalactive/NewCrewModal";
import {DataContext} from "../../../../context/DataContext";
import {Link, useLocation} from "react-router-dom";
import {useObjects} from "../../../../hooks/objects.hook";
import WeldingService from "../../../../services/WeldingService";
import {useMonth} from "../../../../hooks/month.hook";
import ModalFiles from "../../../modalwin/ModalFiles";
import {useMessage} from "../../../../hooks/message.hook";



export const TabelformNew = () => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const months = [
        'январь', 'февраль', 'март', 'апрель', 'май', 'июнь',
        'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'
    ];

    const thisMonth = useMonth()
    const messages = useMessage()
    let getId = searchParams.get('id');
    let getShifr = searchParams.get('shifr');
    let getMonth = searchParams.get('month');
    let getYear = searchParams.get('year');

    let tabelMans = []

    const [thisobj, setThisobj] = useState({})

    const getParamObj = async (e) =>{
        const response = await WeldingService.getObgForHook({getShifr})
        console.log(response.data)
        setThisobj(response.data)
    }


    const {weldingCrews} = useContext(DataContext)

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
    const handleSelect = e => {
        setSelect(e.target.value)
    }
    let btnsNameCrews
    const activetedCrew = (button, crew) => {
        btnsNameCrews = document.querySelectorAll('.tabwelding_crews_block')
            button.classList = 'tabwelding_crews_block bgactive'
            btnsNameCrews.forEach(btn => {
                if(button !== btn) {
                    btn.classList = 'tabwelding_crews_block'
                }
            })
        console.log(crew)
        weldingcrews.forEach(crews => {
            console.log(crews)
            if(crews.crew === crew){
                setViews(crews.views)
                setMans(crews.mans)
                setCrewName(crews.crew)
            }
        })
    }



    const getMyCrews = async () => {
            try{
                const obj = await WeldingService.getObgForHook({getShifr})
                const shifr = obj.data.shifr
                const response = await WeldingService.getMyCrews({shifr, getMonth, getYear})
                setMycrews(response.data)
                const month = months[getMonth]
                const tabel = await WeldingService.getTabelSv({shifr, month, getYear})
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
                    zveno.mans = mans
                    zveno.views = views
                    crewsman.push(zveno)
                })
                setWeldingcrew(crewsman)
                setAllcrews(crews)
            }catch(e){
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
                    <select className="tabwelding_header_newcrewblock_select" onChange={handleSelect}>
                        <option></option>
                        {mycrews.map( (item,index) =>(
                            <option defaultValue={item.namecrew} key={index}>{item.namecrew}</option>
                        ))}
                    </select>
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
            <div className="tabwelding_viewswork">
                <div className="tabwelding_viewswork_upper">
                    <div className="tabwelding_viewswork_upper_title">Виды работ</div>
                    <div className="back-button">Добавить вид</div>
                    <div onClick={() => alert(tabelView)} className="tabwelding_viewswork_upper_date">сегодня: 01-01-2024</div>
                </div>
            </div>
            <TabelViewsWork getTabel={views} active={crewName} idobj={getId} shifr={getShifr} month={getMonth} year={getYear}/>
            <div className="tabwelding_slice"></div>
            <div className="tabwelding_tabel">
                <div className="tabwelding_tabel_upper">
                    <div className="tabwelding_tabel_upper_title">Табель</div>
                    <div className="back-button">Добавить</div>
                </div>
                <TabelMans  peoples={mans} active={crewName} idobj={getId} shifr={getShifr} month={getMonth} year={getYear}/>
            </div>

            {/*<NewCrewModal sel={select} active={crew} setActive={setCrew}/>*/}
            <ModalFiles data={<NewCrewModal sel={select} active={crew} setActive={setCrew} monther={getMonth} year={getYear} idobj={getShifr}  allcrews={allcrews} setAllcrews={setAllcrews} setWeldingcrew={setWeldingcrew} setMycrews={setMycrews}/>} active={crew} setActive={setCrew}/>
            {/*<ModalWin data={<NewCrewModal sel={select} active={crew} setActive={setCrew}/>} active={crew} setActive={setCrew}/>*/}
        </div>
    )
}