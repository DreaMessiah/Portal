import React, {useContext, useEffect, useRef, useState} from "react";
import {DataContext} from "../../context/DataContext";
import './structure.scss'
import {ReactToPrint} from "react-to-print";
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

    function printPDF() {
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = '/structure/structure.pdf';
        document.body.appendChild(iframe);

        iframe.onload = () => {
            iframe.contentWindow.print();
        };
    }
        return (
        <div className='structure'>
            <div className={`title`}>Организационная структура ООО "Сургутское РСУ"</div>
            <div className={'image'}><img id={`img`} src={'/structure/structure.png'} alt={'Структура компании'}/></div>
            <div onClick={() => printPDF()} className={`button`}>Печать</div>
        </div>
    )
}
