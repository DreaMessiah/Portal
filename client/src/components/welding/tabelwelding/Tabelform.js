import React,{useState} from "react";
import "./tabelform.scss";
import {TabelViewsWork} from "./TabelViewsWork";
import {TabelMans} from "./TabelMans";



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
                    <div className="tabwelding_viewswork_upper_plusbtn">Добавить вид</div>
                    <div className="tabwelding_viewswork_upper_date">сегодня: 01-01-2024</div>
                </div>
            </div>
            <TabelViewsWork />
            <div className="tabwelding_slice"></div>
            <div className="tabwelding_tabel">
                <div className="tabwelding_tabel_upper"></div>
                <TabelMans />
            </div>
        </div>
    )
}