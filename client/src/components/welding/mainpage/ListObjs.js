import React from "react";
import "./objs.scss";
import {Link} from "react-router-dom";

export default function ListObjs({mass}){
    
    return (
        <div className='objs_list'>
            {mass.map((item,index) => (
                <Link key={index} to={`/obj?id=${item.id}`} className='objs_list_item'>
                    <div className="objs_list_item_header"><span>{item.shifr}</span></div>
                    <div className="objs_list_item_body">
                        <div className="objs_list_item_body_description">
                            {item.nameobject}
                        </div>
                        <div className="objs_list_item_body_bottom">
                            <div className="objs_list_item_body_bottom_dateinto">Последнее изменение: </div>
                            <div className="objs_list_item_body_bottom_btn">. . .</div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}