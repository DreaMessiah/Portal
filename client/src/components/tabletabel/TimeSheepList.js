import React, {useEffect, useRef} from "react";
import "./tabel.scss";


export const TimeSheepList = () => {



    return (
        <div className="tab_tabel_tabelman ">
            {/*{peoples.map((man, index) => (*/}
                <div className="tab_tabel_tabelman_strock">
                    <div className="tab_tabel_tabelman_strock_num">1</div>
                    <div className="tab_tabel_tabelman_strock_fio"></div>
                    <div className="tab_tabel_tabelman_strock_calendar">
                        <div className="tab_tabel_tabelman_strock_calendar_s">

                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">1</div>
                                <input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b no-left-border" defaultValue=""></input>
                            </div>

                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">16</div>
                                <input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b no-left-border" defaultValue=""></input>
                            </div>

                        </div>
                        <div className="tab_tabel_tabelman_strock_calendar_s">

                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">2</div>
                                <input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" defaultValue=""></input>
                            </div>

                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">17</div>
                                <input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" defaultValue=""></input>
                            </div>
                        </div>
                        <div className="tab_tabel_tabelman_strock_calendar_s">

                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">3</div>
                                <input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" defaultValue=""></input>
                            </div>

                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">18</div>
                                <input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" defaultValue=""></input>
                            </div>

                        </div>
                        <div className="tab_tabel_tabelman_strock_calendar_s">

                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">4</div>
                                <input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" defaultValue=""></input>
                            </div>


                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">19</div>
                                <input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" defaultValue=""></input>
                            </div>

                        </div>
                        <div className="tab_tabel_tabelman_strock_calendar_s">

                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">5</div>
                                <input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" defaultValue=""></input>
                            </div>


                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">20</div>
                                <input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" defaultValue=""></input>
                            </div>

                        </div>
                        <div className="tab_tabel_tabelman_strock_calendar_s">

                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">6</div>
                                <input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" defaultValue=""></input>
                            </div>


                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">21</div>
                                <input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" defaultValue=""></input>
                            </div>

                        </div>
                        <div className="tab_tabel_tabelman_strock_calendar_s">

                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">7</div>
                                <input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" defaultValue=""></input>
                            </div>


                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">22</div>
                                <input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" defaultValue=""></input>
                            </div>

                        </div>
                        <div className="tab_tabel_tabelman_strock_calendar_s">

                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">8</div>
                                <input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" defaultValue=""></input>
                            </div>


                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">23</div>
                                <input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" defaultValue=""></input>
                            </div>

                        </div>
                        <div className="tab_tabel_tabelman_strock_calendar_s">

                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">9</div>
                                <input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" defaultValue=""></input>
                            </div>


                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">24</div>
                                <input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" defaultValue=""></input>
                            </div>

                        </div>
                        <div className="tab_tabel_tabelman_strock_calendar_s">

                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">10</div>
                                <input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" defaultValue=""></input>
                            </div>


                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">25</div>
                                <input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" defaultValue=""></input>
                            </div>

                        </div>
                        <div className="tab_tabel_tabelman_strock_calendar_s">

                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">11</div>
                                <input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" defaultValue=""></input>
                            </div>


                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">26</div>
                                <input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" defaultValue=""></input>
                            </div>

                        </div>
                        <div className="tab_tabel_tabelman_strock_calendar_s">

                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">12</div>
                                <input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" defaultValue=""></input>
                            </div>


                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">27</div>
                                <input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" defaultValue=""></input>
                            </div>

                        </div>
                        <div className="tab_tabel_tabelman_strock_calendar_s">

                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">13</div>
                                <input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" defaultValue=""></input>
                            </div>


                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">28</div>
                                <input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" defaultValue=""></input>
                            </div>

                        </div>
                        <div className="tab_tabel_tabelman_strock_calendar_s">

                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">14</div>
                                <input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" defaultValue=""></input>
                            </div>


                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">29</div>
                                <input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" defaultValue=""></input>
                            </div>

                        </div>
                        <div className="tab_tabel_tabelman_strock_calendar_s">

                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">15</div>
                                <input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" defaultValue=""></input>
                            </div>


                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">30</div>
                                <input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" defaultValue=""></input>
                            </div>

                        </div>
                        <div className="tab_tabel_tabelman_strock_calendar_s">

                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                            </div>


                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title top-border-1px">31</div>
                                <input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" defaultValue=""></input>
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
                                <input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" defaultValue=""></input>
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
                                <input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" defaultValue=""></input>
                            </div>


                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">транспорт</div>
                                <input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" defaultValue=""></input>
                            </div>

                        </div>
                    </div>
                </div>
            {/*))}*/}
        </div>
    )
}