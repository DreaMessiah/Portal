import "./crews.scss"
import {Link} from "react-router-dom";
import CmsDatePicket from "../../../inputs/CmsDatePicket";
import {useState} from "react";
import {useContext, useEffect} from "react";
import {Context} from "../../../../index";
import ObjsService from "../../../../services/ObjsService";
import Select from "react-select";
import React from "react";
import WeldingService from "../../../../services/WeldingService";
import {ModalBigWin} from "../../../modalwin/ModaBiglWin";
import ModalFiles from "../../../modalwin/ModalFiles";


export const NewCrewS = () => {
    const [datein, setDatein] = useState()
    const [dateto, setDateto] = useState()
    const plusCrew = () => {
alert('Кнопка работает')
    }
    const [active, setActive] = useState(false)
    const [listMans, setListMans] = useState([])
    const [listCrew, setListCrew] = useState([])
    const [openblock, setOpenblock] = useState(false)
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

    const allCrews = async () => {
        try{
            const response = await WeldingService.getCrew()
            console.log(response.data)
            setListCrew(response.data)
        }catch(e){
            console.log(e.error)
        }
    }
    useEffect(() => {
        t13List()
        allCrews()
    }, [])
    return (
       <div className="newcrew">
           <div className="newcrew_title">Список Звеньв и Бригад</div>
           <div className="newcrew_btn" onClick={()=>setOpenblock(!openblock)}>Добавить звено / бригаду</div>
           <div className="newcrew_block" style={(openblock)?{display: 'flex'}:{display: 'none'}}>
               <div className="newcrew_block_inputns">
                   <input className="newcrew_block_inpt" placeholder="Введите название команды"/>
                   <input className="newcrew_block_inpt" placeholder="Ср. кол-во человек"/>
                   <input className="newcrew_block_inpt" placeholder="Краткое описание"/>
               </div>
               <div className="slash"></div>
               <div className="newcrew_block_title">Добавить сотрудника</div>
               <div className="newcrew_block_plusman">
                   <div className="newcrew_block_plusman_left">
                       <Select className='select' onChange={(e) => setThisMans(listMans[e.index])} value={thisMans} options={listMans}/>
                       <div className="newcrew_block_plusman__btn">Добавить</div>
                   </div>
                   <div className="newcrew_block_plusman_right">

                   </div>
               </div>
               <div className="slash"></div>
               <div className="newcrew_block_title">Добавить документ</div>
               <div className="newcrew_block_plusman">
                   <div className="newcrew_block_plusman_left">
                       <input className="newcrew_block_inpt" placeholder="Краткое описание"/>
                       <div className="newcrew_block_plusman_right_picker">
                           <CmsDatePicket placeholder={'начало'} onChange={setDatein} size={'40%'}/><CmsDatePicket placeholder={'окончание'} onChange={setDateto} size={'40%'}/>
                       </div>

                       <div className="newcrew_block_plusman__btn">Добавить</div>
                   </div>
                   <div className="newcrew_block_plusman_right">

                   </div>
               </div>
           </div>
           <div className="newcrew_list">
               <div className="newcrew_list_strs">
                   {listCrew.map((crew, index)=>(
                       <div key={index} className="newcrew_list_strock">
                           <div className="newcrew_list_strock_pp">{index+1}</div>
                           <div className="newcrew_list_strock_name">{crew.crewname}</div>
                           <div className="newcrew_list_strock_num">{crew.comment}</div>
                           <div className="newcrew_list_strock_open" onClick={()=>{setActive(!active); }}>Открыть</div>
                       </div>
                   ))}

                   {/*<div className="block_docs">*/}

                   {/*    <Link to={"/"}><div className={'img pdf'}></div><p>{'Допуск . pdf'}</p></Link>*/}
                   {/*    <Link to={"/"}><div className={'img pdf'}></div><p>{'Допуск . pdf'}</p></Link>*/}
                   {/*    <Link to={"/"}><div className={'img pdf'}></div><p>{'Допуск . pdf'}</p></Link>*/}
                   {/*</div>*/}
               </div>
           </div>
           <ModalFiles heigth = {'80vh'} width={'80vh'} data={'gdfg'} active={active} setActive={setActive} />
       </div>
    )

}