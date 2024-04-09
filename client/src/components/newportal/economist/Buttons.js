import React, { useEffect, useState } from "react";
import "./economist.scss";
import {Link, useHistory, useLocation} from "react-router-dom";
import {useContext} from "react";
import {DataContext} from "../../../context/DataContext";
import {ModalWin} from "../../modalwin/ModalWin";
import ObjsService from "../../../services/ObjsService";
import {Context} from "../../../index";

export default function Buttons() {

    return (
        <div className='right-block'>
            <div className='top-box'>
            </div>
            <div className='btn_projects'>
                    <div className='btn_project_block'><i className="fa-solid fa-bars"/> gdfg</div>
            </div>
        </div>



    )
}