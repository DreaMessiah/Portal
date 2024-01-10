import React from 'react';
import { Link } from 'react-router-dom';
import DynamicTextObj from "./DinamicTextObj";

export default function Navbar () {
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
                    <Link to="/main"><DynamicTextObj/> / Барахтянский В.А.</Link>
                </div>
                <ul>
                    <li>
                        <Link to="/welding"><p>Сварка</p></Link>
                    </li>
                    <li>
                        <Link to="/document"><p>Документ</p></Link>
                    </li>
                    <li>
                        <Link to="/settings"><p>Настройки</p></Link>
                    </li>
                    <li>
                        <Link to="/lk"><p>Личный кабинет</p></Link>
                    </li>
                    <li>
                        <Link to='/lk'><div className='post-icon'/></Link>
                    </li>
                </ul>
            </nav>
            <hr />
        </div>

    )
};
