import React, {useContext} from "react";
import { DataContext } from '../../context/DataContext';
import Navbar from "../../components/old/Navbar";
import SearchObj from "../../components/old/SearchObj";
import ChangeObj from "../../components/old/ChangeObj";
import BridgeLeftBar from "../../components/leftbar/BridgeLeftBar";
import MyObjs from "../../components/objs/MyObjs";
import {Link} from "react-router-dom";
import DriveProject from "../../components/objs/DriveProject";

export default function Thisproject(){
    const { mass_create, menu_mass, my_objs} = useContext(DataContext)

    const pageName = 'objects' // передаю в компонент с объектами для изменения ссылки линка

    return (
        <div className='container'>
            <Navbar/>
            <div id='ObjectPage' >
                <BridgeLeftBar arrcreate={mass_create} arrmenu={menu_mass}/>
                <DriveProject mass={my_objs} page={pageName}/>
            </div>
        </div>
    )
}
