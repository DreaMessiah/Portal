import React from 'react';
import { Link } from 'react-router-dom';

export default function NewsNavbar () {
    return (
        <div className='newsnavbar'>
            <nav>
                <div className='head'>
                    <div id='logo'></div>
                    <Link to="/">
                        <p className='textlogo'>Сургутское РСУ</p>
                    </Link>
                </div>
                <div className='rhead'>
                    <p>Барахтянский Владимир Алексеевич</p>
                    <Link to='/' className='button'>Выйти</Link>
                </div>

            </nav>

        </div>

    )
};
