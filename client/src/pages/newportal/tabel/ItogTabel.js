import "../../styles/newportal/main.scss"
import {MainHeader} from "../../../components/newportal/header/Mainheader";
import {WorkPage} from "../../../components/newportal/workpage/WorkPage";
import {Mainnavbar} from "../../../components/newportal/navbar/Mainnavbar";
import {useContext} from "react";
import {DataContext} from "../../../context/DataContext";
import React from "react";
import {ItogsTabelForm} from "../../../components/newportal/tabletabel/ItogsTabelForm";

export function ItogTabel(){

    const { mass_create, menu_mass, my_objs} = useContext(DataContext)

    const pageName = 'objects' // передаю в компонент с объектами для изменения ссылки линка

    return (
        <div className='new_container'>
            <div className="up_path"><MainHeader /></div>
            <div className="main_path">
                <Mainnavbar />
                <WorkPage data={<ItogsTabelForm/>}/>
            </div>
        </div>
    )
}