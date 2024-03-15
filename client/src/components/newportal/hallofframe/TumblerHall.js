import {Link} from "react-router-dom";
import ObjsService from "../../../services/ObjsService";
import {useContext, useEffect, useState} from "react";
import {Context} from "../../../index";
import React from "react";
import Select from "react-select";
import MainpageService from "../../../services/MainpageService";

export const TumblerHall = () => {

    const [listMans, setListMans] = useState([])
    const [thisMans, setThisMans] = useState([])
    const [thisDev, setThisDev] = useState([])
    //
    const months = [
        'январь', 'февраль', 'март', 'апрель', 'май', 'июнь',
        'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'
    ];
    const  {store} = useContext(Context)
    const inn = store.user.inn

    // const inn = '8617014209'

    const currentDate = new Date();
    const year = currentDate.getFullYear() + '';
    console.log(year)
    const currentMonth = currentDate.getMonth(); // Получаем номер текущего месяца
    let month = months[currentMonth];
    console.log(month)
    const t13List = async (e) => {
        let newArr
        try {
            const listMan = await ObjsService.getT13({inn, month, year})
            let i = 0
            if (listMan.data.length !== 0){

                listMan.data.forEach(man => {
                    man.label = man.name + '  ' + man.developer
                    man.value = man.tn
                    man.index = i
                    i++
                })
                setListMans(listMan.data)
            } else {
                month = months[currentMonth - 1];
                try{
                    const listMan = await ObjsService.getT13({inn, month, year})
                    listMan.data.forEach(man => {
                        man.label = man.name + '  ' + man.developer
                        man.value = man.tn
                        man.index = i
                        i++
                    })
                    setListMans(listMan.data)
                } catch {

                }

            }


            console.log(listMans)
        } catch {
            alert('ебобо скрипт проверь')
        }
    }

    const optDev = [
        {index: 0, value: 'itr', label: 'ИТР'},
        {index: 1, value: 'dev', label: 'Рабочие'}
    ]

    const pullMan = async () => {
        console.log(thisMans)
        console.log(thisDev)
        console.log()
        const bestman = {
            name: thisMans.name,
            developer: thisMans.developer,
            onboard: thisMans.onboard,
            dev: thisDev.label,
            inn: inn
        }
        try{
            const bestMan = await MainpageService.pushBestMan({bestman})
            console.log(bestMan.data)
        } catch(e) {
            console.log(e)
        }

    }

    useEffect(() => {
        t13List()
    }, [])

    return (
        <div className="hall_edit">
            <div className="hall_edit_title">Управление доской почёта</div>
            <div className="hall_edit_tumbler">
                {/*<Select className='select' onChange={(e) => setThisMans(listMans[e.value])} value={thisMans} options={listMans}/>*/}
                <Select className='select' onChange={(e) => setThisMans(listMans[e.index])} value={thisMans} options={listMans}/>
                <p  style={{margin: '0 0 10px 0'}}></p>
                <Select className='select' onChange={(e) => setThisDev(optDev[e.index])} value={thisDev} options={optDev}/>
                <p  style={{margin: '0 0 10px 0'}}></p>
                <div className="hall_edit_tumbler_btn btnhover" onClick = {() => pullMan()}>Добавить</div>
            </div>
            <div className="hall_edit_visual">
                <div className="hall_edit_visual_man">
                    <div className="hall_edit_visual_man_dev">
                        <div className="hall_edit_visual_man_dev_num">12</div>
                        <div className="hall_edit_visual_man_dev_dev">ИТР</div>
                    </div>
                    <div className="hall_edit_visual_man_photo" style={{backgroundImage: `url("/hallofframe/44.jpg")`}}></div>
                    <div className="hall_edit_visual_man_description">
                        <div className="hall_edit_visual_man_description_name">Барахтянский Владимир Алексеевич</div>
                        <div className="hall_edit_visual_man_description_dev">Производитель работ 2 категории</div>
                    </div>
                    <div className="hall_edit_visual_man_del btnhover" >Удалить</div>
                </div>
            </div>
        </div>
    )
}