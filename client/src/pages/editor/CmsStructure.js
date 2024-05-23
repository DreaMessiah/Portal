import React, {useContext, useEffect, useRef, useState} from "react"
import {observer} from "mobx-react-lite"
import "../econom/ogm.scss"
import {Context} from "../../index"
import UserService from "../../services/UserService"
import LoadingSpinner from "../../components/loading/LoadingSpinner"
import './editor.scss'
import {useMessage} from "../../hooks/message.hook";
import ModalFiles from "../../components/modalwin/ModalFiles";
import CheckBox from "../../components/inputs/CheckBox";
import MultiSelect from "../../components/inputs/MultiSelect";
import CmsSelect from "../../components/inputs/CmsSelect";

function CmsStructure(){
    const [loading,setLoading] = useState(false)
    const message = useMessage()

    const parentRef = useRef(null);
    const runRef = useRef(null);

    const [contacts,setContacts] = useState('')
    const [name,setName] = useState('')

    const [onT13,setOnT13] = useState(true)
    const [onType,setOnType] = useState(true)
    const [onContacts,setOnContacts] = useState(false)
    const [onChange,setOnChange] = useState(false)

    const [id,setId] = useState(0)
    const [worker,setWorker] = useState(0)
    const [toNext,setToNext] = useState(0)

    const [selectedBranch,setSelectedBranch] = useState(-1)

    const [t13,setT13] = useState([])
    const [branchs,setBranchs] = useState([])
    const [t13branchs,setT13branchs] = useState([])
    const [structlist,setStructlist] = useState([])
    const [group,setGroup] = useState([])
    const [brs1c,setBrs1c] = useState([])
    const [empty,setEmpty] = useState([])
    const [t13Peoples,setT13Peoples] = useState([])
    const [blackGroup,setBlackGroup] = useState([])

    const [addActive,setAddActive] = useState(false)
    const [blackActive,setBlackActive] = useState(false)
    const [activeContacts,setActiveContacts] = useState(false)
    const [activeDelete,setActiveDelete] = useState(false)

    const {store} = useContext(Context)

    const addButtonHandler = () => {
        setAddActive(true)
    }
    const blackButtonHandler = () => {
        setBlackActive(true)
    }

    const cancelHandler = () => {
        setId(0)
        setAddActive(false)
        setBlackActive(false)
        setName('')
        setGroup([])
        setToNext(0)
        setOnT13(true)
        setOnType(true)
        setOnChange(false)
        setContacts('')
        setActiveContacts(false)
        setActiveDelete(false)
    }
    const loadingHandler = async () => {
        try {
            setLoading(true)
            const {data} = await UserService.getStructure()
            if(data) {
                setStructlist(data)
                setBranchs(buildTree(data))
            }
            const response = await UserService.getWorkers()
            if(response.data){
                setT13(response.data)
            }
            const branchs1c = await UserService.getBranchs()
            if(branchs1c.data) {
                const newBranchs = branchs1c.data.map(item => { return {...item,value:item.branch,label:item.branch} })
                setT13branchs(newBranchs)
            }
            const blacklist = await UserService.getBlack()
            if(blacklist.data) {
                setBlackGroup(blacklist.data)
            }
        }catch (e) {
            console.log(e)
        }finally {
            setLoading(false)
        }
    }
    const checkEmpty = () => {
        const n = [...empty]

        n[0] = !!!name.trim().length
        n[3] = !!!toNext

        if(onChange) n[3] = false

        if(!onT13) n[1] = !!!group.length

        const hasTrueValue = n.some(value => value === true);
        if( hasTrueValue ) setEmpty(n)
        else setEmpty([])
        return hasTrueValue
    }
    function buildTree(data, parentId = 5,node=[]) {
        const start = data.find(item => item.id === parentId)
        if(start) {
            node.push(start)
            if(start.next){
                start.next.map(item => buildTree(data,item,node))
            }
        }
        return node
    }
    const selectBranchHandler = async(index,type) => {
        try{
            if (selectedBranch === index) setSelectedBranch(-1)
            else {
                if(type === 1){
                    setLoading(true)
                    const {data} = await UserService.fetchWorkersBranch(branchs[index].id)
                    if(data) setT13Peoples(data)
                }
                setSelectedBranch(index)
            }
        }
        catch (e) {
            console.log(e)
        }finally {
            setLoading(false)
        }
    }
    const changeHandler = (index) => {
        setName(branchs[index].name)
        setOnT13(branchs[index].ont13)
        setOnType(!!branchs[index].type)
        setAddActive(true)
        if(!!branchs[index].type) setBrs1c(branchs[index].factbranchs.map(item => {return {...item,value:item,label:item}}))
        else setGroup(branchs[index].structusers.map(item => {return {...item,value:item.user_tn,label:item.name}}))
        setId(branchs[index].id)
        setOnChange(true)
    }
    const contactsHandler = (a,b) => {
        setContacts(branchs[a].structusers[b].contacts)
        setWorker(branchs[a].structusers[b].id)
        setOnContacts(branchs[a].structusers[b].onphonebook)
        setActiveContacts(true)
    }
    const changeContactHandler = async() => {
        try {
            setLoading(true)
            const {data} = await UserService.changeContact(worker,onContacts,contacts)
            cancelHandler()
            loadingHandler()
        }catch (e) {
            console.log(e)
        }finally {
            setLoading(false)
        }
    }
    const changeBlackHandler = async() => {
        try {
            setLoading(true)
            const {data} = await UserService.changeBlack(blackGroup)
            if(data){
                cancelHandler()
                loadingHandler()
                message('Список обновлён.')
            }

        }catch (e) {
            console.log(e)
        }finally {
            setLoading(false)
        }
    }
    const saveHandler = async () => {
        try {
            setLoading(true)
            if(!checkEmpty()){
                const t13brs = brs1c.map(item => {return item.label})
                const newStructure = {id,name,onT13,group,toNext,onType,t13brs}
                const {data} = await UserService.createStructure(newStructure)
                if(data){
                    cancelHandler()
                    loadingHandler()
                }
            }else{
                message('Введенные данные не корректны')
            }
        }catch (e) {
            console.log(e)
        }finally {
            setLoading(false)
        }
    }
    const deleteHandler = (index) => {
        setActiveDelete(true)
        setSelectedBranch(index)
    }
    const deleteBranchHandler = async () => {
        try {
            if(branchs[selectedBranch].next.length){
                message('Удаление данной ветви невозможно. Присутсвуют подчиненные обьекты')
            }else {
                setLoading(true)
                const {data} = await UserService.deleteBranch(branchs[selectedBranch].id)
                if(data){
                    const newBranchs = [...branchs]
                    newBranchs.splice(selectedBranch, 1);
                    setBranchs(newBranchs)
                    cancelHandler()
                    message('Удаление успешно')
                }else{
                    message('Ошибка удаления')
                    cancelHandler()
                }
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
    useEffect(() => {
        if(!addActive) cancelHandler()
    },[addActive])

    const getRandomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const handleMouseMove = () => {
        const parent = parentRef.current;
        const run = runRef.current;
        if (parent && run && parent.contains(run)) {
            const parentRect = parent.getBoundingClientRect()
            const runRect = run.getBoundingClientRect()
            const newLeft = getRandomInt(0, parentRect.width - runRect.width)
            const newTop = getRandomInt(0, parentRect.height - runRect.height)
            run.style.left = `${newLeft}px`
            run.style.top = `${newTop}px`
        }
    }

    function AddBranch(){
        return (
            <div className={`create-branch`}>
                <div className={`create-branch-form`}>
                    <input value={name} onChange={ (e) => setName(e.target.value)} type={`text`} placeholder={'Введите название ветви'} className={`${empty[0] && 'red-dotted-border'}`}/>
                    {!onChange ?
                    <div className={`checkboxes`}>
                        <CheckBox onChange={setOnType} label={'Закрытый тип подразделения?'} checked={onType} />
                        <CheckBox onChange={setOnT13} label={'Содержание подразделения из таблицы Т13?'} checked={onT13} />
                    </div>
                    :null}
                    {!onT13 ?
                        <div className={`multi100`}>
                            <MultiSelect radius={'0'} empty={empty[1]} setOptions={setGroup} options={t13} values={group} />
                        </div>
                    :
                        <div className={`multi100`}>
                            <MultiSelect radius={'0'} placeholder={'Выберете отделы из 1с для соотношения'} setOptions={setBrs1c} options={t13branchs} values={brs1c} />
                        </div>
                    }
                    {!onChange ?
                    <div className={`multi100`}>
                        <CmsSelect radius={'0'} options={structlist} placeholder={'Выберете доминанта'} onChange={setToNext} empty={empty[3]} />
                    </div> : null}
                    <div className={`buttons`}>
                        <div onClick={() => saveHandler()} className={`button`}>Сохранить</div>
                        <div onClick={() => cancelHandler()} className={`button`}>Отменить</div>
                    </div>
                </div>
            </div>
        )
    }
    function ChangeContacts(){
        return (
            <div className={`create-branch`}>
                <div className={`create-branch-form contacts`}>
                    <div className={`checkboxes`}>
                        <CheckBox onChange={setOnContacts} label={'Выводить контакт из адресной книги?'} checked={onContacts} />
                    </div>
                    {!onContacts ?
                        <>
                            <h3>Введите контактные данные</h3>
                            <textarea onChange={(e) => setContacts(e.target.value)} value={contacts} className={`contacts-area`}  />
                        </>
                    :null}

                    <div className={`buttons`}>
                        <div onClick={() => changeContactHandler()} className={`button`}>Сохранить</div>
                        <div onClick={() => cancelHandler()} className={`button`}>Отменить</div>
                    </div>
                </div>
            </div>
        )
    }
    function ChangeBlack(){
        return (
            <div className={`create-branch`}>
                <div className={`create-branch-form contacts`}>
                    <div className={`multi100`}>
                        <h3 style={{marginBottom:'10px'}}>Выберите людей, чтобы запретить их отображение</h3>
                        <MultiSelect radius={'0px'} heigth={'auto'} options={t13} values={blackGroup} setOptions={setBlackGroup} />
                    </div>
                    <div className={`buttons`}>
                        <div onClick={() => changeBlackHandler()} className={`button`}>Сохранить</div>
                        <div onClick={() => cancelHandler()} className={`button`}>Отменить</div>
                    </div>
                </div>
            </div>
        )
    }
    function DeleteBranch(){
        return (
            <div className={`create-branch`}>
                <div className={`create-branch-form contacts`}>
                    <h3>Действительно хотели бы удалить ветвь { (selectedBranch >=0 && branchs[selectedBranch].name) ? branchs[selectedBranch].name : null}?</h3>
                    <div className={`buttons`}>
                        <div onClick={() => deleteBranchHandler()} className={`button`}>Удалить</div>
                        <div onClick={() => cancelHandler()} className={`button`}>Отменить</div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className='workers'>
            <div className={`title`}>
                <h3 onClick={() => console.log(branchs)}>Редактирование структуры компании</h3>
                <div className={`buttons-cms`}>
                    <div className={`button`} onClick={addButtonHandler}>Добавить структурное подразделение</div>
                    <div className={`button`} onClick={blackButtonHandler}>Редактировать BlackList</div>
                    <div className={`struct-panel`}>
                        {branchs.length ? branchs.map((item,index) => (
                            <div style={{marginLeft:`${ (item.level - 1)*30}px`}} key={index} className={`branch`}>
                                <div className={`name`}>
                                    <div onClick={(e) => selectBranchHandler(index,item.type)} className={`text`}>{item.name}</div>
                                    {item.id !== 5 ? <div className={`control`}><i onClick={(e) => changeHandler(index)} className="fa-solid fa-gear"></i><i onClick={() => deleteHandler(index)} className="fa-solid fa-xmark"></i></div> : <div ref={parentRef} className={`general`}> <i ref={runRef} onMouseEnter={handleMouseMove} onMouseMove={handleMouseMove} className="fa-solid fa-xmark"></i> </div>}
                                </div>
                                {selectedBranch === index ?
                                    <div className={`names-in-branch`}>
                                        { (item.structusers && item.type===0) ?
                                            <>
                                                {item.structusers.map( (row,i) => (
                                                    <div className={`worker`} key={i}><div>{row.name}</div> <i onClick={(e) => contactsHandler(index,i)} className="fa-regular fa-pen-to-square"></i></div>
                                            ))}
                                            </>
                                            :
                                            <>
                                                { item.type===1 ?
                                                    <>
                                                        {t13Peoples.length ? t13Peoples.map( (item,index) => (
                                                            <div className={`worker`} key={index}> {item.name} </div>
                                                        )) : null}
                                                    </>
                                                : null}
                                            </>
                                        }
                                    </div>
                                    : null}
                            </div>
                        )):null}
                    </div>
                </div>
            </div>
            {loading ? (<LoadingSpinner/>) : null}

            <ModalFiles data={ChangeBlack()} active={blackActive} setActive={setBlackActive} heigth={'auto'}/>
            <ModalFiles data={DeleteBranch()} active={activeDelete} setActive={setActiveDelete} heigth={'auto'}/>
            <ModalFiles data={AddBranch()} active={addActive} setActive={setAddActive} heigth={'auto'}/>
            <ModalFiles data={ChangeContacts()} active={activeContacts} setActive={setActiveContacts} heigth={'auto'}/>
        </div>
    )
}

export default observer(CmsStructure)