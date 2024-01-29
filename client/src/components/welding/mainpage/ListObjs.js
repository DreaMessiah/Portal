import React from "react";
import "./objs.scss";
import {Link} from "react-router-dom";

export default function ListObjs({mass}){
    
    return (
        <div className='objs_list'>
            {mass.map((item,index) => (
                <Link key={index} to={`/obj/${item.id}`} className='objs_list_item'>
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