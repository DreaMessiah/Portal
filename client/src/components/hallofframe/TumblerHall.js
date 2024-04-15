import {Link} from "react-router-dom";
import ObjsService from "../../services/ObjsService";
import {useContext, useEffect, useState} from "react";
import {Context} from "../../index";
import React from "react";
import Select from "react-select";
import MainpageService from "../../services/MainpageService";
import ModalFiles from "../modalwin/ModalFiles";
import {DelWin} from "./DelWin";
import AuthService from "../../services/AuthService";

export const TumblerHall = () => {
    const [active, setActive] = useState(false)
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
    // console.log(year)
    const currentMonth = currentDate.getMonth(); // Получаем номер текущего месяца
    let month = months[currentMonth];
    // console.log(month)
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


            // console.log(listMans)
        } catch {
            alert('ебобо скрипт проверь')
        }
    }

    const optDev = [
        {index: 0, value: 'itr', label: 'ИТР'},
        {index: 1, value: 'dev', label: 'Рабочие'}
    ]

    const pullMan = async () => {
        // console.log(thisMans)
        // console.log(thisDev)
        // console.log()
        const bestman = {
            name: thisMans.name,
            tn: thisMans.tn,
            developer: thisMans.developer,
            onboard: thisMans.onboard,
            dev: thisDev.label,
            inn: inn
        }
        try{
            const bestMan = await MainpageService.pushBestMan({bestman})
            // console.log(bestMan.data)
            viewBoard()
        } catch(e) {
            console.log(e)
        }

    }
    const [listBM, setListBM] = useState([])
    const viewBoard = async () => {
        const newArr = []
        try{
            const bestMan = await MainpageService.viewBestMan({inn:inn})
            bestMan.data.forEach(man => {
                man.avatar = 'face.png'
                newArr.push(man)
            })

            const list = await AuthService.getusers()

            newArr.map( item => {
                list.data.users.map( row => {
                    if(item.tn === row.tn){
                        item.avatar = row.avatar ? row.avatar : 'face.png'
                    }
                })
            })

            // console.log(newArr)
            setListBM([...newArr])
        } catch(e) {
            console.log(e)
        }
    }

    const [delman, setDelman] = useState({})
    const [ind, setInd] = useState()
    const deleteMan = async (man, index) => {
        setDelman(man)
        setActive(true)
        setInd(index)
    }

    useEffect(() => {
        t13List()
        viewBoard()

        // console.log(listBM)
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
                {listBM.map((man, index) => (


                <div className="hall_edit_visual_man" key={index}>
                    <div className="hall_edit_visual_man_dev">
                        <div className="hall_edit_visual_man_dev_num">{index + 1}</div>
                        <div className="hall_edit_visual_man_dev_dev">{man.dev}</div>
                    </div>
                    <div className="hall_edit_visual_man_photo" style={{backgroundImage: `url("files/profile/${man.avatar}")`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundColor: '#FFF'}}></div>
                    <div className="hall_edit_visual_man_description">
                        <div className="hall_edit_visual_man_description_name">{man.name}</div>
                        <div className="hall_edit_visual_man_description_dev">{man.developer}</div>
                    </div>
                    <div className="hall_edit_visual_man_del btnhover" onClick={()=>deleteMan(man, index)}>Удалить</div>
                </div>
                ))}
            </div>
            <ModalFiles data={<DelWin active={active} setActive={setActive} inn={inn} man={delman} list={listBM} setList={setListBM} ind={ind} setInd={setInd}/>} active={active} setActive={setActive}/>
        </div>
    )
}