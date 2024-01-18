import React, {useContext} from "react";
import Navbar from "../../components/Navbar";
import {Objs} from "../../components/welding/mainpage/Objs";
import BridgeLeftBar from "../../components/leftbar/ BridgeLeftBar";
import {DataContext} from "../../context/DataContext";



export const Weldingmain = () => {
        const {mass_create,menu_mass} = useContext(DataContext)
        return (
            <div className='container'>
                    <Navbar/>
                    <div id='DocumentPage' >
                            <BridgeLeftBar arrcreate={mass_create} arrmenu={menu_mass}/>
                            <Objs />
                    </div>
            </div>
        )
}
