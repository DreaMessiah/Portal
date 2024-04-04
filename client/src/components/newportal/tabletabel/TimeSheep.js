import React, {useContext, useEffect, useState} from "react";
import "../welding/tabelwelding/tabelform.scss";
import "../welding/tabelwelding/tabviewwork1920.scss";
import "../welding/tabelwelding/tabviewwork1550.scss";
import "../welding/tabelwelding/tabviewwork1080.scss";
import {useLocation} from "react-router-dom";
import {TimeSheepList} from "./TimeSheepList";
import {useMonth} from "../../../hooks/month.hook";
import ObjsService from "../../../services/ObjsService";
import {Context} from "../../../index";



export const TimeSheepPortal = () => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    let getId = searchParams.get('id');
    let getShifr = searchParams.get('shifr');
    let getMonth = searchParams.get('month');
    let getYear = searchParams.get('year');
    const  {store} = useContext(Context)
    const inn = store.user.inn
    const login = store.user.login
    //let tabelView = []
    let tabelMans = []

    const pushMonth = useMonth()

    const [listObjs, setListObjs] = useState([])
    const [listMans, setListMans] = useState([])

    console.log(getId)
    console.log(getMonth)
    console.log(getYear)

    const getMyObj = (num, param) => {
        let getParam
        listObjs.forEach(obj => {
            if(obj.id === parseInt(num)){
                getParam = obj[param]
            }
        })
        return getParam
    }


    const viewAllObjs = async (e) => {

        const viewList = await ObjsService.getObjs({inn})
        setListObjs(viewList.data)
        console.log(viewList.data)
    }


    const t13List = async (e) => {

        let month = pushMonth(getMonth)
        let year = getYear

        const listMans = await ObjsService.getT13({inn, month, year})
        setListMans(listMans.data)
        console.log(listMans.data)
    }

    useEffect(() => {
        viewAllObjs()
        t13List()
    }, [])

    return (
        <div className='right-block-tabwelding'>
            <div className="tabwelding_header">
                <div className="tabwelding_header_upper">
                    <div className="tabwelding_header_upper_backbtn">Назад</div>
                    <div className="tabwelding_header_upper_title"><span>{getMyObj(getShifr, 'shifr')}</span> {pushMonth(getMonth)} {getYear}</div>
                    <div className="tabwelding_header_upper_controlbtn">Контроль</div>
                </div>
                <div className="tabwelding_header_newcrewblock">
                    <select className="tabwelding_header_newcrewblock_select">
                        {/*<select className="tabwelding_header_newcrewblock_select" onChange={handleSelect}>*/}
                        <option></option>
                        {listMans.map((man, index) => {return(
                            <option key={index} value={man.tn}>{man.name} | {man.developer}</option>
                        )})}
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