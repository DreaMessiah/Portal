import React, {useContext, useEffect, useState} from "react"

import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import './bye.scss'
import './polls.scss'
import LoadingSpinner from "../../components/loading/LoadingSpinner";
import UserService from "../../services/UserService";
import {useMessage} from "../../hooks/message.hook";

function ByePage(){
    const {store} = useContext(Context)
    const [selected,setSelected] = useState(0)
    const [termText,setTermText] = useState('')
    const [loading,setLoading] = useState(false)
    const [isBye,setIsBye] = useState(true)
    const [empty,setEmpty] = useState([])
    const message = useMessage()
    const selectHandler = (index) => {
        setSelected(index)
    }
    const checkEmpty = () => {
        const n = [...empty]

        n[0] = !!!selected
        n[1] = !!!termText

        const hasTrueValue = n.some(value => value === true);
        if( hasTrueValue ) setEmpty(n)
        else setEmpty([])
        return hasTrueValue
    }
    const sendHandler = async () => {
        try {
            setLoading(true)
            if(!checkEmpty()){
                const {data} = await UserService.sendBye(termText,selected)
                message('Спасибо за оставленый отзыв')
                loadingHandler()
            }else{
                message('Заполните информацию для отправки')
            }

        }catch (e) {
            console.log(e)
        }finally {
            setLoading(false)
        }
    }
    const loadingHandler = async () => {
        try {
            setLoading(true)
            const {data} = await UserService.isbye()
            setIsBye(data)
        }catch (e) {
            console.log(e)
        }finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        loadingHandler()
    },[])
    return (
        <>
            <div className='bye_container'>
                <div className={'text'}>
                    <h3>{store.t13.gender === 'Женский' ? 'Уважаемая' : 'Уважаемый'} {store.user.full_name}</h3>
                    <p>Сожалеем о принятом решении об увольнении с должности {store.t13.developer} в нашей компании.</p>
                    <p>Хотелось бы отметить, что ваш вклад в развитие компании был значимым, и мы ценим вашу преданность и профессионализм во время вашей работы у нас.</p>
                    <p>Желаем вам успехов в дальнейших начинаниях и надеемся, что вы найдете новые возможности для реализации своих навыков и амбиций.</p>
                    <p style={{marginTop:'10px'}}>С наилучшими пожеланиями, Сургутское РСУ.</p>
                    {!isBye ? <h4 style={{marginTop:'20px'}}>Как Вы оцениваете процесс увольнения?</h4> : null}
                </div>
                {!isBye ?
                    <>
                        <div className={`scale small-s ${empty[0] && 'red-inputs'}`}>
                            <div key={1} onClick={(e) => selectHandler(1)} className={ selected===1 ? 'item selected' : 'item itemhover'}>1</div>
                            <div key={2} onClick={(e) => selectHandler(2)} className={ selected===2 ? 'item selected' : 'item itemhover'}>2</div>
                            <div key={3} onClick={(e) => selectHandler(3)} className={ selected===3 ? 'item selected' : 'item itemhover'}>3</div>
                            <div key={4} onClick={(e) => selectHandler(4)} className={ selected===4 ? 'item selected' : 'item itemhover'}>4</div>
                            <div key={5} onClick={(e) => selectHandler(5)} className={ selected===5 ? 'item selected' : 'item itemhover'}>5</div>
                        </div>
                        <div className={'text'}>
                            <h3>Расскажите пожалуйста какие причины увольнения были наиболее значимы для Вас?</h3>
                            <textarea className={`area-term ${empty[1] && 'red-solid-border'}`} value={termText} onChange={(e) => setTermText(e.target.value)} />
                            <div onClick={(e) => sendHandler()} className={`button`}>Отправить обращение</div>
                        </div>
                    </>
                    : null}
                <div className={`back`}></div>
                {loading ? (<LoadingSpinner/>) : null}
            </div>

        </>
    )
}
export default observer(ByePage)