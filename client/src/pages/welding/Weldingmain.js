import React, {useEffect, useRef} from "react";
import Navbar from "../../components/Navbar";
import DocumentWay from "../../components/DocumentWay";

import SearchObj from "../../components/SearchObj";
import ChangeObj from "../../components/ChangeObj";
import Createobj from "../../components/CreateObj";
import LeftMenuObj from "../../components/LeftMenuObj";



export const Weldingmain = () => {

        const mass_create = [
                {
                        link:'/',
                        text:'Создать задачу'
                },
                {
                        link:'/',
                        text:'Создать документ'
                },
                {
                        link:'/',
                        text:'Создать Проект'
                },
                {
                        link:'/',
                        text:'Создать перемещение'
                }
        ]
        const menu_mass = [
                {
                        link:'/main',
                        text:'Входящие документы',
                        img:'menuimg1',
                        num:4
                },{
                        link:'/main',
                        text:'Проект (Обновления)',
                        img:'menuimg2',
                        num:1
                },{
                        link:'/main',
                        text:'Отчеты',
                        img:'menuimg3',
                        num:0
                },{
                        link:'/main',
                        text:'Статистика',
                        img:'menuimg4',
                        num:0
                },
        ]

    return (
        <div className='container'>
                <Navbar/>
                <div id='DocumentPage' >
                        <div className='left_block'>
                                <Createobj mass={mass_create} />
                                <LeftMenuObj mass={menu_mass} />
                        </div>
                        <div className='right-block'>
                                
                        </div>
                </div>

        </div>
    )
}
