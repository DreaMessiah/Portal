import './newcontroll.scss'
import {useState, useEffect, useContext} from "react";
import TableDatePicker from "../../../../inputs/TableDatePicker";
import formatDate from "../../../../functions/formatDate";
import WeldingService from "../../../../../services/WeldingService";
import {useMessage} from "../../../../../hooks/message.hook";
import {Context} from "../../../../../index";

export const NewControll = ({month,year,object_id,setActive,loading}) => {
    const [num,setNum] = useState('')
    const [codecrew,setCodecrew] = useState('')
    const [date,setDate] = useState(new Date())
    const [way,setWay] = useState('')
    const [dostup,setDostup] = useState('')
    const [size,setSize] = useState('')
    const [zav,setZav] = useState('')
    const {store} = useContext(Context)
    const [connections,setConnections] = useState([])

    const [empty,setEmpty] = useState([])
    const [isEmpty, setIsEmpty] = useState(false)

    const message = useMessage()

    const checkEmpty = () => {
        const n = [...empty]
        n[0] = !!!num.trim().length
        n[1] = !!!codecrew.trim().length
        n[2] = !!!date
        n[3] = !!!way.trim().length
        n[4] = !!!dostup.trim().length
        n[5] = !!!size.trim().length
        n[6] = !!!zav.trim().length
        const hasTrueValue = n.some(value => value === true);
        if( hasTrueValue ) setEmpty(n)
        else setEmpty([])
        return hasTrueValue
    }
    useEffect(() => {
        if(!checkEmpty()){
            setIsEmpty(true)
        }else{
            setIsEmpty(false)
        }
    },[num,codecrew,date,way,dostup,size,zav])

    const pushConnectionHandler = () => {
        if(isEmpty){
            setConnections([...connections,{num,codecrew,date,way,dostup,size,zav}])
            setEmptyInputs()
        }
    }
    const setEmptyInputs = () => {
        setNum('')
        setCodecrew('')
        setDate(new Date())
        setWay('')
        setDostup('')
        setSize('')
        setZav('')
    }
    const createZaHandler = async () => {
        try {
            const {data} = await WeldingService.createZa(connections,year,month,object_id)
            if(data){
                console.log(data)
                await loading(object_id,month,year)
                message('Заявка отправлена')
                setActive(false)
                setConnections([])
            }
        }catch (e){
            console.log(e)
        }
    }
    const deleteConnectionHandler = (index) => {
        const newConnections = [...connections]
        newConnections.splice(index, 1)
        setConnections(newConnections)
    }
    return (
        <div className='new_controll'>
            <div className='new_controll_form'>
                <div onClick={() => console.log(date)} className='new_controll_form_title'>Новая заявка</div>
                <div className='new_controll_form_this'>
                    <div className='new_controll_form_this_strock'>
                        <div className='new_controll_form_this_strock_number'>№ Соединения</div>
                        <div className='new_controll_form_this_strock_shifr'>Клеймо звена</div>
                        <div className='new_controll_form_this_strock_date'>Дата сварки</div>
                        <div className='new_controll_form_this_strock_way'>Способ сварки и положение</div>
                        <div className='new_controll_form_this_strock_access'>Доступ к сварному соединению</div>
                        <div className='new_controll_form_this_strock_size'>Размер св.соединения Тип св.соединения</div>
                        <div className='new_controll_form_this_strock_tube'>Зав. № труб (деталей)</div>
                    </div>
                    <div className='new_controll_form_this_strock'>
                        <div className='new_controll_form_this_strock_number'><input value={num} onChange={(e) => setNum(e.target.value)} className={`input_form`} id='number' type="text" /></div>
                        <div className='new_controll_form_this_strock_shifr'><input value={codecrew} onChange={(e) => setCodecrew(e.target.value)} className='input_form' id='shifr' type="text" /></div>
                        <div className='new_controll_form_this_strock_date'><TableDatePicker size={'100%'} value={date} placeholder={'Выберете дату'} onChange={setDate} /></div>
                        <div className='new_controll_form_this_strock_way'><input value={way} onChange={(e) => setWay(e.target.value)} className='input_form' id='way' type="text" /></div>
                        <div className='new_controll_form_this_strock_access'><input value={dostup} onChange={(e) => setDostup(e.target.value)} className='input_form' id='access' type="text" /></div>
                        <div className='new_controll_form_this_strock_size'><input value={size} onChange={(e) => setSize(e.target.value)} className='input_form' id='size' type="text" /></div>
                        <div className='new_controll_form_this_strock_tube'><input value={zav} onChange={(e) => setZav(e.target.value)} className='input_form' id='tube' type="text" /></div>
                    </div>
                </div>
                <div className='new_controll_form_btns'>
                    <div className={`new_controll_form_btns_insert ${!isEmpty && 'noactive'}`} id='plusConnection' onClick={()=>{pushConnectionHandler()}}>Добавить</div>
                    <div className={`new_controll_form_btns_create ${!connections.length && 'noactive'}`} id='plusBtn' onClick={()=>createZaHandler()}>Создать</div>
                </div>
            </div>
            {connections.length ?
                <div className='new_controll_list'>
                    <div className='new_controll_list_this_strock_up' id='cap_list'></div>
                    <div className='new_controll_list_this_strock' id='title_list'>
                        <div className='new_controll_list_this_strock_pp'>П/П</div>
                        <div className='new_controll_list_this_strock_number'>№ Соединения</div>
                        <div className='new_controll_list_this_strock_shifr'>Клеймо звена</div>
                        <div className='new_controll_list_this_strock_date'>Дата сварки</div>
                        <div className='new_controll_list_this_strock_way'>Способ сварки и положение</div>
                        <div className='new_controll_list_this_strock_access'>Доступ к сварному соединению</div>
                        <div className='new_controll_list_this_strock_size'>Размер св.соединения Тип св.соединения</div>
                        <div className='new_controll_list_this_strock_tube'>Зав. № труб (деталей)</div>
                    </div>
                    {connections.map( (item,index) => (
                        <div key={index} className='new_controll_list_this_strock'>
                            <div className='new_controll_list_this_strock_pp'>{index+1}</div>
                            <div className='new_controll_list_this_strock_number'>{item.num}</div>
                            <div className='new_controll_list_this_strock_shifr'>{item.codecrew}</div>
                            <div className='new_controll_list_this_strock_date'>{formatDate(item.date)}</div>
                            <div className='new_controll_list_this_strock_way'>{item.way}</div>
                            <div className='new_controll_list_this_strock_access'>{item.dostup}</div>
                            <div className='new_controll_list_this_strock_size'>{item.size}</div>
                            <div className='new_controll_list_this_strock_tube'>{item.zav}<i onClick={(e) => deleteConnectionHandler(index)} className="fa-solid fa-xmark"></i></div>
                        </div>
                    ))}
                </div>
                :null}
        </div>
    )
}
