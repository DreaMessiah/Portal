import React from "react";
import "./wel.scss"
import CheckBox from "../../components/inputs/CheckBox";

export function TnEnter(){
    return (
        <div className='welcomepage'>
            <div className='imgback'>
                <div class="auth_back">
                    <div class="auth_form">
                        <div className="auth_line">
                            <div class="logo"></div>
                            <div className="title_back">Первый<br />вход</div>
                        </div>

                        <div class="inauth">
                            <label>Введите Табельный номер</label>
                            <input className="false" type="text" placeholder="Табельный номер:" autoComplete="off" />
                            <div class="button">Продолжить</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}