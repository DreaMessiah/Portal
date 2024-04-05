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

    function printImage() {
        // Создаем новое окно браузера
        const printWindow = window.open('', '_blank');

        // Получаем URL изображения
        const imageUrl = '/structure/structure.png'

        // Загружаем изображение в новом окне
        printWindow.document.write('<img src="' + imageUrl + '" onload="window.print()">');

        // Закрываем окно после печати
        setTimeout(function () {
            printWindow.close();
        }, 1000); // Подождите некоторое время, прежде чем закрыть окно
    }
    const {structure} = useContext(DataContext)
        return (
        <div className='structure'>
            <div onClick={() => printImage()} className={`button`}>Печать</div>
            <div className={`title`}>Организационная структура ООО "Сургутское РСУ"</div>
            <div className={'image'}><img src={'/structure/structure.png'} alt={'Структура компании'}/></div>
        </div>
    )
}
