import React, {useContext, useEffect, useState} from "react";
import "../welding/tabelwelding/tabelform.scss";
import "../welding/tabelwelding/tabviewwork1920.scss";
import "../welding/tabelwelding/tabviewwork1550.scss";
import "../welding/tabelwelding/tabviewwork1080.scss";
import {useLocation} from "react-router-dom";
import {TimeSheepList} from "./TimeSheepList";



export const TimeSheep = () => {

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

    return (
        <div className='right-block-tabwelding'>
            <div className="tabwelding_header">
                <div className="tabwelding_header_upper">
                    <div className="tabwelding_header_upper_backbtn">Назад</div>
                    <div className="tabwelding_header_upper_title"><span>{getShifr}</span> {getMonth} {getYear}</div>
                    <div className="tabwelding_header_upper_controlbtn">Контроль</div>
                </div>
                <div className="tabwelding_header_newcrewblock">
                    <select className="tabwelding_header_newcrewblock_select">
                        {/*<select className="tabwelding_header_newcrewblock_select" onChange={handleSelect}>*/}
                        <option></option>
                        {/*{weldingCrews.map( (item,index) =>(*/}
                        {/*    <option value={item.crew} key={index}>{item.crew}</option>*/}
                        {/*))}*/}
                    </select>
                    <div className="tabwelding_header_newcrewblock_plusbtn">Добавить сотрудника</div>
                    {/*<div className="tabwelding_header_newcrewblock_plusbtn" onClick={() => setCrew(!crew)}>Добавить звено</div>*/}
                </div>
            </div>
            <div className="tabwelding_slice"></div>
            <div className="tab_tabel">
                <TimeSheepList />
            </div>
            {/*<ModalWin data={<NewCrewModal sel={select} active={crew} setActive={setCrew}/>} active={crew} setActive={setCrew}/>*/}
        </div>
    )
}