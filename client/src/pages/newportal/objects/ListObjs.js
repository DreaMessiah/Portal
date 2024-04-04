import React, {useContext} from "react";
import { DataContext } from '../../../context/DataContext';
import MyObjs from "../../../components/objs/MyObjs";
import {Link} from "react-router-dom";

export default function ObjectsPage(){
    const { mass_create, menu_mass, my_objs} = useContext(DataContext)

    const pageName = 'objects' // передаю в компонент с объектами для изменения ссылки линка

    return (
        <div className='container'>

                <MyObjs mass={my_objs} page={pageName}/>
        </div>
    )
}
