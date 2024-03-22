import React, {useContext, useEffect, useRef, useState} from "react";
import PollsService from "../../services/PollsService";
import YearsSting from "../../components/functions/yearsSting";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";

function ListContest(){
    const [works, setWorks] = useState([])
    const [currentImageIndex, setCurrentImageIndex] = useState(null)
    const {store} = useContext(Context)

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
            if (contests.data) setWorks(contests.data)
        }catch (e) {
            console.log(e?.message)
        }
    }
    useEffect(() => {
        loadingHandler()
    },[])
    return (
        <div className='contest'>
            <div className="gallery">
                {works.map((item, index) => (
                    <div key={index} className="gallery-item" onClick={() => openImageFullscreen(index)}>
                        <div className='img' style={{backgroundImage:`url(/files/polls/${item.image})`}} />
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
                                    <i class="fa-solid fa-chevron-left"></i>
                                </div>
                                <div className="next-button" onClick={goToNextImage}>
                                    <i class="fa-solid fa-chevron-right"></i>
                                </div>
                                <img src={`/files/polls/${works[currentImageIndex].image}`} alt={'123123'} />

                                <div className="image-description">
                                    <div className={`name`}>{works[currentImageIndex].name} {YearsSting(works[currentImageIndex].age)}</div>
                                    <div className='progress'>{currentImageIndex+1} из {works.length} </div>
                                </div>
                            </div>
                            <div className={`data-container`}>
                                <div className={`about`}>
                                    <div className={`avatar`}></div>
                                    <div className={`name`}></div>
                                </div>
                                <div className={`answers`}>35 голосов</div>
                                <div className={`nominations`}>
                                </div>
                            </div>
                        </div>
                        <div className={`overlay`} onClick={closeImageFullscreen}></div>
                        <div onClick={closeImageFullscreen} className='close-fullscreen'><i class="fa-solid fa-xmark"></i></div>
                    </div>
                )}
            </div>
        </div>
    )
}
export default observer(ListContest)


