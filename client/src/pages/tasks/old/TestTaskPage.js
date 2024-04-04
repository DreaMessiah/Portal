import React, {useContext} from "react";
import {DataContext} from "../../../context/DataContext";
import Navbar from "../../../components/Navbar";
import DocumentWay from "../../../components/DocumentWay";
import SearchObj from "../../../components/SearchObj";
import ChangeObj from "../../../components/ChangeObj";
import WrapButtonsObj from "../../../components/WrapButtonsObj";
import WorksTasksObj from "../../../components/WorkTasksObj";
import AttachObj from "../../../components/AttachObj";
import PerformersObj from "../../../components/PerformersObj";
import ResultsObj from "../../../components/ResultsObj";
import BridgeLeftBar from "../../../components/leftbar/BridgeLeftBar";
import {Link, useLocation} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
import {useMessage} from "../../../hooks/message.hook";

function TestTaskPage(){
    const {mass_create,menu_mass,wrap_buttons,dwm2,attach1,performers,results} = useContext(DataContext)
    const {store} = useContext(Context)
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const name = searchParams.get('name');
    const task = searchParams.get('task');
    const about = searchParams.get('about');
    const message = useMessage()
    const currentDate = new Date();

// Получаем компоненты даты и времени
    const day = currentDate.getDate().toString().padStart(2, '0'); // День
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Месяц (нумерация начинается с 0)
    const year = currentDate.getFullYear(); // Год
    const hours = currentDate.getHours().toString().padStart(2, '0'); // Часы
    const minutes = currentDate.getMinutes().toString().padStart(2, '0'); // Минуты

// Формируем строку в нужном формате
    const formattedDate = `${day}.${month}.${year} / ${hours}:${minutes}`;
    const formattedDateTo = `${+day+4}.${month}.${year} / ${hours}:${minutes}`;
    const taskmass =  {
        status:3,
        datestart:`${formattedDate}`,
        dateend:`${formattedDateTo}`,
        key:'1044-5',
        level:3,
        link:'/',
        title: task,
        text: about
    }
    const performersmass = {
        main: {
            name:name,
            date:`${formattedDate}`,
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
            name: store.user.full_name,
            date: `${formattedDate}`,
            job: store.t13.developer,
            status: 'Поставлена задача',
            next: [2]
        },
        2: {
            name: name,
            date: `${formattedDateTo}`,
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
                                    <div className='button' onClick={() => message('Документ подписан')}><Link to=''><p>Подписать/Направить</p></Link></div>
                                    <div className='button'><Link to='/docpasslist'><p>Вернуть на доработку</p></Link></div>
                                    <div className='button'><Link to='/docpasslist'><p>Закрыть</p></Link></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default observer(TestTaskPage)