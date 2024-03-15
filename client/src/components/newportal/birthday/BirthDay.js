import "./style.scss"
import {Link} from "react-router-dom";

export const BirthDay = () => {
    return (
        <div className="frame_block ">
            <div className="frame_block_title">
                <div className="frame_block_title_name">Дни рождения <i className="fa-solid fa-gift"></i></div>
                {/*<div className="frame_block_title_edit">Редактировать</div>*/}
            </div>
            <div className="frame_block_birthday borderbirthday birthdaycolor">
                <div className="frame_block_birthday_main">
                    <div className="frame_block_birthday_main_man">
                        <div className="frame_block_birthday_main_man_photo" style={{backgroundImage: `url("/hallofframe/11.jpg")`}}></div>
                        <div className="frame_block_birthday_main_man_text">
                            <div className="frame_block_birthday_main_man_name">Барахтянски Владимир Алексеевич</div>
                            <div className="frame_block_birthday_main_man_dev">Машинист эоектростанции передвижной 5-го разряда</div>
                            <div className="frame_block_birthday_main_man_date">03.03.1993</div>
                            <div className="frame_block_birthday_main_man_years">31 год</div>
                        </div>
                    </div>
                    <div className="frame_block_birthday_main_man">
                        <div className="frame_block_birthday_main_man_photo" style={{backgroundImage: `url("/hallofframe/22.jpg")`}}></div>
                        <div className="frame_block_birthday_main_man_text">
                            <div className="frame_block_birthday_main_man_name">Барахтянски Владимир Алексеевич</div>
                            <div className="frame_block_birthday_main_man_dev">Машинист эоектростанции передвижной 5-го разряда</div>
                            <div className="frame_block_birthday_main_man_date">03.03.1993</div>
                            <div className="frame_block_birthday_main_man_years">31 год</div>
                        </div>
                    </div>
                    <div className="frame_block_birthday_main_man">
                        <div className="frame_block_birthday_main_man_photo" style={{backgroundImage: `url("/hallofframe/33.jpg")`}}></div>
                        <div className="frame_block_birthday_main_man_text">
                            <div className="frame_block_birthday_main_man_name">Барахтянски Владимир Алексеевич</div>
                            <div className="frame_block_birthday_main_man_dev">Машинист эоектростанции передвижной 5-го разряда</div>
                            <div className="frame_block_birthday_main_man_date">03.03.1993</div>
                            <div className="frame_block_birthday_main_man_years">31 год</div>
                        </div>
                        {/*<div className="todaybirthday">Сегодня <i className="fa-solid fa-gift"></i></div>*/}
                    </div>
                    <div className="frame_block_birthday_main_man">
                        <div className="frame_block_birthday_main_man_photo" style={{backgroundImage: `url("/hallofframe/44.jpg")`}}></div>
                        <div className="frame_block_birthday_main_man_text">
                            <div className="frame_block_birthday_main_man_name">Барахтянски Владимир Алексеевич</div>
                            <div className="frame_block_birthday_main_man_dev">Машинист эоектростанции передвижной 5-го разряда</div>
                            <div className="frame_block_birthday_main_man_date">03.03.1993</div>
                            <div className="frame_block_birthday_main_man_years">31 год</div>
                        </div>
                    </div>
                    <div className="frame_block_birthday_main_man">
                        <div className="frame_block_birthday_main_man_photo" style={{backgroundImage: `url("/hallofframe/55.jpg")`}}></div>
                        <div className="frame_block_birthday_main_man_text">
                            <div className="frame_block_birthday_main_man_name">Барахтянски Владимир Алексеевич</div>
                            <div className="frame_block_birthday_main_man_dev">Машинист эоектростанции передвижной 5-го разряда</div>
                            <div className="frame_block_birthday_main_man_date">03.03.1993</div>
                            <div className="frame_block_birthday_main_man_years">31 год</div>
                        </div>
                    </div>
                    <div className="frame_block_birthday_main_man">
                        <div className="frame_block_birthday_main_man_photo" style={{backgroundImage: `url("/hallofframe/11.jpg")`}}></div>
                        <div className="frame_block_birthday_main_man_text">
                            <div className="frame_block_birthday_main_man_name">Барахтянски Владимир Алексеевич</div>
                            <div className="frame_block_birthday_main_man_dev">Машинист эоектростанции передвижной 5-го разряда</div>
                            <div className="frame_block_birthday_main_man_date">03.03.1993</div>
                            <div className="frame_block_birthday_main_man_years">31 год</div>
                        </div>

                    </div>
                    <div className="frame_block_birthday_main_man">
                        <div className="frame_block_birthday_main_man_photo" style={{backgroundImage: `url("/hallofframe/33.jpg")`}}></div>
                        <div className="frame_block_birthday_main_man_text">
                            <div className="frame_block_birthday_main_man_name">Барахтянски Владимир Алексеевич</div>
                            <div className="frame_block_birthday_main_man_dev">Машинист эоектростанции передвижной 5-го разряда</div>
                            <div className="frame_block_birthday_main_man_date">03.03.1993</div>
                            <div className="frame_block_birthday_main_man_years">31 год</div>
                        </div>
                    </div>
                    <div className="frame_block_birthday_main_man">
                        <div className="frame_block_birthday_main_man_photo" style={{backgroundImage: `url("/hallofframe/22.jpg")`}}></div>
                        <div className="frame_block_birthday_main_man_text">
                            <div className="frame_block_birthday_main_man_name">Барахтянски Владимир Алексеевич</div>
                            <div className="frame_block_birthday_main_man_dev">Машинист эоектростанции передвижной 5-го разряда</div>
                            <div className="frame_block_birthday_main_man_date">03.03.1993</div>
                            <div className="frame_block_birthday_main_man_years">31 год</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}