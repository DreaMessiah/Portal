import React, {useEffect, useRef, useState} from "react";
import "./tabelform.scss";
import WeldingService from "../../../services/WeldingService";
import ModalFiles from "../../modalwin/ModalFiles";
import {useMessage} from "../../../hooks/message.hook";


export const TabelMans = ({peoples,setPeoples,active,idobj,shifr,month,year}) => {
    //console.log(peoples)
    const [day, setDay] = useState(peoples)
    const [selectDelete,setSelectDelete] = useState(-1)
    const [activeDelete,setActiveDelete] = useState(false)
    const message = useMessage()
    const updateDay = async (pep, value, manid, index) => {

        try{
            const newpeople = [...peoples]
            newpeople[index][pep] = +value
            setPeoples(newpeople)
            setDay(pep)

            const int = +value
            console.log({pep,int,manid})
            const upDay = await WeldingService.updateManDays({day:pep,value:int,manid})
        }catch(e){
            console.log(e)
        }
    }

    const deleteHandler = (index) => {
        setSelectDelete(index)
        setActiveDelete(true)
    }
    function Delete() {
        const deleteMan = async () => {
            try {
                const {data} = await WeldingService.deleteMan(peoples[selectDelete].id)
                if (data.del){
                    message(data.message)
                    const newPeoples = [...peoples]
                    newPeoples.splice(selectDelete,1)
                    setPeoples(newPeoples)
                    cancelHandler()
                }
            }catch (e) {
                console.log(e)
            }
        }
        const cancelHandler = () => {
            setSelectDelete(-1)
            setActiveDelete(false)
        }
        return (
            <div className={`delete`}>
                <div className={'title'}>Вы действительно хотели бы удалить пользователя из списка?</div>
                <div className={`buttons`}>

                    <div onClick={(e) => deleteMan()} className={`button`}>Да</div>
                    <div onClick={(e) => cancelHandler()} className={`button`}>Нет</div>
                </div>
            </div>
        )
    }


    return (
        <div className="tabwelding_tabel_tabelman ">
            {peoples.map((man, index) => {
                const summch = man.d1 + man.d2 + man.d3 + man.d4 + man.d5 + man.d6 + man.d7 + man.d8 + man.d9 + man.d10 + man.d11 + man.d12 + man.d13 + man.d14 + man.d15 + man.d16 + man.d17 + man.d18 + man.d19 + man.d20 + man.d21 + man.d22 + man.d23 + man.d24 + man.d25 + man.d26 + man.d27 + man.d28 + man.d29 + man.d30 + man.d31;
                let s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14, s15, s16, s17, s18, s19, s20, s21, s22, s23, s24, s25, s26, s27, s28, s29, s30, s31
                (man.d1 !== 0 && man.d1 !== '')?s1 = 1: s1 = 0;
                (man.d2 !== 0 && man.d2 !== '')?s2 = 1: s2 = 0;
                (man.d3 !== 0 && man.d3 !== '')?s3 = 1: s3 = 0;
                (man.d4 !== 0 && man.d4 !== '')?s4 = 1: s4 = 0;
                (man.d5 !== 0 && man.d5 !== '')?s5 = 1: s5 = 0;
                (man.d6 !== 0 && man.d6 !== '')?s6 = 1: s6 = 0;
                (man.d7 !== 0 && man.d7 !== '')?s7 = 1: s7 = 0;
                (man.d8 !== 0 && man.d8 !== '')?s8 = 1: s8 = 0;
                (man.d9 !== 0 && man.d9 !== '')?s9 = 1: s9 = 0;
                (man.d10 !== 0 && man.d10 !== '')?s10 = 1: s10 = 0;
                (man.d11 !== 0 && man.d11 !== '')?s11 = 1: s11 = 0;
                (man.d12 !== 0 && man.d12 !== '')?s12 = 1: s12 = 0;
                (man.d13 !== 0 && man.d13 !== '')?s13 = 1: s13 = 0;
                (man.d14 !== 0 && man.d14 !== '')?s14 = 1: s14 = 0;
                (man.d15 !== 0 && man.d15 !== '')?s15 = 1: s15 = 0;
                (man.d16 !== 0 && man.d16 !== '')?s16 = 1: s16 = 0;
                (man.d17 !== 0 && man.d17 !== '')?s17 = 1: s17 = 0;
                (man.d18 !== 0 && man.d18 !== '')?s18 = 1: s18 = 0;
                (man.d19 !== 0 && man.d19 !== '')?s19 = 1: s19 = 0;
                (man.d20 !== 0 && man.d20 !== '')?s20 = 1: s20 = 0;
                (man.d21 !== 0 && man.d21 !== '')?s21 = 1: s21 = 0;
                (man.d22 !== 0 && man.d22 !== '')?s22 = 1: s22 = 0;
                (man.d23 !== 0 && man.d23 !== '')?s23 = 1: s23 = 0;
                (man.d24 !== 0 && man.d24 !== '')?s24 = 1: s24 = 0;
                (man.d25 !== 0 && man.d25 !== '')?s25 = 1: s25 = 0;
                (man.d26 !== 0 && man.d26 !== '')?s26 = 1: s26 = 0;
                (man.d27 !== 0 && man.d27 !== '')?s27 = 1: s27 = 0;
                (man.d28 !== 0 && man.d28 !== '')?s28 = 1: s28 = 0;
                (man.d29 !== 0 && man.d29 !== '')?s29 = 1: s29 = 0;
                (man.d30 !== 0 && man.d30 !== '')?s30 = 1: s30 = 0;
                (man.d31 !== 0 && man.d31 !== '')?s31 = 1: s31 = 0;
                const summd = s1 + s2 + s3 + s4 + s5 + s6 + s7 + s8 + s9 + s10 + s11 + s12 + s13 + s14 + s15 + s16 + s17 + s18 + s19 + s20 + s21 + s22 + s23 + s24 + s25 + s26 + s27 + s28 + s29 + s30 + s31
                return (

                    <div key={index} className="tabwelding_tabel_tabelman_strock">
                        <div className="tabwelding_tabel_tabelman_strock_num">{index+1} <i className="fa-solid fa-trash" onClick={()=>deleteHandler(index)}/></div>
                        <div className="tabwelding_tabel_tabelman_strock_fio"><b>{man.name}</b> {man.developer}</div>
                        <div className="tabwelding_tabel_tabelman_strock_calendar">
                            <div className="tabwelding_tabel_tabelman_strock_calendar_s">

                                <div className="tabwelding_tabel_tabelman_strock_calendar_column_day">
                                    <div className="tabwelding_tabel_tabelman_s_c_c_day_title">1</div>
                                    <input type='number' className="tabwelding_tabel_tabelman_s_c_c_day_content border-b no-left-border" onChange={(e)=>{updateDay('d1', e.target.value, man.id, index)}} value={(man.d1===0||man.d1==='0'||man.d1===null)?'':man.d1}></input>
                                </div>

                                <div className="tabwelding_tabel_tabelman_strock_calendar_column_day">
                                    <div className="tabwelding_tabel_tabelman_s_c_c_day_title">16</div>
                                    <input type='number' className="tabwelding_tabel_tabelman_s_c_c_day_content border-b no-left-border" onChange={(e)=>{updateDay('d16', e.target.value, man.id, index)}} value={(man.d16===0||man.d16==='0'||man.d16===null)?'':man.d16}></input>
                                </div>

                            </div>
                            <div className="tabwelding_tabel_tabelman_strock_calendar_s">

                                <div className="tabwelding_tabel_tabelman_strock_calendar_column_day">
                                    <div className="tabwelding_tabel_tabelman_s_c_c_day_title">2</div>
                                    <input type='number' className="tabwelding_tabel_tabelman_s_c_c_day_content border-b" onChange={(e)=>{updateDay('d2', e.target.value, man.id, index)}} value={(man.d2===0||man.d2==='0'||man.d2===null)?'':man.d2}></input>
                                </div>

                                <div className="tabwelding_tabel_tabelman_strock_calendar_column_day">
                                    <div className="tabwelding_tabel_tabelman_s_c_c_day_title">17</div>
                                    <input type='number' className="tabwelding_tabel_tabelman_s_c_c_day_content border-b" onChange={(e)=>{updateDay('d17', e.target.value, man.id, index)}} value={(man.d17===0||man.d17==='0'||man.d17===null)?'':man.d17}></input>
                                </div>
                            </div>
                            <div className="tabwelding_tabel_tabelman_strock_calendar_s">

                                <div className="tabwelding_tabel_tabelman_strock_calendar_column_day">
                                    <div className="tabwelding_tabel_tabelman_s_c_c_day_title">3</div>
                                    <input type='number' className="tabwelding_tabel_tabelman_s_c_c_day_content border-b" onChange={(e)=>{updateDay('d3', e.target.value, man.id, index)}} value={(man.d3===0||man.d3==='0'||man.d3===null)?'':man.d3}></input>
                                </div>

                                <div className="tabwelding_tabel_tabelman_strock_calendar_column_day">
                                    <div className="tabwelding_tabel_tabelman_s_c_c_day_title">18</div>
                                    <input type='number' className="tabwelding_tabel_tabelman_s_c_c_day_content border-b" onChange={(e)=>{updateDay('d18', e.target.value, man.id, index)}} value={(man.d18===0||man.d18==='0'||man.d18===null)?'':man.d18}></input>
                                </div>

                            </div>
                            <div className="tabwelding_tabel_tabelman_strock_calendar_s">

                                <div className="tabwelding_tabel_tabelman_strock_calendar_column_day">
                                    <div className="tabwelding_tabel_tabelman_s_c_c_day_title">4</div>
                                    <input type='number' className="tabwelding_tabel_tabelman_s_c_c_day_content border-b" onChange={(e)=>{updateDay('d4', e.target.value, man.id, index)}} value={(man.d4===0||man.d4==='0'||man.d4===null)?'':man.d4}></input>
                                </div>


                                <div className="tabwelding_tabel_tabelman_strock_calendar_column_day">
                                    <div className="tabwelding_tabel_tabelman_s_c_c_day_title">19</div>
                                    <input type='number' className="tabwelding_tabel_tabelman_s_c_c_day_content border-b" onChange={(e)=>{updateDay('d19', e.target.value, man.id, index)}} value={(man.d19===0||man.d19==='0'||man.d19===null)?'':man.d19}></input>
                                </div>

                            </div>
                            <div className="tabwelding_tabel_tabelman_strock_calendar_s">

                                <div className="tabwelding_tabel_tabelman_strock_calendar_column_day">
                                    <div className="tabwelding_tabel_tabelman_s_c_c_day_title">5</div>
                                    <input type='number' className="tabwelding_tabel_tabelman_s_c_c_day_content border-b" onChange={(e)=>{updateDay('d5', e.target.value, man.id, index)}} value={(man.d5===0||man.d5==='0'||man.d5===null)?'':man.d5}></input>
                                </div>


                                <div className="tabwelding_tabel_tabelman_strock_calendar_column_day">
                                    <div className="tabwelding_tabel_tabelman_s_c_c_day_title">20</div>
                                    <input type='number' className="tabwelding_tabel_tabelman_s_c_c_day_content border-b" onChange={(e)=>{updateDay('d20', e.target.value, man.id, index)}} value={(man.d20===0||man.d20==='0'||man.d20===null)?'':man.d20}></input>
                                </div>

                            </div>
                            <div className="tabwelding_tabel_tabelman_strock_calendar_s">
                                <div className="tabwelding_tabel_tabelman_strock_calendar_column_day">
                                    <div className="tabwelding_tabel_tabelman_s_c_c_day_title">6</div>
                                    <input type='number' className="tabwelding_tabel_tabelman_s_c_c_day_content border-b" onChange={(e)=>{updateDay('d6', e.target.value, man.id, index)}} value={(man.d6===0||man.d6==='0'||man.d6===null)?'':man.d6}></input>
                                </div>
                                <div className="tabwelding_tabel_tabelman_strock_calendar_column_day">
                                    <div className="tabwelding_tabel_tabelman_s_c_c_day_title">21</div>
                                    <input type='number' className="tabwelding_tabel_tabelman_s_c_c_day_content border-b" onChange={(e)=>{updateDay('d21', e.target.value, man.id, index)}} value={(man.d21===0||man.d21==='0'||man.d21===null)?'':man.d21}></input>
                                </div>
                            </div>
                            <div className="tabwelding_tabel_tabelman_strock_calendar_s">
                                <div className="tabwelding_tabel_tabelman_strock_calendar_column_day">
                                    <div className="tabwelding_tabel_tabelman_s_c_c_day_title">7</div>
                                    <input type='number' className="tabwelding_tabel_tabelman_s_c_c_day_content border-b" onChange={(e)=>{updateDay('d7', e.target.value, man.id, index)}} value={(man.d7===0||man.d7==='0'||man.d7===null)?'':man.d7}></input>
                                </div>


                                <div className="tabwelding_tabel_tabelman_strock_calendar_column_day">
                                    <div className="tabwelding_tabel_tabelman_s_c_c_day_title">22</div>
                                    <input type='number' className="tabwelding_tabel_tabelman_s_c_c_day_content border-b" onChange={(e)=>{updateDay('d22', e.target.value, man.id, index)}} value={(man.d22===0||man.d22==='0'||man.d22===null)?'':man.d22}></input>
                                </div>

                            </div>
                            <div className="tabwelding_tabel_tabelman_strock_calendar_s">

                                <div className="tabwelding_tabel_tabelman_strock_calendar_column_day">
                                    <div className="tabwelding_tabel_tabelman_s_c_c_day_title">8</div>
                                    <input type='number' className="tabwelding_tabel_tabelman_s_c_c_day_content border-b" onChange={(e)=>{updateDay('d8', e.target.value, man.id, index)}} value={(man.d8===0||man.d8==='0'||man.d8===null)?'':man.d8}></input>
                                </div>


                                <div className="tabwelding_tabel_tabelman_strock_calendar_column_day">
                                    <div className="tabwelding_tabel_tabelman_s_c_c_day_title">23</div>
                                    <input type='number' className="tabwelding_tabel_tabelman_s_c_c_day_content border-b" onChange={(e)=>{updateDay('d23', e.target.value, man.id, index)}} value={(man.d23===0||man.d23==='0'||man.d23===null)?'':man.d23}></input>
                                </div>

                            </div>
                            <div className="tabwelding_tabel_tabelman_strock_calendar_s">

                                <div className="tabwelding_tabel_tabelman_strock_calendar_column_day">
                                    <div className="tabwelding_tabel_tabelman_s_c_c_day_title">9</div>
                                    <input type='number' className="tabwelding_tabel_tabelman_s_c_c_day_content border-b" onChange={(e)=>{updateDay('d9', e.target.value, man.id, index)}} value={(man.d9===0||man.d9==='0'||man.d9===null)?'':man.d9}></input>
                                </div>


                                <div className="tabwelding_tabel_tabelman_strock_calendar_column_day">
                                    <div className="tabwelding_tabel_tabelman_s_c_c_day_title">24</div>
                                    <input type='number' className="tabwelding_tabel_tabelman_s_c_c_day_content border-b" onChange={(e)=>{updateDay('d24', e.target.value, man.id, index)}} value={(man.d24===0||man.d24==='0'||man.d24===null)?'':man.d24}></input>
                                </div>

                            </div>
                            <div className="tabwelding_tabel_tabelman_strock_calendar_s">

                                <div className="tabwelding_tabel_tabelman_strock_calendar_column_day">
                                    <div className="tabwelding_tabel_tabelman_s_c_c_day_title">10</div>
                                    <input type='number' className="tabwelding_tabel_tabelman_s_c_c_day_content border-b" onChange={(e)=>{updateDay('d10', e.target.value, man.id, index)}} value={(man.d10===0||man.d10==='0'||man.d10===null)?'':man.d10}></input>
                                </div>


                                <div className="tabwelding_tabel_tabelman_strock_calendar_column_day">
                                    <div className="tabwelding_tabel_tabelman_s_c_c_day_title">25</div>
                                    <input type='number' className="tabwelding_tabel_tabelman_s_c_c_day_content border-b" onChange={(e)=>{updateDay('d25', e.target.value, man.id, index)}} value={(man.d25===0||man.d25==='0'||man.d25===null)?'':man.d25}></input>
                                </div>

                            </div>
                            <div className="tabwelding_tabel_tabelman_strock_calendar_s">

                                <div className="tabwelding_tabel_tabelman_strock_calendar_column_day">
                                    <div className="tabwelding_tabel_tabelman_s_c_c_day_title">11</div>
                                    <input type='number' className="tabwelding_tabel_tabelman_s_c_c_day_content border-b" onChange={(e)=>{updateDay('d11', e.target.value, man.id, index)}} value={(man.d11===0||man.d11==='0'||man.d11===null)?'':man.d11}></input>
                                </div>


                                <div className="tabwelding_tabel_tabelman_strock_calendar_column_day">
                                    <div className="tabwelding_tabel_tabelman_s_c_c_day_title">26</div>
                                    <input type='number' className="tabwelding_tabel_tabelman_s_c_c_day_content border-b" onChange={(e)=>{updateDay('d26', e.target.value, man.id, index)}} value={(man.d26===0||man.d26==='0'||man.d26===null)?'':man.d26}></input>
                                </div>

                            </div>
                            <div className="tabwelding_tabel_tabelman_strock_calendar_s">

                                <div className="tabwelding_tabel_tabelman_strock_calendar_column_day">
                                    <div className="tabwelding_tabel_tabelman_s_c_c_day_title">12</div>
                                    <input type='number' className="tabwelding_tabel_tabelman_s_c_c_day_content border-b" onChange={(e)=>{updateDay('d12', e.target.value, man.id, index)}} value={(man.d12===0||man.d12==='0'||man.d12===null)?'':man.d12}></input>
                                </div>


                                <div className="tabwelding_tabel_tabelman_strock_calendar_column_day">
                                    <div className="tabwelding_tabel_tabelman_s_c_c_day_title">27</div>
                                    <input type='number' className="tabwelding_tabel_tabelman_s_c_c_day_content border-b" onChange={(e)=>{updateDay('d27', e.target.value, man.id, index)}} value={(man.d27===0||man.d27==='0'||man.d27===null)?'':man.d27}></input>
                                </div>

                            </div>
                            <div className="tabwelding_tabel_tabelman_strock_calendar_s">

                                <div className="tabwelding_tabel_tabelman_strock_calendar_column_day">
                                    <div className="tabwelding_tabel_tabelman_s_c_c_day_title">13</div>
                                    <input type='number' className="tabwelding_tabel_tabelman_s_c_c_day_content border-b" onChange={(e)=>{updateDay('d13', e.target.value, man.id, index)}} value={(man.d13===0||man.d13==='0'||man.d13===null)?'':man.d13}></input>
                                </div>


                                <div className="tabwelding_tabel_tabelman_strock_calendar_column_day">
                                    <div className="tabwelding_tabel_tabelman_s_c_c_day_title">28</div>
                                    <input type='number' className="tabwelding_tabel_tabelman_s_c_c_day_content border-b" onChange={(e)=>{updateDay('d28', e.target.value, man.id, index)}} value={(man.d28===0||man.d28==='0'||man.d28===null)?'':man.d28}></input>
                                </div>

                            </div>
                            <div className="tabwelding_tabel_tabelman_strock_calendar_s">

                                <div className="tabwelding_tabel_tabelman_strock_calendar_column_day">
                                    <div className="tabwelding_tabel_tabelman_s_c_c_day_title">14</div>
                                    <input type='number' className="tabwelding_tabel_tabelman_s_c_c_day_content border-b" onChange={(e)=>{updateDay('d14', e.target.value, man.id, index)}} value={(man.d14===0||man.d14==='0'||man.d14===null)?'':man.d14}></input>
                                </div>


                                <div className="tabwelding_tabel_tabelman_strock_calendar_column_day">
                                    <div className="tabwelding_tabel_tabelman_s_c_c_day_title">29</div>
                                    <input type='number' className="tabwelding_tabel_tabelman_s_c_c_day_content border-b" onChange={(e)=>{updateDay('d29', e.target.value, man.id, index)}} value={(man.d29===0||man.d29==='0'||man.d29===null)?'':man.d29}></input>
                                </div>

                            </div>
                            <div className="tabwelding_tabel_tabelman_strock_calendar_s">

                                <div className="tabwelding_tabel_tabelman_strock_calendar_column_day">
                                    <div className="tabwelding_tabel_tabelman_s_c_c_day_title">15</div>
                                    <input type='number' className="tabwelding_tabel_tabelman_s_c_c_day_content border-b" onChange={(e)=>{updateDay('d15', e.target.value, man.id, index)}} value={(man.d15===0||man.d15==='0'||man.d15===null)?'':man.d15}></input>
                                </div>


                                <div className="tabwelding_tabel_tabelman_strock_calendar_column_day">
                                    <div className="tabwelding_tabel_tabelman_s_c_c_day_title">30</div>
                                    <input type='number' className="tabwelding_tabel_tabelman_s_c_c_day_content border-b" onChange={(e)=>{updateDay('d30', e.target.value, man.id, index)}} value={(man.d30===0||man.d30==='0'||man.d30===null)?'':man.d30}></input>
                                </div>

                            </div>
                            <div className="tabwelding_tabel_tabelman_strock_calendar_s">
                                <div className="tabwelding_tabel_tabelman_strock_calendar_column_day"></div>
                                <div className="tabwelding_tabel_tabelman_strock_calendar_column_day">
                                    <div className="tabwelding_tabel_tabelman_s_c_c_day_title top-border-1px">31</div>
                                    <input type='number' className="tabwelding_tabel_tabelman_s_c_c_day_content border-b" onChange={(e)=>{updateDay('d31', e.target.value, man.id, index)}} value={(man.d31===0||man.d31==='0'||man.d31===null)?'':man.d31}></input>
                                </div>
                            </div>
                        </div>
                        <div className="tabwelding_tabel_tabelman_strock_itogy">
                            <div className="tabwelding_tabel_tabelman_strock_itogy-header">Итого</div>
                            <div className="tabwelding_tabel_tabelman_strock_itogy-sum">
                                часов: {summch}<br />дней: {summd}</div>
                        </div>
                    </div>
                )
            })}
            <ModalFiles active={activeDelete} setActive={setActiveDelete} heigth={'30vh'} data={<Delete/>} />
        </div>
    )
}