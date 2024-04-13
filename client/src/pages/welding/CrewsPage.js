import React, {useContext} from "react";
import Navbar from "../../components/old/Navbar";
import Objs from "../../components/welding/mainpage/Objs";
import BridgeLeftBar from "../../components/leftbar/BridgeLeftBar";
import {DataContext} from "../../context/DataContext";
import Crews from "../../components/welding/crews/Crews";



export const CrewsPage = () => {
    const {mass_create,menu_mass} = useContext(DataContext)
    return (
        <div className='container'>
            <Navbar/>
            <div id='DocumentPage' >
                <BridgeLeftBar arrcreate={mass_create} arrmenu={menu_mass}/>
                <Crews />
            </div>
        </div>
    )
}
