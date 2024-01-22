import React, { useEffect, useState } from "react";
import "./myobjs.scss";
import {Link} from "react-router-dom";

export default function MyObjs({mass, page}){

        let percent = 30;
 

        useEffect(() => {
        

            const objBlocks = document.querySelectorAll('.objs_list_item')
            objBlocks.forEach(block=>{
                block.addEventListener('click', () => {
                setTimeout(()=>{
                     const params = window
                    .location
                    .search
                    .replace('?','')
                    .split('=')
                    const myObj = document.getElementById(`id_my_obj_${params[1]}`)
                    // makeKrasivo(myObj)
                
                        
                    })
                })
                
            })
        },[])

    
    return (
        <div className='objs_list'>
            {/* <p>value of count: {count}</p> */}

            {mass.map((item,index) => (
                <Link key={index} to={`/${page}${page === 'objects' ? '?id=' + item.id : '/' + item.id}`} className='objs_list_item' id={`id_my_obj_${item.id}`}>
                    <div className="objs_list_item_header"><span>{item.name}</span></div>
                    <div className="objs_list_item_body">
                        <div className="objs_list_item_body_description">
                            {item.description}
                        </div>
                        <div className="objs_list_item_body_bottom">
                            <div className="objs_list_item_body_bottom_dateinto">Последнее изменение: {item.dateinto}</div>
                            <div className="objs_list_item_body_bottom_btn">. . .</div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}