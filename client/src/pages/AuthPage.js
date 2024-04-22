import React, {useContext, useEffect, useState} from "react";
import {Link,useLocation} from 'react-router-dom';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {useMessage} from "../hooks/message.hook";
import {ToastContainer} from "react-toastify";

function AuthPage(){
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [empty,setEmpty] = useState(false)

    const {store} = useContext(Context)
    const message = useMessage()

    const handleSubmit = async (event) => {
        event.preventDefault()
        const promise = await store.login(login.toLowerCase(),password)

        if(promise?.response?.data?.message){
            setEmpty(true)
            message(promise.response.data.message)
        }else{
            setEmpty(false)
        }
    }
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Enter') {
                event.preventDefault()
                handleSubmit(event)
            }
        }
        document.addEventListener('keydown', handleKeyDown)
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [handleSubmit])

    return (
            <div className='auth'>
                <div className='auth_back'>
                    <div className='auth_form'>
                        <div className='logo'></div>
                        <div className='inauth'>
                            <input className={`${empty && 'red-auth-border'}`} type="text" placeholder='Имя пользователя:' value={login} onChange={e => setLogin(e.target.value)} autoComplete="off"/>
                            <input className={`${empty && 'red-auth-border'}`} type="password" placeholder='Пароль' value={password} onChange={e => setPassword(e.target.value)} autoComplete="off" />
                            <div className='button' onClick={(e) => handleSubmit(e)}>Войти</div>
                            <Link to={'/tnenter'} className="first-link">первый вход на портал</Link>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
    )
}
export default observer(AuthPage)