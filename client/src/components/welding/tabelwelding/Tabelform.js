import React,{useContext, useState} from "react";
import "./tabelform.scss";
import "./tabviewwork1920.scss";
import "./tabviewwork1550.scss";
import "./tabviewwork1080.scss";
import {TabelViewsWork} from "./TabelViewsWork";
import {TabelMans} from "./TabelMans";
import {ModalWin} from "../../modalwin/ModalWin";
import {NewCrewModal} from "./modalactive/NewCrewModal";
import {DataContext} from "../../../context/DataContext";



export const Tabelform = () => {
    const {weldingCrews} = useContext(DataContext)

    const [crew, setCrew] = useState(false)

    const [select, setSelect] = useState('отсутствует')

    const handleSelect = e => {
        setSelect(e.target.value)
    }

    return (
        <div className='right-block-tabwelding'>
            <div className="tabwelding_header">
                <div className="tabwelding_header_upper">
                    <div className="tabwelding_header_upper_backbtn">Назад</div>
                    <div className="tabwelding_header_upper_title"><span>386</span>        Январь 2024</div>
                    <div className="tabwelding_header_upper_controlbtn">Контроль</div>
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
                <div className="tabwelding_crews_block bgactive">Бр. Изомова С.Ш.</div>
                <div className="tabwelding_crews_block">Бр. Изомова С.Ш.</div>
                <div className="tabwelding_crews_block">Бр. Изомова С.Ш.</div>
                <div className="tabwelding_crews_block">Бр. Изомова С.Ш.</div>
                <div className="tabwelding_crews_block">Бр. Изомова С.Ш.</div>
                <div className="tabwelding_crews_block">Бр. Изомова С.Ш.</div>
                <div className="tabwelding_crews_block">Бр. Изомова С.Ш.</div>
                <div className="tabwelding_crews_block">Бр. Изомова С.Ш.</div>
            </div>
            <div className="tabwelding_slice"></div>
            <div className="tabwelding_viewswork">
                <div className="tabwelding_viewswork_upper">
                    <div className="tabwelding_viewswork_upper_title">Виды работ</div>
                    <div className="tabwelding_viewswork_upper_plusbtn">Добавить вид</div>
                    <div className="tabwelding_viewswork_upper_date">сегодня: 01-01-2024</div>
                </div>
            </div>
            <TabelViewsWork />
            <div className="tabwelding_slice"></div>
            <div className="tabwelding_tabel">
                <div className="tabwelding_tabel_upper">
                    <div className="tabwelding_tabel_upper_title">Табель</div>
                    <div className="tabwelding_tabel_upper_plus">Добавить</div>
                </div>
                <TabelMans />
            </div>

            {/*<NewCrewModal sel={select} active={crew} setActive={setCrew}/>*/}
            <ModalWin data={<NewCrewModal sel={select} active={crew} setActive={setCrew}/>} active={crew} setActive={setCrew}/>
        </div>
    )
}