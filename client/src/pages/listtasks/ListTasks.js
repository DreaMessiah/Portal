import React, {useContext} from "react";
import Navbar from "../../components/old/Navbar";
import {Tabelform} from "../../components/welding/tabelwelding/Tabelform";
import BridgeLeftBar from "../../components/leftbar/BridgeLeftBar";
import {DataContext} from "../../context/DataContext";
import {TableTasks} from "../../components/listtasks/ListTask";



export const ListTasks = () => {
    const {mass_create, menu_mass} = useContext(DataContext)

    // const params = new URLSearchParams(window.location.search).get(
    //     "id",
    //     "mounth",
    //     "year"
    // );

    return (
        <div className='container'>
            <Navbar/>
            <div id='DocumentPage' >
                <BridgeLeftBar arrcreate={mass_create} arrmenu={menu_mass}/>
                <TableTasks />
            </div>
        </div>
    )
}
