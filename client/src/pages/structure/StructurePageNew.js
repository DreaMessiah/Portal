import React, {useContext, useEffect, useRef, useState} from "react";
import {DataContext} from "../../context/DataContext";
import './structure.scss'
import {ReactToPrint} from "react-to-print";
import LoadingSpinner from "../../components/loading/LoadingSpinner";
import UserService from "../../services/UserService";
import PhonesService from "../../services/PhonesService";
import ModalFiles from "../../components/modalwin/ModalFiles";
import {useMessage} from "../../hooks/message.hook";
import MessagesService from "../../services/MessagesService";
import {getSocket} from "../../http/socket";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

function StructurePageNew(){
    const [branchs,setBranchs] = useState([])
    const [peoples,setPeoples] = useState([])
    const [users,setUsers] = useState([])
    const [win, setWin] = useState(false)
    const [online, setOnline] = useState(null)
    const [loading,setLoading] = useState(false)
    const [empty,setEmpty] = useState([])
    const [selected,setSelected] = useState(-1)
    const [activeSend,setActiveSend]= useState(false)
    const [activeContacts,setActiveContacts] = useState(false)
    const [activeList,setActiveList] = useState(false)

    const [contacts,setContacts] = useState([])

    const [selectedUser,setSelectedUser] = useState(null)
    const [messageText,setMessageText] = useState('')
    const message = useMessage()
    const {store} = useContext(Context)
    const loadingHandler = async () => {
        try {
            setLoading(true)
            const {data} = await UserService.getStructure()

            const res_login = await UserService.getStatUsers()
            const res_users = await UserService.getWorkers()
            const res_contacts = await PhonesService.fetchPhones()

            const logindata = res_login.data.users
            const usersdata = res_users.data
            const contactsdata = res_contacts.data
            const tree = buildTree(data)

            const addDataToTree = (node, usersdata, contactsdata, logindata) => {
                if (node.structusers) {
                    node.structusers = node.structusers.map(user => {
                        let contact = ''
                        const userData = usersdata.find(u => u.tn === user.user_tn)
                        const contactsData = contactsdata.find(u => u.name === user.name)
                        const loginData = logindata.find(u => u.tn === user.user_tn)
                        if(contactsData){
                            contact = contactsData.mobile_phone.length ? contact + 'Мобильный номер телефона : ' + contactsData.mobile_phone + '\n' : contact
                            contact = contactsData.city_phone.length ? contact + 'Городской номер телефона : ' + contactsData.city_phone + '\n' : contact
                            contact = contactsData.ats.length ? contact + 'Номер АТС : ' + contactsData.ats + '\n' : contact
                            contact = contactsData.email.length ? contact + 'E-Mail адрес : ' + contactsData.email + '\n' : contact
                        }
                        return {
                            ...user,
                            developer: userData ? userData.developer : null,
                            phonebook: contact.length ? contact : null,
                            avatar: loginData ? loginData.avatar : 'null',
                            registered: !!loginData
                        }
                    })
                }
            }
            tree.forEach(branch => addDataToTree(branch, usersdata, contactsdata,logindata))

            setContacts(contactsdata)
            setUsers(logindata)
            setBranchs(tree)
            console.log(tree)
        }catch (e) {
            console.log(e)
        }finally {
            setLoading(false)
        }
    }

    const setListHandler = async (id) => {
        try{
            setLoading(true)
            const {data} = await UserService.fetchWorkersBranch(id)
            if(data.length) {
                const node = data.map(people => {
                    const contactsData = contacts.find(u => u.name === people.name)
                    const loginData = users.find(u => u.tn === people.tn)
                    return {
                        ...people,
                        user_tn: people.tn,
                        ats: contactsData ? contactsData.ats : null,
                        avatar: loginData ? loginData.avatar : null,
                        user_id: loginData ? loginData.id : null,
                        registered: !!loginData
                    }
                })
                setPeoples(node)
                setSelected(id)

                setActiveList(true)
            }else{
                message('Записи отсутствуют')
            }
        }catch (e) {
            console.log(e)
        }finally {
            setLoading(false)
        }

    }

    const onContactHandler = (user) => {
        console.log(user)
        setSelectedUser(user)
        setMessageText('')
        setActiveContacts(true)
    }
    const onSendHandler = (user) => {
        setSelectedUser(user)
        setMessageText('')
        setActiveSend(true)
    }
    const checkEmpty = () => {
        const n = [...empty]

        n[0] = !!!messageText.trim().length

        const hasTrueValue = n.some(value => value === true);
        if( hasTrueValue ) setEmpty(n)
        else setEmpty([])
        return hasTrueValue
    }
    const cancelHandler = () => {
        setActiveList(false)
        setActiveContacts(false)
        setSelectedUser(null)
        setActiveSend(false)
        setMessageText('')
    }

    useEffect(() => {
        loadingHandler()
        const socket = getSocket()

        socket.emit('online', {data:'get online users'},(response) => {
            setOnline(response)
        })

    },[])

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

    const selectHandler = (id) => {
        if(selected === id) setSelected(-1)
        else setSelected(id)
    }
    const sendMessage = async () => {
        try{
            if(!checkEmpty()){
                if(selectedUser){
                    console.log(selectedUser)
                    setLoading(true)
                    const {data} = await MessagesService.sendMessage(selectedUser.user_tn,messageText)
                    if(data) {
                        const socket = getSocket()
                        const data = {from:store.user.tn,from_name:store.user.full_name,to:selectedUser.user_tn,message:messageText}
                        socket.emit('message', data)
                        message('Сообщение отправлено')
                        cancelHandler()
                    }
                }else{
                    message('Выберете пользователя')
                }
            }else {
                message('Введите сообщение')
            }
        }catch (e) {
            console.log(e)
        }finally {
            setLoading(false)
        }

    }
    const StartTree = ({start}) => {
        return (
            <>
                <div className="structure_new_forest_cuedo_card">
                    <div className="structure_new_forest_cuedo_card_top"></div>
                    <div className="structure_new_forest_cuedo_card_center">
                        {start.structusers ? start.structusers.map((item, index) => (
                            <div key={index} className="structure_new_forest_cuedo_card_center_content"
                                 style={(selected === start.id) ? {display: 'flex'} : {display: 'none'}}>
                                <div className="structure_new_forest_cuedo_card_center_content_person">
                                    <div className="structure_new_forest_cuedo_card_center_content_person_photo" style={{backgroundImage: `url(/files/profile/${item.avatar ? item.avatar : 'face.png'})`}}>{online.includes(item.tn) ? <i className="online2 fa-solid fa-circle"></i> : null}</div>
                                    <div onClick={() => onContactHandler(item)} className="structure_new_forest_cuedo_card_center_content_person_contact">Связаться</div>
                                    <div className="structure_new_forest_cuedo_card_center_content_person_disc">
                                        <div className="structure_new_forest_cuedo_card_center_content_person_disc_name">{item.name}</div>
                                        <div className="structure_new_forest_cuedo_card_center_content_person_disc_dev">{item.developer}</div>
                                    </div>
                                </div>
                            </div>
                        )) : null}
                        <div className="structure_new_forest_cuedo_card_center_button" onClick={() => selectHandler(start.id)}>
                            <div className="structure_new_forest_cuedo_card_center_button_slash"></div>
                            <div className="structure_new_forest_cuedo_card_center_button_slash"></div>
                            <div className="structure_new_forest_cuedo_card_center_button_slash"></div>
                        </div>
                    </div>
                    <div className="structure_new_forest_cuedo_card_bottom">{start.name}</div>
                </div>
                {start.next ? start.next.map((item,index) => {
                    return (
                    <span key={index}>
                        <Tree branch={branchs.find(u => u.id === item)} long={!!( (index+1)%2 )} />
                    </span>
                    )
                }):null}
            </>

        )
    }

    const Tree = ({branch,long=false}) => {
        const failLevel = branch.next.length ? !branchs.find(u => u.id === branch.next[0]).type : true
        const cardLevel = {
            2: 'structure_new_forest_cuedo_card',
            3: branch.next.length ? 'structure_new_forest_cuedo_card_two' : 'structure_new_forest_cuedo_card_tree',
            4: 'structure_new_forest_cuedo_card_tree',
            5: 'structure_new_forest_cuedo_card_tree',
        }
        const branchLevel = {
            2: failLevel ? 'two_cueda' : 'five_cueda',
            3: failLevel ? 'tree_cueda' : 'four_cueda',
            4: 'four_cueda',
            5: 'four_cueda',
        }
        return (
            <div>
                <div className={`${cardLevel[branch.level]} ${long && 'honest'}`}>
                    {!branch.type ?
                        <>
                            <div className="slash_rang"></div>
                            <div className="structure_new_forest_cuedo_card_top"></div>
                            <div className="structure_new_forest_cuedo_card_center">
                                <div className="structure_new_forest_cuedo_card_center_content" style={(selected===branch.id)?{display:'flex'}:{display:'none'}}>
                                    { (branch.structusers && !branch.type) ? branch.structusers.map( (item,index) => (
                                        <div key={index} className="structure_new_forest_cuedo_card_center_content_person">
                                            <div className="structure_new_forest_cuedo_card_center_content_person_photo" style={{backgroundImage: `url(/files/profile/${item.avatar ? item.avatar : 'face.png'})`}}>{online.includes(item.tn) ? <i className="online2 fa-solid fa-circle"></i> : null}</div>
                                            <div className="structure_new_forest_cuedo_card_center_content_person_contact" onClick={() => onContactHandler(item)}>Связаться</div>
                                            <div className="structure_new_forest_cuedo_card_center_content_person_disc">
                                                <div className="structure_new_forest_cuedo_card_center_content_person_disc_name">{item.name}</div>
                                                <div className="structure_new_forest_cuedo_card_center_content_person_disc_dev">{item.developer}</div>
                                            </div>
                                        </div>
                                    )):null}
                                </div>
                                <div className="structure_new_forest_cuedo_card_center_button" onClick={() => selectHandler(branch.id)}>
                                    <div className="structure_new_forest_cuedo_card_center_button_slash"></div>
                                    <div className="structure_new_forest_cuedo_card_center_button_slash"></div>
                                    <div className="structure_new_forest_cuedo_card_center_button_slash"></div>
                                </div>
                            </div>
                            <div className="structure_new_forest_cuedo_card_bottom">{branch.name}</div>
                        </> :
                        <span onClick={() => setListHandler(branch.id)}>
                            <div className="slash_rang"></div>
                            <div className="structure_new_forest_cuedo_card_top"></div>
                            <div className="structure_new_forest_cuedo_card_bottom">{branch.name}</div>
                        </span>}
                </div>

                {branch.next.length ?
                <div className={branchLevel[branch.level]}>
                    { branch.next.map( (item,index) => (
                        <span key={index}>
                            <Tree branch={branchs.find(u => u.id === item)} long={!!( (index)%2 )}/>
                        </span>
                    )) }
                </div>
                    : null}
            </div>
        )
    }

    const List = () => {
        return (
            <span>
                { (branchs.length && ( selected>=0 )) ?
                    <div className='glass'>
                        <div className="glass_board">
                            <div className="glass_board_close"><i className="fa-solid fa-xmark" onClick={()=>cancelHandler()}/></div>
                            <div className="glass_board_body">
                                <div className="glass_title">{branchs.find(u => u.id === selected).name}</div>
                                <div className="glass_list_persons">
                                {peoples.length ? peoples.map( (item,index) => (
                                    <div key={index}  className="glass_list_persons_man">
                                        <div className="glass_list_persons_man_photo" onClick={() => console.log(item)} style={{backgroundImage: `url(/files/profile/${item.avatar ? item.avatar : 'face.png'})`}}>{online.includes(item.tn) ?<i className="online1 fa-solid fa-circle"></i> : null}</div>
                                        <div className="glass_list_persons_man_name">{item.name}</div>
                                        <div className="glass_list_persons_man_dev">{item.developer}</div>
                                        <div className="glass_list_persons_man_branch">{item.branch}</div>
                                        <div className="glass_list_persons_man_phone">{item.ats ? `АТС - ${item.ats}` : null}</div>
                                        {item.registered ? <div onClick={() => onSendHandler(item)} className="glass_list_persons_man_btn">Написать</div> : <div>Не зарегестрирован</div> }
                                    </div>
                                    )) : null }

                                </div>
                            </div>
                        </div>
                    </div>
                : null}
            </span>
        )
    }
    const Contact = () => {
        return (
            <div className={'contact'}>
                {selectedUser ?
                    <>
                        <div onClick={() => console.log(selectedUser)} className={`title`}>Контактная информация</div>
                        <textarea disabled value={selectedUser.onphonebook ? (selectedUser.phonebook || 'Контактные данные отсутствуют') : (selectedUser.contacts || 'Контактные данные отсутствуют')} className={`contact-text`} />
                        <div className={`title`}>Отправить сообщение</div>
                        <div className={`message`}>
                            <textarea value={messageText} onChange={(e) => setMessageText(e.target.value)} className={`send-text ${empty[0] && 'red-solid-border'}`} />
                        </div>
                        <div className={`buttons`}>
                            <div onClick={() => sendMessage()} className={`button`}> Написать </div>
                        </div>
                    </>
                    : null}
            </div>
        )
    }
    const Send = () => {
        return (
            <div className={'contact'}>
                {selectedUser ?
                    <>
                        <div className={`title`}>Отправить сообщение</div>
                        <div className={`message`}>
                            <textarea value={messageText} onChange={(e) => setMessageText(e.target.value)} className={`send-text ${empty[0] && 'red-solid-border'}`} />
                        </div>
                        <div className={`buttons`}>
                            <div onClick={() => sendMessage()} className={`button`}> Написать </div>
                        </div>
                    </>
                    : null}
            </div>
        )
    }
    return (
        <div className='structure_new'>
            <div className={`title`}>Организационная структура ООО "Сургутское РСУ"</div>
            <div className="structure_new_forest">
                <div className="structure_new_forest_cuedo">
                    {branchs.length ?
                        <div className="structure_new_forest_cuedo_general">
                            <StartTree start={branchs[0]}/>
                        </div>
                        :null}
                    <div className="structure_new_forest_cuedo_dother"></div>
                </div>
            </div>
            <ModalFiles heigth={'auto'} data={Contact()} active={activeContacts} setActive={setActiveContacts} />
            <ModalFiles data={List()} active={activeList} setActive={setActiveList} />
            <ModalFiles heigth={'auto'} data={Send()} active={activeSend} setActive={setActiveSend} />

            {loading ? (<LoadingSpinner/>) : null}
        </div>
    )
}
export default observer(StructurePageNew)