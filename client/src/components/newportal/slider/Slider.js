import "./style.scss"
import React, {useState} from "react";
import {Link} from "react-router-dom";

export const Slider = () => {
    return (
        <div className="slider_block" style={{backgroundImage: `url('/files/news/contest/2.jpeg')`}}>
            <div className={`data`}>
                <div className='text'>
                    <p>Конкурс детского рисунка</p>
                    <p className='big'>"День Победы глазами детей"</p></div>
                <Link to={'/load-contest'} className={`button`}>подать заявку</Link>
            </div>

            <div className={`overlay`}></div>
        </div>
    )
}