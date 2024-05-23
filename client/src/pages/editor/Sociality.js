import React, {useContext, useEffect, useRef, useState} from "react"
import {observer} from "mobx-react-lite"
import "./soc.scss"
import {useMessage} from "../../hooks/message.hook";
import ObjsService from "../../services/ObjsService";
import Select from "react-select";
import SocialService from "../../services/SocialService";
import Tab from "rsuite/cjs/Tabs/Tab";
import ModalFiles from "../../components/modalwin/ModalFiles";
import {DelProgramModal} from "../../components/social/DelProgramModal";

function Sociality(){

    const message = useMessage()
    const [allprogram, setAllprogram] = useState([])
    const [create, setCreate] = useState(false)
    const [edit, setEdit] = useState(false)
    const [commission, setCommission] = useState(false)
    const [stazhedit, setStazhedit] = useState(false)
    const [thisuserone, setThisuserone] = useState([])
    const [thisusertwo, setThisusertwo] = useState([])
    const [thisuserthree, setThisuserthree] = useState([])
    const [thisuserfour, setThisuserfour] = useState([])
    const [listuser, setListuser] = useState([])
    const [editcash, setEditcash] = useState(false)
    const [createcash, setCreatecash] = useState(false)
    const [stazhcash, setStazhcash] = useState(false)

    const getAllPrograms = async () => {
        try{
            const {data} = await SocialService.getProgram()
            setAllprogram(data)
        }catch(e){
            console.log(e)
        }
    }

    ////////  Создание новой социальной программы
    const [socname, setSocname] = useState('')
    const [socdescript, setSocdescript] = useState('')
    const [minyear, setMinyear] = useState(1)
    const [maxsum, setMaxsum] = useState(0)

    const [newreq, setNewreq] = useState('')
    const [requirement, setRequirement] = useState([])
    const plusRequirement = () => {
        const newlist = [...requirement]
        if(newreq.length > 0){
            newlist.push({index: newlist.length, desc: newreq, edit: false})
            setRequirement(newlist)
            setNewreq('')

        } else {
            message('Введиете новое требование')
        }

    }
    const editRequirement = index => {
        const newlist = [...requirement]
        if (index >= 0 && index < newlist.length) {
            newlist[index].edit = true
        }
        setRequirement(newlist)
    }
    const saveEditRequirement = index => {
        const newlist = [...requirement]
        if (index >= 0 && index < newlist.length) {
            newlist[index].edit = false
        }
        setRequirement(newlist)
    }
    const revalueRequirement = (value, index) => {
        const newlist = [...requirement]
        if (index >= 0 && index < newlist.length) {
            newlist[index].desc = value
        }
        setRequirement(newlist)
    }
    const delRequirement = index => {
        let newlist = [...requirement]
        newlist = newlist.filter((_, i) => i !== index);
        setRequirement(newlist)
    }

    const [newdocs, setNewdocs] = useState('')
    const [docs, setDocs] = useState([])
    const plusDocs = () => {
        const newlist = [...docs]
        if(newdocs.length > 0){
            newlist.push({index: newlist.length, desc: newdocs, edit: false})
            setDocs(newlist)
            setNewdocs('')

        } else {
            message('Введиете название документа')
        }

    }
    const editDocs = index => {
        const newlist = [...docs]
        if (index >= 0 && index < newlist.length) {
            newlist[index].edit = true
        }
        setDocs(newlist)
    }
    const saveEditDocs = index => {
        const newlist = [...docs]
        if (index >= 0 && index < newlist.length) {
            newlist[index].edit = false
        }
        setDocs(newlist)
    }
    const revalueDocs = (value, index) => {
        const newlist = [...docs]
        if (index >= 0 && index < newlist.length) {
            newlist[index].desc = value
        }
        setDocs(newlist)
    }
    const delDocs = index => {
        let newlist = [...docs]
        newlist = newlist.filter((_, i) => i !== index);
        setDocs(newlist)
    }


    const [editer, setEditer] = useState({})
    const [idedit, setIdedit] = useState('')
    const [nameedit, setNameedit] = useState('')
    const [descedit, setDescedit] = useState('')
    const [condedit, setCondedit] = useState([])
    const [docsedit, setDocsedit] = useState([])
    const [experedit, setExperedit] = useState('')
    const [sumedit, setSumedit] = useState('')
    const [puredit, setPuredit] = useState(false)
    const [calcedit, setCalcedit] = useState(false)
    const [newdocedit, setNewdocedit] = useState('')
    const [newcondedit, setNewcondedit] = useState('')




    const saveParamsEditor = async () => {

        const {data} = await SocialService.updateProgram({
            id: idedit,
            name: nameedit,
            description: descedit,
            conditions: condedit,
            docs: docsedit,
            experience: experedit,
            sum: sumedit,
            purpose: puredit,
            calcutation: calcedit
        })
        const nameprogram = nameedit
        setEdit(false)
        setIdedit('')
        setNameedit('')
        setDescedit('')
        setCondedit([])
        setDocsedit([])
        setExperedit('')
        setSumedit('')
        setPuredit(false)
        setCalcedit(false)
        setNewdocedit('')
        setNewcondedit('')
        getAllPrograms()
        message('Программа "'+nameprogram+'" успешно изменена')
    }

    const delDocsEditor = index => {
        let newlist = [...docsedit]
        newlist = newlist.filter((_, i) => i !== index);
        setDocsedit(newlist)
    }

    const delRequirementEditor = index => {
        let newlist = [...condedit]
        newlist = newlist.filter((_, i) => i !== index);
        setCondedit(newlist)
    }

    const saveRequirementEditor = index => {
        const newlist = [...condedit]
        if (index >= 0 && index < newlist.length) {
            newlist[index].edit = false
        }
        setCondedit(newlist)
    }

    const revalueRequirementEditor = (value, index) => {
        const newlist = [...condedit]
        if (index >= 0 && index < newlist.length) {
            newlist[index].desc = value
        }
        setCondedit(newlist)
    }

    const editRequirementEditor = index => {
        const newlist = [...condedit]
        if (index >= 0 && index < newlist.length) {
            newlist[index].edit = true
        }
        setCondedit(newlist)
    }

    const plusRequirementEditer = () => {
        const newlist = [...condedit]
        if(newcondedit.length > 0){
            newlist.push({index: newlist.length, desc: newcondedit, edit: false})
            setCondedit(newlist)
            setNewcondedit('')

        } else {
            message('Введиете новое требование')
        }
    }
    const plusDocsEditor = () => {
        const newlist = [...docsedit]
        if(newdocedit.length > 0){
            newlist.push({index: newlist.length, desc: newdocedit, edit: false})
            setDocsedit(newlist)
            setNewdocedit('')

        } else {
            message('Введиете название документа')
        }

    }
    const openEditBlock = index => {

        let thislist = [...allprogram]
        setEditer(thislist[index])
        thislist = thislist[index]
        setEdit(true)
        setIdedit(thislist.id)
        setNameedit(thislist.name)
        setDescedit(thislist.description)
        setCondedit(thislist.conditions)
        setDocsedit(thislist.docs)
        setExperedit(thislist.experience)
        setSumedit(thislist.sum)
        setPuredit(thislist.purpose)
        setCalcedit(thislist.calculation)

    }

    const cleanDataNewSoc = () => {
        setSocname('')
        setSocdescript('')
        setMinyear(1)
        setMaxsum(0)
        setNewreq('')
        setRequirement([])
        setNewdocs('')
        setDocs([])
    }

    const creatNewSoc = async () => {
        try{
            const program = {
                name: socname,
                description: socdescript,
                experience: minyear,
                sum: maxsum,
                conditions: requirement,
                files: docs,
                purpose: createcash,
                calcilation: stazhcash
            }
            console.log(program)
            const {data} = await SocialService.createProgram({program})
            if(data){
                getAllPrograms()
                setSocname('')
                setSocdescript('')
                setMinyear(1)
                setMaxsum(0)
                setNewreq('')
                setRequirement([])
                setNewdocs('')
                setDocs([])
                setCreate(false)
            }
        }catch(e){
            console.log(e)
        }



    }

    // const message = useMessage()
    const getUsers = async (e) => {
        try {
            const users = await ObjsService.getUsersList()

            let i = 0
            users.data.forEach(man => {
                man.label = man.full_name + '  ' + man.developer
                man.value = man.tn
                man.index = i
                i++
            })
            setListuser(users.data)
        }catch(e){

        }
    }

    const [activedel, setActivedel] = useState(false)


    const [iddel, setIddel] = useState(null)
    const [namedel, setNamedel] = useState('')
    const delFullProgram = (idprgm, name) => {
        setIddel(idprgm)
        setNamedel(name)
        setActivedel(true)
    }


    //////////// Комиссия
    const [listcomm, setListComm] = useState([])
    const getCommission = async () => {
        try{
            const {data} = await SocialService.getComission()
            setListComm(data)
            console.log(data)
        }catch(e){
            console.log(e)
        }
    }

    const plusCommFirst = async (possion) => {
        let man
        if(possion === 1){man = thisuserone}else if(possion === 2){man = thisusertwo}else if(possion === 3){man = thisuserthree}else if(possion === 4){man = thisuserfour}else{
            message('задача не обслуживается')
        }
        console.log(man)
        try{
            const {data} = await SocialService.plusComission({tn: man.tn, possion})
            if(data){
                getCommission()
            }
        }catch(e){
            console.log(e)
        }

    }

    const delCommission = async (idcom) => {
        try{
            const {data} = await SocialService.delComission({id: idcom})
            console.log(data)
            if(data.del){
                message('Изменён состав комиссии')
                getCommission()
            }
        }catch(e){
            console.log(e)
        }
    }


    useEffect(()=>{
        getUsers()
        getAllPrograms()
        getCommission()
        console.log(allprogram)
    }, [activedel])

    useEffect(()=>{
        console.log(requirement)
    }, [requirement])

    return (
        <div className="soclist">
            <div className="soclist_title">Список социальных программ</div>
            <div className={'text'}><p>Для создания новой программы нажмите кнопку Создать</p><p>Для редактирования существующей программы, необходимо выбрать программу из списка</p></div>
            <div className="soclist_btns">
                <div className="soclist_upload" onClick={()=>setCreate(true)}>Создать</div>
                <div className="soclist_upload" onClick={()=>setCommission(true)}>Комиссия</div>
                <div className="soclist_upload" onClick={()=>setStazhedit(true)}>Размер % от стажа</div>
            </div>
            <div className="soclist_list">
                <div className="soclist_list_line">
                    <div className="soclist_list_line_name nametitle">П/П</div>
                    <div className="soclist_list_line_price title">Дата создания / изменения</div>
                    <div className="soclist_list_line_group title">Наименование</div>
                    <div className="soclist_list_line_cropname title ">Сумма</div>
                </div>
                {allprogram.map((prgm, index)=>(
                    <div key={index} className="soclist_list_line bordertopnone">
                        <div className="soclist_list_line_name" style={{width: '60px'}}>1</div>
                        <div className="soclist_list_line_name">{prgm.updatedAt.split('T')[0]}</div>
                        <div className="soclist_list_line_name">{prgm.name}</div>
                        <div className="soclist_list_line_name">сумма {prgm.sum}</div>
                        <div className="soclist_list_line_del"><i className="fa-solid fa-pen-to-square" onClick={()=>openEditBlock(index)}/><i className="fa-solid fa-xmark" onClick={()=>delFullProgram(prgm.id, prgm.name)}/></div>
                    </div>
                ))}


            </div>
            <ModalFiles data={<DelProgramModal iddel={iddel} name={namedel} setActive={setActivedel}/>} active={activedel} setActive={setActivedel}/>
            {/*// Создание программы*/}
            <div className='glass' style={(create)?{display: 'flex'}:{display: 'none'}}>
                <div className="glass_board">
                    <div className="glass_board_close"><i className="fa-solid fa-xmark"  onClick={()=>setCreate(false)}/></div>
                    <div className="glass_board_body">
                        <div className="glass_board_body_title">Создание новой социальной программы</div>
                        <div className="glass_board_body_tit">Название программы</div>

                        <input placeholder="Введите название программы" className="glass_board_body_input" onChange={(e)=>setSocname(e.target.value)}  type="text" value={socname}/>
                        <div className='glassslash'></div>
                        <div className="glass_board_body_tit">Текст описания программы</div>


                        <textarea placeholder="Введите описание задачи" className="glass_board_body_textarea" onChange={(e)=>setSocdescript(e.target.value)} id='newsocdescription' value={socdescript}></textarea>
                        <div className='glassslash'></div>
                        <div className="glass_board_body_tit">Требования <div className="glass_board_body_btn">+ добавить требование</div></div>
                        <div className="glass_board_body_graf"><input type="text" className='inputs_of_graf' onChange={(e) => {setNewreq(e.target.value)}} value={newreq} placeholder='Введите новое требование'/> <div className="btns"><i className="fa-solid fa-square-plus" onClick={plusRequirement}/></div></div>
                        {requirement.map((req, index )=>{if(!req.edit){return(
                            <div key={index} className="glass_board_body_graf blueborder">{req.desc}<div className="btns"><i className="fa-solid fa-pen-to-square" onClick={()=>editRequirement(index)}/><i className="fa-solid fa-xmark" onClick={()=>delRequirement(index)}/></div></div>

                        )}else{
                            return(
                                <div key={index} className="glass_board_body_graf"><input type="text" className='inputs_of_graf' onChange={(e) => revalueRequirement(e.target.value, index)} value={req.desc} placeholder='Изменение требования'/> <div className="btns"><i className="fa-solid fa-floppy-disk" onClick={()=>saveEditRequirement(index)}/></div></div>
                            )
                        }})}
                        <div className='glassslash'></div>
                        <div className="glass_board_body_tit">Документы <div className="glass_board_body_btn">+ добавить документ</div></div>
                        <div className="glass_board_body_graf"><input type="text" className='inputs_of_graf' onChange={(e) => {setNewdocs(e.target.value)}} value={newdocs} placeholder='Введите название нового документа'/> <div className="btns"><i className="fa-solid fa-square-plus"  onClick={plusDocs}/></div></div>
                        {docs.map((doc, index )=>{if(!doc.edit){return(
                            <div key={index} className="glass_board_body_graf blueborder">{doc.desc}<div className="btns"><i className="fa-solid fa-pen-to-square" onClick={()=>editDocs(index)}/><i className="fa-solid fa-xmark"  onClick={()=>delDocs(index)}/></div></div>
                        )}else{
                            return(
                                <div key={index} className="glass_board_body_graf"><input type="text" className='inputs_of_graf' onChange={(e) => revalueDocs(e.target.value, index)} value={doc.desc} placeholder='Изменение названия документа'/> <div className="btns"><i className="fa-solid fa-floppy-disk" onClick={()=>saveEditDocs(index)}/></div></div>

                        )
                        }})}

                        <div className='glassslash'></div>
                        <div className="glass_board_body_tit">Минимальный стаж<input type="number" className="glass_board_body_numinput" minLength="0" maxLength="2" onChange={(e)=>setMinyear(e.target.value)} value={minyear}/> год(лет)</div>
                        <div className='glassslash'></div>
                        <div className="glass_board_body_tit">Максимальная сумма<input type="number" className="glass_board_body_numinput" minLength="0" maxLength="5" onChange={(e)=>setMaxsum(e.target.value)} value={maxsum}/> руб.</div>
                        <div className='glassslash'></div>
                        <div className="glass_board_body_buttons">
                            <div className="glass_board_body_tit">Возможность использования</div>
                            <div className="glass_board_body_buttons_create" style={(createcash)?{border: "1px solid #CCC"}:{border: "1px solid rgb(18, 19, 56)"}} onClick={()=>setCreatecash(false)}>Перчисление средств</div>
                            <div className="glass_board_body_buttons_create" style={(createcash)?{border: "1px solid rgb(18, 19, 56)"}:{border: "1px solid #CCC"}} onClick={()=>setCreatecash(true)}>Выбор использования</div>
                        </div>
                        <div className='glassslash'></div>
                        <div className="glass_board_body_buttons">
                            <div className="glass_board_body_tit">Начисление</div>
                            <div className="glass_board_body_buttons_create" style={(stazhcash)?{border: "1px solid #CCC"}:{border: "1px solid rgb(18, 19, 56)"}} onClick={()=>setStazhcash(false)}>Фиксированное</div>
                            <div className="glass_board_body_buttons_create" style={(stazhcash)?{border: "1px solid rgb(18, 19, 56)"}:{border: "1px solid #CCC"}} onClick={()=>setStazhcash(true)}>Расчет от стажа</div>
                            <div className="glass_board_body_btn">Редактировать % от стажа</div>
                        </div>
                        <div className='glassslash'></div>
                        <div className="glass_board_body_buttons">
                            <div className="glass_board_body_buttons_create" onClick={creatNewSoc}>Создать</div>
                            <div className="glass_board_body_buttons_cancel" onClick={cleanDataNewSoc}>Сбросить</div>
                        </div>
                    </div>
                </div>
            </div>
            {/*// Редактирование программы*/}

            <div className='glass' style={(edit)?{display: 'flex'}:{display: 'none'}}>
                <div className="glass_board">
                    <div className="glass_board_close"><i className="fa-solid fa-xmark"  onClick={()=>setEdit(false)}/></div>
                    <div className="glass_board_body">
                        <div className="glass_board_body_title">Редактирование социальной программы</div>
                        <div className="glass_board_body_tit">Название программы</div>
                        <input placeholder="Введите название программы" className="glass_board_body_input" type="text" onChange={(e)=>setNameedit(e.target.value)} value={nameedit}/>
                        <div className='glassslash'></div>
                        <div className="glass_board_body_tit">Текст описания программы</div>
                        <textarea placeholder="Введите описание задачи" className="glass_board_body_textarea" onChange={(e)=>setDescedit(e.target.value)} value={descedit}></textarea>
                        <div className='glassslash'></div>
                        <div className="glass_board_body_tit">Требования <div className="glass_board_body_btn">+ добавить требование</div></div>
                        <div className="glass_board_body_graf"><input type="text" className='inputs_of_graf' onChange={(e)=>setNewcondedit(e.target.value)} value={newcondedit} placeholder='Введите новое требование'/> <div className="btns"><i className="fa-solid fa-square-plus" onClick={plusRequirementEditer}/></div></div>

                        {/*{(condedit)&&condedit.map((cond, index)=>(*/}
                        {/*    <div key={index} className="glass_board_body_graf blueborder">{cond.desc}<div className="btns"><i className="fa-solid fa-pen-to-square"/><i className="fa-solid fa-xmark"/></div></div>*/}
                        {/*))}*/}

                        {(condedit)&&condedit.map((req, index )=>{if(!req.edit){return(
                            <div key={index} className="glass_board_body_graf blueborder">{req.desc}<div className="btns"><i className="fa-solid fa-pen-to-square" onClick={()=>editRequirementEditor(index)}/><i className="fa-solid fa-xmark" onClick={()=>delRequirementEditor(index)}/></div></div>
                        )}else{
                            return(
                                <div key={index} className="glass_board_body_graf"><input type="text" className='inputs_of_graf' onChange={(e) => revalueRequirementEditor(e.target.value, index)} value={req.desc} placeholder='Изменение требования'/> <div className="btns"><i className="fa-solid fa-floppy-disk" onClick={()=>saveRequirementEditor(index)}/></div></div>
                            )
                        }})}
                        {/*<div className="glass_board_body_graf"><input type="text" className='inputs_of_graf' value='Требование 3 (Изменение)' placeholder='Изменение требования'/> <div className="btns"><i className="fa-solid fa-floppy-disk"/></div></div>*/}
                        <div className='glassslash'></div>
                        <div className="glass_board_body_tit">Документы <div className="glass_board_body_btn">+ добавить документ</div></div>
                        <div className="glass_board_body_graf"><input type="text" className='inputs_of_graf'  onChange={(e)=>setNewdocedit(e.target.value)} value={newdocedit} placeholder='Введите название нового документа'/> <div className="btns"><i className="fa-solid fa-square-plus" onClick={plusDocsEditor}/></div></div>
                        {/*{(docsedit)&&docsedit.map((doc, index)=>(*/}
                        {/*    <div className="glass_board_body_graf blueborder">{doc.desc}<div className="btns"><i className="fa-solid fa-pen-to-square"/><i className="fa-solid fa-xmark"/></div></div>*/}
                        {/*))}*/}
                        {/*<div className="glass_board_body_graf"><input type="text" className='inputs_of_graf' value='Документ 2 (Изменение)' placeholder='Изменение названия документа'/> <div className="btns"><i className="fa-solid fa-floppy-disk"/></div></div>*/}
                        {(docsedit)&&docsedit.map((doc, index )=>{if(!doc.edit){return(
                            <div key={index} className="glass_board_body_graf blueborder">{doc.desc}<div className="btns"><i className="fa-solid fa-pen-to-square" onClick={()=>editDocs(index)}/><i className="fa-solid fa-xmark"  onClick={()=>delDocsEditor(index)}/></div></div>
                        )}else{
                            return(
                                <div key={index} className="glass_board_body_graf"><input type="text" className='inputs_of_graf' onChange={(e) => revalueDocs(e.target.value, index)} value={doc.desc} placeholder='Изменение названия документа'/> <div className="btns"><i className="fa-solid fa-floppy-disk" onClick={()=>saveEditDocs(index)}/></div></div>

                            )
                        }})}

                        <div className='glassslash'></div>
                        <div className="glass_board_body_tit">Минимальный стаж<input type="number" className="glass_board_body_numinput" minLength="0" maxLength="2" onChange={(e)=>setExperedit(e.target.value)}  value={experedit}/> год(лет)</div>
                        <div className='glassslash'></div>
                        <div className="glass_board_body_tit">Максимальная сумма<input type="number" className="glass_board_body_numinput" minLength="0" maxLength="5"  onChange={(e)=>setSumedit(e.target.value)}  value={sumedit}/> руб.</div>
                        <div className='glassslash'></div>
                        <div className="glass_board_body_buttons">
                            <div className="glass_board_body_tit">Возможность использования</div>
                            <div className="glass_board_body_buttons_create" style={(puredit)?{border: "1px solid #CCC"}:{border: "1px solid rgb(18, 19, 56)"}} onClick={()=>setPuredit(false)}>Перчисление средств</div>
                            <div className="glass_board_body_buttons_create" style={(puredit)?{border: "1px solid rgb(18, 19, 56)"}:{border: "1px solid #CCC"}} onClick={()=>setPuredit(true)}>Выбор использования</div>
                        </div>
                        <div className='glassslash'></div>
                        <div className="glass_board_body_buttons">
                            <div className="glass_board_body_tit">Начисление</div>
                            <div className="glass_board_body_buttons_create" style={(calcedit)?{border: "1px solid #CCC"}:{border: "1px solid rgb(18, 19, 56)"}} onClick={()=>setCalcedit(false)}>Фиксированное</div>
                            <div className="glass_board_body_buttons_create" style={(calcedit)?{border: "1px solid rgb(18, 19, 56)"}:{border: "1px solid #CCC"}} onClick={()=>setCalcedit(true)}>Расчет от стажа</div>

                        </div>
                        <div className='glassslash'></div>
                        <div className="glass_board_body_buttons">
                            <div className="glass_board_body_buttons_create" onClick={saveParamsEditor}>Сохранить</div>
                        </div>
                    </div>
                </div>
            </div>
            {/*// Редактирование Комиссии*/}
            <div className='glass' style={(commission)?{display: 'flex'}:{display: 'none'}}>
                <div className="glass_board">
                    <div className="glass_board_close"><i className="fa-solid fa-xmark"  onClick={()=>setCommission(false)}/></div>
                    <div className="glass_board_body">
                        <div className="glass_board_body_title">Комиссия</div>
                        <div className="glass_board_body_tit">Согласования</div>
                        <div className="glass_board_body_selection">
                            <Select onChange={(e) => setThisuserone(listuser[e.index])} value={thisuserone} options={listuser} styles={{container:(baseStyles, state) => ({...baseStyles,width:'290px'})}}/>
                            <div className="glass_pluss_btn" onClick={()=>plusCommFirst(1)}>Добавить</div>
                        </div>

                        {listcomm.map((man, index) => {if(man.possion===1){return(
                            <div key={index} className="glass_board_body_man">
                                <div className="glass_board_body_man_content">
                                    <div className="glass_board_body_man_photo" style={(man.user.avatar)?{backgroundImage: `url("/files/profile/${man.user.avatar}")`}:{backgroundImage: 'url("/profile/face.png")'}}></div>
                                    <div className="glass_board_body_man_params">
                                        <div className="glass_board_body_man_name">{man.t13uni.name}</div>
                                        <div className="glass_board_body_man_dev">{man.t13uni.developer}</div>
                                        <div className="glass_board_body_man_departament">{man.t13uni.branch}</div>
                                    </div>
                                </div>
                                <div className="glass_board_body_man_del"><i className="fa-solid fa-xmark" onClick={()=>delCommission(man.id)}/></div>
                            </div>
                        )}})}


                        <div className="glass_board_body_man">
                            <div className="glass_board_body_man_content">
                                <div className="glass_board_body_man_params">
                                    <div className="glass_board_body_man_dev">Начальник отдела или участка (ПО УМОЛЧАНИЮ, выбирает заявитель)</div>
                                </div>
                            </div>
                        </div>

                        <div className='glassslash'></div>
                        <div className="glass_board_body_tit">Контроль</div>
                        <div className="glass_board_body_selection">
                            <Select onChange={(e) => setThisusertwo(listuser[e.index])} value={thisusertwo} options={listuser} styles={{container:(baseStyles, state) => ({...baseStyles,width:'290px'})}}/>
                            <div className="glass_pluss_btn" onClick={()=>plusCommFirst(2)}>Добавить</div>
                        </div>
                        {listcomm.map((man, index) => {if(man.possion===2){return(
                            <div key={index} className="glass_board_body_man">
                                <div className="glass_board_body_man_content">
                                    <div className="glass_board_body_man_photo" style={(man.user.avatar)?{backgroundImage: `url("/files/profile/${man.user.avatar}")`}:{backgroundImage: 'url("/profile/face.png")'}}></div>
                                    <div className="glass_board_body_man_params">
                                        <div className="glass_board_body_man_name">{man.t13uni.name}</div>
                                        <div className="glass_board_body_man_dev">{man.t13uni.developer}</div>
                                        <div className="glass_board_body_man_departament">{man.t13uni.branch}</div>
                                    </div>
                                </div>
                                <div className="glass_board_body_man_del"><i className="fa-solid fa-xmark" onClick={()=>delCommission(man.id)}/></div>
                            </div>
                        )}})}

                        <div className='glassslash'></div>
                        <div className="glass_board_body_tit">Подписант</div>
                        <div className="glass_board_body_selection">
                            <Select onChange={(e) => setThisuserthree(listuser[e.index])} value={thisuserthree} options={listuser} styles={{container:(baseStyles, state) => ({...baseStyles,width:'290px'})}}/>
                            <div className="glass_pluss_btn" onClick={()=>plusCommFirst(3)}>Добавить</div>
                        </div>
                        {listcomm.map((man, index) => {if(man.possion===3){return(
                            <div key={index} className="glass_board_body_man">
                                <div className="glass_board_body_man_content">
                                    <div className="glass_board_body_man_photo" style={(man.user.avatar)?{backgroundImage: `url("/files/profile/${man.user.avatar}")`}:{backgroundImage: 'url("/profile/face.png")'}}></div>
                                    <div className="glass_board_body_man_params">
                                        <div className="glass_board_body_man_name">{man.t13uni.name}</div>
                                        <div className="glass_board_body_man_dev">{man.t13uni.developer}</div>
                                        <div className="glass_board_body_man_departament">{man.t13uni.branch}</div>
                                    </div>
                                </div>
                                <div className="glass_board_body_man_del"><i className="fa-solid fa-xmark" onClick={()=>delCommission(man.id)}/></div>
                            </div>
                        )}})}

                        <div className='glassslash'></div>
                        <div className="glass_board_body_tit">Исполнитель</div>
                        <div className="glass_board_body_selection">
                            <Select onChange={(e) => setThisuserfour(listuser[e.index])} value={thisuserfour} options={listuser} styles={{container:(baseStyles, state) => ({...baseStyles,width:'290px'})}}/>
                            <div className="glass_pluss_btn" onClick={()=>plusCommFirst(4)}>Добавить</div>
                        </div>
                        {listcomm.map((man, index) => {if(man.possion===4){return(
                            <div key={index} className="glass_board_body_man">
                                <div className="glass_board_body_man_content">
                                    <div className="glass_board_body_man_photo" style={(man.user.avatar)?{backgroundImage: `url("/files/profile/${man.user.avatar}")`}:{backgroundImage: 'url("/profile/face.png")'}}></div>
                                    <div className="glass_board_body_man_params">
                                        <div className="glass_board_body_man_name">{man.t13uni.name}</div>
                                        <div className="glass_board_body_man_dev">{man.t13uni.developer}</div>
                                        <div className="glass_board_body_man_departament">{man.t13uni.branch}</div>
                                    </div>
                                </div>
                                <div className="glass_board_body_man_del"><i className="fa-solid fa-xmark" onClick={()=>delCommission(man.id)}/></div>
                            </div>
                        )}})}

                        <div className='glassslash'></div>
                        <div className="glass_board_body_buttons">
                            <div className="glass_board_body_buttons_create" onClick={()=>setCommission(false)}>Закрыть (изменения сохраняются автоматически)</div>
                        </div>
                    </div>
                </div>
            </div>
            {/*// Редактирование стажа*/}
            <div className='glass' style={(stazhedit)?{display: 'flex'}:{display: 'none'}}>
                <div className="glass_board">
                    <div className="glass_board_close"><i className="fa-solid fa-xmark"  onClick={()=>setStazhedit(false)}/></div>
                    <div className="glass_board_body">
                        <div className="glass_board_body_title">Денежные  средства  выплачиваются  из  средств  фонда  по  личному  заявлению  работника  с  учетом  его  вклада  в  работу  ООО «Сургутское РСУ»  и  стажа  работы  в  Обществе</div>
                        <table>
                            <tbody>
                            <tr>
                                <td>
                                    <div className="glass_board_body_tit">Стаж работы в ООО «Сургутское РСУ»</div>
                                </td>
                                <td>
                                    <div className="glass_board_body_tit">Размер дополнительных компенсаций в %</div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    от <input type="number" className="glass_board_body_numinput" min="0" max="99" /> до{' '}
                                    <input type="number" className="glass_board_body_numinput" min="0" max="99" /> год(лет)
                                </td>
                                <td>
                                    <input type="number" style={{ margin: '20px' }} className="glass_board_body_numinput" min="0" max="99" /> %
                                </td>
                                <td>
                                    <div className="btnpercent">Добавить</div>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ padding: '10px 20px', border: '3px solid #CCC' }}>от 1 до 3 лет</td>
                                <td style={{ padding: '10px 20px', border: '3px solid #CCC' }}>70%</td>
                                <td>
                                    <div className="trashpercent">
                                        <i className="fa-solid fa-trash" />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ padding: '10px 20px', border: '3px solid #CCC' }}>от 1 до 3 лет</td>
                                <td style={{ padding: '10px 20px', border: '3px solid #CCC' }}>70%</td>
                                <td>
                                    <div className="trashpercent">
                                        <i className="fa-solid fa-trash" />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ padding: '10px 20px', border: '3px solid #CCC' }}>от 1 до 3 лет</td>
                                <td style={{ padding: '10px 20px', border: '3px solid #CCC' }}>70%</td>
                                <td>
                                    <div className="trashpercent">
                                        <i className="fa-solid fa-trash" />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ padding: '10px 20px', border: '3px solid #CCC' }}>от 1 до 3 лет</td>
                                <td style={{ padding: '10px 20px', border: '3px solid #CCC' }}>70%</td>
                                <td>
                                    <div className="trashpercent">
                                        <i className="fa-solid fa-trash" />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ padding: '10px 20px', border: '3px solid #CCC' }}>от 1 до 3 лет</td>
                                <td style={{ padding: '10px 20px', border: '3px solid #CCC' }}>70%</td>
                                <td>
                                    <div className="trashpercent">
                                        <i className="fa-solid fa-trash" />
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>



                    </div>
                </div>
            </div>
        </div>
    )
}

export default observer(Sociality)