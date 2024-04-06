import "./style.scss"
import {Link} from "react-router-dom";

export const FastBtns = () => {
    let options = {
        width: "300px",
        border: true,
        borderColor: "#2e2e2e",
        baseColor: "#17a2b8",
        centerColor: "#459cff",
        centerBorderColor: "#ffffff",
        handColors: {
            second: "#d81c7a",
            minute: "#ffffff",
            hour: "#ffffff"
        }
    }

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
                <Link to={'/alllistnews'} className="fastbtns_block_btn">
                    <div className="fastbtns_block_btn_box" style={{backgroundColor: '#E3E9F1'}}>
                    </div>
                    <div className="fastbtns_block_btn_radius" style={{backgroundColor: '#D6E1EA'}}>
                    </div>
                    <div className="fastbtns_block_btn_icon">
                        <i className="fa-solid fa-newspaper" style={{color: '#758AC2'}}></i>
                    </div>
                    <div className="fastbtns_block_btn_text">
                        Новости
                    </div>
                </Link>
            </div>
            <div className="fastbtns_block">
                <Link to={'/documents'} className="fastbtns_block_btn">
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
                </Link>
                <Link to={'/maintasks'} className="fastbtns_block_btn">
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
                </Link>
            </div>
            {/*<Link to="/listfastbtns" className="fast_btns_more">Другие...</Link>*/}
        </div>
    )
}