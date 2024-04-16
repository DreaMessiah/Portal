import "./crews.scss"
import {Link} from "react-router-dom";
import CmsDatePicket from "../../inputs/CmsDatePicket";
import {useState} from "react";
import {useContext, useEffect} from "react";
import {Context} from "../../../index";
import ObjsService from "../../../services/ObjsService";
import Select from "react-select";
import React from "react";
import WeldingService from "../../../services/WeldingService";
import {ModalBigWin} from "../../modalwin/ModaBiglWin";
import ModalFiles from "../../modalwin/ModalFiles";
import UserService from "../../../services/UserService";
import MultiSelect from "../../inputs/MultiSelect";
import CheckBox from "../../inputs/CheckBox";
import FileInput from "../../inputs/FileInput";
import {useMessage} from "../../../hooks/message.hook";

export const NewCrewS = () => {
    const [datein, setDatein] = useState()
    const [dateto, setDateto] = useState()
    const [active, setActive] = useState(false)
    const [listMans, setListMans] = useState([])
    const [listCrew, setListCrew] = useState([])
    const [openblock, setOpenblock] = useState(false)
    const [thisMans, setThisMans] = useState([])
    const [empty,setEmpty] = useState([])
    const [thisDev, setThisDev] = useState([])

    const [name,setName] = useState('')
    const [num,setNum] = useState('')
    const [about,setAbout] = useState('')
    const [group,setGroup] = useState([])
    const [docs,setDocs] = useState([])

    const [onDocuments,setOnDocuments] = useState(false)

    const  {store} = useContext(Context)
    const message = useMessage()


    const loadingHandler = async () => {
        try {
            const {data} = await UserService.fetchActiualT13()
            const crews = await WeldingService.getCrew()
            if(data && crews.data){
                setListMans(data)
                setListCrew(crews.data)
            }
        } catch(e) {
            console.log(e)
        }
    }
    const onDocumentsHandler = () => {
        setOnDocuments(!onDocuments)
    }
    useEffect(() => {
        loadingHandler()
    }, [])
    const checkEmpty = () => {
        const n = [...empty]

        n[0] = !!!name.trim().length
        n[1] = !!!num.trim().length
        n[2] = !!!about.trim().length
        n[3] = !!!group.length

        const hasTrueValue = n.some(value => value === true)
        if( hasTrueValue ) setEmpty(n)
        else setEmpty([])

        return !hasTrueValue
    }
    const setEmptyStates = () => {
        setName('')
        setNum('')
        setAbout('')
        setGroup([])
        setDocs([])
        setOpenblock(false)
    }
    const createHandler = async () => {
        try {
            if(checkEmpty()){
                const crew = {crewname:name,totalmans:num,comment:about,inn:store.user.inn}
                console.log(crew)
                const {data} = await WeldingService.createNewCrew(crew)
                if(data){
                    console.log(data)
                    setListCrew([...listCrew,data])
                    setEmptyStates()
                    message('Бригада добавлена')
                }
            }else {
                message('Заполните необходимые данные')
            }
        }catch (e) {
            console.log(e)
        }
    }

    return (
       <div className="newcrew">
           <div className="newcrew_title">Список Звеньв и Бригад</div>
           <div className="newcrew_btn" onClick={()=>setOpenblock(!openblock)}>{!openblock ? 'Добавить звено / бригаду' : 'Скрыть панель'}</div>
           <div className="newcrew_block" style={(openblock)?{display: 'flex'}:{display: 'none'}}>
               <div className="newcrew_block_inputns">
                   <input value={name} onChange={(e) => setName(e.target.value)} className={`newcrew_block_inpt pul-inpt ${empty[0] && 'red-solid-border'}`} placeholder="Введите название команды"/>
                   <input value={num} onChange={(e) => setNum(e.target.value)} className={`newcrew_block_inpt pul-inpt ${empty[1] && 'red-solid-border'}`} placeholder="Ср. кол-во человек"/>
                   <input value={about} onChange={(e) => setAbout(e.target.value)} className={`newcrew_block_inpt ${empty[2] && 'red-solid-border'}`} placeholder="Краткое описание"/>
               </div>
               <div className="slash"></div>

               <div className="newcrew_block_title">Добавить сотрудника</div>
               <div className="newcrew_block_selects">
                    <MultiSelect options={listMans} setOptions={setGroup} values={group} empty={empty[3]} />
               </div>
               <div className="slash"></div>

               <CheckBox label={'Добавить документы'} disable={true} checked={onDocuments} onChange={onDocumentsHandler}/>
               {onDocuments &&
               <div className="newcrew_block_plusman">
                   <div className="newcrew_block_plusman_left">
                       <input className="newcrew_block_inpt" placeholder="Краткое описание"/>
                       <div className="newcrew_block_plusman_right_picker">
                           <CmsDatePicket placeholder={'начало'} onChange={setDatein} size={'40%'}/>
                           <span style={{width:'20px'}}></span>
                           <CmsDatePicket placeholder={'окончание'} onChange={setDateto} size={'40%'}/>
                       </div>
                       <div className={'newcrew_block_selects'}>
                           <FileInput files={docs} setFiles={setDocs} user_id={store.user.id} empty={empty[6]}/>
                       </div>
                   </div>
               </div>}
               <div className={`buttons`}>
                   <div onClick={(e) => createHandler()} className={`button`}>Добавить</div>
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