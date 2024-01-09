import React from "react";

export default function WrapButtonsObj({mass}){
    return (
        <div className='wrap-buttons-obj'>
            {mass.map((item,index) => (
                <div key={index} className='wrap-button'> <p>{item.text}</p> <i className={item.icon}></i> </div>
            ))}
        </div>
    )
}
