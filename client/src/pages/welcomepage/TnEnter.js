import React, {useState,useContext} from "react";
import "./wel.scss"
import {Link} from "react-router-dom";
import {Context} from "../../index";
import {useMessage} from "../../hooks/message.hook";
import {ToastContainer} from "react-toastify";

export function TnEnter(){
    const [tn, setTn] = useState('');
    const [empty,setEmpty] = useState(false)
    const {store} = useContext(Context)
    const message = useMessage()

    const tnEnterHandler = async (event) => {
        event.preventDefault()
        const promise = await store.tnenter(tn)
        if(promise?.response?.data?.message){
            setEmpty(true)
            message(promise.response.data.message)
        }else{
            setEmpty(false)
        }
    }
    return (
        <div className='welcomepage'>
            <div className='imgback'>
                <div className="auth_back">
                    <div className="auth_form">
                        <div className="auth_line">
                            <div className="logo"></div>
                            <div className="title_back">Первый<br />вход</div>
                        </div>
                        <div className="inauth">
                            <label>Введите Табельный номер</label>
                            <input className="false" type="text" value={tn} onChange={(e) => setTn(e.target.value)} placeholder="Табельный номер:" autoComplete="off" />
                            <div onClick={(e) => tnEnterHandler(e)} className="button">Продолжить</div>
                            <Link to={'/'} className="first-link">У Вас уже есть логин и пароль</Link>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}