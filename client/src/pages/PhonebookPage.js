import React, {useState, useEffect, useContext, useRef} from 'react';
import NewsNavbar from "../components/NewsNavbar"
import {Link,useLocation} from "react-router-dom";
import NewsFooter from "../components/NewsFooter";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {useMessage} from "../hooks/message.hook";
import PhonesService from "../services/PhonesService";

function PhonebookPage(){
    const {store} = useContext(Context)
    const message = useMessage()
    const [change,setChange] = useState(false)
    const [onCreateContact,setOnCreateContact] = useState(false)
    const [onCreateTitle,setOnCreateTitle] = useState(false)

    const [position,setPosition] = useState('')
    const [name,setName] = useState('')
    const [phone,setPhone] = useState('')
    const [mobile,setMobile] = useState('')
    const [ats,setAts] = useState('')
    const [email,setEmail] = useState('')
    const [order,setOrder] = useState()
    const [on,setOn] = useState()

    const [contacts,setContacts] = useState([])

    const rule = 3

    useEffect( () => {
        autoResize()

        const pr = loadingHandler()
    },[])

    const loadingHandler = async () => {
        const response = await PhonesService.fetchPhones()
        if(response.data.length){
            setContacts(response.data)
        }
    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') { setPhone(phone + '\\n');}
    };
    function autoResize() {
        const textarea = document.querySelectorAll('.text');
        textarea.forEach(sel => {
            sel.style.height = sel.scrollHeight + 'px';
        })
    }
    const createContactHandler = async() => {
        message('123123')

        setOnCreateContact(!onCreateContact)
        if(onCreateContact){
            const response = await PhonesService.add(name,mobile,phone,ats,email,position,'dop',1,false)
            console.log(response.data)
            setContacts([...contacts,response.data.phones])
            setName('')
            setPosition('')
            setPhone('')
            setMobile('')
            setAts('')
            setEmail('')
        }
    }
    const createTitleHandler = async () => {
        setOnCreateTitle(!onCreateTitle)
        //const response = await PhonesService.add()
    }
    return (
        <div>
            <div className='newspage'>
                <NewsNavbar/>
                    <div className='phonebook'>
                        <div className='buttons-box'>
                            <div className='left box'>
                                <Link className='button' to='/'><i className="fa-solid fa-caret-left"></i>Вернуться</Link>
                                {change ? <div onClick={() => createTitleHandler()} className='button'>{onCreateTitle ? <p><i className="fa-solid fa-save"/>Сохранить заголовок</p> : <p><i className="fa-solid fa-plus"/>Добавить заголовок</p>}</div> : ''}
                                {change ? <div onClick={() => createContactHandler()} className='button'>{onCreateContact ? <p><i className="fa-solid fa-save"/>Сохранить контакт</p> : <p><i className="fa-solid fa-plus"/>Добавить контакт</p>}</div> : ''}
                            </div>
                            <div className='right box'>
                                {change ? <div onClick={(e) => setChange(!change)} className='button'><i className="fa-solid fa-cancel"></i>Отменить</div> : ''}
                                {rule === 3 ? <div onClick={(e) => setChange(!change)} className='button'><i className="fa-solid fa-gears"></i>{change ? 'Сохранить' : 'Редактировать' }</div> : ''}
                            </div>
                        </div>
                        <div className='phonebook-box'>
                            <div>
                                <div className="table-container">
                                    <div className="table-row header">
                                        <div className="table-cell">Должность</div>
                                        <div className="table-cell">ФИО</div>
                                        <div className="table-cell">Городской</div>
                                        <div className="table-cell">Сотовый</div>
                                        <div className="table-cell small">АТС</div>
                                        <div className="table-cell">Адрес электронной почты</div>
                                    </div>
                                    {contacts.map((row, rowIndex) => {
                                        if(!row.heading) return (
                                            <div key={rowIndex} className="table-row">
                                                <div><textarea value={row.position} onInput={(e) => autoResize(e)} className='text' disabled={change ? false : true}>{row.position}</textarea></div>
                                                <div><textarea value={row.name} onInput={() => autoResize()} className='text' disabled={change ? false : true}>{row.name}</textarea></div>
                                                <div><textarea value={row.city_phone} onInput={() => autoResize()} className='text' disabled={change ? false : true}>{row.city_phone}</textarea></div>
                                                <div><textarea value={row.mobile_phone} onInput={() => autoResize()} className='text' disabled={change ? false : true}>{row.mobile_phone}</textarea></div>
                                                <div className='small'><textarea value={row.ats} onInput={() => autoResize()} className='text' disabled={change ? false : true}>{row.ats}</textarea></div>
                                                <div><textarea value={row.email} onInput={() => autoResize()} className='text' disabled={change ? false : true}>{row.email}</textarea></div>
                                            </div>
                                        )
                                        else{
                                            return (
                                                <div key={rowIndex} className="table-row">
                                                    <input value={row.name} disabled={change ? false : true} type='text'/>
                                                </div>
                                            )
                                        }
                                    }
                                    )}
                                    { (onCreateContact && change) ?
                                        <div className="table-row">
                                            <div><textarea value={position} onChange={e => setPosition(e.target.value)} autoFocus={true} className='new'></textarea></div>
                                            <div><textarea value={name} onChange={e => setName(e.target.value)} className='new'></textarea></div>
                                            <div><textarea value={phone} onChange={e => setPhone(e.target.value)} onKeyDown={e => handleKeyDown(e)} className='new'></textarea></div>
                                            <div><textarea value={mobile} onChange={e => setMobile(e.target.value)} className='new'></textarea></div>
                                            <div><textarea value={ats} onChange={e => setAts(e.target.value)} className='new'></textarea></div>
                                            <div><textarea value={email} onChange={e => setEmail(e.target.value)} className='new'></textarea></div>
                                        </div>
                                        : ''
                                    }
                                    { (onCreateTitle && change) ?
                                        <div className="table-row">
                                            <div><input type='text' autoFocus={true} className='title new'></input></div>
                                        </div>
                                        : ''
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
            </div>
            <div className='backimg'>
                <div className='backcol'></div>
            </div>
        </div>
    )
}
export default observer(PhonebookPage)