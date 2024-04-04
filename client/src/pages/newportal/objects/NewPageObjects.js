import "../../styles/newportal/main.scss"
import {MainHeader} from "../../../components/newportal/header/Mainheader";
import {WorkPage} from "../../../components/newportal/workpage/WorkPage";
import {Mainnavbar} from "../../../components/newportal/navbar/Mainnavbar";
import LkNew from "../../../components/newportal/lknew/LkNew";
import {useContext} from "react";
import {DataContext} from "../../../context/DataContext";
import MyObjs from "../../../components/objs/MyObjs";
import React from "react";
import MyListObjs from "../../../components/newportal/objs/MyObjs";

export default function NewPageObjects(){

    const { mass_create, menu_mass, my_objs} = useContext(DataContext)

    const pageName = 'objects' // передаю в компонент с объектами для изменения ссылки линка

    return (
        <div className='new_container'>
            <div className="up_path"><MainHeader /></div>
            <div className="main_path">
                <Mainnavbar />
                <WorkPage data={<MyListObjs mass={my_objs} page={pageName}/>}/>
            </div>
        </div>
    )
}
