import React, { useEffect, useState } from "react";
import "./economist.scss";
import {Link, useHistory, useLocation} from "react-router-dom";
import {useContext} from "react";
import {DataContext} from "../../../context/DataContext";
import {ModalWin} from "../../modalwin/ModalWin";
import ObjsService from "../../../services/ObjsService";
import {Context} from "../../../index";

export default function Buttons({text,icon,url}) {

    return (
        <div className='btn_projects'>
            <Link to={url} className='btn_project_block'><i className={icon} />{text}</Link>
        </div>
    )
}