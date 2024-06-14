import React, {useContext, useEffect, useRef, useState} from "react"
import {observer} from "mobx-react-lite"
import "./analitics.scss"
import LoadingSpinner from "../../components/loading/LoadingSpinner";
import ModalFiles from "../../components/modalwin/ModalFiles";
import HistoryService from "../../services/HistoryService";
import {useMessage} from "../../hooks/message.hook";


function AnalyticsCms(){
    const message = useMessage()
    const [loading,setLoading] = useState(false)

    const [types,setTypes] = useState([])
    const [name, setName] = useState('')

    const [aM1,setAM1] = useState(false)

    const loadingHandler = async () => {
        try {
            setLoading(true)
            const {data} = await HistoryService.getTypes()
            if(data) setTypes(data)
            console.log(data)
        }catch (e) {
            console.log(e)
        }finally {
            setLoading(false)
        }
    }
    const cancelHandler = () => {
        setAM1(false)
        setName('')
    }
    const createType = async () => {
        try {
            if(name.trim().length){
                setLoading(true)
                const {data} = await HistoryService.createType(name)
                if (data){
                    cancelHandler()
                    loadingHandler()
                    message('Тип добавлен')
                }
            }else{
                message('Введите название типа')
            }
        }catch (e){
            console.log(e)
        }finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        loadingHandler()
    },[])

    function CreateType(){
        return (
            <div className={`form-analytics`}>
                <input className={`input`} placeholder={'Введите название типа истории'} value={name} onChange={(e) => setName(e.target.value)}/>
                <div onClick={(e) => createType()} className={'button'}>Добавить</div>
            </div>
        )
    }

    return (
        <div className={`analytics-cms`}>
            <div className={'title'}>
                <h1>Настройки Раздела Аналитики и Истории</h1>
            </div>
            <div className={`types-history`}>
                <h2>Типы историй</h2>
                <div className={'buttons'}>
                    <div onClick={(e) => setAM1(true)} className={`button`}>Добавить тип</div>
                </div>
                {types.length ?
                <div className={`table`}>
                    <div className={`row header`}>
                        <div className={`column s1`}>id</div>
                        <div className={`column s2`}>name</div>
                    </div>
                    {types.map( (item,index) => (
                        <div key={index} className={`row`}>
                            <div className={`column s1`}>{item.id}</div>
                            <div className={`column s2`}>{item.name}</div>
                        </div>
                    ))}
                </div>
                : null}
            </div>

            {loading ? (<LoadingSpinner/>) : null}
            <ModalFiles data={CreateType()} active={aM1} setActive={setAM1} heigth={'120px'}/>

        </div>
    )
}
export default observer(AnalyticsCms)