import React, {useContext, useEffect, useState} from "react";
import "./wel.scss"
import {Context} from "../../index";
import checkPassword from "../../components/functions/checkPassword";
import isCorrectLogin from "../../components/functions/isCorrectLogin";
import {useMessage} from "../../hooks/message.hook";
import {ToastContainer} from "react-toastify";

export function MakeLogin(){
    const {store} = useContext(Context)
    const message = useMessage()

    const [login,setLogin] = useState('')
    const [password,setPassword] = useState('')
    const [repassword,setRepassword] = useState('')
    const [empty,setEmpty] = useState([])

    const [onCheck,setOnCheck] = useState(false)

    const checkEmpty = () => {
        const n = [empty]

        const log = isCorrectLogin(login,password)
        const pass = checkPassword(password,repassword)

        if(log.err) message(log.message)
        else{
            if(pass.err) message(pass.message)
        }
        if(!login.trim().length || !password.trim().length || !password.trim().length) message('Заполните все поля')
        n[0] = login.length ? log.err : true
        n[1] = password.length && repassword.length ? pass.err : true

        const hasTrueValue = n.some(value => value === true)
        if( hasTrueValue ) {
            setEmpty(n)
        }
        else setEmpty([])

        return !hasTrueValue
    }
    const submitHandler = async (event) => {
        try {
            event.preventDefault()
            if(checkEmpty()){
                const promise = await store.createUser(login.toLowerCase(),password)
                if(promise?.response?.data?.message){
                    setEmpty([true,false])
                    message(promise.response.data.message)
                }else{
                    setEmpty([])
                }
            }
        }catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        setEmpty([])
    },[login,password,repassword])
    return (
        <div className='welcomepage'>
            <div className='imgback'>
                    <div className="auth_back">
                        <div className="auth_form">
                            <div className="auth_line">
                                <div className="logo"></div>
                                <div className="title_back">Регистрация<br />на портале</div>
                            </div>
                            <div className="inauth">
                                <label>Здравствуйте,</label>
                                <label className={'name'}>{store.uni.name}</label>
                                <label className={`${empty[0] && 'red-color-label'}`}>Придумайте логин</label>
                                <input className={`false ${empty[0] && 'red-solid-button-border'}`} value={login} onChange={(e) => setLogin(e.target.value)} type="text" placeholder="Имя пользователя:" autoComplete="off" />
                                <label className={`${empty[1] && 'red-color-label'}`}>Придумайте пароль</label>
                                <input className={`false ${empty[1] && 'red-solid-button-border'}`} value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Пароль" autoComplete="off" />
                                <label className={`${empty[1] && 'red-color-label'}`}>Повторите пароль</label>
                                <input className={`false ${empty[1] && 'red-solid-button-border'}`} value={repassword} onChange={(e) => setRepassword(e.target.value)} type="password" placeholder="Повторите пароль" autoComplete="off" />
                                <div onClick={(e) => submitHandler(e)} className="button">Войти</div>
                            </div>
                        </div>
                    </div>
                <ToastContainer />
            </div>

        </div>
    )
}