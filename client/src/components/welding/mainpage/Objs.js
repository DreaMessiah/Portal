import React, {useContext, useEffect, useState} from "react";
import SearchObj from "../../SearchObj";
import ChangeObj from "../../ChangeObj";
import WrapButtonsObj from "../../WrapButtonsObj";
import "./objs.scss";
import ListObjs from "./ListObjs";
import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";
import {Weldingmain} from "../../../pages/welding/Weldingmain";
import {DataContext} from "../../../context/DataContext";
import {ModalWin} from "../../modalwin/ModalWin";
import {NewCrewModal} from "../tabelwelding/modalactive/NewCrewModal";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import {CreateObjModal} from "./CreateObjModal";

const wrap_buttons = [
    {
        text:'Добавить объект',
        icon:'fa-regular fa-plus'
    }
]

function Objs() {

    const  {store} = useContext(Context)

    console.log(store.user.inn)

    const inn = store.user.inn


    const [modal, setModal] = useState(false)

    const {objs} = useContext(DataContext)

    const activeModal = active => {
        if(active === false){
            setModal(!active)
            console.log(modal)
        } else {
            setModal(!active)
            console.log(modal)
        }

    }



    return (
        <div className='right-block-objwelding'>
            <div className='top-box'>
                <div className='left-box'>
                    <div className='wrap-buttons-obj'>
                        {wrap_buttons.map((item,index) => (
                            <div key={index} className='wrap-button' onClick={()=>{activeModal(modal)}}> <p>{item.text}</p> <i className={item.icon}></i></div>
                        ))}
                    </div>
                    {/*<WrapButtonsObj mass={wrap_buttons}/>*/}
                    <SearchObj/>
                </div>
                <div className='right-box'>
                    <ChangeObj/>
                </div>
            </div>
            <div className='next-box'>
                <ListObjs mass={objs}/>
            </div>
            <ModalWin data={<CreateObjModal inn={inn}/>} active={modal} setActive={setModal}/>
            {/*<ModalWin data={<NewCrewModal sel={select} active={crew} setActive={setCrew}/>} active={modal} setActive={setCrew}/>*/}
        </div>
    )
}

export default observer(Objs)