import React, {useContext, useEffect, useRef} from "react";
import "./tabel.scss";
import {DataContext} from "../../context/DataContext";


export const TimeSheepList = () => {
    const irr = (event) => {

    }
    const {table_tabel} = useContext(DataContext)

    return (
        <div className="tab_tabel_tabelman ">
            {table_tabel.map((man, index) => (
                <div key={index} className="tab_tabel_tabelman_strock">
                    <div className="tab_tabel_tabelman_strock_num">{index + 1}</div>
                    <div className="tab_tabel_tabelman_strock_fio">
                        <div className="tab_tabel_tabelman_strock_fio_name">{man.full_name}</div>
                        <div className="tab_tabel_tabelman_strock_fio_dev">Машинист электростанции передвижной 6 разряда</div>
                    </div>
                    <div className="tab_tabel_tabelman_strock_calendar">
                        <div className="tab_tabel_tabelman_strock_calendar_s">

                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">1</div>
                                <input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b no-left-border" onChange={irr} defaultValue={man.m1}></input>
                            </div>

                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">16</div>
                                <input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b no-left-border" onChange={irr} defaultValue={man.m16}></input>
                            </div>

                        </div>
                        <div className="tab_tabel_tabelman_strock_calendar_s">

                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">2</div>
                                <input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m2}></input>
                            </div>

                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">17</div>
                                <input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m17}></input>
                            </div>
                        </div>
                        <div className="tab_tabel_tabelman_strock_calendar_s">

                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">3</div>
                                <input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m3}></input>
                            </div>

                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">18</div>
                                <input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m18}></input>
                            </div>

                        </div>
                        <div className="tab_tabel_tabelman_strock_calendar_s">

                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">4</div>
                                <input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m4}></input>
                            </div>


                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">19</div>
                                <input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m19}></input>
                            </div>

                        </div>
                        <div className="tab_tabel_tabelman_strock_calendar_s">

                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">5</div>
                                <input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m5}></input>
                            </div>


                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">20</div>
                                <input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m20}></input>
                            </div>

                        </div>
                        <div className="tab_tabel_tabelman_strock_calendar_s">

                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">6</div>
                                <input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m6}></input>
                            </div>


                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">21</div>
                                <input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m21}></input>
                            </div>

                        </div>
                        <div className="tab_tabel_tabelman_strock_calendar_s">

                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">7</div>
                                <input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m7}></input>
                            </div>


                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">22</div>
                                <input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m22}></input>
                            </div>

                        </div>
                        <div className="tab_tabel_tabelman_strock_calendar_s">

                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">8</div>
                                <input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m8}></input>
                            </div>


                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">23</div>
                                <input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m23}></input>
                            </div>

                        </div>
                        <div className="tab_tabel_tabelman_strock_calendar_s">

                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">9</div>
                                <input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m9}></input>
                            </div>


                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">24</div>
                                <input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m24}></input>
                            </div>

                        </div>
                        <div className="tab_tabel_tabelman_strock_calendar_s">

                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">10</div>
                                <input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m10}></input>
                            </div>


                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">25</div>
                                <input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m25}></input>
                            </div>

                        </div>
                        <div className="tab_tabel_tabelman_strock_calendar_s">

                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">11</div>
                                <input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m11}></input>
                            </div>


                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">26</div>
                                <input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m26}></input>
                            </div>

                        </div>
                        <div className="tab_tabel_tabelman_strock_calendar_s">

                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">12</div>
                                <input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m12}></input>
                            </div>


                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">27</div>
                                <input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m27}></input>
                            </div>

                        </div>
                        <div className="tab_tabel_tabelman_strock_calendar_s">

                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">13</div>
                                <input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m13}></input>
                            </div>


                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">28</div>
                                <input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m28}></input>
                            </div>

                        </div>
                        <div className="tab_tabel_tabelman_strock_calendar_s">

                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">14</div>
                                <input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m14}></input>
                            </div>


                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">29</div>
                                <input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m29}></input>
                            </div>

                        </div>
                        <div className="tab_tabel_tabelman_strock_calendar_s">

                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">15</div>
                                <input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m15}></input>
                            </div>


                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">30</div>
                                <input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m30}></input>
                            </div>

                        </div>
                        <div className="tab_tabel_tabelman_strock_calendar_s">

                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                            </div>


                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title top-border-1px">31</div>
                                <input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m31}></input>
                            </div>

                        </div>
                    </div>
                    <div className="tab_tabel_tabelman_strock_itogy">
                        <div className="tab_tabel_tabelman_strock_itogy-header">Итого</div>
                        <div className="tab_tabel_tabelman_strock_itogy-sum">0</div>
                    </div>
                    <div className="tab_tabel_tabelman_strock_dop">
                        <div className="tab_tabel_tabelman_strock_calendar_s">

                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">КТУ</div>
                                <input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m1}></input>
                            </div>


                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">метод</div>
                                <div className="tab_tabel_tabelman_s_c_c_day_content border-b">ВЭМ</div>
                            </div>

                        </div>
                    </div>
                    <div className="tab_tabel_tabelman_strock_shifrtransport">
                        <div className="tab_tabel_tabelman_strock_calendar_s">

                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">объект</div>
                                <input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m1}></input>
                            </div>


                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">транспорт</div>
                                <input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m1}></input>
                            </div>

                        </div>
                    </div>
                    <div className="tab_tabel_tabelman_strock_comment">
                        <div className="tab_tabel_tabelman_strock_calendar_s">

                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}