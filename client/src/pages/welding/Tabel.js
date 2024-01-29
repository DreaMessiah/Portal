import React, {useEffect, useRef} from "react";
import Navbar from "../../components/Navbar";
import {Tabelform} from "../../components/welding/tabelwelding/Tabelform";
import BridgeLeftBar from "../../components/leftbar/BridgeLeftBar";



export const Tabel = () => {

    // const params = new URLSearchParams(window.location.search).get(
    //     "id",
    //     "mounth",
    //     "year"
    // );

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
                <BridgeLeftBar arrcreate={mass_create} arrmenu={menu_mass}/>

                <Tabelform />

            </div>

        </div>
    )
}
