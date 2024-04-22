import React, {useEffect, useRef, useState} from "react";
import WeldingService from "../../../services/WeldingService";
import "./tabelform.scss";

export const TabelViewsWork = ({getTabel,setTabel,active,idobj,shifr,month,year}) => {

    const [day, setDay] = useState(getTabel)
    const [value, setValue] = useState('');

    const handleChange = async (pep, valuee, manid, index) => {

        try{
            const newstrocks = [...getTabel]
            newstrocks[index][pep] = +valuee
            setTabel(newstrocks)
            setDay(pep)


            const int = +valuee
            console.log({pep,int,manid})
            const upDay = await WeldingService.updateManDays({day:pep,value:int,manid})
        }catch(e){
            console.log(e)
        }
    }


    const summItogy = () => {
        try{
            return '45'
        }catch(e){
            console.log(e)
        }

    }
    // const handleChange = (event) => {
    //     setValue(event.target.value);
    // }

    return (
        <div className="tabelviewwork">
            <p>{value}</p>
            {getTabel.map((strock, index) =>{
                console.log(strock)
                const summp = strock.p1 + strock.p2 + strock.p3 + strock.p4 + strock.p5 + strock.p6 + strock.p7 + strock.p8 + strock.p9 + strock.p10 + strock.p11 + strock.p12 + strock.p13 + strock.p14 + strock.p15 + strock.p16 + strock.p17 + strock.p18 + strock.p19 + strock.p20 + strock.p21 + strock.p22 + strock.p23 + strock.p24 + strock.p25 + strock.p26 + strock.p27 + strock.p28 + strock.p29 + strock.p30 + strock.p31;
                const summd = strock.d1 + strock.d2 + strock.d3 + strock.d4 + strock.d5 + strock.d6 + strock.d7 + strock.d8 + strock.d9 + strock.d10 + strock.d11 + strock.d12 + strock.d13 + strock.d14 + strock.d15 + strock.d16 + strock.d17 + strock.d18 + strock.d19 + strock.d20 + strock.d21 + strock.d22 + strock.d23 + strock.d24 + strock.d25 + strock.d26 + strock.d27 + strock.d28 + strock.d29 + strock.d30 + strock.d31;
                return (
                <div key={index} className="tabwelding_viewswork">
                    <div className="tabwelding_viewswork_tabel">
                        <div className="tabwelding_viewswork_tabel_strock">
                            <div className="tabwelding_viewswork_tabel_strock_head">
                                <div className="tabwelding_viewswork_tabel_strock_head_up">
                                    <div className="tabwelding_viewswork_t_s_h_up_num">{index+1}</div>
                                    <div className="tabwelding_viewswork_t_s_h_up_btns">
                                        {/*<div className="tabwelding_viewswork_t_s_h_up_btns_submit">Подписать</div>*/}
                                        <div className="tabwelding_viewswork_t_s_h_up_btns_delete"><i className="fa-solid fa-trash" /></div>
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
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" value={(strock.d1 === 0 || strock.d1 === '0')?'':strock.d1} onChange={(e)=>{handleChange('d1', e.target.value, strock.id, index)}}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  value={(strock.p1 === 0 || strock.p1 === '0')?'':strock.p1} onChange={(e)=>{handleChange('p1', e.target.value, strock.id, index)}}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">2</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" value={(strock.d2 === 0 || strock.d2 === '0')?'':strock.d2 } onChange={(e)=>{handleChange('d2', e.target.value, strock.id, index)}}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  value={(strock.p2 === 0 || strock.p2 === '0')?'':strock.p2} onChange={(e)=>{handleChange('p2', e.target.value, strock.id, index)}}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">3</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" value={(strock.d3 === 0 || strock.d3 === '0')?'':strock.d3} onChange={(e)=>{handleChange('d3', e.target.value, strock.id, index)}}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  value={(strock.p3 === 0 || strock.p3 === '0')?'':strock.p3} onChange={(e)=>{handleChange('p3', e.target.value, strock.id, index)}}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">4</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" value={(strock.d4 === 0 || strock.d4 === '0')?'':strock.d4} onChange={(e)=>{handleChange('d4', e.target.value, strock.id, index)}}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  value={(strock.p4 === 0 || strock.p4 === '0')?'':strock.p4} onChange={(e)=>{handleChange('p4', e.target.value, strock.id, index)}}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">5</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" value={(strock.d5 === 0 || strock.d5 === '0')?'':strock.d5} onChange={(e)=>{handleChange('d5', e.target.value, strock.id, index)}}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  value={(strock.p5 === 0 || strock.p5 === '0')?'':strock.p5} onChange={(e)=>{handleChange('p5', e.target.value, strock.id, index)}}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">6</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" value={(strock.d6 === 0 || strock.d6 === '0')?'':strock.d6} onChange={(e)=>{handleChange('d6', e.target.value, strock.id, index)}}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  value={(strock.p6 === 0 || strock.p6 === '0')?'':strock.p6} onChange={(e)=>{handleChange('p6', e.target.value, strock.id, index)}}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">7</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" value={(strock.d7 === 0 || strock.d7 === '0')?'':strock.d7} onChange={(e)=>{handleChange('d7', e.target.value, strock.id, index)}}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  value={(strock.p7 === 0 || strock.p7 === '0')?'':strock.p7} onChange={(e)=>{handleChange('p7', e.target.value, strock.id, index)}}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">8</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" value={(strock.d8 === 0 || strock.d8 === '0')?'':strock.d8} onChange={(e)=>{handleChange('d8', e.target.value, strock.id, index)}}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  value={(strock.p8 === 0 || strock.p8 === '0')?'':strock.p8} onChange={(e)=>{handleChange('p8', e.target.value, strock.id, index)}}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">9</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" value={(strock.d9 === 0 || strock.d9 === '0')?'':strock.d9} onChange={(e)=>{handleChange('d9', e.target.value, strock.id, index)}}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  value={(strock.p9 === 0 || strock.p9 === '0')?'':strock.p9} onChange={(e)=>{handleChange('p9', e.target.value, strock.id, index)}}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">10</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" value={(strock.d10 === 0 || strock.d10 === '0')?'':strock.d10} onChange={(e)=>{handleChange('d10', e.target.value, strock.id, index)}}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  value={(strock.p10 === 0 || strock.p10 === '0')?'':strock.p10} onChange={(e)=>{handleChange('p10', e.target.value, strock.id, index)}}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">11</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" value={(strock.d11 === 0 || strock.d11 === '0')?'':strock.d11} onChange={(e)=>{handleChange('d11', e.target.value, strock.id, index)}}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  value={(strock.p11 === 0 || strock.p11 === '0')?'':strock.p11} onChange={(e)=>{handleChange('p11', e.target.value, strock.id, index)}}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">12</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" value={(strock.d12 === 0 || strock.d12 === '0')?'':strock.d12} onChange={(e)=>{handleChange('d12', e.target.value, strock.id, index)}}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  value={(strock.p12 === 0 || strock.p12 === '0')?'':strock.p12} onChange={(e)=>{handleChange('p12', e.target.value, strock.id, index)}}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">13</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" value={(strock.d13 === 0 || strock.d13 === '0')?'':strock.d13 } onChange={(e)=>{handleChange('d13', e.target.value, strock.id, index)}}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  value={(strock.p13 === 0 || strock.p13 === '0')?'':strock.p13 } onChange={(e)=>{handleChange('p13', e.target.value, strock.id, index)}}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">14</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" value={(strock.d14 === 0 || strock.d14 === '0')?'':strock.d14 } onChange={(e)=>{handleChange('d14', e.target.value, strock.id, index)}}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  value={(strock.p14 === 0 || strock.p14 === '0')?'':strock.p14 } onChange={(e)=>{handleChange('p14', e.target.value, strock.id, index)}}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">15</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" value={(strock.d15 === 0 || strock.d15 === '0')?'':strock.d15 } onChange={(e)=>{handleChange('d15', e.target.value, strock.id, index)}}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  value={(strock.p15 === 0 || strock.p15 === '0')?'':strock.p15 } onChange={(e)=>{handleChange('p15', e.target.value, strock.id, index)}}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day disnone">
                                            <div className="tabwelding_v_t_s_c_d_day_title"></div>
                                        </div>
                                    </div>
                                    <div className="tabwelding_viewswork_tabel_strock_calendar_days_16">
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">16</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" value={(strock.d16 === 0 || strock.d16 === '0')?'':strock.d16 } onChange={(e)=>{handleChange('d16', e.target.value, strock.id, index)}}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  value={(strock.p16 === 0 || strock.p16 === '0')?'':strock.p16 } onChange={(e)=>{handleChange('p16', e.target.value, strock.id, index)}}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">17</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" value={(strock.d17 === 0 || strock.d17 === '0')?'':strock.d17 } onChange={(e)=>{handleChange('d17', e.target.value, strock.id, index)}}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  value={(strock.p17 === 0 || strock.p17 === '0')?'':strock.p17 } onChange={(e)=>{handleChange('p17', e.target.value, strock.id, index)}}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">18</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" value={(strock.d18 === 0 || strock.d18 === '0')?'':strock.d18 } onChange={(e)=>{handleChange('d18', e.target.value, strock.id, index)}}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  value={(strock.p18 === 0 || strock.p18 === '0')?'':strock.p18 } onChange={(e)=>{handleChange('p18', e.target.value, strock.id, index)}}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">19</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" value={(strock.d19 === 0 || strock.d19 === '0')?'':strock.d19} onChange={(e)=>{handleChange('d19', e.target.value, strock.id, index)}}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  value={(strock.p19 === 0 || strock.p19 === '0')?'':strock.p19 } onChange={(e)=>{handleChange('p19', e.target.value, strock.id, index)}}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">20</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" value={(strock.d20 === 0 || strock.d20 === '0')?'':strock.d20 } onChange={(e)=>{handleChange('d20', e.target.value, strock.id, index)}}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  value={(strock.p20 === 0 || strock.p20 === '0')?'':strock.p20 } onChange={(e)=>{handleChange('p20', e.target.value, strock.id, index)}}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">21</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" value={(strock.d21 === 0 || strock.d21 === '0')?'':strock.d21} onChange={(e)=>{handleChange('d21', e.target.value, strock.id, index)}}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  value={(strock.p21 === 0 || strock.p21 === '0')?'':strock.p21 } onChange={(e)=>{handleChange('p21', e.target.value, strock.id, index)}}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">22</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" value={(strock.d22 === 0 || strock.d22 === '0')?'':strock.d22 } onChange={(e)=>{handleChange('d22', e.target.value, strock.id, index)}}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  value={(strock.p22 === 0 || strock.p22 === '0')?'':strock.p22 } onChange={(e)=>{handleChange('p22', e.target.value, strock.id, index)}}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">23</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" value={(strock.d23 === 0 || strock.d23 === '0')?'':strock.d23 } onChange={(e)=>{handleChange('d23', e.target.value, strock.id, index)}}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  value={(strock.p23 === 0 || strock.p23 === '0')?'':strock.p23 } onChange={(e)=>{handleChange('p23', e.target.value, strock.id, index)}}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">24</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" value={(strock.d24 === 0 || strock.d24 === '0')?'':strock.d24 } onChange={(e)=>{handleChange('d24', e.target.value, strock.id, index)}}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  value={(strock.p24 === 0 || strock.p24 === '0')?'':strock.p24 } onChange={(e)=>{handleChange('p24', e.target.value, strock.id, index)}}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">25</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" value={(strock.d25 === 0 || strock.d25 === '0')?'':strock.d25 } onChange={(e)=>{handleChange('d25', e.target.value, strock.id, index)}}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  value={(strock.p25 === 0 || strock.p25 === '0')?'':strock.p25 } onChange={(e)=>{handleChange('p25', e.target.value, strock.id, index)}}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">26</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" value={(strock.d26 === 0 || strock.d26 === '0')?'':strock.d26 } onChange={(e)=>{handleChange('d26', e.target.value, strock.id, index)}}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  value={(strock.p26 === 0 || strock.p26 === '0')?'':strock.p26 } onChange={(e)=>{handleChange('p26', e.target.value, strock.id, index)}}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">27</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" value={(strock.d27 === 0 || strock.d27 === '0')?'':strock.d27 } onChange={(e)=>{handleChange('d27', e.target.value, strock.id, index)}}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  value={(strock.p27 === 0 || strock.p27 === '0')?'':strock.p27 } onChange={(e)=>{handleChange('p27', e.target.value, strock.id, index)}}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">28</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" value={(strock.d28 === 0 || strock.d28 === '0')?'':strock.d28 } onChange={(e)=>{handleChange('d28', e.target.value, strock.id, index)}}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  value={(strock.p28 === 0 || strock.p28 === '0')?'':strock.p28 } onChange={(e)=>{handleChange('p28', e.target.value, strock.id, index)}}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">29</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" value={(strock.d29 === 0 || strock.d29 === '0')?'':strock.d29 } onChange={(e)=>{handleChange('d29', e.target.value, strock.id, index)}}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  value={(strock.p29 === 0 || strock.p29 === '0')?'':strock.p29 } onChange={(e)=>{handleChange('p29', e.target.value, strock.id, index)}}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day border-r">
                                            <div className="tabwelding_v_t_s_c_d_day_title">30</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" value={(strock.d30 === 0 || strock.d30 === '0')?'':strock.d30 } onChange={(e)=>{handleChange('d30', e.target.value, strock.id, index)}}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  value={(strock.p30 === 0 || strock.p30 === '0')?'':strock.p30 } onChange={(e)=>{handleChange('p30', e.target.value, strock.id, index)}}/>
                                            </div>
                                        </div>
                                        <div className="tabwelding_viewswork_tabel_strock_calendar_days__day">
                                            <div className="tabwelding_v_t_s_c_d_day_title">31</div>
                                            <div className="tabwelding_v_t_s_c_d_day_plan">
                                                <input type='number' className="tabwelding_v_t_s_c_d_day_plan_input" value={(strock.d31 === 0 || strock.d31 === '0')?'':strock.d31 } onChange={(e)=>{handleChange('d31', e.target.value, strock.id, index)}}/>
                                            </div>
                                            <div className="tabwelding_v_t_s_c_d_day_fact">
                                                <input className="tabwelding_v_t_s_c_d_day_plan_input"  value={(strock.p31 === 0 || strock.p31 === '0')?'':strock.p31 } onChange={(e)=>{handleChange('p31', e.target.value, strock.id, index)}}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="tabwelding_viewswork_tabel_strock_itogy">
                                <div className="tabwelding_viewswork_tabel_strock_title open-flex"><span>Итого за</span>
                                <span>месяц</span></div>
                                <div className="tabwelding_viewswork_tabel_strock_ii">
                                    <div className="tabwelding_viewswork_tabel_strock_ii_pf_t">
                                        <div className="tabwelding_viewswork_tabel_strock_ii_plan">План</div>
                                        <div className="tabwelding_viewswork_tabel_strock_ii_fact">Факт</div>
                                    </div>
                                    <div className="tabwelding_viewswork_tabel_strock_ii_pf_res">
                                        <div className="tabwelding_viewswork_tabel_strock_ii_res_plan">{summp}</div>
                                        <div className="tabwelding_viewswork_tabel_strock_ii_res_fact">{summd}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="strockdata">
                                <div className="tabwelding_viewswork_tabel_strock_btnitogy">
                                    <div  className="tabwelding_viewswork_tabel_strock_btnitogy_title">Итоги</div>
                                </div>
                                <div className="tabwelding_viewswork_tabel_strock_project">
                                    <div className="tabwelding_viewswork_tabel_strock_title">по<br/>
                                        проекту</div>
                                    <div className="tabwelding_viewswork_tabel_strock_res">{strock.volume}</div>
                                </div>
                                <div className="tabwelding_viewswork_tabel_strock_start">
                                    <div className="tabwelding_viewswork_tabel_strock_title">Итого с<br/>
                                        начала</div>
                                    <div className="tabwelding_viewswork_tabel_strock_res">{strock.allfact}</div>
                                </div>
                                <div className="tabwelding_viewswork_tabel_strock_delta">
                                    <div className="tabwelding_viewswork_tabel_strock_title">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="50%" height="50%" viewBox="0 0 22 18" fill="none">
                                            <path d="M1.47372 17.5L11 1L20.5263 17.5H1.47372Z" stroke="black"/>
                                        </svg>
                                    </div>
                                    <div className="tabwelding_viewswork_tabel_strock_res">{strock.volume - strock.allfact}</div>
                                </div>
                                {/*<div className="tabwelding_viewswork_tabel_strock_norma">*/}
                                {/*    <div className="tabwelding_viewswork_tabel_strock_title">Итого норма<br/>*/}
                                {/*        времени</div>*/}
                                {/*    <div className="tabwelding_viewswork_tabel_strock_res">0</div>*/}
                                {/*</div>*/}
                                {/*<div className="tabwelding_viewswork_tabel_strock_cover">*/}
                                {/*    <div className="tabwelding_viewswork_tabel_strock_title">Выра<br/>*/}
                                {/*        ботка %</div>*/}
                                {/*    <div className="tabwelding_viewswork_tabel_strock_res">0</div>*/}
                                {/*</div>*/}
                                <div className="tabwelding_viewswork_tabel_strock_complite">
                                    <div className="tabwelding_viewswork_tabel_strock_title">Выпол<br/>
                                        нение %</div>
                                    <div className="tabwelding_viewswork_tabel_strock_res">{(+strock.allfact/+strock.volume*100).toFixed(0)}%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
           )})}


        </div>
    )
}