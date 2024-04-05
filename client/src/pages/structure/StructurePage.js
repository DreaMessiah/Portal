import React, {useContext, useEffect, useRef, useState} from "react";
import {DataContext} from "../../context/DataContext";
import './structure.scss'
export default function StructurePage(){
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        }
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    },[windowWidth])

    const {structure} = useContext(DataContext)
        return (
        <div className='structure'>
            <div className={`title`}>Организационная структура ООО "Сургутское РСУ"</div>
            <div className={'image'}><img src={'/structure/structure.png'} alt={'Структура компании'}/></div>
        </div>
    )
}
