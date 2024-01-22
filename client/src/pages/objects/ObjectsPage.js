import React, {useContext} from "react";
import { DataContext } from '../../context/DataContext';
import Navbar from "../../components/Navbar";
import SearchObj from "../../components/SearchObj";
import ChangeObj from "../../components/ChangeObj";
import BridgeLeftBar from "../../components/leftbar/ BridgeLeftBar";
import MyObjs from "../../components/objs/MyObjs";

export default function ObjectsPage(){
    const { mass_create, menu_mass, my_objs} = useContext(DataContext)

    const pageName = 'objects' // передаю в компонент с объектами для изменения ссылки линка

    return (
        <div className='container'>
            <Navbar/>
            <div id='ObjectPage' >
                <BridgeLeftBar arrcreate={mass_create} arrmenu={menu_mass}/>
                <div className='right-block'>
                    <div className='top-box'>
                        <div className='left-box'>
                            <div className='button'><p>Добавить обьект</p> <i className='fa-regular fa-plus'></i></div>
                            <SearchObj/>
                        </div>
                        <div className='right-box'>
                            <ChangeObj/>
                        </div>
                    </div>

                    <div className='next-box'>
                        {/* 
                            Здесь оставляем в таком же виде объекты, только подгружаем другой массив
                            Пользователь который управляет каким либо объектом видит только его, 
                            но у кого есть доступ для работы со сторонними модулями по типу "Сварочные работы",
                            через раздел сварочные работы может видеть объекты (проекты) переданные ему в работу.
                            Т.е. перейдя в раздел сварочные работы он может видеть и не свои объекты, но они конкретно переходят на сварочные работы.
                            Это сделано например для сварочного отдела, у кого в управлении только их отдел, но они мониторят все объекты по сварке или например ЛНК
                        */}
                        {/* <ListObjs mass={objs}/> */} {/* Если захочешь вернуть на место */}

                        {/* Я скопировал объекты в другой компонент, возможно для сварщиков я тоже его буду использовать */}
                        <MyObjs mass={my_objs} page={pageName}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
