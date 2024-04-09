import "../../styles/newportal/main.scss"
import {MainHeader} from "../../../components/newportal/header/Mainheader";
import {WorkPage} from "../../../components/newportal/workpage/WorkPage";
import {Mainnavbar} from "../../../components/newportal/navbar/Mainnavbar";
import LkNew from "../../../components/newportal/lknew/LkNew";
import {useContext} from "react";
import {DataContext} from "../../../context/DataContext";
import MyObjs from "../../../components/objs/MyObjs";
import React from "react";
import MyListObjs from "../../../components/newportal/objs/MyObjs";
import {TimeSheep} from "../../../components/tabletabel/TimeSheep";
import {TimeSheepPortal} from "../../../components/newportal/tabletabel/TimeSheep";
import {WelThisObj} from "../../../components/newportal/welding/yearmounth/WelThisObj";
import {Tabelform} from "../../../components/welding/tabelwelding/Tabelform";
import {TabelformNew} from "../../../components/newportal/welding/tabelwelding/TabelformNew";

export function WelTabel(){

    const { mass_create, menu_mass, my_objs} = useContext(DataContext)

    const pageName = 'objects' // передаю в компонент с объектами для изменения ссылки линка
    const params = new URLSearchParams(window.location.search).get(
        "id",
        "mounth",
        "year"
    );
    return (
        <div className='new_container'>
            <div className="up_path"><MainHeader /></div>
            <div className="main_path">
                <Mainnavbar />
                <WorkPage data={<TabelformNew  />}/>
            </div>
        </div>
    )
}







// export const WelTabel = () => {
//

//
//     const mass_create = [
//         {
//             link:'/',
//             text:'Создать задачу'
//         },
//         {
//             link:'/',
//             text:'Создать документ'
//         },
//         {
//             link:'/',
//             text:'Создать Проект'
//         },
//         {
//             link:'/',
//             text:'Создать перемещение'
//         }
//     ]
//     const menu_mass = [
//         {
//             link:'/main',
//             text:'Входящие документы',
//             img:'menuimg1',
//             num:4
//         },{
//             link:'/main',
//             text:'Проект (Обновления)',
//             img:'menuimg2',
//             num:1
//         },{
//             link:'/main',
//             text:'Отчеты',
//             img:'menuimg3',
//             num:0
//         },{
//             link:'/main',
//             text:'Статистика',
//             img:'menuimg4',
//             num:0
//         },
//     ]
//
//     return (
//         <div className='container'>
//             <Navbar/>
//             <div id='DocumentPage' >
//                 <BridgeLeftBar arrcreate={mass_create} arrmenu={menu_mass}/>
//
//                 <Tabelform />
//
//             </div>
//
//         </div>
//     )
// }
