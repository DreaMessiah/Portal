import React from 'react';
import { Link } from 'react-router-dom';
import {useContext} from "react";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

function NewsNavbar () {
    const {store} = useContext(Context)
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
                    <p>{store.user.full_name}</p>
                    <div onClick={() => store.logout()} className='button'>Выйти</div>
                </div>

            </nav>

        </div>

    )
}
export default observer(NewsNavbar)