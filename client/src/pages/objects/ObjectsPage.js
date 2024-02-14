import React, {useContext} from "react";
import { DataContext } from '../../context/DataContext';
import Navbar from "../../components/Navbar";
import SearchObj from "../../components/SearchObj";
import ChangeObj from "../../components/ChangeObj";
import BridgeLeftBar from "../../components/leftbar/BridgeLeftBar";
import MyObjs from "../../components/objs/MyObjs";
import {Link} from "react-router-dom";

export default function ObjectsPage(){
    const { mass_create, menu_mass, my_objs} = useContext(DataContext)

    const pageName = 'objects' // передаю в компонент с объектами для изменения ссылки линка

    return (
        <div className='container'>
            <Navbar/>
            <div id='ObjectPage' >
                <BridgeLeftBar arrcreate={mass_create} arrmenu={menu_mass}/>
                <MyObjs mass={my_objs} page={pageName}/>
            </div>
        </div>
    )
}
