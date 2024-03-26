import React, {useContext, useEffect, useRef, useState} from "react";
import PollsService from "../../services/PollsService";
import YearsSting from "../../components/functions/yearsSting";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import AuthService from "../../services/AuthService";
import formatDate from "../../components/functions/formatDate";
import {useMessage} from "../../hooks/message.hook";
import {useNavigate} from "react-router-dom";

function ListContest(){
    const navigate = useNavigate()
    const [works, setWorks] = useState([])
    const [nominations, setNominations] = useState([])
    const [like,setLike] = useState(false)
    const [currentImageIndex, setCurrentImageIndex] = useState(null)
    const [selected,setSelected] = useState(-1)
    const [all,setAll] = useState(false)
    const {store} = useContext(Context)
    const message = useMessage()
    const openImageFullscreen = (index) => {
        setCurrentImageIndex(index)
    }
    const closeImageFullscreen = () => {
        setCurrentImageIndex(null)
    }
    const goToPreviousImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex))
    }
    const goToNextImage = () => {
        setCurrentImageIndex((prevIndex) => prevIndex !== null && prevIndex < works.length - 1 ? prevIndex + 1 : prevIndex)
    }

    const loadingHandler = async () => {
        try{
            const contests = await PollsService.getKids()
            if (contests.data) {
                const ctst = [...contests.data]
                const users = await AuthService.getusers()
                if(users){
                    ctst.map(rows => {
                        users.data.users.map( item => {
                            if(rows.user_id === item.id){
                                rows.developer = item.developer
                                rows.full_name = item.full_name
                                rows.face = 'profile/face.png'
                                rows.nomi = null
                            }
                        })
                    })
                    setWorks(ctst)
                }
            }
            const nom = await PollsService.getNomi()
            if(nom.data) {
                const nomi = [...nom.data]
                for(const n of nomi){
                    nomi.selected = false
                    nomi.contest = null
                }
                setNominations(nomi)
                console.log(nomi)
            }
        }catch (e) {
            console.log(e?.message)
        }
    }
    const voteHandler = async () => {
        try {
            if(all){
                const response = await PollsService.voteKid(nominations)
                if(response.data){
                    console.log(response.data)
                    //navigate('/kids-gallery')
                }
            }
        }catch (e){
            console.log(e?.message)
        }
    }
    const selectNomination = (id) => {
        if(selected >=0){
            const nomi = [...nominations]
            const cont = [...works]

            nomi[selected].selected = true
            nomi[selected].contest = cont[id].id


            cont[id].nomi = selected

            setCurrentImageIndex(null)
            setSelected(-1)

            setWorks(cont)
            setNominations(nomi)
        }
        else{
            message('Выберете номинацию')
        }
    }
    const unselectNomination = (id) => {
        const nomi = [...nominations]
        const cont = [...works]

        nomi[cont[id].nomi].selected = false
        nomi[cont[id].nomi].contest = null
        cont[id].nomi = null

        setCurrentImageIndex(null)
        setSelected(-1)

        setWorks(cont)
        setNominations(nomi)
    }
    useEffect(() => {
        loadingHandler()
    },[])
    useEffect(() => {
        setAll(nominations.every(item => item.selected))

    },[nominations])
    return (
        <div className='contest'>
            <div className="gallery">
                {works.map((item, index) => (
                    <div key={index} className={`gallery-item ${item.nomi!==null && 'blur-img'}`} onClick={() => openImageFullscreen(index)}>
                        <div className='img' style={{backgroundImage:`url(/files/polls/${item.image})`,content:'123123'}} />
                        <div style={item.nomi!==null ? {display:'flex'}:{}} className='nomination-text'><p>{item.nomi!==null ? nominations[item.nomi].name : ''}</p></div>
                        <div className='text'>
                            <p>{item.name} {YearsSting(item.age)} </p>
                        </div>
                    </div>
                ))}

                {currentImageIndex !== null && (
                    <div className="fullscreen-overlay">
                        <div className={`fullscreen-container`}>

                            <div className="fullscreen-image">
                                <div className="prev-button" onClick={goToPreviousImage}>
                                    <i className="fa-solid fa-chevron-left"></i>
                                </div>
                                <div className="next-button" onClick={goToNextImage}>
                                    <i className="fa-solid fa-chevron-right"></i>
                                </div>
                                <img src={`/files/polls/${works[currentImageIndex].image}`} alt={'123123'} />

                                <div className="image-description">
                                    <div className={`name`}>{works[currentImageIndex].name} {YearsSting(works[currentImageIndex].age)}</div>
                                    <div className='progress'>{currentImageIndex+1} из {works.length} </div>
                                </div>
                            </div>
                            <div className={`data-container`}>
                                <div className='info'>
                                    <div className={`about`}>
                                        <div style={{backgroundImage:`url("${works[currentImageIndex].face}")`}} className={`avatar`}></div>
                                        <div className={`text`}>
                                            <div className='name'>{works[currentImageIndex].full_name}</div>
                                            <div className={`date`}>{works[currentImageIndex].developer}</div>
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className={`answers`}><i className={`fa-heart fa-regular`}></i>{27} <i className="fa-regular fa-calendar"></i><span>{formatDate(works[currentImageIndex].createdAt)}</span></div>
                                    <hr/>
                                    {nominations &&
                                        <div className={`nominations radio-button-container`}>
                                            {works[currentImageIndex].nomi === null ?
                                                <>
                                                    {nominations.map((item, index) => (
                                                        <span key={index}>
                                                        {!item.selected &&
                                                            <label key={index} className="radio-button">
                                                                <input
                                                                    type="radio"
                                                                    value={selected}
                                                                    checked={selected === index}
                                                                    onChange={(e) => setSelected(index)}
                                                                />
                                                                <span className="radio-button-text">{item.name}</span>
                                                            </label>
                                                        }
                                                        </span>
                                                    ))}
                                                    {all ? <div className='bold'><p>Вы сделали выбор во всех номинациях.</p></div> : null}
                                                </> :
                                                <div className='bold'>Вы выбрали номинацию <p>{nominations[works[currentImageIndex].nomi].name}</p> для данный работы</div>
                                            }
                                        </div>
                                    }

                                </div>
                                <div className='buttons'>
                                    <hr/>
                                    {works[currentImageIndex].nomi === null ?
                                        <>
                                            {all ?
                                                <div onClick={(e => setSelected(-1))} className={`button disable`}>Изменить выбор</div>
                                                :
                                                <div onClick={(e) => selectNomination(currentImageIndex)} className={`button`}>Номинировать</div>
                                            }
                                        </>
                                    :<div onClick={(e) => unselectNomination(currentImageIndex)} className={`button`}>Отменить</div>}

                                </div>

                            </div>
                        </div>
                        <div className={`overlay`} onClick={closeImageFullscreen}></div>
                        <div onClick={closeImageFullscreen} className='close-fullscreen'><i className="fa-solid fa-xmark"></i></div>
                    </div>
                )}
            </div>
            {all && <div onClick={() => voteHandler()} className={`send-contest`}>Проголосовать</div> }
        </div>
    )
}
export default observer(ListContest)


