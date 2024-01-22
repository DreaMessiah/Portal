import React, {useContext, useState} from "react";
import SearchObj from "../../SearchObj";
import ChangeObj from "../../ChangeObj";
import WrapButtonsObj from "../../WrapButtonsObj";
import "./objs.scss";
import ListObjs from "./ListObjs";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Weldingmain} from "../../../pages/welding/Weldingmain";
import {DataContext} from "../../../context/DataContext";

const wrap_buttons = [
    {
        text:'Добавить объект',
        icon:'fa-regular fa-plus'
    }
]

export const Objs = () => {
    const {objs} = useContext(DataContext)

    return (
        <div className='right-block-objwelding'>
            <div className='top-box'>
                <div className='left-box'>
                    <WrapButtonsObj mass={wrap_buttons}/>
                    <SearchObj/>
                </div>
                <div className='right-box'>
                    <ChangeObj/>
                </div>
            </div>
            <div className='next-box'>
                <ListObjs mass={objs}/>
            </div>
        </div>
    )
}