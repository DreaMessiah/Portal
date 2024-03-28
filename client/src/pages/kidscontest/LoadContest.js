import React, {useEffect, useRef, useState} from "react";

import {Link, useLocation, useNavigate} from "react-router-dom";
import FilesService from "../../services/FilesService";
import {useMessage} from "../../hooks/message.hook";
import PhoneInput from "../../components/inputs/PhoneInput";
import PollsService from "../../services/PollsService";
import MailInput from "../../components/inputs/MailInput";


export default function LoadContest(){
    // const location = useLocation();
    // const searchParams = new URLSearchParams(location.search)
    // const getSurvey = searchParams.get('survey') ? searchParams.get('survey') : 0
    const message = useMessage()
    const navigate = useNavigate()
    const [works,setWorks] = useState([{name:'',age:'',image:'',ref:useRef()}])
    const [empty,setEmpty] = useState([])
    const [phone, setPhone] = useState('')
    const [mail, setMail] = useState('')
    const [check, setCheck] = useState(false)
    const loadingHandler = async () => {
        try{
            const check = await PollsService.checkExitsContests()
            setCheck(!check.data)
        }catch (e) {
            console.log(e?.message,'Ошибка инициализации')
        }
    }
    const namesHandler = (event,index) => {
        let newWorks = [...works]
        newWorks[index].name = event.target.value
        setWorks(newWorks)
        if(empty.length)checkEmpty()
    }
    const ageHandler = (event,index) => {
        let newWorks = [...works]
        newWorks[index].age = event.target.value
        setWorks(newWorks)
        if(empty.length)checkEmpty()
    }
    const checkEmpty = () => {
        const n = [...empty]
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        n[0] = phone.trim().length !== 16
            n[500] = !emailRegex.test(mail);

        if(works.length){
            works.map((item,index) => {
                const indexB = index + 1
                n[indexB] = !!!item.name.trim().length
                n[indexB*10] = isValidAge(item.age)
                n[indexB*100] = !!!item.image.trim().length
            })
        }
        const hasTrueValue = n.some(value => value === true);
        if( hasTrueValue ) setEmpty(n)
        else setEmpty([])
        return hasTrueValue
    }
    const isValidAge = (input) => {
        if (input.length !== 0) {
            const number = parseInt(input, 10)
            if( number >= 1 && number <= 14){
                return false
            }else{
                message('Возраст участника должен быть от 1 до 14 лет')
                return true
            }
        }else{
            return true
        }
    }
    const loadImage = async (index,e) => {
        try {
            const response = await FilesService.loadPollsImage(e.target.files[0])
            if(response.err) message('Файл не является изображением')
            if(response.data){
                console.log(response.data)
                const newImage = [...works]
                works[index].image = response.data.path
                setWorks(newImage)
                if(empty.length)checkEmpty()
            }else {
                message('Ошибка загрузки изображения')
            }
        }catch (e){
            message(e)
        }
    }
    const addWorkHandler = () => {
        if(works.length<4){
            const newWork = {name:'',age:'',image:'',ref:{ current: null }}
            setWorks([...works,newWork])
        }else{
            message('Количество работ не может быть больше 4')
        }

    }
    const deleteWorkHandler = () => {
        if(works.length>1){
            let newWork = [...works]
            newWork.pop()
            setWorks(newWork)
        }else{
            message('Количество работ не может быть меньше 1')
        }

    }
    const createHandler = async () => {
        try{
            if(!checkEmpty()){
                const contests = works.map(item => {
                    const newItem = {...item}
                    delete newItem.ref
                    return newItem
                })
                console.log(contests)
                const response = PollsService.newWorks(contests,phone,mail)
                if(response.data) console.log(response.data)
                navigate('/kids-contest')
            }
        }catch (e) {
            message('Ошибка отправки заявки. Презагрузите страницу, и попробуйте снова')
        }
    }
    useEffect(() => {
        if(empty.length)checkEmpty()
    },[phone])
    useEffect(() => {
        loadingHandler()
    },[])
    return (
        <>
        {check ?
        <div className='contest survey-setting'>
            <div onClick={(e) => console.log(phone.trim().length)} className='create-title'>Загрузите работы Ваших детей</div>
            <div className='cms-head'>
                <Link to='/' style={{marginBottom:'30px'}} className='back-button'><i className="fa-solid fa-arrow-left"></i>Назад</Link>
                <h5>Здесь Вы можете подать заявку на конкурс детского рисунка «День победы глазами детей»</h5>
                <p>Подать заявку можно только ОДИН раз, От одного ребенка принимается одна работа. Если Вы желаете заявить работы от нескольких детей нажмите кнопку <span>+ Добавить работу.</span> </p>
            </div>
            <div className='save-box'>
                <div onClick={() => createHandler()} className='button green'>Опубликовать</div>
                <div className='button red-solid-border'>Отменить изменения</div>
            </div>
            <div className='setting-list'>
                {works &&
                    <>
                        <div className='phone'>
                            <div>
                                <i className="fa-solid fa-phone"></i>
                                <PhoneInput empty={empty[0]} phone={phone} setPhone={setPhone} />
                            </div>
                        </div>
                        <div className='phone mail'>
                            <div>
                                <i className="fa-regular fa-envelope"></i>
                                <MailInput empty={empty[500]} mail={mail} setMail={setMail} />
                            </div>

                        </div>
                        {works.map( (item,index) => (
                            <span key={index}>
                        <div className='small-inputs'>
                            <div className='line'>
                                <i className="fa-solid fa-child-reaching"></i>
                                <input className={`${empty[index+1] && 'red-solid-border'}`} onChange={(e) => namesHandler(e,index)} type='text' placeholder='Введите имя автора'/>
                                <i className="fa-solid fa-child-reaching"></i>
                            </div>
                            <div className='line'>
                                <i className="fa-solid fa-child-reaching"></i>
                                <input className={`${empty[(index+1)*10] && 'red-solid-border'}`} onChange={(e) => ageHandler(e,index)} type="number" min="1" max="16" placeholder='Введите возраст автора'/>
                                <i className="fa-solid fa-child-reaching"></i>
                            </div>

                        </div>
                        <div style={works[index].image.length ? {backgroundImage: `url(/files/polls/${works[index].image})`} : {}} onClick={(e) => works[index].ref.current.click()} className={`image ${empty[(index+1)*100] ? 'red-border' : ''}`}>
                            <i className="fa-solid fa-upload"></i>
                            <input onChange={(e) => loadImage(index,e)} ref={works[index].ref} className='hidden-upload' type='file'/>
                        </div>
                    </span>
                        ))}
                    </>
                }
            </div>
            <div className='buttons'>
                <div onClick={() => addWorkHandler()} className='add-btn'>+ добавить работу</div>
                <div onClick={() => deleteWorkHandler()} className='add-btn red-solid-border'>- Удалить работу</div>
            </div>
        </div>
        :
            <div className='cms-head'>
                <Link to='/' style={{marginBottom:'30px'}} className='back-button'><i className="fa-solid fa-arrow-left"></i>Назад</Link>
                <h5>Вы уже подавали заявку</h5>
            </div>
        }
        </>
    )
}



