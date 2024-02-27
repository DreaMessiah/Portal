import React, {useContext} from "react";
import { DataContext } from '../../context/DataContext';
import Navbar from "../../components/Navbar";
import SearchObj from "../../components/SearchObj";
import ChangeObj from "../../components/ChangeObj";
import BridgeLeftBar from "../../components/leftbar/BridgeLeftBar";
import ListObjs from "../../components/welding/mainpage/ListObjs";
import BlocksObj from "../../components/BlocksObj";

export default function ChatPage(){
    const { mass_create, menu_mass,mass_blocks_admin} = useContext(DataContext)
    return (
        <div className='container'>
            <Navbar/>
            <div id='ObjectPage' >
                <BridgeLeftBar arrcreate={mass_create} arrmenu={menu_mass}/>
                <div className='right-block'>
                    <div className='top-box'>
                        <div className='left-box'>
                            <div className='video'>

                            </div>
                        </div>
                        <div className='right-box'>

                        </div>
                    </div>
                    <div className='next-box'>

                    </div>
                </div>
            </div>
        </div>
    )
}
