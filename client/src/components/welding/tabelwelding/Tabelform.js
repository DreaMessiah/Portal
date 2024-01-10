import React,{useState} from "react";
import "./tabelform.scss";



export const Tabelform = () => {
    return (
        <div className='right-block-tabwelding'>
            <div className="tabwelding_header">
                <div className="tabwelding_header_upper">
                    <div className="tabwelding_header_upper_backbtn">Назад</div>
                    <div className="tabwelding_header_upper_title"><span>386</span>        Январь 2024</div>
                    <div className="tabwelding_header_upper_controlbtn">Контроль</div>
                </div>
                <div className="tabwelding_header_newcrewblock">
                    <select className="tabwelding_header_newcrewblock_select">
                        <option value="">1</option>
                        <option value="">2</option>
                        <option value="">3</option>
                    </select>
                    <div className="tabwelding_header_newcrewblock_plusbtn">Добавить звено</div>
                </div>
            </div>
            <div className="tabwelding_slice"></div>
            <div className="tabwelding_crews">
                <div className="tabwelding_crews_block bgactive">Бр. Изомова С.Ш.</div>
                <div className="tabwelding_crews_block">Бр. Изомова С.Ш.</div>
                <div className="tabwelding_crews_block">Бр. Изомова С.Ш.</div>
                <div className="tabwelding_crews_block">Бр. Изомова С.Ш.</div>
                <div className="tabwelding_crews_block">Бр. Изомова С.Ш.</div>
                <div className="tabwelding_crews_block">Бр. Изомова С.Ш.</div>
                <div className="tabwelding_crews_block">Бр. Изомова С.Ш.</div>
                <div className="tabwelding_crews_block">Бр. Изомова С.Ш.</div>
            </div>
            <div className="tabwelding_slice"></div>
            <div className="tabwelding_viewswork">
                <div className="tabwelding_viewswork_upper">
                    <div className="tabwelding_viewswork_upper_title">Виды работ</div>
                    <div className="tabwelding_viewswork_upper_plusbtn">Добавить</div>
                    <div className="tabwelding_viewswork_upper_date">сегодня: 01-01-2024</div>
                </div>
                <div className="tabwelding_viewswork_tabel">
                    <div className="tabwelding_viewswork_tabel_strock">
                        <div className="tabwelding_viewswork_tabel_strock_head"></div>
                        <div className="tabwelding_viewswork_tabel_strock_calendar"></div>
                        <div className="tabwelding_viewswork_tabel_strock_itogy"></div>
                        <div className="tabwelding_viewswork_tabel_strock_project"></div>
                        <div className="tabwelding_viewswork_tabel_strock_start"></div>
                        <div className="tabwelding_viewswork_tabel_strock_delta"></div>
                        <div className="tabwelding_viewswork_tabel_strock_norma"></div>
                        <div className="tabwelding_viewswork_tabel_strock_cover"></div>
                        <div className="tabwelding_viewswork_tabel_strock_complite"></div>
                    </div>
                </div>
            </div>
            <div className="tabwelding_slice"></div>
            <div className="tabwelding_tabel">
                <div className="tabwelding_tabel_upper"></div>
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
                        <div className="tabwelding_tabel_tabelman_strock_calendar"></div>
                        <div className="tabwelding_tabel_tabelman_strock_itogy"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}