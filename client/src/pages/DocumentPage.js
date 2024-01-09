import React, {useEffect, useRef} from "react";
import Navbar from "../components/Navbar";
import DocumentWay from "../components/DocumentWay";
import Createobj from "../components/CreateObj";
import LeftMenuObj from "../components/LeftMenuObj";
import SearchObj from "../components/SearchObj";
import ChangeObj from "../components/ChangeObj";
import WrapButtonsObj from "../components/WrapButtonsObj";
import WorksTasksObj from "../components/WorkTasksObj";
import AttachObj from "../components/AttachObj";
import PerformersObj from "../components/PerformersObj";
import ResultsObj from "../components/ResultsObj";

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
const wrap_buttons = [
    {
        text:'Создать задачу',
        icon:'fa-regular fa-plus'
    },
    {
        text:'Полученные задания',
        icon:'fa-solid fa-arrow-left'
    },
    {
        text:'Ежедневник',
        icon:'fa-regular fa-calendar-days'
    },
    {
        text:'Направленные задания',
        icon:'fa-solid fa-arrow-right'
    },
]
const task1 = {
        status:3,
        datestart:'01.01.2024',
        dateend:'10.01.2024',
        key:'1044-5',
        level:3,
        link:'/',
        title:'Отремонтировать технику',
        text:'Первым этапом капитального ремонта является разборка и очистка двигателя. Затем нужно выполнить дефектовку, включающую в себя оценку выработки, измерение зазоров, проверку состояния головки блока цилиндров, блока цилиндров и определенных деталей на предмет наличия дефектов и износа, и т.д. После этого производится сравнение состояния деталей с заводскими допусками.'
    }
const attach1 = {
    1:{
        name:'план',
        type:'jpg',
        link:'/'
    },
    2:{
        name:'согласование',
        type:'pdf',
        link:'/'
    },
    3:{
        name:'расчеты',
        type:'xlsx',
        link:'/'
    },
    4:{
        name:'приложение1',
        type:'docx',
        link:''
    },
    5:{
        name:'приложение2',
        type:'docx',
        link:''
    },
    6:{
        name:'статистика',
        type:'xlsx',
        link:''
    },
    7:{
        name:'Зарплатa',
        type:'xlsx',
        link:''
    }
}
const performers = {
    main: {
        name:'Романов Сергей Владимирович',
        date:'12.09.2023 / 12:33',
        job:'Зам. главного механика'
    },
    works: {
        1:{
            name: 'Ремонт техники',
            link: '/'
        },
        2:{
            name: 'Организация планирования процессов',
            link: '/'
        },
        3:{
            name: 'Разработка стратегического развития',
            link: '/'
        },
        4:{
            name: 'Расчет объема и стоимости материалов',
            link: '/'
        },
    },
    people: {
        1:{
            name: 'Труфанова Елена Васильевна',
            job: 'Старший механик'
        },
        2:{
            name: 'Григорьева Екатерина Васильевна',
            job: 'Механик'
        }
    }
}
const results = {
    attaches:attach1,
    text:'Поврежденную при теракте Киева левую часть Крымского моста отремонтировали на один день раньше заявленного срока. Об этом сообщил вице-премьер РФ Марат Хуснуллин. По его словам, движение транспорта полностью возобновлено. «На восстановление нам потребовалось всего 59 дней! На совещании у президента докладывали, что завершим работу к 15 сентября, и точно выдержали график, закончили даже на 1 день раньше!» — написал Хуснуллин в Telegram. Он отметил, что к восстановительным работам приступили уже в день теракта. «Теперь левая часть полностью готова принять поток автомобилей», — заключил Хуснуллин. Взрыв на Крымском мосту произошел в ночь на 17 июля. В результате ЧП обрушились два автомобильных пролета, четыре человека погибли. Национальный антитеррористический комитет (НАК) признал произошедшее терактом ВСУ.'
}
export default function DocumentPage(){
    return (
        <div className='container'>
            <Navbar/>
            <div id='DocumentPage' >
                <div className='left_block'>
                    <Createobj mass={mass_create} />
                    <LeftMenuObj mass={menu_mass} />
                </div>
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
                            <DocumentWay/>
                        </div>
                        <div className='right-box'>
                            <div className='top-box-inside'>
                                <div className='top-box-inside-left'>
                                    <WorksTasksObj obj={task1}/>
                                    <AttachObj obj={attach1}/>
                                </div>
                                <div className='top-box-inside-right'>
                                    <PerformersObj obj={performers}/>
                                </div>
                            </div>
                            <div className='bottom-box'>
                                <ResultsObj obj={results}/>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
