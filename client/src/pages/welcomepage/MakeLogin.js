import React from "react";
import "./wel.scss"
import CheckBox from "../../components/inputs/CheckBox";

export function MakeLogin(){
    return (
        <div className='welcomepage'>
            <div className='imgback'>
                    <div class="auth_back">
                        <div class="auth_form">
                            <div className="auth_line">
                                <div class="logo"></div>
                                <div className="title_back">Регистрация<br />на портале</div>
                            </div>

                            <div class="inauth">
                                <label>Придумайте логин</label>
                                <input className="false" type="text" placeholder="Имя пользователя:" autoComplete="off" />
                                <label>Придумайте пароль</label>
                                <input className="false" type="password" placeholder="Пароль" autoComplete="off" />
                                <label>Повторите пароль</label>
                                <input className="false" type="password" placeholder="Повторите пароль" autoComplete="off" />
                                <div class="button">Войти</div>
                            </div>
                        </div>
                    </div>
            </div>

        </div>
    )
}