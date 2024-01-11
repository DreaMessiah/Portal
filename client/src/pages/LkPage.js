import React from "react";
import Navbar from "../components/Navbar";
import LeftMenuObj from "../components/LeftMenuObj";
import CreateObj from "../components/CreateObj";


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
export default function LkPage(){
    return (
        <div>
            <Navbar/>
            <div className='container'>
                <div className='left_block'>
                    <CreateObj mass={mass_create} />
                    <LeftMenuObj mass={menu_mass} />
                </div>
                <div className='right-block'>
                    123
                </div>
            </div>
        </div>

    );
};
