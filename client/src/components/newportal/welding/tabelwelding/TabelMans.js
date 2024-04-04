import React, {useEffect, useRef} from "react";
import "./tabelform.scss";


export const TabelMans = ({peoples,active,idobj,shifr,month,year}) => {
    console.log(peoples)

    function solution(str){
        // let arr = [];
        const itog = str.substr(0,2)

        console.log(itog)
    }

    solution('привет')


    return (
        <div className="tabwelding_tabel_tabelman ">
            {peoples.map((man, index) => (
            <div key={index} className="tabwelding_tabel_tabelman_strock">
                <div className="tabwelding_tabel_tabelman_strock_num">1</div>
                <div className="tabwelding_tabel_tabelman_strock_fio">{man.name}</div>
                <div className="tabwelding_tabel_tabelman_strock_calendar">
                    <div className="tabwelding_tabel_tabelman_strock_calendar_s">

                            <div className="tabwelding_tabel_tabelman_strock_calendar_column_day">
                                <div className="tabwelding_tabel_tabelman_s_c_c_day_title">1</div>
                                <input type='number' className="tabwelding_tabel_tabelman_s_c_c_day_content border-b no-left-border" value={man.days.d1}></input>
                            </div>

                            <div className="tabwelding_tabel_tabelman_strock_calendar_column_day">
                                <div className="tabwelding_tabel_tabelman_s_c_c_day_title">16</div>
                                <input type='number' className="tabwelding_tabel_tabelman_s_c_c_day_content border-b no-left-border" value={man.days.d16}></input>
                            </div>

                    </div>
                    <div className="tabwelding_tabel_tabelman_strock_calendar_s">

                            <div className="tabwelding_tabel_tabelman_strock_calendar_column_day">
                                <div className="tabwelding_tabel_tabelman_s_c_c_day_title">2</div>
                                <input type='number' className="tabwelding_tabel_tabelman_s_c_c_day_content border-b" value={man.days.d2}></input>
                            </div>

                            <div className="tabwelding_tabel_tabelman_strock_calendar_column_day">
                                <div className="tabwelding_tabel_tabelman_s_c_c_day_title">17</div>
                                <input type='number' className="tabwelding_tabel_tabelman_s_c_c_day_content border-b" value={man.days.d17}></input>
                            </div>
                    </div>
                    <div className="tabwelding_tabel_tabelman_strock_calendar_s">

                            <div className="tabwelding_tabel_tabelman_strock_calendar_column_day">
                                <div className="tabwelding_tabel_tabelman_s_c_c_day_title">3</div>
                                <input type='number' className="tabwelding_tabel_tabelman_s_c_c_day_content border-b" value={man.days.d3}></input>
                            </div>

                            <div className="tabwelding_tabel_tabelman_strock_calendar_column_day">
                                <div className="tabwelding_tabel_tabelman_s_c_c_day_title">18</div>
                                <input type='number' className="tabwelding_tabel_tabelman_s_c_c_day_content border-b" value={man.days.d18}></input>
                            </div>

                    </div>
                    <div className="tabwelding_tabel_tabelman_strock_calendar_s">

                            <div className="tabwelding_tabel_tabelman_strock_calendar_column_day">
                                <div className="tabwelding_tabel_tabelman_s_c_c_day_title">4</div>
                                <input type='number' className="tabwelding_tabel_tabelman_s_c_c_day_content border-b" value={man.days.d4}></input>
                            </div>


                            <div className="tabwelding_tabel_tabelman_strock_calendar_column_day">
                                <div className="tabwelding_tabel_tabelman_s_c_c_day_title">19</div>
                                <input type='number' className="tabwelding_tabel_tabelman_s_c_c_day_content border-b" value={man.days.d19}></input>
                            </div>

                    </div>
                    <div className="tabwelding_tabel_tabelman_strock_calendar_s">

                        <div className="tabwelding_tabel_tabelman_strock_calendar_column_day">
                            <div className="tabwelding_tabel_tabelman_s_c_c_day_title">5</div>
                            <input type='number' className="tabwelding_tabel_tabelman_s_c_c_day_content border-b" value={man.days.d5}></input>
                        </div>


                        <div className="tabwelding_tabel_tabelman_strock_calendar_column_day">
                            <div className="tabwelding_tabel_tabelman_s_c_c_day_title">20</div>
                            <input type='number' className="tabwelding_tabel_tabelman_s_c_c_day_content border-b" value={man.days.d20}></input>
                        </div>

                    </div>
                    <div className="tabwelding_tabel_tabelman_strock_calendar_s">

                        <div className="tabwelding_tabel_tabelman_strock_calendar_column_day">
                            <div className="tabwelding_tabel_tabelman_s_c_c_day_title">6</div>
                            <input type='number' className="tabwelding_tabel_tabelman_s_c_c_day_content border-b" value={man.days.d6}></input>
                        </div>


                        <div className="tabwelding_tabel_tabelman_strock_calendar_column_day">
                            <div className="tabwelding_tabel_tabelman_s_c_c_day_title">21</div>
                            <input type='number' className="tabwelding_tabel_tabelman_s_c_c_day_content border-b" value={man.days.d21}></input>
                        </div>

                    </div>
                    <div className="tabwelding_tabel_tabelman_strock_calendar_s">

                        <div className="tabwelding_tabel_tabelman_strock_calendar_column_day">
                            <div className="tabwelding_tabel_tabelman_s_c_c_day_title">7</div>
                            <input type='number' className="tabwelding_tabel_tabelman_s_c_c_day_content border-b" value={man.days.d7}></input>
                        </div>


                        <div className="tabwelding_tabel_tabelman_strock_calendar_column_day">
                            <div className="tabwelding_tabel_tabelman_s_c_c_day_title">22</div>
                            <input type='number' className="tabwelding_tabel_tabelman_s_c_c_day_content border-b" value={man.days.d22}></input>
                        </div>

                    </div>
                    <div className="tabwelding_tabel_tabelman_strock_calendar_s">

                        <div className="tabwelding_tabel_tabelman_strock_calendar_column_day">
                            <div className="tabwelding_tabel_tabelman_s_c_c_day_title">8</div>
                            <input type='number' className="tabwelding_tabel_tabelman_s_c_c_day_content border-b" value={man.days.d8}></input>
                        </div>


                        <div className="tabwelding_tabel_tabelman_strock_calendar_column_day">
                            <div className="tabwelding_tabel_tabelman_s_c_c_day_title">23</div>
                            <input type='number' className="tabwelding_tabel_tabelman_s_c_c_day_content border-b" value={man.days.d23}></input>
                        </div>

                    </div>
                    <div className="tabwelding_tabel_tabelman_strock_calendar_s">

                        <div className="tabwelding_tabel_tabelman_strock_calendar_column_day">
                            <div className="tabwelding_tabel_tabelman_s_c_c_day_title">9</div>
                            <input type='number' className="tabwelding_tabel_tabelman_s_c_c_day_content border-b" value={man.days.d9}></input>
                        </div>


                        <div className="tabwelding_tabel_tabelman_strock_calendar_column_day">
                            <div className="tabwelding_tabel_tabelman_s_c_c_day_title">24</div>
                            <input type='number' className="tabwelding_tabel_tabelman_s_c_c_day_content border-b" value={man.days.d24}></input>
                        </div>

                    </div>
                    <div className="tabwelding_tabel_tabelman_strock_calendar_s">

                        <div className="tabwelding_tabel_tabelman_strock_calendar_column_day">
                            <div className="tabwelding_tabel_tabelman_s_c_c_day_title">10</div>
                            <input type='number' className="tabwelding_tabel_tabelman_s_c_c_day_content border-b" value={man.days.d10}></input>
                        </div>


                        <div className="tabwelding_tabel_tabelman_strock_calendar_column_day">
                            <div className="tabwelding_tabel_tabelman_s_c_c_day_title">25</div>
                            <input type='number' className="tabwelding_tabel_tabelman_s_c_c_day_content border-b" value={man.days.d25}></input>
                        </div>

                    </div>
                    <div className="tabwelding_tabel_tabelman_strock_calendar_s">

                        <div className="tabwelding_tabel_tabelman_strock_calendar_column_day">
                            <div className="tabwelding_tabel_tabelman_s_c_c_day_title">11</div>
                            <input type='number' className="tabwelding_tabel_tabelman_s_c_c_day_content border-b" value={man.days.d11}></input>
                        </div>


                        <div className="tabwelding_tabel_tabelman_strock_calendar_column_day">
                            <div className="tabwelding_tabel_tabelman_s_c_c_day_title">26</div>
                            <input type='number' className="tabwelding_tabel_tabelman_s_c_c_day_content border-b" value={man.days.d26}></input>
                        </div>

                    </div>
                    <div className="tabwelding_tabel_tabelman_strock_calendar_s">

                        <div className="tabwelding_tabel_tabelman_strock_calendar_column_day">
                            <div className="tabwelding_tabel_tabelman_s_c_c_day_title">12</div>
                            <input type='number' className="tabwelding_tabel_tabelman_s_c_c_day_content border-b" value={man.days.d12}></input>
                        </div>


                        <div className="tabwelding_tabel_tabelman_strock_calendar_column_day">
                            <div className="tabwelding_tabel_tabelman_s_c_c_day_title">27</div>
                            <input type='number' className="tabwelding_tabel_tabelman_s_c_c_day_content border-b" value={man.days.d27}></input>
                        </div>

                    </div>
                    <div className="tabwelding_tabel_tabelman_strock_calendar_s">

                        <div className="tabwelding_tabel_tabelman_strock_calendar_column_day">
                            <div className="tabwelding_tabel_tabelman_s_c_c_day_title">13</div>
                            <input type='number' className="tabwelding_tabel_tabelman_s_c_c_day_content border-b" value={man.days.d13}></input>
                        </div>


                        <div className="tabwelding_tabel_tabelman_strock_calendar_column_day">
                            <div className="tabwelding_tabel_tabelman_s_c_c_day_title">28</div>
                            <input type='number' className="tabwelding_tabel_tabelman_s_c_c_day_content border-b" value={man.days.d28}></input>
                        </div>

                    </div>
                    <div className="tabwelding_tabel_tabelman_strock_calendar_s">

                        <div className="tabwelding_tabel_tabelman_strock_calendar_column_day">
                            <div className="tabwelding_tabel_tabelman_s_c_c_day_title">14</div>
                            <input type='number' className="tabwelding_tabel_tabelman_s_c_c_day_content border-b" value={man.days.d14}></input>
                        </div>


                        <div className="tabwelding_tabel_tabelman_strock_calendar_column_day">
                            <div className="tabwelding_tabel_tabelman_s_c_c_day_title">29</div>
                            <input type='number' className="tabwelding_tabel_tabelman_s_c_c_day_content border-b" value={man.days.d29}></input>
                        </div>

                    </div>
                    <div className="tabwelding_tabel_tabelman_strock_calendar_s">

                        <div className="tabwelding_tabel_tabelman_strock_calendar_column_day">
                            <div className="tabwelding_tabel_tabelman_s_c_c_day_title">15</div>
                            <input type='number' className="tabwelding_tabel_tabelman_s_c_c_day_content border-b" value={man.days.d15}></input>
                        </div>


                        <div className="tabwelding_tabel_tabelman_strock_calendar_column_day">
                            <div className="tabwelding_tabel_tabelman_s_c_c_day_title">30</div>
                            <input type='number' className="tabwelding_tabel_tabelman_s_c_c_day_content border-b" value={man.days.d30}></input>
                        </div>

                    </div>
                    <div className="tabwelding_tabel_tabelman_strock_calendar_s">

                        <div className="tabwelding_tabel_tabelman_strock_calendar_column_day">
                        </div>


                        <div className="tabwelding_tabel_tabelman_strock_calendar_column_day">
                            <div className="tabwelding_tabel_tabelman_s_c_c_day_title top-border-1px">31</div>
                            <input type='number' className="tabwelding_tabel_tabelman_s_c_c_day_content border-b" value={man.days.d31}></input>
                        </div>

                    </div>
                </div>
                <div className="tabwelding_tabel_tabelman_strock_itogy">
                    <div className="tabwelding_tabel_tabelman_strock_itogy-header">Итого</div>
                    <div className="tabwelding_tabel_tabelman_strock_itogy-sum">0</div>
                </div>
            </div>
                ))}
        </div>
    )
}