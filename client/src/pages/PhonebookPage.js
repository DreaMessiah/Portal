import React, {useState, useEffect, useContext, useRef} from 'react';
import NewsNavbar from "../components/NewsNavbar"
import {Link,useLocation} from "react-router-dom";
import NewsFooter from "../components/NewsFooter";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {useMessage} from "../hooks/message.hook";
import PhonesService from "../services/PhonesService";
import {ModalWin} from "../components/modalwin/ModalWin";

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
    const [title,setTitle] = useState('')
    const [activeM,setActiveM] = useState(false)
    const [indexM,setIndexM] = useState()
    const [on,setOn] = useState()

    const [contacts,setContacts] = useState([])
    const [reserve,setReserve] = useState([])

    const rule = 3

    useEffect( () => {
        autoResize()
        loadingHandler()
    },[])

    const loadingHandler = async () => {
        try{
            const response = await PhonesService.fetchPhones()
            if(response.data.length){
                setContacts(response.data.map(item => ({ ...item })));
                setReserve(response.data.map(item => ({ ...item })));
                return response.data
            }
        }catch (e){
            message(e.message+': Проблема загрузки контактов')
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
        if(onCreateContact){
            if(position.length >= 3){
                if(name.length >= 3){
                    if(phone || mobile || ats || email){
                        const response = await PhonesService.add(name,mobile,phone,ats,email,position,'dop',contacts.length+1,false)
                        setContacts([...contacts,response.data.phones])
                        setReserve([...reserve,response.data.phones])
                        clearInputs()
                        message('Контакт добавлен')
                        setOnCreateContact(false)
                    }else{
                        message('Заполните контакные данные!')
                    }
                }else{
                    message('Заполните ФИО!')
                }
            }else{
                message('Заполните должность!')
            }
        }else{
            setOnCreateContact(true)
        }
    }
    const createTitleHandler = async () => {
        if(onCreateTitle){
            if(title.length >= 3){
                const response = await PhonesService.add(title,'','','','','','dop',contacts.length+1,true)
                const updatedContacts = [...contacts,response.data.phones];
                setContacts(updatedContacts.map(item => ({ ...item })))
                setReserve(updatedContacts.map(item => ({ ...item })))
                clearInputs()
                setOnCreateTitle(false)
                message('Заголовок добавлен')
            }else{
                message('Введите название заголовка')
            }
        }else{
            setOnCreateTitle(true)
        }
    }
    const cancelHandler = () => {
        clearInputs()
        setOnCreateContact(false)
        setOnCreateTitle(false)
    }
    const cancelAllHandler = () => {
        cancelHandler()
        setChange(!change)
        setContacts(reserve.map(item => ({ ...item })))
    }
    const clearInputs = () => {
        setName('')
        setPosition('')
        setPhone('')
        setMobile('')
        setAts('')
        setEmail('')
        setTitle('')
    }
    const changeContactHandler = (e,index,name) => {
        const updatedContacts = [...contacts];
        updatedContacts[index][name] = e.target.value
        setContacts(updatedContacts.map(item => ({ ...item })))
    }
    const saveChangesHandler = () => {
        if(change) {
            contacts.map(async (item, index) => {
                const response = await PhonesService.changePhones(item.id, item.name, item.mobile_phone, item.city_phone, item.ats, item.email, item.position, item.job, item.order)
                setChange(false)
            })
            if(title && onCreateTitle ) createTitleHandler()
            if(name && position && onCreateContact ) createContactHandler()
        }else {
            setChange(true)
        }
    }

    const arrowUpHandler = (index) => {
        const updatedContacts = [...contacts];
        const tempIndex = index-1

        const temp1 = updatedContacts[index].order - 1
        const temp2 = updatedContacts[tempIndex].order + 1

        updatedContacts[index].order = temp1
        updatedContacts[tempIndex].order = temp2

        let tempObject = updatedContacts[index];
        updatedContacts[index] = updatedContacts[tempIndex]
        updatedContacts[tempIndex] = tempObject

        setContacts(updatedContacts)
    }
    const arrowDownHandler = (index) => {
        const updatedContacts = [...contacts];

        const tempIndex = index+1

        const temp1 = updatedContacts[index].order + 1
        const temp2 = updatedContacts[tempIndex].order - 1

        console.log(temp1)
        console.log(temp2)

        let tempObject = updatedContacts[index];
        updatedContacts[index] = updatedContacts[tempIndex]
        updatedContacts[tempIndex] = tempObject

        setContacts(updatedContacts)
    }
    const deleteHandler = async (index) => {
        try{
            const response = await PhonesService.deletePhones(contacts[index].id)
            message(response.data.message)
            setActiveM(false)
            const updatedContacts = [...contacts]
            updatedContacts.splice(index, 1);
            setContacts(updatedContacts.map(item => ({ ...item })))
            setReserve(updatedContacts.map(item => ({ ...item })))
        }catch (e){
            message('Ошибка при удалении..')
        }
    }
    const modalHandler = (index) => {
        setActiveM(!activeM)
        setIndexM(index)
    }
    function Ctrl({index}){
        return (
            <div className='ctrl'>
                {index ? <i onClick={() => arrowUpHandler(index)} className='s1 fa-solid fa-arrow-up'></i> : ''}
                {index !== contacts.length-1 ? <i onClick={() => arrowDownHandler(index)} className='s2 fa-solid fa-arrow-down'></i> : ''}
                <i onClick={() => modalHandler(index)} className='s3 fa-solid fa-remove'></i>
            </div>
        )
    }
    function Inmodal({index}) {
        return(
            <div className='phone-modal'>
                <div className='text'>
                    <p>{`Вы уверены, что хотите удалить запись ${contacts[index] ? contacts[index].name : ''}?`}</p>
                </div>
                <div className='buttons'>
                    <div onClick={() => deleteHandler(index)} className='button da'>Да</div>
                    <div onClick={(e) => setActiveM(false)} className='button'>Нет</div>
                </div>
            </div>
        )
    }
    return (
        <div>
            <div className='newspage'>
                <NewsNavbar/>
                    <div className='phonebook'>
                        <div className='buttons-box'>
                            <div className='left box'>
                                <Link className='button' to='/'><i className="fa-solid fa-caret-left"></i>Вернуться</Link>
                                {change && !onCreateContact ? <div onClick={() => createTitleHandler()} className='button'>{onCreateTitle ? <p><i className="fa-solid fa-save"/>Сохранить заголовок</p> : <p><i className="fa-solid fa-plus"/>Добавить заголовок</p>}</div> : ''}
                                {change && !onCreateTitle ? <div onClick={() => createContactHandler()} className='button'>{onCreateContact ? <p><i className="fa-solid fa-save"/>Сохранить контакт</p> : <p><i className="fa-solid fa-plus"/>Добавить контакт</p>}</div> : ''}
                                {change && (onCreateContact || onCreateTitle) ? <div onClick={() => cancelHandler()} className='button'><p><i className="fa-solid fa-cancel"/>Отменить изменения</p></div> : ''}
                            </div>
                            <div className='right box'>
                                {change ? <div onClick={() => cancelAllHandler()} className='button'><i className="fa-solid fa-cancel"></i>Отменить</div> : ''}
                                {rule === 3 ? <div onClick={() => saveChangesHandler()} className='button'><i className="fa-solid fa-gears"></i>{change ? 'Сохранить' : 'Редактировать' }</div> : ''}
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
                                                <div><textarea value={row.position} onChange={(e) => changeContactHandler(e,rowIndex,'position')} onInput={(e) => autoResize(e)} className='text' disabled={change ? false : true}>{row.position}</textarea></div>
                                                <div><textarea value={row.name} onChange={(e) => changeContactHandler(e,rowIndex,'name')} onInput={() => autoResize()} className='text' disabled={change ? false : true}>{row.name}</textarea></div>
                                                <div><textarea value={row.city_phone} onChange={(e) => changeContactHandler(e,rowIndex,'city_phone')} onInput={() => autoResize()} className='text' disabled={change ? false : true}>{row.city_phone}</textarea></div>
                                                <div><textarea value={row.mobile_phone} onChange={(e) => changeContactHandler(e,rowIndex,'mobile_phone')} onInput={() => autoResize()} className='text' disabled={change ? false : true}>{row.mobile_phone}</textarea></div>
                                                <div className='small'><textarea value={row.ats} onChange={(e) => changeContactHandler(e,rowIndex,'ats')} onInput={() => autoResize()} className='text' disabled={change ? false : true}>{row.ats}</textarea></div>
                                                <div><textarea value={row.email} onChange={(e) => changeContactHandler(e,rowIndex,'email')} onInput={() => autoResize()} className='text' disabled={change ? false : true}>{row.email}</textarea></div>
                                                {change ? <Ctrl index={rowIndex} /> : ''}
                                            </div>
                                        )
                                        else{
                                            return (
                                                <div key={rowIndex} className="table-row title">
                                                    <input value={row.name} onChange={e => changeContactHandler(e,rowIndex,'name')} disabled={change ? false : true} type='text'/>
                                                    {change ? <Ctrl index={rowIndex} /> : ''}
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
                                            <div><input type='text' value={title} onChange={e => setTitle(e.target.value)} autoFocus={true} className='title new'></input></div>
                                        </div>
                                        : ''
                                    }

                                </div>
                            </div>
                        </div>
                        <ModalWin data={<Inmodal index={indexM}/>} active={activeM} setActive={setActiveM}/>
                    </div>
                <NewsFooter />
            </div>
            <div className='backimg'>
                <div className='backcol'></div>
            </div>

        </div>
    )
}
export default observer(PhonebookPage)