import React, {useEffect, useRef} from "react";
import Navbar from "../../components/Navbar";
import DocumentWay from "../../components/DocumentWay";
import SearchObj from "../../components/SearchObj";
import ChangeObj from "../../components/ChangeObj";
import CreateObj from "../../components/leftbar/CreateObj";
import LeftMenuObj from "../../components/leftbar/LeftMenuObj";
import WrapButtonsObj from "../../components/WrapButtonsObj";
import WorksTasksObj from "../../components/WorkTasksObj";
import AttachObj from "../../components/AttachObj";
import PerformersObj from "../../components/PerformersObj";
import ResultsObj from "../../components/ResultsObj";
import BridgeLeftBar from "../../components/leftbar/ BridgeLeftBar";

const task1 = {
    status:3,
    datestart:'01.01.2024',
    dateend:'10.01.2024',
    key:'1044-5',
    level:3,
    link:'/',
    title:'Замена магистрального нефтепровода',
    text:'На объекте «Нефтепровод Холмогоры-Клин 1220 мм 213-328 км. Замена трубы на ПП через пр. Бол. Сонторова, 325,1-325,75 км. Сургутское УМН. Техническое перевооружение» была выполнена замена участка основной нитки магистрального нефтепровода «Холмогоры -Клин» с укладкой нового участка трубопровода в створ существующего. На всем протяжении была выполнена подземная прокладка нефтепровода. Строительство трубопровода через водные преграды осуществлено траншейным способом.'
}
const attach1 = {
    1:{
        name:'план',
        type:'pdf',
        link:'/'
    },
    2:{
        name:'согласование',
        type:'pdf',
        link:'/'
    },
    3:{
        name:'расчеты',
        type:'pdf',
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
        type:'pdf',
        link:''
    },
    7:{
        name:'приложение3',
        type:'xlsx',
        link:''
    },
    8:{
        name:'приложение4',
        type:'xlsx',
        link:''
    },
    9:{
        name:'приложение5',
        type:'pdf',
        link:''
    },
    10:{
        name:'приложение6',
        type:'xlsx',
        link:''
    },
    11:{
        name:'приложение7',
        type:'xlsx',
        link:''
    },
    12:{
        name:'приложение8',
        type:'pdf',
        link:''
    }
}
const performers = {
    main: {
        name:'Петров Владимир Владимирович',
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
            name: 'Сварка швов',
            link: '/'
        },
        4:{
            name: 'Капание лопатой',
            link: '/'
        },
        5:{
            name: 'Укладка кирпича',
            link: '/'
        },
        6:{
            name: 'Расчет объема и стоимости материалов',
            link: '/'
        },
        7:{
            name: 'Покраска стены',
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
        },
        3:{
            name: 'Васильев Иван Иванович',
            job: 'Технолог'
        },
        4:{
            name: 'Дурашкин Михаил Петрович',
            job: 'Диспетчер'
        },
        5:{
            name: 'Козюлькин Вячеслав Валерьевич',
            job: 'Администратор'
        }
    }
}
const results = {
    attaches:attach1,
    text:'Для питания сварочной дуги может использоваться переменный, постоянный и пульсирующий виды электрического тока. При сварке на переменном токе из-за изменения направления его течения каждый из электродов попеременно является то анодом, то катодом. При сварке на постоянном и пульсирующем токе различают прямую и обратную полярности. При прямой полярности свариваемые детали подсоединяют к положительному полюсу источника питания (аноду), а электрод — к отрицательному (катоду); при обратной полярности — наоборот — к положительному полюсу подключается электрод, а детали — к отрицательному. Использование того или иного вида тока определяет особенности процесса сварки. Так, дуга на переменном токе гаснет каждый раз, когда ток переходит через ноль. Применение той или иной полярности изменяет тепловой баланс дуги (при прямой полярности больше тепла выделяется на изделии, при обратной — на электроде, см. ниже). При использовании пульсирующего тока путём изменения его параметров (частоты и длительности импульсов) появляется возможность вплоть до отдельных капель регулировать перенос расплавленного металла от электрода в изделие.'
}
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
        icon:'fa-regular fa-plus',
        url:'/createtask'
    },
    {
        text:'Полученные задания',
        icon:'fa-solid fa-arrow-left',
        url:''
    },
    {
        text:'Ежедневник',
        icon:'fa-regular fa-calendar-days',
        url:''
    },
    {
        text:'Направленные задания',
        icon:'fa-solid fa-arrow-right',
        url:'',
    },
]
const dwm2 =
    {
        1:{
            name:'Иванов Иван Иванович',
            date:'12.09.2023 / 12:33',
            job:'Механик',
            status:'Подписано',
            next:[9]
        },
        9:{
            name:'Романов Сергей Владимирович',
            date:'12.09.2023 / 12:33',
            job:'Зам. главного механика',
            status:'Подписано',
            next:[2]
        },
        2:{
            name:'Семенов Сергей Владимирович',
            date:'12.09.2023 / 12:33',
            job:'Зам. главного механика',
            status:'Подписано',
            next:[3,4,5]
        },
        3:{
            name:'Андреев Андрей Андреевич',
            date:'12.09.2023 / 12:33',
            job:'Начальник',
            status:'Подписано',
            next:[6]
        },
        4:{
            name:'Константинов Константин Константинович',
            date:'12.09.2023 / 12:33',
            job:'Начальник',
            status:'Подписано',
            next:[6]
        },
        5:{
            name:'Макаров Александр Владимирович',
            date:'12.09.2023 / 12:33',
            job:'Генеральный директор',
            status:'Подписано',
            next:[6]
        },
        6:{
            name:'Гаврилова Наталья Владимировна',
            date:'12.09.2023 / 12:33',
            job:'Главный бухгалтер',
            status:'Подписано',
            next:[7]
        },
        7:{
            name:'Кузнецова Татьяна Александровна',
            date:'12.09.2023 / 12:33',
            job:'Бухгалтер',
            status:'Подписано',
            next:null
        }
    }

export default function CreateTaskPage(){
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

                        </div>
                        <div className='right-box'>
                            <div className='top-box-inside'>
                                <div className='top-box-inside-left'>

                                </div>
                                <div className='top-box-inside-right'>

                                </div>
                            </div>
                            <div className='bottom-box'>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
