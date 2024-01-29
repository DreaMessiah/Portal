import React, {useContext, useState} from "react";
import {Link,useLocation} from 'react-router-dom';
import Navbar from "../components/Navbar";
import LeftMenuObj from "../components/leftbar/LeftMenuObj";
import CreateObj from "../components/leftbar/CreateObj";
import BridgeLeftBar from "../components/leftbar/BridgeLeftBar";
import {DataContext} from "../context/DataContext";

export default function LkPage(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passport, setPassport] = useState('');
    const [tel, setTel] = useState('');
    const [mail, setMail] = useState('');
    const [snils, setSnils] = useState('');

    const {menu_mass,mass_create} = useContext(DataContext)

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };
    const handleTelChange = (event) => {
        setTel(event.target.value);
    };
    const handleMailChange = (event) => {
        setMail(event.target.value);
    };
    const handlePassportChange = (event) => {
        setPassport(event.target.value);
    };
    const handleSnilsChange = (event) => {
        setSnils(event.target.value);
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
