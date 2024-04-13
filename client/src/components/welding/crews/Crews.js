import React, {useContext, useEffect, useState} from "react";
import SearchObj from "../../old/SearchObj";
import ChangeObj from "../../old/ChangeObj";
import WrapButtonsObj from "../../old/WrapButtonsObj";
import "./crews.scss";
// import ListObjs from "./ListObjs";
import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";
import {Weldingmain} from "../../../pages/welding/Weldingmain";
import {DataContext} from "../../../context/DataContext";
import {ModalWin} from "../../modalwin/ModalWin";
import {NewCrewModal} from "../tabelwelding/modalactive/NewCrewModal";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
// import {CreateObjModal} from "./CreateObjModal";
import WeldingService from "../../../services/WeldingService";
import {NewCrew} from "./NewCrew";


function Crews() {

    const  {store} = useContext(Context)

    console.log(store.user.inn)

    const inn = store.user.inn
    const login = store.user.login




    const [modal, setModal] = useState(false)


    const activeModal = active => {
        if(active === false){
            setModal(!active)
            // setTitle('Добавить объект')
            console.log(modal)
        } else {
            setModal(!active)
            console.log(modal)
        }

    }



    return (
        <div className='right-block-objwelding'>
            {/*<div className='top-box'>*/}
            {/*    <div className='left-box'>*/}
            {/*        <div className='wrap-buttons-obj'>*/}

            {/*            /!*<div className='wrap-button' onClick={()=>{activeModal(modal)}}> <p>Добавить объект</p> <i className='fa-regular fa-plus'></i></div>*!/*/}
            {/*            /!*<Link className='wrap-button' to='/crews'> <p>Звенья / Бригады</p> </Link>*!/*/}

            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div className='next-box'>
                <NewCrew />
            </div>
            {/*<ModalWin active={modal} setActive={setModal}/>*/}

        </div>
    )
}

export default observer(Crews)