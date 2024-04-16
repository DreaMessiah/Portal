import {MainHeader} from "../../components/header/Mainheader";
import {WorkPage} from "../../components/workpage/WorkPage";
import {Mainnavbar} from "../../components/navbar/Mainnavbar";
import {useContext} from "react";
import {DataContext} from "../../context/DataContext";
import React from "react";
import {WelThisObj} from "../../components/welding/yearmounth/WelThisObj";
import {NewCrewS} from "../../components/welding/crews/NewCrew";
import Buttons from "../../components/economist/Buttons";
import {Menuhr} from "./Menuhr";

export function HrMenu(){

    const { mass_create, menu_mass, my_objs} = useContext(DataContext)

    const pageName = 'objects' // передаю в компонент с объектами для изменения ссылки линка

    return (
        <div className='new_container'>
            <div className="up_path"><MainHeader /></div>
            <div className="main_path">
                <Mainnavbar />
                <WorkPage data={<Menuhr/>}/>
            </div>
        </div>
    )
}