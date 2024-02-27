import React, {useContext, useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import OdataService from "../services/OdataService";
import Navbar from "../components/Navbar";
import BridgeLeftBar from "../components/leftbar/BridgeLeftBar";
import {DataContext} from "../context/DataContext";
import WrapButtonsObj from "../components/WrapButtonsObj";
import SearchObj from "../components/SearchObj";
import ChangeObj from "../components/ChangeObj";

import * as XLSX from 'xlsx';

import "../components/listtasks/listtask2.scss";
import NewsFooter from "../components/NewsFooter";
function OdataPage(){
    const {mass_create, menu_mass,wrap_buttons} = useContext(DataContext)
    const [users,setUsers] = useState([])
    const rule = 3
    const loading = async () => {
        try {
            const response = await OdataService.getpeoples()
            if (response.data) {
                //exportToExcel(response.data)
            }
            console.log(response.data)
        }catch (e) {
            console.log(e)
        }
        setUsers(['123'])
    }
    useEffect(()=> {
        const promise = loading()
    },[])

    function exportToExcel(jsonData){
        const wb = XLSX.utils.book_new();
        const ws_name = 'Sheet1';

        const ws_data = jsonData.map( (obj,index) => {
            return [index, obj.Description, obj.Code,obj.ДатаПриема,obj.ДатаУвольнения,obj.ОформленПоТрудовомуДоговору];
        });

        const ws = XLSX.utils.aoa_to_sheet(ws_data);

        XLSX.utils.book_append_sheet(wb, ws, ws_name);

        // Сохраняем файл
        XLSX.writeFile(wb, 'output.xlsx');
    }

    return(
        <div className='container'>
            <Navbar/>
            <div id='DocumentPage' >
                <BridgeLeftBar arrcreate={mass_create} arrmenu={menu_mass}/>
                <div className='right-block'>
                    <div className='top-box'>
                        <div className='left-box'>
                            <WrapButtonsObj mass={wrap_buttons}/>
                            <SearchObj/>
                        </div>
                        <div className='right-box'>
                            <ChangeObj/>
                        </div>
                    </div>
                    {users.length ?
                        <div className='table_list'>
                            <div className='table_list_cap'></div>
                            {users.map( (item,index) => (
                                <div className='table_list_strock' key={index}>
                                    <div className='table_list_strock_datein flex_center'>{item.id}</div>
                                    <div className='table_list_strock_dateto flex_center'>{item.tn}</div>
                                    <div className='table_list_strock_title flex_center'>{item.full_name}</div>
                                    <div className='table_list_strock_status flex_center'>{item.login}</div>
                                    <div className='table_list_strock_category flex_center'>{item.phone}</div>
                                    <div className='table_list_strock_priority flex_center'>{item.email}</div>
                                    <div className='table_list_strock_edit flex_center'>
                                        <div className='edit_task_list_icon'></div>
                                    </div>
                                    <div className='table_list_strock_close flex_center'>
                                        <div className='del_task_list_icon'></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        : ''}
                </div>
            </div>
            <NewsFooter/>
        </div>
    )
}
export default observer(OdataPage)