import React, {useContext} from "react";
import { DataContext } from '../../context/DataContext';
import Navbar from "../../components/old/Navbar";
import SearchObj from "../../components/old/SearchObj";
import ChangeObj from "../../components/old/ChangeObj";
import BridgeLeftBar from "../../components/leftbar/BridgeLeftBar";
import ListObjs from "../../components/welding/mainpage/ListObjs";
import BlocksObj from "../../components/old/BlocksObj";

export default function AdminDashboardPage(){
    const { mass_create, menu_mass,mass_blocks_admin} = useContext(DataContext)
    return (
        <div className='container'>
            <Navbar/>
            <div id='ObjectPage' >
                <BridgeLeftBar arrcreate={mass_create} arrmenu={menu_mass}/>
                <div className='right-block'>
                    <div className='top-box'>
                        <div className='left-box'>
                            <div className='button'><p>Создать обьект</p> <i className='fa-regular fa-plus'></i></div>
                            <SearchObj/>
                        </div>
                        <div className='right-box'>
                            <ChangeObj/>
                        </div>
                    </div>
                    <div className='next-box'>
                        <BlocksObj mass={mass_blocks_admin} />
                    </div>
                </div>
            </div>
        </div>
    )
}
