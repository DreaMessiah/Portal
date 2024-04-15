import {MainHeader} from "../../components/header/Mainheader";
import {WorkPage} from "../../components/workpage/WorkPage";
import {Mainnavbar} from "../../components/navbar/Mainnavbar";
import {useContext} from "react";
import {DataContext} from "../../context/DataContext";
import React from "react";
import MyListObjs from "../../components/objs/MyObjs";

export default function NewPageObjects(){

    const {my_objs} = useContext(DataContext)

    const pageName = 'objects'

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
