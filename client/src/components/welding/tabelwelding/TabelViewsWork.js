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
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" defaultValue={strock.days.d1} onChange={handleChange}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  defaultValue={strock.plan.d1} onChange={handleChange}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">2</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" defaultValue={strock.days.d2} onChange={handleChange}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  defaultValue={strock.plan.d2} onChange={handleChange}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">3</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" defaultValue={strock.days.d3} onChange={handleChange}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  defaultValue={strock.plan.d3} onChange={handleChange}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">4</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" defaultValue={strock.days.d4} onChange={handleChange}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  defaultValue={strock.plan.d4} onChange={handleChange}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">5</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" defaultValue={strock.days.d5} onChange={handleChange}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  defaultValue={strock.plan.d5} onChange={handleChange}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">6</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" defaultValue={strock.days.d6} onChange={handleChange}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  defaultValue={strock.plan.d6} onChange={handleChange}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">7</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" defaultValue={strock.days.d7} onChange={handleChange}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  defaultValue={strock.plan.d7} onChange={handleChange}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">8</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" defaultValue={strock.days.d8} onChange={handleChange}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  defaultValue={strock.plan.d8} onChange={handleChange}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">9</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" defaultValue={strock.days.d9} onChange={handleChange}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  defaultValue={strock.plan.d9} onChange={handleChange}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">10</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" defaultValue={strock.days.d10} onChange={handleChange}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  defaultValue={strock.plan.d10} onChange={handleChange}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">11</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" defaultValue={strock.days.d11} onChange={handleChange}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  defaultValue={strock.plan.d11} onChange={handleChange}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">12</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" defaultValue={strock.days.d12} onChange={handleChange}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  defaultValue={strock.plan.d12} onChange={handleChange}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">13</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" defaultValue={strock.days.d13} onChange={handleChange}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  defaultValue={strock.plan.d13} onChange={handleChange}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">14</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" defaultValue={strock.days.d14} onChange={handleChange}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  defaultValue={strock.plan.d14} onChange={handleChange}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">15</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" defaultValue={strock.days.d15} onChange={handleChange}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  defaultValue={strock.plan.d15} onChange={handleChange}/>
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
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" defaultValue={strock.days.d16} onChange={handleChange}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  defaultValue={strock.plan.d16} onChange={handleChange}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">17</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" defaultValue={strock.days.d17} onChange={handleChange}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  defaultValue={strock.plan.d17} onChange={handleChange}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">18</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" defaultValue={strock.days.d18} onChange={handleChange}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  defaultValue={strock.plan.d18} onChange={handleChange}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">19</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" defaultValue={strock.days.d19} onChange={handleChange}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  defaultValue={strock.plan.d19} onChange={handleChange}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">20</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" defaultValue={strock.days.d20} onChange={handleChange}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  defaultValue={strock.plan.d20} onChange={handleChange}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">21</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" defaultValue={strock.days.d21} onChange={handleChange}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  defaultValue={strock.plan.d21} onChange={handleChange}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">22</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" defaultValue={strock.days.d22} onChange={handleChange}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  defaultValue={strock.plan.d22} onChange={handleChange}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">23</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" defaultValue={strock.days.d23} onChange={handleChange}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  defaultValue={strock.plan.d23} onChange={handleChange}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">24</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" defaultValue={strock.days.d24} onChange={handleChange}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  defaultValue={strock.plan.d24} onChange={handleChange}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">25</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" defaultValue={strock.days.d25} onChange={handleChange}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  defaultValue={strock.plan.d25} onChange={handleChange}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">26</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" defaultValue={strock.days.d26} onChange={handleChange}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  defaultValue={strock.plan.d26} onChange={handleChange}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">27</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" defaultValue={strock.days.d27} onChange={handleChange}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  defaultValue={strock.plan.d27} onChange={handleChange}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">28</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" defaultValue={strock.days.d28} onChange={handleChange}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  defaultValue={strock.plan.d28} onChange={handleChange}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">29</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" defaultValue={strock.days.d29} onChange={handleChange}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  defaultValue={strock.plan.d29} onChange={handleChange}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">30</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" defaultValue={strock.days.d30} onChange={handleChange}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  defaultValue={strock.plan.d30} onChange={handleChange}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day">
                                            <div className="tabwelding_v_t_s_c_d_day_title">31</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" defaultValue={strock.days.d31} onChange={handleChange}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  defaultValue={strock.plan.d31} onChange={handleChange}/>
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