import React from "react";
import {Link} from "react-router-dom";

export default function WrapButtonsObj({mass}){
    return (
        <div className='wrap-buttons-obj'>
            {mass.map((item,index) => (
                <Link to={item.url} key={index} className='wrap-button'> <p>{item.text}</p> <i className={item.icon}></i></Link>
            ))}
        </div>
    )
}
