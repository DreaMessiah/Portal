import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar () {
    return (
        <div className='navbar'>
            <nav>
                <div className='head'>
                    <div id='logo'></div>
                    <Link to="/news"><p className='textlogo'>Корпоративный</p>
                        <p className='textlogo'>портал</p>
                        <p className='span'>Сургутское РСУ</p>
                    </Link>
                </div>
                <div className='textlogo'>
                    <Link to="/main">DASHBOARD / Барахтянский В.А.</Link>
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
                        <Link to="/news"><p>Личный кабинет</p></Link>
                    </li>
                    <li>
                        <Link to='/news'><div className='post-icon'/></Link>
                    </li>
                </ul>
            </nav>
            <hr />
        </div>

    )
};
