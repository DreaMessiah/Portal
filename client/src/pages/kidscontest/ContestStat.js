import React, {useContext, useEffect, useRef, useState} from "react";
import PollsService from "../../services/PollsService";
import YearsSting from "../../components/functions/yearsSting";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import AuthService from "../../services/AuthService";
import formatDate from "../../components/functions/formatDate";
import {useMessage} from "../../hooks/message.hook";
import {useNavigate} from "react-router-dom";
import {MainHeader} from "../../components/header/Mainheader";
import {Mainnavbar} from "../../components/navbar/Mainnavbar";
import {WorkPage} from "../../components/workpage/WorkPage";
import ListContest from "./ListContest";
import LoadingSpinner from "../../components/loading/LoadingSpinner";

function ContestStat(){
    const navigate = useNavigate()
    const [works, setWorks] = useState([])
    const [nominations, setNominations] = useState([])
    const [like,setLike] = useState(false)
    const [currentImageIndex, setCurrentImageIndex] = useState(null)
    const [selected,setSelected] = useState(-1)
    const [all,setAll] = useState(false)
    const {store} = useContext(Context)
    const message = useMessage()
    const [isVote,setIsVote] = useState(true)
    const [used,setUsed] = useState(0)
    const [loading,setLoading] = useState(false)

    const [stat,setStat] = useState([])

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
            setLoading(true)
            if (contests.data) {
                const ctst = [...contests.data]
                const users = await AuthService.getusers()

                const {data} = await PollsService.getStatWork()
                setStat(data)

                if(users){
                    ctst.map(rows => {
                        users.data.users.map( async item => {
                            if(rows.user_id === item.id){
                                rows.developer = item.developer
                                rows.full_name = item.full_name
                                rows.face = item.avatar ? item.avatar : 'face.png'
                                rows.nomi = null
                                const votes = await PollsService.getVotes(rows.id)
                                rows.votes = votes.data
                            }
                        })
                        const statistics = data.find(u => u.id === rows.id)
                        rows.statistics = statistics.stat
                    })
                    console.log(ctst)
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

            const check = await PollsService.checkVoteKids()

            if(check.data){
                setIsVote(check.data.check)
                if(check.data.check){
                    //message('Вы уже проголосовали')
                }
            }

        }catch (e) {
            console.log(e?.message)
        }finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadingHandler()
    },[])
    useEffect(() => {
        setAll(nominations.every(item => item.selected))
        setUsed(nominations.filter(item => item.selected).length)
    },[nominations])
    return (
        <div className='new_container'>
            <div className="up_path"><MainHeader /></div>
            <div className="main_path">
                <Mainnavbar />
                <div className="workpage_block">

                    <div className='contest'>
                        <div className="gallery">
                            {works.map((item, index) => (
                                <div key={index} className={`gallery-item ${item.nomi!==null && 'blur-img'}`} onClick={() => openImageFullscreen(index)}>
                                    <div className='img' style={{backgroundImage:`url(/files/polls/${item.image})`}} />
                                    <div style={item.nomi!==null ? {display:'flex'}:{}} className='nomination-text'><p>{(item.nomi!==null && nominations) ? nominations[item.nomi].name : ''}</p></div>
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
                                            <img src={`/files/polls/${works[currentImageIndex].image}`} alt={'image'}/>

                                            <div className="image-description">
                                                <div className={`name`}>{works[currentImageIndex].name} {YearsSting(works[currentImageIndex].age)}</div>
                                                <div className='progress'>{currentImageIndex+1} из {works.length} </div>
                                            </div>
                                        </div>
                                        <div className={`data-container`}>
                                            <div className='info'>
                                                <div className={`about`}>
                                                    <div style={{backgroundImage:`url("/files/profile/${works[currentImageIndex].face}")`}} className={`avatar`}></div>
                                                    <div className={`text`}>
                                                        <div className='name'>{works[currentImageIndex].full_name}</div>
                                                        <div className={`date`}>{works[currentImageIndex].developer}</div>
                                                    </div>
                                                </div>
                                                <hr/>
                                                <div className={`answers`}><i className={`fa-heart fa-regular`}></i>{works[currentImageIndex].votes} <i className="fa-regular fa-calendar"></i><span>{formatDate(works[currentImageIndex].createdAt)}</span></div>
                                                <hr/>
                                                <div className={'results'}>
                                                    {works[currentImageIndex].statistics.map( (item,index) => (
                                                        <div key={index} className={`border-golos`}>
                                                            <div className={``}>{item.full_name}</div>
                                                            <div className={``}>{item.nominame}</div>
                                                            <div className={``}>{item.hozdev}</div>
                                                            <div className={``}>{formatDate(item.createdAt)}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`overlay`} onClick={closeImageFullscreen}></div>
                                    <div onClick={closeImageFullscreen} className='close-fullscreen'><i className="fa-solid fa-xmark"></i></div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {loading ? (<LoadingSpinner/>) : null}
        </div>


    )
}
export default observer(ContestStat)


