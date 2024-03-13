import "./style.scss"
import {Link} from "react-router-dom";

export const FastBtns = () => {
    return (
        <div className="fastbtns">
            <div className="fastbtns_block">
                <Link to="/newphonebook" className="fastbtns_block_btn">
                    <div className="fastbtns_block_btn_box" style={{backgroundColor: '#FCEEE8'}}>
                    </div>
                    <div className="fastbtns_block_btn_radius" style={{backgroundColor: '#F9E7DC'}}>
                    </div>
                    <div className="fastbtns_block_btn_icon">
                        <i className="fa-solid fa-fax" style={{color: '#F1A3A2'}}></i>
                    </div>
                    <div className="fastbtns_block_btn_text">
                        Телефонная книга
                    </div>
                </Link>
                <div className="fastbtns_block_btn">
                    <div className="fastbtns_block_btn_box" style={{backgroundColor: '#E3E9F1'}}>
                    </div>
                    <div className="fastbtns_block_btn_radius" style={{backgroundColor: '#D6E1EA'}}>
                    </div>
                    <div className="fastbtns_block_btn_icon">
                        <i className="fa-solid fa-calendar-days" style={{color: '#758AC2'}}></i>
                    </div>
                    <div className="fastbtns_block_btn_text">
                        Календарь событий
                    </div>
                </div>
            </div>
            <div className="fastbtns_block">
                <div className="fastbtns_block_btn">
                    <div className="fastbtns_block_btn_box" style={{backgroundColor: '#F1EDF6'}}>
                    </div>
                    <div className="fastbtns_block_btn_radius" style={{backgroundColor: '#E8E4F2'}}>
                    </div>
                    <div className="fastbtns_block_btn_icon">
                        <i className="fa-solid fa-folder-open" style={{color: '#AEA9D3'}}></i>
                    </div>
                    <div className="fastbtns_block_btn_text">
                        Мои документы
                    </div>
                </div>
                <div className="fastbtns_block_btn">
                    <div className="fastbtns_block_btn_box" style={{backgroundColor: '#F4EEF6'}}>
                    </div>
                    <div className="fastbtns_block_btn_radius" style={{backgroundColor: '#F4E6F1'}}>
                    </div>
                    <div className="fastbtns_block_btn_icon">
                        <i className="fa-solid fa-timeline" style={{color: '#D0B4D6'}}></i>
                    </div>
                    <div className="fastbtns_block_btn_text">
                        Мои задачи
                    </div>
                </div>
            </div>
            <div className="fast_btns_more">Другие...</div>
        </div>
    )
}