import React, {useContext, useEffect, useRef, useState} from "react";
import "./tabel.scss";
import {DataContext} from "../../../context/DataContext";
import Select, { StylesConfig } from 'react-select';
import ObjsService from "../../../services/ObjsService";
import {useLocation} from "react-router-dom";
import {Context} from "../../../index";
import {useMonth} from "../../../hooks/month.hook";

export const TimeSheepList = () => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    let getId = searchParams.get('id');
    let getShifr = searchParams.get('shifr');
    let getMonth = searchParams.get('month');
    let getYear = searchParams.get('year');
    const  {store} = useContext(Context)
    const inn = store.user.inn
    const login = store.user.login

    const irr = (event) => {

    }
    const {table_tabel} = useContext(DataContext)
    const [listPeoples, setListPeoples] = useState([])
    const options = [{value:1, label: 'GD'},{value:1, label: '4'},{value:1, label: '1'},{value:1, label: '3'},{value:1, label: '2'}]

    const stylesday = {
        option: (baseStyles, state) => ({
            ...baseStyles,
            color: '#000',
            backgroundColor: '#FFF',
            fontFamily:'Montserrat, sans-serif',
            textTransform:'uppercase',
            fontSize:'0.7rem',
            fontWeight:'600',
            padding: '0px'

        }),
        control: (baseStyles, state) => ({
            // ...baseStyles,
            backgroundColor: '#FFF',
            borderWidth:'0px',
            borderRadius:'0',
            borderColor:'rgba(180, 180, 180, 1)',
            height:'40px',
            width:'40px',
            outline: 'none',
            appearance:'none',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            padding: '0px',
            margin: '0px',
            div: {
                fontFamily:'Montserrat, sans-serif',
                textTransform:'uppercase',
                fontSize:'0.7rem',
                fontWeight:'600',
                color: '#000 !important', // Устанавливаем цвет текста внутри input
            },
            ':hover': {
                borderColor:'rgba(180, 180, 180, 1)',  // Замените цветом, который вы хотите видеть при наведении
            },
            ':focus-within': {
                color:'rgba(180, 180, 180, 1)',
                outline: 'none',
                boxShadow: 'none',
            }
        }),

        indicatorsContainer:(baseStyles, state) => ({
            display:'none',
        }),
    }
    const pushMonth = useMonth()
    const listMansOfTabel = async (e) => {
        let month = pushMonth(getMonth)
        let year = getYear
        let shifre = getShifr
        const listTable = await ObjsService.listTabelMans({inn, shifre, month, year})
        setListPeoples(listTable.data)
        // setListObjs(viewList.data)
        console.log(listTable.data)
    }

    useEffect(()=>{
        listMansOfTabel()
    }, [])

    return (
        <div className="tab_tabel_tabelman ">
            {listPeoples.map((man, index) => (
                <div key={index} className="tab_tabel_tabelman_strock">
                    <div className="tab_tabel_tabelman_strock_num">{index + 1}</div>
                    <div className="tab_tabel_tabelman_strock_fio">
                        <div className="tab_tabel_tabelman_strock_fio_name">{man.name}</div>
                        <div className="tab_tabel_tabelman_strock_fio_dev">{man.developer}</div>
                    </div>
                    <div className="tab_tabel_tabelman_strock_calendar">
                        <div className="tab_tabel_tabelman_strock_calendar_s">

                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">1</div>
                                <select className="tab_tabel_tabelman_s_c_c_day_content border-b border-b no-left-border_sel">
                                    <option>{man.m1}</option>
                                    <option>11</option>
                                    <option>9</option>
                                    <option>8</option>
                                    <option>7</option>
                                    <option>4</option>
                                </select>
                                {/*<Select styles={stylesday} options={options} value={man.m1} placeholder=''/>*/}
                                {/*<input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b no-left-border" onChange={irr} defaultValue={man.m1}></input>*/}
                            </div>

                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">16</div>
                                {/*<input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b no-left-border" onChange={irr} defaultValue={man.m16}></input>*/}
                                <select className="tab_tabel_tabelman_s_c_c_day_content border-b border-b no-left-border_sel">
                                    <option>{man.m16}</option>
                                    <option>11</option>
                                    <option>9</option>
                                    <option>8</option>
                                    <option>7</option>
                                    <option>4</option>
                                </select>
                            </div>

                        </div>
                        <div className="tab_tabel_tabelman_strock_calendar_s">

                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">2</div>
                                <select className="tab_tabel_tabelman_s_c_c_day_content border-b ">
                                    <option>{man.m2}</option>
                                    <option>11</option>
                                    <option>9</option>
                                    <option>8</option>
                                    <option>7</option>
                                    <option>4</option>
                                </select>
                                {/*<input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m2}></input>*/}
                            </div>

                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">17</div>
                                <select className="tab_tabel_tabelman_s_c_c_day_content border-b ">
                                    <option>{man.m17}</option>
                                    <option>11</option>
                                    <option>9</option>
                                    <option>8</option>
                                    <option>7</option>
                                    <option>4</option>
                                </select>
                                {/*<input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m17}></input>*/}
                            </div>
                        </div>
                        <div className="tab_tabel_tabelman_strock_calendar_s">

                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">3</div>
                                <select className="tab_tabel_tabelman_s_c_c_day_content border-b ">
                                    <option>{man.m3}</option>
                                    <option>11</option>
                                    <option>9</option>
                                    <option>8</option>
                                    <option>7</option>
                                    <option>4</option>
                                </select>
                                {/*<input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m3}></input>*/}
                            </div>

                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">18</div>
                                <select className="tab_tabel_tabelman_s_c_c_day_content border-b ">
                                    <option>{man.m18}</option>
                                    <option>11</option>
                                    <option>9</option>
                                    <option>8</option>
                                    <option>7</option>
                                    <option>4</option>
                                </select>
                                {/*<input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m18}></input>*/}
                            </div>

                        </div>
                        <div className="tab_tabel_tabelman_strock_calendar_s">

                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">4</div>
                                <select className="tab_tabel_tabelman_s_c_c_day_content border-b ">
                                    <option>{man.m4}</option>
                                    <option>11</option>
                                    <option>9</option>
                                    <option>8</option>
                                    <option>7</option>
                                    <option>4</option>
                                </select>
                                {/*<input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m4}></input>*/}
                            </div>


                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">19</div>
                                <select className="tab_tabel_tabelman_s_c_c_day_content border-b ">
                                    <option>{man.m19}</option>
                                    <option>11</option>
                                    <option>9</option>
                                    <option>8</option>
                                    <option>7</option>
                                    <option>4</option>
                                </select>
                                {/*<input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m19}></input>*/}
                            </div>

                        </div>
                        <div className="tab_tabel_tabelman_strock_calendar_s">

                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">5</div>
                                <select className="tab_tabel_tabelman_s_c_c_day_content border-b ">
                                    <option>{man.m5}</option>
                                    <option>11</option>
                                    <option>9</option>
                                    <option>8</option>
                                    <option>7</option>
                                    <option>4</option>
                                </select>
                                {/*<input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m5}></input>*/}
                            </div>


                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">20</div>
                                <select className="tab_tabel_tabelman_s_c_c_day_content border-b ">
                                    <option>{man.m20}</option>
                                    <option>11</option>
                                    <option>9</option>
                                    <option>8</option>
                                    <option>7</option>
                                    <option>4</option>
                                </select>
                                {/*<input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m20}></input>*/}
                            </div>

                        </div>
                        <div className="tab_tabel_tabelman_strock_calendar_s">

                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">6</div>
                                <select className="tab_tabel_tabelman_s_c_c_day_content border-b ">
                                    <option>{man.m6}</option>
                                    <option>11</option>
                                    <option>9</option>
                                    <option>8</option>
                                    <option>7</option>
                                    <option>4</option>
                                </select>
                                {/*<input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m6}></input>*/}
                            </div>


                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">21</div>
                                <select className="tab_tabel_tabelman_s_c_c_day_content border-b ">
                                    <option>{man.m21}</option>
                                    <option>11</option>
                                    <option>9</option>
                                    <option>8</option>
                                    <option>7</option>
                                    <option>4</option>
                                </select>
                                {/*<input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m21}></input>*/}
                            </div>

                        </div>
                        <div className="tab_tabel_tabelman_strock_calendar_s">

                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">7</div>
                                <select className="tab_tabel_tabelman_s_c_c_day_content border-b ">
                                    <option>{man.m7}</option>
                                    <option>11</option>
                                    <option>9</option>
                                    <option>8</option>
                                    <option>7</option>
                                    <option>4</option>
                                </select>
                                {/*<input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m7}></input>*/}
                            </div>


                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">22</div>
                                <select className="tab_tabel_tabelman_s_c_c_day_content border-b ">
                                    <option>{man.m22}</option>
                                    <option>11</option>
                                    <option>9</option>
                                    <option>8</option>
                                    <option>7</option>
                                    <option>4</option>
                                </select>
                                {/*<input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m22}></input>*/}
                            </div>

                        </div>
                        <div className="tab_tabel_tabelman_strock_calendar_s">

                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">8</div>
                                <select className="tab_tabel_tabelman_s_c_c_day_content border-b ">
                                    <option>{man.m8}</option>
                                    <option>11</option>
                                    <option>9</option>
                                    <option>8</option>
                                    <option>7</option>
                                    <option>4</option>
                                </select>
                                {/*<input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m8}></input>*/}
                            </div>


                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">23</div>
                                <select className="tab_tabel_tabelman_s_c_c_day_content border-b ">
                                    <option>{man.m23}</option>
                                    <option>11</option>
                                    <option>9</option>
                                    <option>8</option>
                                    <option>7</option>
                                    <option>4</option>
                                </select>
                                {/*<input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m23}></input>*/}
                            </div>

                        </div>
                        <div className="tab_tabel_tabelman_strock_calendar_s">

                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">9</div>
                                <select className="tab_tabel_tabelman_s_c_c_day_content border-b ">
                                    <option>{man.m9}</option>
                                    <option>11</option>
                                    <option>9</option>
                                    <option>8</option>
                                    <option>7</option>
                                    <option>4</option>
                                </select>
                                {/*<input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m9}></input>*/}
                            </div>


                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">24</div>
                                <select className="tab_tabel_tabelman_s_c_c_day_content border-b ">
                                    <option>{man.m24}</option>
                                    <option>11</option>
                                    <option>9</option>
                                    <option>8</option>
                                    <option>7</option>
                                    <option>4</option>
                                </select>
                                {/*<input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m24}></input>*/}
                            </div>

                        </div>
                        <div className="tab_tabel_tabelman_strock_calendar_s">

                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">10</div>
                                <select className="tab_tabel_tabelman_s_c_c_day_content border-b ">
                                    <option>{man.m10}</option>
                                    <option>11</option>
                                    <option>9</option>
                                    <option>8</option>
                                    <option>7</option>
                                    <option>4</option>
                                </select>
                                {/*<input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m10}></input>*/}
                            </div>


                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">25</div>
                                <select className="tab_tabel_tabelman_s_c_c_day_content border-b ">
                                    <option>{man.m25}</option>
                                    <option>11</option>
                                    <option>9</option>
                                    <option>8</option>
                                    <option>7</option>
                                    <option>4</option>
                                </select>
                                {/*<input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m25}></input>*/}
                            </div>

                        </div>
                        <div className="tab_tabel_tabelman_strock_calendar_s">

                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">11</div>
                                <select className="tab_tabel_tabelman_s_c_c_day_content border-b ">
                                    <option>{man.m11}</option>
                                    <option>11</option>
                                    <option>9</option>
                                    <option>8</option>
                                    <option>7</option>
                                    <option>4</option>
                                </select>
                                {/*<input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m11}></input>*/}
                            </div>


                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">26</div>
                                <select className="tab_tabel_tabelman_s_c_c_day_content border-b ">
                                    <option>{man.m26}</option>
                                    <option>11</option>
                                    <option>9</option>
                                    <option>8</option>
                                    <option>7</option>
                                    <option>4</option>
                                </select>
                                {/*<input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m26}></input>*/}
                            </div>

                        </div>
                        <div className="tab_tabel_tabelman_strock_calendar_s">

                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">12</div>
                                <select className="tab_tabel_tabelman_s_c_c_day_content border-b ">
                                    <option>{man.m12}</option>
                                    <option>11</option>
                                    <option>9</option>
                                    <option>8</option>
                                    <option>7</option>
                                    <option>4</option>
                                </select>
                                {/*<input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m12}></input>*/}
                            </div>


                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">27</div>
                                <select className="tab_tabel_tabelman_s_c_c_day_content border-b ">
                                    <option>{man.m27}</option>
                                    <option>11</option>
                                    <option>9</option>
                                    <option>8</option>
                                    <option>7</option>
                                    <option>4</option>
                                </select>
                                {/*<input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m27}></input>*/}
                            </div>

                        </div>
                        <div className="tab_tabel_tabelman_strock_calendar_s">

                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">13</div>
                                <select className="tab_tabel_tabelman_s_c_c_day_content border-b ">
                                    <option>{man.m13}</option>
                                    <option>11</option>
                                    <option>9</option>
                                    <option>8</option>
                                    <option>7</option>
                                    <option>4</option>
                                </select>
                                {/*<input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m13}></input>*/}
                            </div>


                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">28</div>
                                <select className="tab_tabel_tabelman_s_c_c_day_content border-b ">
                                    <option>{man.m28}</option>
                                    <option>11</option>
                                    <option>9</option>
                                    <option>8</option>
                                    <option>7</option>
                                    <option>4</option>
                                </select>
                                {/*<input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m28}></input>*/}
                            </div>

                        </div>
                        <div className="tab_tabel_tabelman_strock_calendar_s">

                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">14</div>
                                <select className="tab_tabel_tabelman_s_c_c_day_content border-b ">
                                    <option>{man.m14}</option>
                                    <option>11</option>
                                    <option>9</option>
                                    <option>8</option>
                                    <option>7</option>
                                    <option>4</option>
                                </select>
                                {/*<input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m14}></input>*/}
                            </div>


                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">29</div>
                                <select className="tab_tabel_tabelman_s_c_c_day_content border-b ">
                                    <option>{man.m29}</option>
                                    <option>11</option>
                                    <option>9</option>
                                    <option>8</option>
                                    <option>7</option>
                                    <option>4</option>
                                </select>
                                {/*<input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m29}></input>*/}
                            </div>

                        </div>
                        <div className="tab_tabel_tabelman_strock_calendar_s">

                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">15</div>
                                <select className="tab_tabel_tabelman_s_c_c_day_content border-b ">
                                    <option>{man.m15}</option>
                                    <option>11</option>
                                    <option>9</option>
                                    <option>8</option>
                                    <option>7</option>
                                    <option>4</option>
                                </select>
                                {/*<input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m15}></input>*/}
                            </div>


                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">30</div>
                                <select className="tab_tabel_tabelman_s_c_c_day_content border-b ">
                                    <option>{man.m30}</option>
                                    <option>11</option>
                                    <option>9</option>
                                    <option>8</option>
                                    <option>7</option>
                                    <option>4</option>
                                </select>
                                {/*<input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m30}></input>*/}
                            </div>

                        </div>
                        <div className="tab_tabel_tabelman_strock_calendar_s">

                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                            </div>


                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title top-border-1px">31</div>
                                <select className="tab_tabel_tabelman_s_c_c_day_content border-b ">
                                    <option>{man.m31}</option>
                                    <option>11</option>
                                    <option>9</option>
                                    <option>8</option>
                                    <option>7</option>
                                    <option>4</option>
                                </select>
                                {/*<input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m31}></input>*/}
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
                                <input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.ktu}></input>
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
                                <input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.ras}></input>
                            </div>


                            <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                <div className="tab_tabel_tabelman_s_c_c_day_title">транспорт</div>
                                <input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.transport}></input>
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