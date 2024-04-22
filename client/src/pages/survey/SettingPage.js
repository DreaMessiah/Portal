import React, {useContext, useEffect, useRef, useState} from "react";
import PollsService from "../../services/PollsService";
import {Link} from "react-router-dom";
import ModalFiles from "../../components/modalwin/ModalFiles";
import {useMessage} from "../../hooks/message.hook";
import FilesService from "../../services/FilesService";

import { useNavigate } from 'react-router-dom';
import {Context} from "../../index";
import LoadingSpinner from "../../components/loading/LoadingSpinner";
export default function SettingPage({idd}){
    const [id,setId] = useState(idd)
    const [surveys,setSurveys] = useState(null)
    const [checkedStat,setCheckedStat] = useState(true)
    const [activeDeleteM,setActiveDeleteM] = useState(false)
    const [title,setTitle] = useState('')
    const [text,setText] = useState('')
    const [surImage,setSurImage] = useState({ref:useRef(),image:''})
    const [checkedImage,setCheckedImage] = useState(false)
    const [selectedType,setSelectedType] = useState(3)
    const typeSurvey = ['10 бальная шкала','5 бальная шкала','Да или нет','Список ответов']
    const [questions,setQuestions] = useState([])
    const [empty,setEmpty] = useState([])
    const [flagCreate,setFlagCreate] = useState(false)
    const [loading,setLoading] = useState(false)
    const message = useMessage()
    const navigate = useNavigate();
    const {store} = useContext(Context)
    const loadingHandler = async () => {
        try{
            if (isNaN(+id)) setId('new')
            if(id !== 'new'){
                const response = await PollsService.fetchSurvey(id)
                if(response.data){
                    const Survey = response.data.surveys
                    setTitle(Survey.title)
                    setText(Survey.text)
                    if(Survey.image){
                        setSurImage({...surImage,image:Survey.image})
                        setCheckedImage(true)
                    }
                    setCheckedStat(Survey.onanswer)
                    if(Survey.type) setSelectedType(3)
                    setQuestions(response.data.questions)
                }
            }
        }catch (e){
            console.log(e.message+': Проблема загрузки списка опросов')
        }
    }

    useEffect(() => {
        const load = loadingHandler()
    },[])
    useEffect(() => {
        let temp = []
        switch(selectedType){
            case 0:
                temp = [{text:'1',type:1},{text:'2',type:1},{text:'3',type:1},{text:'4',type:1},{text:'5',type:1},{text:'6',type:1},{text:'7',type:1},{text:'8',type:1},{text:'9',type:1},{text:'10',type:1}]
                break
            case 1:
                temp = [{text:'1',type:1},{text:'2',type:1},{text:'3',type:1},{text:'4',type:1},{text:'5',type:1}]
                break
            case 2:
                temp = [{text:'Да',type:0},{text:'Нет',type:0}]
                break
            default:
                temp = [{text:'',type:0},{text:'',type:0},{text:'',type:0}]
        }
        setQuestions(temp)
    },[selectedType])
    useEffect(() => {
        if(flagCreate) checkEmpty()
        console.log(title.length)
    },[questions,title,text,surImage])
    const createHandler = async () => {
        try{
            if(checkEmpty()){
                message('Заполните выделенные поля')
                setFlagCreate(true)
            }else{
                if(title.length > 100){
                    message('Текст заголовка не может превышать 50 символов')
                }else{
                    if(text.length > 250){
                        message('Текст опроса не может превышать 200 символов')
                    }else{
                        const checkAns = await PollsService.checkAnswers(id)
                        if(checkAns.data){
                            message('Уже есть проголосовавшие, редактирование запрещено')
                        }else{
                            const response = await PollsService.createSurvey(id,text,title,surImage.image,questions,checkedStat)
                            console.log(response.data)
                        }
                        navigate('/polls/cms')
                    }
                }
            }
        }catch (e){
            console.log(e.message+': Проблема создания опроса')
        }
    }
    const exitHandler = () => {
        navigate('/polls/cms')
    }
    const checkEmpty = () => {
        const n = [...empty]
        n[100] = !!!title
        n[101] = !!!text
        if(checkedImage && !surImage.image.length) n[102] = !!!surImage.image.length
        if(questions.length){
            questions.map((item,index) => {
                n[index] = !!!item.text
            })
        }
        const hasTrueValue = n.some(value => value === true);
        if( hasTrueValue ) setEmpty(n)
        else setEmpty([])
        return hasTrueValue
    }
    const loadImage = async (e) => {
        setLoading(true)
        try {
            const response = await FilesService.loadPollsImage(e.target.files[0])
            if(response.err) message('Файл не является изображением')
            if(response.data){
                setSurImage({ ...surImage, image: response.data.path })
            }else {
                message('Ошибка загрузки изображения')
            }
        }catch (e){
            message(e)
        }finally {
            setLoading(false)
        }
    }
    const questionsHandler = (value,index) => {
        console.log(index)
        const newArr = [...questions]
        newArr[index].text = value
        setQuestions(newArr)
    }
    const addQuesHandler = () => {
        if(questions.length<10){
            setQuestions([...questions,{text:'',type:0}])
        }else {
            message('Количество ответов не может быть больше 10ти')
        }
    }
    const deleteQuesHandler = () => {
        if(questions.length > 2) setQuestions(prevState => prevState.slice(0, -1));
        else message('Количество ответов не может быть меньше 2x')
    }

    function Delete() {
        const removeHandler = async () => {
            try{
                if(id !== 'new'){
                    const response = await PollsService.removeSurvey(id)
                    if(response.data){
                        console.log(response.data)
                        message('Опрос удалён')
                        setActiveDeleteM(false)
                        navigate('/polls/cms')
                    }
                }
            }catch (e){
                console.log(e.message+': Проблема удаления опроса')
            }
        }
        return(
            <>
                <div className='copy'>
                    <h4>Вы действительно хотели бы удалить данный опрос?</h4>
                    <div className='buttons'>
                        <div onClick={() => removeHandler()} className='button da'>Да</div>
                        <div onClick={() => setActiveDeleteM(false)} className='button'>Нет</div>
                    </div>
                </div>
            </>
        )
    }

    const rule = store.user.unit

    return (
        <>
            {rule===3 ?
                <div className="survey-setting">
                <div onClick={(e) => console.log(id)} className='create-title'>Редактирование опроса</div>
                <div className='save-box'>
                    <div onClick={() => createHandler()} className='button'>Опубликовать</div>
                    <div onClick={() => exitHandler()} className='button red-solid-border'>Отменить изменения</div>
                    {id !== 'new' ? <div onClick={() => setActiveDeleteM(true)} className='button red-solid-border'>Удалить опрос</div> : null}
                </div>
                <div className='setting-list'>
                    <input className={`title ${empty[100] ? 'red-border' : ''}`} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Введите заголовок нового опроса" />
                    <textarea className={`text ${empty[101] ? 'red-border' : ''}`} value={text} onChange={(e) => setText(e.target.value)} placeholder="Введите текст опроса"></textarea>

                    <label className="checkbox-container">
                        <input type="checkbox" checked={checkedImage} onChange={(e) => setCheckedImage(!checkedImage)} />
                        <span className="checkmark"></span>
                        Добавить картинку
                    </label>

                    {checkedImage ?
                        <div style={surImage.image ? {backgroundImage: `url(/files/polls/${surImage.image})`}:{}} onClick={(e) => surImage.ref.current.click()} className={`image ${empty[102] ? 'red-border' : ''}`}>
                            {!surImage.image ? <i className="fa-solid fa-upload"></i> : ''}
                            <input onChange={(e) => loadImage(e,-1)} ref={surImage.ref} className='hidden-upload' type='file'/>
                        </div>
                        : null}

                    <div className='title-type'>
                        <p>Выберете тип опроса</p>
                        <div className="radio-button-container">
                            {typeSurvey.map((item,index) => (
                                <label key={index} className="radio-button">
                                    <input
                                        type="radio"
                                        value={selectedType}
                                        checked={selectedType === index}
                                        onChange={(e) => setSelectedType(index)}
                                    />
                                    <span className="radio-button-text">{item}</span>
                                </label>
                            ))}
                        </div>
                        {questions.length ?
                            <div className={questions[0].type ? 'rows questions' : 'columns questions'}>
                                {selectedType >= 0 ?
                                    questions.map((item,index) => (
                                        <div key={index} className='item'>
                                            <input className={`question ${empty[index] ? 'red-border' : ''}`} value={item.text} onChange={(e) => questionsHandler(e.target.value,index)} placeholder={`Ответ ${index+1}`} />
                                        </div>
                                    ))
                                    : null}
                            </div>

                            : null}

                        {selectedType === 3 ? <div className='buttons'> <div onClick={() => addQuesHandler()} className='add-btn'>+ добавить ответ</div>  <div onClick={() => deleteQuesHandler()} className='add-btn red-solid-border'>- Удалить ответ</div> </div>: null}
                    </div>

                    <label className="checkbox-container">
                        <input type="checkbox" checked={checkedStat} onChange={(e) => setCheckedStat(!checkedStat)} />
                        <span className="checkmark"></span>
                        Разрешить просмотр статистики
                    </label>

                </div>

                <ModalFiles data={<Delete />} active={activeDeleteM} setActive={setActiveDeleteM}/>
            </div>
            :
                <div>У Вас нет прав для просмотра данного ресурса</div>
            }
            {loading ? (<LoadingSpinner/>) : null}
        </>
    )
}
