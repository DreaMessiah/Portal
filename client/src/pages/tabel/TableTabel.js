import React, {useContext} from "react";
import Navbar from "../../components/Navbar";
import BridgeLeftBar from "../../components/leftbar/ BridgeLeftBar";
import {DataContext} from "../../context/DataContext";
import { TabelMY } from "../../components/tabletabel/TabelMY";



export const TableTabel = () => {
    const {mass_create, menu_mass} = useContext(DataContext)
    
    return (
        <div className='container'>
            <Navbar/>
            <div id='DocumentPage' >
                <BridgeLeftBar arrcreate={mass_create} arrmenu={menu_mass}/>
                {/* <TabelMY /> */}
            </div>
        </div>
    )
}
