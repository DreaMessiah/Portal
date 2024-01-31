import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import DynamicTextObj from "./DinamicTextObj";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

function Navbar () {
    const {store} = useContext(Context)
    return (
        <div className='navbar'>
            <nav>
                <div className='head'>
                    <div id='logo'></div>
                    <Link to="/lk"><p className='textlogo'>Корпоративный</p>
                        <p className='textlogo'>портал</p>
                        <p className='span'>Сургутское РСУ</p>
                    </Link>
                </div>
                
                <div className='textlogo'>
                    <Link to="/main"><DynamicTextObj/> / {store.user.full_name}</Link>
                </div>
                <ul>
                    <li>
                        <Link to="/tasks"><p>Задачи</p></Link>
                    </li>
                    <li>
                        <Link to="/welding"><p>Сварка</p></Link>
                    </li>
                    <li>
                        <Link to="/document"><p>Документ</p></Link>
                    </li>
                    <li>
                        <Link to="/lk"><p>Личный кабинет</p></Link>
                    </li>
                    <li>
                        <Link to='/'>Выйти</Link>
                    </li>
                </ul>
            </nav>
            <hr />
        </div>

    )
}
export default observer(Navbar)