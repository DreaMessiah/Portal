import React, {useContext, useEffect, useState} from "react"

import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import './bye.scss'
import './polls.scss'
import LoadingSpinner from "../../components/loading/LoadingSpinner";
import UserService from "../../services/UserService";
import {useMessage} from "../../hooks/message.hook";
import CheckBox from "../../components/inputs/CheckBox";
import {Link} from "react-router-dom";

function HrmPage(){
    const {store} = useContext(Context)
    const [selected,setSelected] = useState(0)
    const [loading,setLoading] = useState(false)

    const [numPage,setNumPage] = useState(0)
    const [actNext,setActNext] = useState(false)
    const [actPrev,setActPrev] = useState(false)
    const [actSend,setActSend] = useState(false)
    const [actStart,setActStart] = useState(true)

    const [text1,setText1] = useState('')
    const [text2,setText2] = useState('')
    const [text3,setText3] = useState('')
    const [text4,setText4] = useState('')
    const [text5,setText5] = useState('')
    const [text6,setText6] = useState('')
    const [text7,setText7] = useState('')
    const [text8,setText8] = useState('')

    const [check1,setCheck1] = useState([false,false,false,false,false,false])

    const [checkAnswer,setCheckAnswer] = useState(true)

    const [empty,setEmpty] = useState([])
    const message = useMessage()

    const sendHandler = async () => {
        try {
            setLoading(true)
            if(!checkEmpty()){
                const report = [text1,check1+'',text2,text3,selected+'',text4,text5,text6,text7,text8]
                await UserService.sendHrm(report)
                message('Спасибо за Ваше участие в опросе')
                store.checkAuth()
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
            const {data} = await UserService.checkHrm()
            console.log(data)
            setCheckAnswer(data)
        }catch (e) {
            console.log(e)
        }finally {
            setLoading(false)
        }
    }
    const changePage = (direction) => {
        if(direction > 0 && checkEmpty()) message('Заполните пожалуйста обязательные поля в форме')
        else{
            setNumPage(prevNumPage => {
                const newNumPage = prevNumPage + direction
                return newNumPage >= 0 && newNumPage <= 9 ? newNumPage : prevNumPage
            })
        }
    }
    const handleCheck1Change = (index) => {
        setCheck1(prevChecks => {
            const newChecks = [...prevChecks];
            newChecks[index] = !newChecks[index];
            return newChecks;
        })
    }
    const nextPageHandler = () => changePage(1)
    const prevPageHandler = () => changePage(-1)
    useEffect(() => {
        setActStart(numPage === 0)
        setActSend(numPage === 9)
        setActNext(numPage < 9 && numPage > 0)
        setActPrev(numPage > 0)
    },[numPage])
    useEffect(() => {
        loadingHandler()
    },[])
    const checkEmpty = () => {
        const n = []
        if(numPage === 1) n[0] = !!!text1.trim().length
        if(check1[5] && numPage === 2)n[1] = !!!text2.trim().length
        if(numPage === 3)n[2] = !!!text3.trim().length
        if(numPage === 4)n[3] = !!!selected
        if(numPage === 5)n[4] = !!!text4.trim().length
        if(numPage === 6)n[5] = !!!text5.trim().length
        if(numPage === 7)n[6] = !!!text6.trim().length
        if(numPage === 8)n[7] = !!!text7.trim().length
        if(numPage === 9)n[8] = !!!text8.trim().length

        const hasTrueValue = n.some(value => value === true);
        if( hasTrueValue ) setEmpty(n)
        else setEmpty([])
        return hasTrueValue
    }
    function StartQuest() {
        return (
            <div className={'text'}>
                <h3>{store.t13.gender === 'Женский' ? 'Уважаемая' : 'Уважаемый'} {store.user.full_name}</h3>
                <p>Для улучшения ваших рабочих процессов и внедрения инновационных технологий, мы проводим опрос.</p>
                <p>Пожалуйста, ответьте на следующие вопросы максимально подробно.</p>
                <p>Ваши ответы помогут нам понять текущие проблемы и предложить решения, которые облегчат вашу работу.</p>
                {/*<h4 style={{marginTop:'20px'}}>Как Вы оцениваете процесс увольнения?</h4>*/}
            </div>
        )
    }
    function Quest1() {
        return (
            <div className={'text'}>
                <h3>Расскажите, пожалуйста, что входит в Ваши основные обязанности?</h3>
                <textarea value={text1} onChange={(e) => setText1(e.target.value)} className={`area-term ${empty[0] && 'red-solid-border'}`} />
            </div>
        )
    }
    function Quest2() {
        return (
            <div className={'text'}>
                <h1>Текущие проблемы и вызовы</h1>
                <h3>С какими основными трудностями вы сталкиваетесь в вашей ежедневной работе?</h3>
                <h3>(Выберите все подходящие варианты и добавьте свои комментарии)</h3>
                <div className={`checkboxes`}>
                    <CheckBox label={`Сложности с управлением документооборотом (1С и т.д.)`} checked={check1[0]} onChange={() => handleCheck1Change(0)}/>
                    <CheckBox label={`Проблемы с коммуникацией внутри отдела`} checked={check1[1]} onChange={() => handleCheck1Change(1)}/>
                    <CheckBox label={`Трудности в координации с другими отделами`} checked={check1[2]} onChange={() => handleCheck1Change(2)}/>
                    <CheckBox label={`Недостаток автоматизации процессов`} checked={check1[3]} onChange={() => handleCheck1Change(3)}/>
                    <CheckBox label={`Сложности в поиске и найме сотрудников`} checked={check1[4]} onChange={() => handleCheck1Change(4)}/>
                    <CheckBox label={`Другие (пожалуйста, уточните)`} checked={check1[5]} onChange={() => handleCheck1Change(5)}/>
                </div>
                {check1[5] ? <textarea value={text2} onChange={(e) => setText2(e.target.value)} className={`area-term ${empty[1] && 'red-solid-border'}`} /> : null }
            </div>
        )
    }
    function Quest3() {
        return (
            <div className={'text'}>
                <h3>Какие процессы в вашем отделе занимают больше всего времени и требуют автоматизации?</h3>
                <h3>(Опишите подробно)</h3>
                <textarea value={text3} onChange={(e) => setText3(e.target.value)} className={`area-term ${empty[2] && 'red-solid-border'}`} />
            </div>
        )
    }
    function Quest4() {
        return (
            <div className={'text'}>
                <h3>Как вы оцениваете текущий уровень автоматизации в вашем отделе?</h3>
                <h3>(От 1 до 5, где 1 — очень низкий, 5 — очень высокий)</h3>
                <div className={`newscale small-s ${empty[0] && 'red-inputs'}`}>
                    <div key={1} onClick={(e) => setSelected(1)} style={empty[3] && {border:'1px solid red'}} className={ selected===1 ? 'item selected' : 'item itemhover'}>1</div>
                    <div key={2} onClick={(e) => setSelected(2)} style={empty[3] && {border:'1px solid red'}} className={ selected===2 ? 'item selected' : 'item itemhover'}>2</div>
                    <div key={3} onClick={(e) => setSelected(3)} style={empty[3] && {border:'1px solid red'}} className={ selected===3 ? 'item selected' : 'item itemhover'}>3</div>
                    <div key={4} onClick={(e) => setSelected(4)} style={empty[3] && {border:'1px solid red'}} className={ selected===4 ? 'item selected' : 'item itemhover'}>4</div>
                    <div key={5} onClick={(e) => setSelected(5)} style={empty[3] && {border:'1px solid red'}} className={ selected===5 ? 'item selected' : 'item itemhover'}>5</div>
                </div>
            </div>
        )
    }
    function Quest5() {
        return (
            <div className={'text'}>
                <h1>Предложения и ожидания</h1>
                <h3>Какие технологии или инструменты, на ваш взгляд, могли бы улучшить вашу работу?</h3>
                <h3>(Например, программное обеспечение для управления персоналом,</h3>
                <h3> системы для автоматизации найма, инструменты для улучшения внутренней коммуникации и т.д.)</h3>
                <textarea value={text4} onChange={(e) => setText4(e.target.value)} className={`area-term ${empty[4] && 'red-solid-border'}`} />
            </div>
        )
    }
    function Quest6() {
        return (
            <div className={'text'}>
                <h3>Какие функции или возможности вы хотели бы видеть в новой системе для вашего отдела?</h3>
                <textarea value={text5} onChange={(e) => setText5(e.target.value)} className={`area-term ${empty[5] && 'red-solid-border'}`} />
            </div>
        )
    }
    function Quest7() {
        return (
            <div className={'text'}>
                <h1>Взаимодействие с другими отделами</h1>
                <h3>С какими отделами у вас наиболее частая координация и какие сложности возникают в процессе взаимодействия?</h3>
                <textarea value={text6} onChange={(e) => setText6(e.target.value)} className={`area-term ${empty[6] && 'red-solid-border'}`} />
            </div>
        )
    }
    function Quest8() {
        return (
            <div className={'text'}>
                <h3>Какие меры можно предпринять для улучшения координации с другими отделами?</h3>
                <textarea value={text7} onChange={(e) => setText7(e.target.value)} className={`area-term ${empty[7] && 'red-solid-border'}`} />
            </div>
        )
    }
    function Quest9() {
        return (
            <div className={'text'}>
                <h1>Ваше мнение и пожелания</h1>
                <h3>Есть ли у вас конкретные предложения по улучшению рабочих процессов в вашем отделе с помощью инноваций и технологий?</h3>
                <textarea value={text8} onChange={(e) => setText8(e.target.value)} className={`area-term ${empty[8] && 'red-solid-border'}`} />
            </div>
        )
    }
    function NotFoundPage() {
        return (
            <div className={'text'}>
                <h3>Ошибка загрузки вопроса, обновите страницу.</h3>
            </div>
        )
    }
    function Cheked(){
        return (
            <div className={'text'}>
                <h3>Спасибо Вам, за ответы!</h3>
                <Link to={`/`}>На главную</Link>
            </div>
        )
    }
    const pageComponents = {
        0: <StartQuest />,
        1: Quest1(),
        2: Quest2(),
        3: Quest3(),
        4: Quest4(),
        5: Quest5(),
        6: Quest6(),
        7: Quest7(),
        8: Quest8(),
        9: Quest9()
    }
    return (
        <>
            <div className='bye_container'>
                {!checkAnswer ?
                <>
                    {pageComponents[numPage] || <NotFoundPage />}
                    <div className={`buttons`}>
                        {actStart ? <div onClick={nextPageHandler} className={`button`}>Начать опрос</div> : null}
                        {actPrev ? <div onClick={prevPageHandler} className={`button`}>Назад</div> : null}
                        {actNext ? <div onClick={nextPageHandler} className={`button`}>Далее</div> : null}
                        {actSend ? <div onClick={sendHandler} className={`button`}>Отправить ответы</div> : null}
                    </div>
                </>
                    : <Cheked /> }
                <div className={`back`}></div>
                {loading ? (<LoadingSpinner/>) : null}
            </div>

        </>
    )
}
export default observer(HrmPage)