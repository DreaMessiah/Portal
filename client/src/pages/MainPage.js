import {useState} from "react";

import Navbar from "../components/Navbar"
import CreateObj from "../components/leftbar/CreateObj"
import GraphObj from "../components/GraphObj"
import SelectMonth from "../components/SelectMonth"
import CalendarObj from "../components/CalendarObj"
import WorksObj from "../components/WorksObj"
import WorksDocObj from "../components/WorksDocObj"
import WorksTmcObj from "../components/WorksTmcObj"
import LeftMenuObj from "../components/leftbar/LeftMenuObj"
import BlocksObj from "../components/BlocksObj"
import BridgeLeftBar from "../components/leftbar/ BridgeLeftBar";

const mass_blocks = [
    {
        link: '/',
        text: 'Мои задачи планировщик'
    },
    {
        link: '/',
        text: 'Файловый менеджер'
    },
    {
        link: '/',
        text: 'Управление проектами'
    },
    {
        link: '/',
        text: 'Совещания'
    },
    {
        link: '/',
        text: 'ТМЦ Перемещения'
    },
    {
        link: '/',
        text: 'Документо оборот'
    }
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
const titlegraph1 = 'Задачи'
const graphmass1 = [
    {
        text:'Выполнено',
        num:'20'
    },
    {
        text:'В работе',
        num:'18'
    },
    {
        text:'Новые',
        num:'26'
    },
    {
        text:'Просрочено',
        num:'5'
    }]
const titlegraph2 = 'Документы'
const graphmass2 = [
    {
        text:'Исходящие',
        num:'20'
    },
    {
        text:'Входящие',
        num:'18'
    },
    {
        text:'Возвраты',
        num:'26'
    },
    {
        text:'Просрочено',
        num:'5'
    }]
const calendarmass = [
    {
        date:'27.12.2023',
        status:'1',
        title:'Задача №17',
        text:'Забрать картриджы в ДНС'
    }, {
        date:'17.12.2023',
        status:'2',
        title:'Задача №16',
        text:'Сдать отчет по оптимизации бизнес процессов'
    }
]

const works1mass = [
    {
        datestart:'27.12.2023',
        dateend:'10.01.2024',
        viewed:'0',
        level:'повышенный',
        link:'/',
        title:'Задача №17',
        text:'Забрать картриджы в ДНС'
    }, {
        datestart:'27.12.2023',
        dateend:'10.01.2024',
        viewed:'1',
        level:'средний',
        link:'/',
        title:'Задача №16',
        text:'Сдать отчет по оптимизации бизнес процессов? Созвон с Организациями, Подготовить техническое задание'
    }, {
        datestart:'16.12.2023',
        dateend:'18.12.2023',
        viewed:'1',
        level:'средний',
        link:'/',
        title:'Задача №16',
        text:'Сдать отчет по оптимизации бизнес процессов'
    }, {
        datestart:'27.12.2023',
        dateend:'10.01.2024',
        viewed:'1',
        level:'средний',
        link:'/',
        title:'Задача №16',
        text:'Сдать отчет по оптимизации бизнес процессов'
    }
]
const works2mass = [
    {
        datestart:'27.12.2023',
        dateend:'10.01.2024',
        direction:'0',
        level:'средний',
        link:'/',
        title:'Документ поступления',
        name:'Смирнов Петр Васильевич'
    }, {
        datestart:'01.12.2023',
        dateend:'16.12.2023',
        direction:'1',
        level:'повышенный',
        link:'/',
        title:'Отчет за Декабрь',
        name:'Иванов Дмитрий Сергеевич'
    }, {
        datestart:'16.12.2023',
        dateend:'18.12.2023',
        direction:'2',
        level:'повышенный',
        link:'/',
        title:'Справка №12',
        name:'Володин Вячеслав Андреевич'
    }, {
        datestart:'27.12.2023',
        dateend:'10.01.2024',
        direction:'1',
        level:'средний',
        link:'/',
        title:'Отчет',
        name:'Петрова Ирина Владимировна'
    }
]
const works3mass = [
    {
        datestart:'27.12.2023',
        dateend:'10.01.2024',
        direction:'0',
        level:'средний',
        link:'/main',
        title:'Картриджы',
        text:'Краткое описание, краткое описание...',
        status:'в пути'
    }, {
        datestart:'01.12.2023',
        dateend:'16.12.2023',
        direction:'1',
        level:'повышенный',
        link:'/main',
        title:'Трубы',
        text:'Краткое описание, краткое описание...',
        status:'на сборе'
    }, {
        datestart:'16.12.2023',
        dateend:'18.12.2023',
        direction:'0',
        level:'повышенный',
        link:'/main',
        title:'Канцелярия',
        text:'Краткое описание, краткое описание...',
        status:'получен'
    }, {
        datestart:'27.12.2023',
        dateend:'10.01.2024',
        direction:'1',
        level:'средний',
        link:'/main',
        title:'Болтики',
        text:'Краткое описание, краткое описание...',
        status:'доставлен'
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

export default function MainPage(){
    const [selMonth,setSelMonth] = useState(9)
    const onRightClick = () => {
        if(selMonth === 12) setSelMonth(1)
        else setSelMonth(selMonth+1)
    }
    const onLeftClick = () => {
        if(selMonth === 1) setSelMonth(12)
        else setSelMonth(selMonth-1)
    }

    return (
        <div className='container'>
            <Navbar/>
            <div className='flex'>
                <BridgeLeftBar arrcreate={mass_create} arrmenu={menu_mass}/>
                <div className='right_block'>
                    <div className='stroka'>
                        <BlocksObj mass={mass_blocks} />

                        <div className='rows'>
                            <SelectMonth selectedMonth={selMonth} onLeftClick={onLeftClick} onRightClick={onRightClick}/>
                            <GraphObj mass={graphmass1} title={titlegraph1}/>
                            <GraphObj mass={graphmass2} title={titlegraph2}/>
                        </div>

                        <CalendarObj mass={calendarmass}/>
                    </div>
                    <p className='title'>Актуальные задачи</p>
                    <WorksObj mass={works1mass}/>
                    <p className='title'>Документы в движении</p>
                    <WorksDocObj mass={works2mass}/>
                    <p className='title'>Движения ТМЦ</p>
                    <WorksTmcObj mass={works3mass}/>
                </div>
            </div>
        </div>
    );
};
