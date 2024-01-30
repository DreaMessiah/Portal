import React, {useContext, useEffect, useState} from "react";
import "./tabelform.scss";
import "./tabviewwork1920.scss";
import "./tabviewwork1550.scss";
import "./tabviewwork1080.scss";
import {TabelViewsWork} from "./TabelViewsWork";
import {TabelMans} from "./TabelMans";
import {ModalWin} from "../../modalwin/ModalWin";
import {NewCrewModal} from "./modalactive/NewCrewModal";
import {DataContext} from "../../../context/DataContext";
import {Link, useLocation} from "react-router-dom";



export const Tabelform = () => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    let getId = searchParams.get('id');
    let getShifr = searchParams.get('shifr');
    let getMonth = searchParams.get('month');
    let getYear = searchParams.get('year');

    //let tabelView = []
    let tabelMans = []

    console.log(getId)
    console.log(getMonth)
    console.log(getYear)

    const {weldingCrews} = useContext(DataContext)

    const [crew, setCrew] = useState(false)

    const [crewName, setCrewName] = useState('')

    const [select, setSelect] = useState('отсутствует')

    const [views, setViews] = useState([])

    const [mans, setMans] = useState([])

    const [tabelView,setTabelView] = useState([])

    const [tabMans,setTabelMans] = useState([])
    // const [tabelWork, ]

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
    setViews(crew.tabel)
    setMans(crew.peoples)
    setCrewName(crew.crew)
    }



    useEffect(() => {
        views.forEach(tabel => {
            if(tabel.year === getYear && tabel.month === getMonth) {
                setTabelView(tabel.types)
                setTabelMans(tabel.peoples)
            }
        })
        console.log(tabelView)
    },[views])
    return (
        <div className='right-block-tabwelding'>
            <div className="tabwelding_header">
                <div className="tabwelding_header_upper">
                    <div className="tabwelding_header_upper_backbtn">Назад</div>
                    <div className="tabwelding_header_upper_title"><span>{getShifr}</span> {getMonth} {getYear}</div>
                    <Link to={`/controll?id=${getId}&shifr=${getShifr}&month=${getMonth}&year=${getYear}`} className="tabwelding_header_upper_controlbtn">Контроль</Link>
                </div>
                <div className="tabwelding_header_newcrewblock">
                    <select className="tabwelding_header_newcrewblock_select" onChange={handleSelect}>
                        <option></option>
                        {weldingCrews.map( (item,index) =>(
                        <option value={item.crew} key={index}>{item.crew}</option>
                    ))}
                    </select>
                    <div className="tabwelding_header_newcrewblock_plusbtn" onClick={() => setCrew(!crew)}>Добавить звено</div>
                </div>
            </div>
            <div className="tabwelding_slice"></div>
            <div className="tabwelding_crews">
                {weldingCrews.map( (item,index) =>(
                <div className="tabwelding_crews_block" key={index} onClick={e => {activetedCrew(e.target, item)}}>{item.crew}</div>
                ))}
            </div>
            <div className="tabwelding_slice"></div>
            <div className="tabwelding_viewswork">
                <div className="tabwelding_viewswork_upper">
                    <div className="tabwelding_viewswork_upper_title">Виды работ</div>
                    <div className="tabwelding_viewswork_upper_plusbtn">Добавить вид</div>
                    <div onClick={() => alert(tabelView)} className="tabwelding_viewswork_upper_date">сегодня: 01-01-2024</div>
                </div>
            </div>
            <TabelViewsWork getTabel={tabelView} active={crewName} idobj={getId} shifr={getShifr} month={getMonth} year={getYear}/>
            <div className="tabwelding_slice"></div>
            <div className="tabwelding_tabel">
                <div className="tabwelding_tabel_upper">
                    <div className="tabwelding_tabel_upper_title">Табель</div>
                    <div className="tabwelding_tabel_upper_plus">Добавить</div>
                </div>
                <TabelMans  peoples={tabMans} active={crewName} idobj={getId} shifr={getShifr} month={getMonth} year={getYear}/>
            </div>

            {/*<NewCrewModal sel={select} active={crew} setActive={setCrew}/>*/}
            <ModalWin data={<NewCrewModal sel={select} active={crew} setActive={setCrew}/>} active={crew} setActive={setCrew}/>
        </div>
    )
}