import './style.scss'
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import PollsService from "../../services/PollsService";
import SocialService from "../../services/SocialService";

export const DelProgramModal = ({iddel, name, setActive}) => {

    const delProgram = async () => {
        try{
            const {data} = await  SocialService.delProgram({iddel})
            setActive(false)
        }catch(e){
            console.log(e)
        }

    }

    return (
        <div className='delblock'>
            <div className="delblock_center">
                <div className="delblock_center_question">
                    Вы действительно хотите удалить программу: "{name}"
                </div>
                <div className="delblock_center_btns">
                    <div className="delblock_center_btns_del" onClick={delProgram}>Удалить</div>
                    <div className="delblock_center_btns_cancel" onClick={()=>setActive(false)}>Отмена</div>
                </div>
            </div>
        </div>
    )
}