import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import DynamicTextObj from "./DinamicTextObj";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {Menu} from "./Menu";

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
                        <Link to="/docpasslist"><p>Задачи</p></Link>
                    </li>
                    <li>
                        <Link to="/welding"><p>Сварка</p></Link>
                    </li>
                    <li>
                        <Link to="/documents"><p>Документы</p></Link>
                    </li>
                    <li>
                        <Link to="/lk"><p>Личный кабинет</p></Link>
                    </li>
                    <li>
                        <Link to='/'><p>Выйти</p></Link>
                    </li>
                </ul>
            </nav>
            {/*<hr />*/}
            <Menu />
        </div>

    )
}
export default observer(Navbar)