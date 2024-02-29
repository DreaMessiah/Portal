import "./style.scss"

export const LkNew = () => {
    return (
        <div className="lk_block">
            <div className="lk_block_params">
                    <div className="lk_block_params_photo" style={{backgroundImage: `url(/profile/photoprofile.png)`}}>
                        <div className="lk_block_params_photo_black"></div>
                        <div className="lk_block_params_photo_open"><i className="fa-solid fa-maximize"></i></div>
                        <div className="lk_block_params_photo_upload"><i className="fa-solid fa-upload"></i></div>
                    </div>
                    <div className="lk_block_params_personaldata">
                        <div className="lk_block_params_personaldata_edit">
                            <div className="lk_block_params_personaldata_edit_btn">Редактировать</div>
                        </div>
                        <div className="lk_block_params_personaldata_fio">Барахтянский Владимир Алексеевич</div>
                        <input className="lk_block_params_personaldata_fio displaynone" value="Барахтянский Владимир Алексеевич" />
                        <div className="lk_block_params_personaldata_dev">Разработчик ПО</div>
                        <input className="lk_block_params_personaldata_dev displaynone" value="Разработчик ПО" />
                        <div className="lk_block_params_personaldata_otdel">Одтел Управления инновационной деятельности</div>
                        <input className="lk_block_params_personaldata_otdel displaynone" value="Одтел Управления инновационной деятельности" />
                        <div className="lk_block_params_personaldata_tn">00ЗП-0456789</div>
                        <input className="lk_block_params_personaldata_tn displaynone" value="00ЗП-0456789"/>
                        <div className="lk_block_params_personaldata_login">
                            <div className="lk_block_params_personaldata_login_name">логиин: barahtasurgut</div>
                            <div className="lk_block_params_personaldata_login_btnpassword">Сменить пароль</div>
                        </div>
                    </div>
            </div>
        </div>
    )
}