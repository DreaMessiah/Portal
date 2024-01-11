import React, {useEffect, useRef} from "react";
import "./tabelform.scss";


export const TabelMans = () => {

    return (
        <div className="tabwelding_tabel_tabelman">
            <div className="tabwelding_tabel_tabelman_upper">
                <div className="tabwelding_tabel_tabelman_upper_num">№</div>
                <div className="tabwelding_tabel_tabelman_upper_fio"></div>
                <div className="tabwelding_tabel_tabelman_upper_title">Бр.Изомова С.Ш.</div>
                <div className="tabwelding_tabel_tabelman_upper_itogy">Итого за месяц</div>
            </div>
            <div className="tabwelding_tabel_tabelman_strock">
                <div className="tabwelding_tabel_tabelman_strock_num">1</div>
                <div className="tabwelding_tabel_tabelman_strock_fio">Барахтянский Владимир Алексеевич</div>
                <div className="tabwelding_tabel_tabelman_strock_calendar">
                    <div className="tabwelding_tabel_tabelman_strock_calendar_column">
                        <div className="tabwelding_tabel_tabelman_strock_calendar_column_day">
                            <div className="tabwelding_tabel_tabelman_s_c_c_day_title"></div>
                            <div className="tabwelding_tabel_tabelman_s_c_c_day_content"></div>
                        </div>
                    </div>
                </div>
                <div className="tabwelding_tabel_tabelman_strock_itogy"></div>
            </div>
        </div>
    )
}