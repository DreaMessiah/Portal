import React, {useContext, useEffect, useState} from "react";
import "./tabel.scss";
import Select from "react-select";
import WriteTabelService from "../../services/WriteTabelService";
import {useMessage} from "../../hooks/message.hook";
import ObjsService from "../../services/ObjsService";
import {Context} from "../../index";
import {Link} from "react-router-dom";
import ModalFiles from "../modalwin/ModalFiles";
import {AllTabelSettBTN} from "./modalactive/AllTabelSettBTN";



export const AllTabelsList = () => {

    const months = [
        'январь', 'февраль', 'март', 'апрель', 'май', 'июнь',
        'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'
    ];
    let now = new Date();
    let nowYear = now.getFullYear()
    let nowMonth = now.getMonth()

    const [getmonth, setGetmonth] = useState(nowMonth)
    const [getyear, setGetyear] = useState(nowYear)

    console.log(nowYear)
    console.log(nowMonth)

    const  {store} = useContext(Context)
    const inn = store.user.inn

    const [objs, setObjs] = useState([])
    const [alltabels, setAlltabels] = useState([])
    const [list, setList] = useState([])
    const [sett, setSett] = useState(false)
    const [idtabel, setIdtabel] = useState('no')

    const makealltebels = async () => {
        try{
            const {data} = await ObjsService.getObjs({inn})
            // console.log(data)

            const tabels = await ObjsService.getTabelsForAll({year: ''+getyear, inn})
            const list = tabels.data
            setObjs(data)
            setAlltabels(list)


            // console.log(list)

        }catch(e){
            console.log(e)
        }
    }

    const combineObj = () => {
        const newlist = []
        objs.forEach(obj => {
            obj.tabels = []
            alltabels.forEach(tab => {
                if(obj.id === tab.object_id){
                    obj.tabels.push(tab)
                }
            })
            newlist.push(obj)

        })
        // console.log(newlist)
        setList(newlist)
    }


    useEffect(()=>{
        makealltebels()

    }, [getyear])

    useEffect(()=>{
        combineObj()
    }, [objs,alltabels])

    return (
        <div className='itogy_form'>
            <div className="title">Итоговый табель</div>
            <div className="filter">
                <Select placeholder="Выбрать месяц" styles={{container:(baseStyles, state) => ({...baseStyles,width:'250px'})}}/>
                <Select placeholder="Выбрать год" styles={{container:(baseStyles, state) => ({...baseStyles,width:'250px'})}}/>
                <div>сбросить</div>
            </div>
            <div className="alltabels">
                {list.map((obj, index)=>(
                    <div key={index} className='alltabels_years'>
                        <div className='alltabels_years_head'>{obj.shifr}</div>
                        <div className='alltabels_years_body'>
                            {obj.tabels.map((tabels, index) => (
                                <div key={index} className='alltabels_years_body_month' style={(tabels.auto === 1)?{border: '4px solid #454545'}:{color: '#CCC'}}>
                                    <Link to={`/thistabelportal/?id=${index}&shifr=${obj.id}&month=${tabels.month}&year=${tabels.year}`} className='alltabels_years_body_month_text'>{months[tabels.month]} {tabels.year}</Link>
                                    <div className='alltabels_years_body_month_settings' onClick={()=>{setIdtabel([obj, tabels]); setSett(!sett)}}> ... </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}


            </div>
            <ModalFiles data={<AllTabelSettBTN func={makealltebels} tab={idtabel} active={sett} setActive={setSett}/>}  active={sett} setActive={setSett}/>
        </div>
    )
}