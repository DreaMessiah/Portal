import React, {useContext} from "react";
import {DataContext} from "../../context/DataContext";
import Navbar from "../../components/Navbar";
import DocumentWay from "../../components/DocumentWay";
import SearchObj from "../../components/SearchObj";
import ChangeObj from "../../components/ChangeObj";
import WrapButtonsObj from "../../components/WrapButtonsObj";
import WorksTasksObj from "../../components/WorkTasksObj";
import AttachObj from "../../components/AttachObj";
import PerformersObj from "../../components/PerformersObj";
import ResultsObj from "../../components/ResultsObj";
import BridgeLeftBar from "../../components/leftbar/BridgeLeftBar";
import {useLocation} from "react-router-dom";

export default function TestTaskPage(){
    const {mass_create,menu_mass,wrap_buttons,dwm2,attach1,performers,results} = useContext(DataContext)

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const name = searchParams.get('name');
    const task = searchParams.get('task');
    const about = searchParams.get('about');

    console.log(about)

    const taskmass =  {
        status:3,
        datestart:'19.01.2024',
        dateend:'25.01.2024',
        key:'1044-5',
        level:3,
        link:'/',
        title: task,
        text: about
    }
    const performersmass = {
        main: {
            name:name,
            date:'12.09.2023 / 12:33',
            job:'Зам. главного механика'
        },
        works: {
            1:{
                name: task,
                link: '/'
            },

        },
        people: {

        }
    }
    const dwm = {
        1: {
            name: 'Мое Имя Пользователя',
            date: '12.09.2023 / 12:33',
            job: 'Моя должность',
            status: 'Поставлена задача',
            next: [2]
        },
        2: {
            name: name,
            date: '12.09.2023 / 12:33',
            job: 'Механик',
            status: 'Ожидание',
            next: null
        },

    }
    return (
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
                    <div className='next-box'>
                        <div className='left-box'>
                            <DocumentWay dwm1={dwm}/>
                        </div>
                        <div className='right-box'>
                            <div className='top-box-inside'>
                                <div className='top-box-inside-left'>
                                    <WorksTasksObj obj={taskmass}/>
                                    <AttachObj obj={attach1}/>
                                </div>
                                <div className='top-box-inside-right'>
                                    <PerformersObj obj={performersmass}/>
                                </div>
                            </div>
                            <div className='bottom-box'>
                                <ResultsObj obj={results}/>
                                <div className='docbuttons'>
                                    <div className='button'><p>Подписать/Направить</p></div>
                                    <div className='button'><p>Вернуть на доработку</p></div>
                                    <div className='button'><p>Закрыть</p></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
