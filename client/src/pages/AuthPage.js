import React, {useContext, useEffect, useState} from "react";
import {Link,useLocation} from 'react-router-dom';
import {Context} from "../index";
import {observer} from "mobx-react-lite";

function AuthPage(){
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const {store} = useContext(Context)

    const handleSubmit = (event) => {
        //event.preventDefault();
    };
    return (
            <div className='auth'>
                <div className='auth_back'>
                    <div className='auth_form'>
                        <div className='logo'></div>
                        <div className='inauth'>
                            <input type="text" placeholder='Имя пользователя:' value={login} onChange={e => setLogin(e.target.value)} autoComplete="off"/>
                            <input type="password" placeholder='Пароль' value={password} onChange={e => setPassword(e.target.value)} autoComplete="off" />
                            <div className='button' onClick={() => store.login(login,password)} >Войти</div>
                        </div>
                    </div>
                </div>
            </div>

    )
}
export default observer(AuthPage)