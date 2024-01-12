import React, {useEffect, useState} from "react";
import {Link,useLocation} from 'react-router-dom';
import Navbar from "../components/Navbar";
import LeftMenuObj from "../components/leftbar/LeftMenuObj";
import CreateObj from "../components/leftbar/CreateObj";
import BridgeLeftBar from "../components/leftbar/ BridgeLeftBar";

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
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passport, setPassport] = useState('');
    const [tel, setTel] = useState('');
    const [mail, setMail] = useState('');
    const [snils, setSnils] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };
    const handleTelChange = (event) => {
        setUsername(event.target.value);
    };
    const handleMailChange = (event) => {
        setUsername(event.target.value);
    };
    const handlePassportChange = (event) => {
        setUsername(event.target.value);
    };
    const handleSnilsChange = (event) => {
        setUsername(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        //event.preventDefault();
    }
    return (
        <div className='container'>
            <Navbar/>
            <div className='personal-page'>
                <div className='flex'>
                    <BridgeLeftBar arrcreate={mass_create} arrmenu={menu_mass}/>
                    <div className='right-block'>
                        <div className='lk-form'>
                            <label>Имя пользователя</label>
                            <input type="text" placeholder='Barahta' value={username} onChange={handleUsernameChange} autoComplete="off"/>
                            <label>Изменить пароль</label>
                            <input type="password" placeholder='Пароль' value={password} onChange={handlePasswordChange} autoComplete="off" />
                            <input type="password" placeholder='Повторите пароль' value={password} onChange={handlePasswordChange} autoComplete="off" />
                            <label>Паспортные данные</label>
                            <input type="text" placeholder='7777 777777' value={passport} onChange={handlePassportChange} autoComplete="off"/>
                            <label>Снилс</label>
                            <input type="text" placeholder='14339307656' value={snils} onChange={handleSnilsChange} autoComplete="off"/>
                            <label>Электронная почта</label>
                            <input type="text" placeholder='test@mail.ru' value={mail} onChange={handleMailChange} autoComplete="off"/>
                            <label>Номер телефона</label>
                            <input type="text" placeholder='+73462774850' value={tel} onChange={handleTelChange} autoComplete="off"/>

                            <Link to="/" className='button' onClick={handleSubmit}>Обновить</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
