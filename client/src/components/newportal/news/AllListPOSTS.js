import "./style.scss"
import {Link} from "react-router-dom";

export const AllListPOSTS = () => {
    return (
        <div className="news_block">
            <div className="news_block_title">
                <div className="news_block_title_name">НОВОСТИ</div>
                <Link to="/createnews" className="news_block_title_create">СОЗДАТЬ</Link>
            </div>
            <div className="news_block_list">
                <Link to="/viewpost" className="news_block_list_box">
                    <div className="news_block_list_box_img" style={{backgroundImage: `url(news/img/nodaa.png)`}}></div>
                    <div className="news_block_list_box_content">
                        <div className="news_block_list_box_content_a">
                            <div className="news_block_list_box_content_xyz">
                                <div className="news_block_list_box_content_xyz_x">x</div>
                                <div className="news_block_list_box_content_xyz_y">y</div>
                                <div className="news_block_list_box_content_xyz_z">z</div>
                            </div>
                            <div className="news_block_list_box_content_title">Модульность в JavaScript: CommonJS, AMD, ES Modules</div>
                            <div className="news_block_list_box_content_description">
                                Начало истории модульности в JavaScript положило хаос: глобальные переменные, конфликты имен и сложности с зависимостями. Со временем сообщество предложило несколько подходов для организации модулей...
                            </div>
                        </div>
                        <div className="news_block_list_box_content_btns">
                            <div className="news_block_list_box_content_btns_date">2024-03-11</div>
                            <div className="news_block_list_box_content_btns_like">
                                <i className="fa-regular fa-thumbs-up"></i><i className="fa-solid fa-thumbs-up" style={{display: 'none'}}></i>
                            </div>
                            <div className="news_block_list_box_content_btns_comment"><i className="fa-regular fa-comments"></i></div>
                        </div>
                    </div>
                </Link>
                <div className="news_block_list_box" style={{backgroundImage: `url(news/img/lamp.jpg)`}}>
                    <div className="news_block_list_box_img"></div>
                    <div className="news_block_list_box_content">
                        <div className="news_block_list_box_content_a">
                            <div className="news_block_list_box_content_xyz">
                                <div className="news_block_list_box_content_xyz_x">x</div>
                                <div className="news_block_list_box_content_xyz_y">y</div>
                                <div className="news_block_list_box_content_xyz_z">z</div>
                            </div>
                            <div className="news_block_list_box_content_title">Lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem</div>
                            <div className="news_block_list_box_content_description">Lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem</div>
                        </div>
                        <div className="news_block_list_box_content_btns">
                            <div className="news_block_list_box_content_btns_date">2024-02-29</div>
                            <div className="news_block_list_box_content_btns_like">
                                <i className="fa-regular fa-thumbs-up"></i><i className="fa-solid fa-thumbs-up" style={{display: 'none'}}></i>
                            </div>
                            <div className="news_block_list_box_content_btns_comment"><i className="fa-regular fa-comments"></i></div>
                        </div>
                    </div>
                </div>
                <div className="news_block_list_box">
                    <div className="news_block_list_box_img" style={{backgroundImage: `url(news/img/111.jpg)`}}></div>
                    <div className="news_block_list_box_content">
                        <div className="news_block_list_box_content_a">
                            <div className="news_block_list_box_content_xyz">
                                <div className="news_block_list_box_content_xyz_x">x</div>
                                <div className="news_block_list_box_content_xyz_y">y</div>
                                <div className="news_block_list_box_content_xyz_z">z</div>
                            </div>
                            <div className="news_block_list_box_content_title">Lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem</div>
                            <div className="news_block_list_box_content_description">Lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem</div>
                        </div>
                        <div className="news_block_list_box_content_btns">
                            <div className="news_block_list_box_content_btns_date">2024-02-29</div>
                            <div className="news_block_list_box_content_btns_like">
                                <i className="fa-regular fa-thumbs-up"></i><i className="fa-solid fa-thumbs-up" style={{display: 'none'}}></i>
                            </div>
                            <div className="news_block_list_box_content_btns_comment"><i className="fa-regular fa-comments"></i></div>
                        </div>
                    </div>
                </div>
                <div className="news_block_list_box">
                    <div className="news_block_list_box_img" style={{backgroundImage: `url(news/img/222.jpg)`}}></div>
                    <div className="news_block_list_box_content">
                        <div className="news_block_list_box_content_a">
                            <div className="news_block_list_box_content_xyz">
                                <div className="news_block_list_box_content_xyz_x">x</div>
                                <div className="news_block_list_box_content_xyz_y">y</div>
                                <div className="news_block_list_box_content_xyz_z">z</div>
                            </div>
                            <div className="news_block_list_box_content_title">Lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem</div>
                            <div className="news_block_list_box_content_description">Lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem</div>
                        </div>
                        <div className="news_block_list_box_content_btns">
                            <div className="news_block_list_box_content_btns_date">2024-02-29</div>
                            <div className="news_block_list_box_content_btns_like">
                                <i className="fa-regular fa-thumbs-up"></i><i className="fa-solid fa-thumbs-up" style={{display: 'none'}}></i>
                            </div>
                            <div className="news_block_list_box_content_btns_comment"><i className="fa-regular fa-comments"></i></div>
                        </div>
                    </div>
                </div>
                <div className="news_block_list_box">
                    <div className="news_block_list_box_img" style={{backgroundImage: `url(news/img/333.jpg)`}}></div>
                    <div className="news_block_list_box_content">
                        <div className="news_block_list_box_content_a">
                            <div className="news_block_list_box_content_xyz">
                                <div className="news_block_list_box_content_xyz_x">x</div>
                                <div className="news_block_list_box_content_xyz_y">y</div>
                                <div className="news_block_list_box_content_xyz_z">z</div>
                            </div>
                            <div className="news_block_list_box_content_title">Lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem</div>
                            <div className="news_block_list_box_content_description">Lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem</div>
                        </div>
                        <div className="news_block_list_box_content_btns">
                            <div className="news_block_list_box_content_btns_date">2024-02-29</div>
                            <div className="news_block_list_box_content_btns_like">
                                <i className="fa-regular fa-thumbs-up"></i><i className="fa-solid fa-thumbs-up" style={{display: 'none'}}></i>
                            </div>
                            <div className="news_block_list_box_content_btns_comment"><i className="fa-regular fa-comments"></i></div>
                        </div>
                    </div>
                </div>
                <div className="news_block_list_box">
                    <div className="news_block_list_box_img" style={{backgroundImage: `url(news/img/444.jpg)`}}></div>
                    <div className="news_block_list_box_content">
                        <div className="news_block_list_box_content_a">
                            <div className="news_block_list_box_content_xyz">
                                <div className="news_block_list_box_content_xyz_x">x</div>
                                <div className="news_block_list_box_content_xyz_y">y</div>
                                <div className="news_block_list_box_content_xyz_z">z</div>
                            </div>
                            <div className="news_block_list_box_content_title">Lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem</div>
                            <div className="news_block_list_box_content_description">Lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem</div>
                        </div>
                        <div className="news_block_list_box_content_btns">
                            <div className="news_block_list_box_content_btns_date">2024-02-29</div>
                            <div className="news_block_list_box_content_btns_like">
                                <i className="fa-regular fa-thumbs-up"></i><i className="fa-solid fa-thumbs-up" style={{display: 'none'}}></i>
                            </div>
                            <div className="news_block_list_box_content_btns_comment"><i className="fa-regular fa-comments"></i></div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}