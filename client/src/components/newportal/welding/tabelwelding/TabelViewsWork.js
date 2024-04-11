import React, {useEffect, useRef, useState} from "react";



export const TabelViewsWork = ({getTabel,active,idobj,shifr,month,year}) => {

    console.log('123-')
    console.log(getTabel)
    //
    const [value, setValue] = useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    }

    return (
        <div className="tabelviewwork">
            <p>{value}</p>
            {getTabel.map((strock, index) => (
                <div key={index} className="tabwelding_viewswork">
                    <div className="tabwelding_viewswork_tabel">
                        <div className="tabwelding_viewswork_tabel_strock">
                            <div className="tabwelding_viewswork_tabel_strock_head">
                                <div className="tabwelding_viewswork_tabel_strock_head_up">
                                    <div className="tabwelding_viewswork_t_s_h_up_num">{index+1}</div>
                                    <div className="tabwelding_viewswork_t_s_h_up_btns">
                                        <div className="tabwelding_viewswork_t_s_h_up_btns_submit">Подписать</div>
                                        <div className="tabwelding_viewswork_t_s_h_up_btns_delete">D</div>
                                    </div>
                                </div>
                                <div className="tabwelding_viewswork_tabel_strock_head_fio">{strock.name}</div>
                            </div>

                            <div className="tabwelding_viewswork_tabel_strock_calendar">
                                <div className="tabwelding_viewswork_tabel_strock_calendar_up">{active}</div>
                                <div className="tabwelding_viewswork_tabel_strock_calendar_days">
                                    <div className="tabwelding_viewswork_tabel_strock_calendar_days_16 border_b">
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">1</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" defaultValue={(strock.d1 === 0 || strock.d1 === '0')?'':strock.d1} onChange={handleChange}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  defaultValue={(strock.p1 === 0 || strock.p1 === '0')?'':strock.p1} onChange={handleChange}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">2</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" defaultValue={(strock.d2 === 0 || strock.d2 === '0')?'':strock.d2 } onChange={handleChange}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  defaultValue={(strock.p2 === 0 || strock.p2 === '0')?'':strock.p2} onChange={handleChange}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">3</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" defaultValue={(strock.d3 === 0 || strock.d3 === '0')?'':strock.d3} onChange={handleChange}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  defaultValue={(strock.p3 === 0 || strock.p3 === '0')?'':strock.p3} onChange={handleChange}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">4</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" defaultValue={(strock.d4 === 0 || strock.d4 === '0')?'':strock.d4} onChange={handleChange}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  defaultValue={(strock.p4 === 0 || strock.p4 === '0')?'':strock.p4} onChange={handleChange}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">5</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" defaultValue={(strock.d5 === 0 || strock.d5 === '0')?'':strock.d5} onChange={handleChange}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  defaultValue={(strock.p5 === 0 || strock.p5 === '0')?'':strock.p5} onChange={handleChange}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">6</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" defaultValue={(strock.d6 === 0 || strock.d6 === '0')?'':strock.d6} onChange={handleChange}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  defaultValue={(strock.p6 === 0 || strock.p6 === '0')?'':strock.p6} onChange={handleChange}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">7</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" defaultValue={(strock.d7 === 0 || strock.d7 === '0')?'':strock.d7} onChange={handleChange}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  defaultValue={(strock.p7 === 0 || strock.p7 === '0')?'':strock.p7} onChange={handleChange}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">8</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" defaultValue={(strock.d8 === 0 || strock.d8 === '0')?'':strock.d8} onChange={handleChange}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  defaultValue={(strock.p8 === 0 || strock.p8 === '0')?'':strock.p8} onChange={handleChange}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">9</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" defaultValue={(strock.d9 === 0 || strock.d9 === '0')?'':strock.d9} onChange={handleChange}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  defaultValue={(strock.p9 === 0 || strock.p9 === '0')?'':strock.p9} onChange={handleChange}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">10</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" defaultValue={(strock.d10 === 0 || strock.d10 === '0')?'':strock.d10} onChange={handleChange}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  defaultValue={(strock.p10 === 0 || strock.p10 === '0')?'':strock.p10} onChange={handleChange}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">11</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" defaultValue={(strock.d11 === 0 || strock.d11 === '0')?'':strock.d11} onChange={handleChange}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  defaultValue={(strock.p11 === 0 || strock.p11 === '0')?'':strock.p11} onChange={handleChange}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">12</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" defaultValue={(strock.d12 === 0 || strock.d12 === '0')?'':strock.d12} onChange={handleChange}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  defaultValue={(strock.p12 === 0 || strock.p12 === '0')?'':strock.p12} onChange={handleChange}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">13</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" defaultValue={(strock.d13 === 0 || strock.d13 === '0')?'':strock.d13 } onChange={handleChange}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  defaultValue={(strock.p13 === 0 || strock.p13 === '0')?'':strock.p13 } onChange={handleChange}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">14</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" defaultValue={(strock.d14 === 0 || strock.d14 === '0')?'':strock.d14 } onChange={handleChange}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  defaultValue={(strock.p14 === 0 || strock.p14 === '0')?'':strock.p14 } onChange={handleChange}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">15</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" defaultValue={(strock.d15 === 0 || strock.d15 === '0')?'':strock.d15 } onChange={handleChange}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  defaultValue={(strock.p15 === 0 || strock.p15 === '0')?'':strock.p15 } onChange={handleChange}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day ">
                                            <div className="tabwelding_v_t_s_c_d_day_title"></div>
                                        </div>
                                    </div>
                                    <div className="tabwelding_viewswork_tabel_strock_calendar_days_16">
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">16</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" defaultValue={(strock.d16 === 0 || strock.d16 === '0')?'':strock.d16 } onChange={handleChange}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  defaultValue={(strock.p16 === 0 || strock.p16 === '0')?'':strock.p16 } onChange={handleChange}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">17</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" defaultValue={(strock.d17 === 0 || strock.d17 === '0')?'':strock.d17 } onChange={handleChange}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  defaultValue={(strock.p17 === 0 || strock.p17 === '0')?'':strock.p17 } onChange={handleChange}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">18</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" defaultValue={(strock.d18 === 0 || strock.d18 === '0')?'':strock.d18 } onChange={handleChange}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  defaultValue={(strock.p18 === 0 || strock.p18 === '0')?'':strock.p18 } onChange={handleChange}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">19</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" defaultValue={(strock.d19 === 0 || strock.d19 === '0')?'':strock.d19} onChange={handleChange}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  defaultValue={(strock.p19 === 0 || strock.p19 === '0')?'':strock.p19 } onChange={handleChange}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">20</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" defaultValue={(strock.d20 === 0 || strock.d20 === '0')?'':strock.d20 } onChange={handleChange}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  defaultValue={(strock.p20 === 0 || strock.p20 === '0')?'':strock.p20 } onChange={handleChange}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">21</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" defaultValue={(strock.d21 === 0 || strock.d21 === '0')?'':strock.d21} onChange={handleChange}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  defaultValue={(strock.p21 === 0 || strock.p21 === '0')?'':strock.p21 } onChange={handleChange}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">22</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" defaultValue={(strock.d22 === 0 || strock.d22 === '0')?'':strock.d22 } onChange={handleChange}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  defaultValue={(strock.p22 === 0 || strock.p22 === '0')?'':strock.p22 } onChange={handleChange}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">23</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" defaultValue={(strock.d23 === 0 || strock.d23 === '0')?'':strock.d23 } onChange={handleChange}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  defaultValue={(strock.p23 === 0 || strock.p23 === '0')?'':strock.p23 } onChange={handleChange}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">24</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" defaultValue={(strock.d24 === 0 || strock.d24 === '0')?'':strock.d24 } onChange={handleChange}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  defaultValue={(strock.p24 === 0 || strock.p24 === '0')?'':strock.p24 } onChange={handleChange}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">25</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" defaultValue={(strock.d25 === 0 || strock.d25 === '0')?'':strock.d25 } onChange={handleChange}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  defaultValue={(strock.p25 === 0 || strock.p25 === '0')?'':strock.p25 } onChange={handleChange}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">26</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" defaultValue={(strock.d26 === 0 || strock.d26 === '0')?'':strock.d26 } onChange={handleChange}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  defaultValue={(strock.p26 === 0 || strock.p26 === '0')?'':strock.p26 } onChange={handleChange}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">27</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" defaultValue={(strock.d27 === 0 || strock.d27 === '0')?'':strock.d27 } onChange={handleChange}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  defaultValue={(strock.p27 === 0 || strock.p27 === '0')?'':strock.p27 } onChange={handleChange}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">28</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" defaultValue={(strock.d28 === 0 || strock.d28 === '0')?'':strock.d28 } onChange={handleChange}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  defaultValue={(strock.p28 === 0 || strock.p28 === '0')?'':strock.p28 } onChange={handleChange}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">29</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" defaultValue={(strock.d29 === 0 || strock.d29 === '0')?'':strock.d29 } onChange={handleChange}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  defaultValue={(strock.p29 === 0 || strock.p29 === '0')?'':strock.p29 } onChange={handleChange}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">30</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" defaultValue={(strock.d30 === 0 || strock.d30 === '0')?'':strock.d30 } onChange={handleChange}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  defaultValue={(strock.p30 === 0 || strock.p30 === '0')?'':strock.p30 } onChange={handleChange}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day">
                                            <div className="tabwelding_v_t_s_c_d_day_title">31</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" defaultValue={(strock.d31 === 0 || strock.d31 === '0')?'':strock.d31 } onChange={handleChange}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  defaultValue={(strock.p31 === 0 || strock.p31 === '0')?'':strock.p31 } onChange={handleChange}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="tabwelding_viewswork_tabel_strock_itogy">
                                <div className="tabwelding_viewswork_tabel_strock_title open-flex">Итого за<br/>
                                    месяц</div>
                                <div className="tabwelding_viewswork_tabel_strock_ii">
                                    <div className="tabwelding_viewswork_tabel_strock_ii_pf_t">
                                        <div className="tabwelding_viewswork_tabel_strock_ii_plan">План</div>
                                        <div className="tabwelding_viewswork_tabel_strock_ii_fact">Факт</div>
                                    </div>
                                    <div className="tabwelding_viewswork_tabel_strock_ii_pf_res">
                                        <div className="tabwelding_viewswork_tabel_strock_ii_res_plan">456</div>
                                        <div className="tabwelding_viewswork_tabel_strock_ii_res_fact">945</div>
                                    </div>
                                </div>
                            </div>
                            <div className="tabwelding_viewswork_tabel_strock_btnitogy">
                                <div  className="tabwelding_viewswork_tabel_strock_btnitogy_title">Итоги</div>
                            </div>
                            <div className="tabwelding_viewswork_tabel_strock_project">
                                <div className="tabwelding_viewswork_tabel_strock_title">по<br/>
                                    проекту</div>
                                <div className="tabwelding_viewswork_tabel_strock_res">465</div>
                            </div>
                            <div className="tabwelding_viewswork_tabel_strock_start">
                                <div className="tabwelding_viewswork_tabel_strock_title">Итого с<br/>
                                    начала</div>
                                <div className="tabwelding_viewswork_tabel_strock_res">3234</div>
                            </div>
                            <div className="tabwelding_viewswork_tabel_strock_delta">
                                <div className="tabwelding_viewswork_tabel_strock_title">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="50%" height="50%" viewBox="0 0 22 18" fill="none">
                                        <path d="M1.47372 17.5L11 1L20.5263 17.5H1.47372Z" stroke="black"/>
                                    </svg>
                                </div>
                                <div className="tabwelding_viewswork_tabel_strock_res">324</div>
                            </div>
                            <div className="tabwelding_viewswork_tabel_strock_norma">
                                <div className="tabwelding_viewswork_tabel_strock_title">Итого норма<br/>
                                    времени</div>
                                <div className="tabwelding_viewswork_tabel_strock_res">645</div>
                            </div>
                            <div className="tabwelding_viewswork_tabel_strock_cover">
                                <div className="tabwelding_viewswork_tabel_strock_title">Выра<br/>
                                    ботка %</div>
                                <div className="tabwelding_viewswork_tabel_strock_res">645</div>
                            </div>
                            <div className="tabwelding_viewswork_tabel_strock_complite">
                                <div className="tabwelding_viewswork_tabel_strock_title">Выпол<br/>
                                    нение %</div>
                                <div className="tabwelding_viewswork_tabel_strock_res">8567</div>
                            </div>
                        </div>
                    </div>
                </div>
           ))}


        </div>
    )
}