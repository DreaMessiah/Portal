import {Link} from "react-router-dom";
import React, {useState} from 'react';
import {useContext} from "react";
import {Context} from "../../../index";
import "./style.scss"
import {ModalBigWin} from "../../modalwin/ModaBiglWin";
import {QuestionDirector} from "./QuestionDirector";
import {ModalWin} from "../../modalwin/ModalWin";
import ModalFiles from "../../modalwin/ModalFiles";

export const MainHeader = () => {
    const {store} = useContext(Context)
    const [active, setActive] = useState(false)

    return (
        <div className="head_block">
            <Link to="/" className="head_block_logo">Сургутское РСУ</Link>
            <div className="head_block_search">
                <input className="head_block_search_input" placeholder="Поиск..."></input>
                <div className="head_block_search_btn"></div>
            </div>
            <div className="head_block_right">
                <div className="head_block_callback">Обратная связь</div>
                <Link to="/new_lk" className="head_block_lk">
                    <div style={{backgroundImage:`url(/files/profile/${store.user.avatar})`}} className="head_block_lk_photo"></div>
                    <div className="head_block_lk_name">{store.user.full_name}</div>
                </Link>

                <div className="head_block_callback" onClick={() => store.logout()}>Выйти</div>
                <div className="head_block_questions" onClick={()=>setActive(true)}>?</div>
                <ModalFiles heigth='40vh' data={<QuestionDirector setActive={setActive} />} active={active} setActive={setActive}/>
            </div>
        </div>
    )
}
