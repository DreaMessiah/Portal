import React, {useContext, useEffect, useRef, useState} from "react"
import {observer} from "mobx-react-lite"
import "../econom/ogm.scss"
import {Context} from "../../index"
import UserService from "../../services/UserService"
import LoadingSpinner from "../../components/loading/LoadingSpinner"
import './editor.scss'
import formatDate from "../../components/functions/formatDate"
import {useMessage} from "../../hooks/message.hook";
import ModalFiles from "../../components/modalwin/ModalFiles";
import CheckBox from "../../components/inputs/CheckBox";
import MultiSelect from "../../components/inputs/MultiSelect";
import CmsSelect from "../../components/inputs/CmsSelect";
import isNumeric from "../../components/functions/isNumeric";
const XLSX = require('xlsx')

function CmsStructure(){
    const [loading,setLoading] = useState(false)
    const message = useMessage()

    const [t13,setT13] = useState([])
    const [branchs,setBranchs] = useState([])
    const [users,setUsers] = useState([])
    const [selectedBranch,setSelectedBranch] = useState(-1)
    const [addActive,setAddActive] = useState(false)

    const [name,setName] = useState('')
    const [level,setLevel] = useState('')
    const [position,setPosition] = useState('')
    const [onT13,setOnT13] = useState(false)
    const [onType,setOnType] = useState(false)
    const [group,setGroup] = useState([])
    const [empty,setEmpty] = useState([])
    const [toNext,setToNext] = useState(0)

    const {store} = useContext(Context)

    const addButtonHandler = () => {
        setAddActive(true)
    }
    const cancelHandler = () => {
        setAddActive(false)
        setName('')
        setLevel('')
        setGroup([])
        setToNext(0)
        setPosition('')
        setOnT13(false)
    }
    const loadingHandler = async () => {
        try {
            setLoading(true)
            const {data} = await UserService.getStructure()
            if(data) {
                setBranchs(data)
                console.log(data)
            }
            const response = await UserService.getWorkers()
            if(response.data) setT13(response.data)
        }catch (e) {
            console.log(e)
        }finally {
            setLoading(false)
        }
    }
    const checkEmpty = () => {
        const n = [...empty]

        n[0] = !!!name.trim().length
        n[1] = !isNumeric(level) || !!!level.trim().length
        n[2] = !isNumeric(position) || !!!position.trim().length

        const hasTrueValue = n.some(value => value === true);
        if( hasTrueValue ) setEmpty(n)
        else setEmpty([])
        return hasTrueValue
    }
    const saveHandler = async () => {
        try {
            setLoading(true)
            if(!checkEmpty()){
                const newStructure = {name,level,position,onT13,group,toNext}
                const {data} = await UserService.createStructure(newStructure)
            }else{
                message('Введенные данные не корректны')
            }
        }catch (e) {
            console.log(e)
        }finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        loadingHandler()
    },[])

    function AddBranch(){
        return (
            <div className={`create-branch`}>
                <div className={`create-branch-form`}>
                    <input value={name} onChange={ (e) => setName(e.target.value)} type={`text`} placeholder={'Введите название ветви'} className={`${empty[0] && 'red-dotted-border'}`}/>
                    <input value={level} onChange={ (e) => setLevel(e.target.value)} type={`text`} placeholder={'Введите номер уровня'} className={`${empty[1] && 'red-dotted-border'}`}/>
                    <input value={position} onChange={ (e) => setPosition(e.target.value)} type={`text`} placeholder={'Введите порядковый номер на уровне'} className={`${empty[2] && 'red-dotted-border'}`}/>
                    <div className={`checkboxes`}>
                        <CheckBox onChange={setOnType} label={'Закрытый тип подразделения?'} checked={onType} />
                        <CheckBox onChange={setOnT13} label={'Содержание подразделения из таблицы Т13?'} checked={onT13} />
                    </div>
                    {!onT13 ?
                    <div className={`multi100`}>
                        <MultiSelect radius={'0'} setOptions={setGroup} options={t13} values={group} />
                    </div>
                    : null}
                    <div className={`multi100`}>
                        <CmsSelect radius={'0'} options={branchs} placeholder={'Выберете доминанта'} onChange={setToNext} defaultValue={toNext} />
                    </div>
                    <div className={`buttons`}>
                        <div onClick={() => saveHandler()} className={`button`}>Сохранить</div>
                        <div onClick={() => cancelHandler()} className={`button`}>Отменить</div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className='workers'>
            <div className={`title`}>
                <h3>Редактирование структуры компании</h3>
                <div className={`buttons-cms`}>
                    <div className={`button`} onClick={addButtonHandler}>Добавить структурное подразделение</div>
                    <div className={`struct-panel`}>
                        {branchs.length ? branchs.map((item,index) => (
                            <div key={index} className={`branch`}>
                                <div className={`name`}>{item.name}</div>
                            </div>
                        )):null}
                    </div>
                </div>
            </div>
            {loading ? (<LoadingSpinner/>) : null}
            <ModalFiles data={AddBranch()} active={addActive} setActive={setAddActive} heigth={'auto'}/>
        </div>
    )
}

export default observer(CmsStructure)