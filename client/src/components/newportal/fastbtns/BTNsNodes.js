import "./style.scss"
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

export const BTNsNodes = () => {
    let ibtn = 0
    const [btns, setBtns] = useState([1,4,5,6])

    const checkedBtn = idBtn => {
        let newBtns = btns
        if(!newBtns.includes(idBtn)){
            newBtns.push(idBtn)
            setBtns(newBtns)
            const blockBTN = document.getElementById(`btn_${idBtn}`)
            blockBTN.classList.toggle('glam')
        } else {
            let index = newBtns.indexOf(idBtn)
            newBtns.splice(index, 1)
            const blockBTN = document.getElementById(`btn_${idBtn}`)
            blockBTN.classList.toggle('glam')
        }


       
    }

    const startBtns = blocksId => {
        blocksId.forEach(btn=>{
            const blockBTN = document.getElementById(`btn_${btn}`)
            blockBTN.classList.toggle('glam')
        })
    }

    useEffect(()=>{
        startBtns(btns)
    }, [])

    return (
        <div className="btns_nodes">
            <div className="btns_nodes_title">
                <div className="btns_nodes_title_name">Выбрать 4 быстрых кнопки</div>
                {/*<Link className="news_block_title_more" to="/alllistnews">больше новостей</Link>*/}
                {/*<Link className="news_block_title_create" to="/createnews">СОЗДАТЬ</Link>*/}
            </div>
            <div className="btns_nodes_list">
                {/*style={(btns.includes(1)?{border: ' 3px solid rgb(18, 19, 56)'}:{})}*/}
                <div className={`btns_nodes_list_btn ${(btns.includes(1))?'glam':''}`} id="btn_1" onClick={()=>checkedBtn(1)}>
                    <div className="btns_nodes_list_btn_icon"><i className="fa-solid fa-fax"></i></div>
                    <div className="btns_nodes_list_btn_name">Телефонная книга</div>
                </div>
                <div className={`btns_nodes_list_btn ${(btns.includes(2))?'glam':''}`} id="btn_2" onClick={()=>checkedBtn(2)}>
                    <div className="btns_nodes_list_btn_icon"><i className="fa-solid fa-newspaper"></i></div>
                    <div className="btns_nodes_list_btn_name">Новости</div>
                </div>
                <div className={`btns_nodes_list_btn ${(btns.includes(3))?'glam':''}`} id="btn_3" onClick={()=>checkedBtn(3)}>
                    <div className="btns_nodes_list_btn_icon"><i className="fa-solid fa-cake-candles"></i></div>
                    <div className="btns_nodes_list_btn_name">Дни рождения</div>
                </div>
                <div className={`btns_nodes_list_btn ${(btns.includes(4))?'glam':''}`} id="btn_4" onClick={()=>checkedBtn(4)}>
                    <div className="btns_nodes_list_btn_icon"><i className="fa-solid fa-timeline"></i></div>
                    <div className="btns_nodes_list_btn_name">Мои задачи</div>
                </div>
                <div className={`btns_nodes_list_btn ${(btns.includes(5))?'glam':''}`} id="btn_5" onClick={()=>checkedBtn(5)}>
                    <div className="btns_nodes_list_btn_icon"><i className="fa-solid fa-folder-open"></i></div>
                    <div className="btns_nodes_list_btn_name">Мои документы</div>
                </div>
                <div className={`btns_nodes_list_btn ${(btns.includes(6))?'glam':''}`} id="btn_6" onClick={()=>checkedBtn(6)}>
                    <div className="btns_nodes_list_btn_icon"><i className="fa-solid fa-calendar-days"></i></div>
                    <div className="btns_nodes_list_btn_name">Календарь событий</div>
                </div>
            </div>
        </div>
    )
}