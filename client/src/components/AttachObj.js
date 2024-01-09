import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

export default function AttachObj ({obj}){
    const [buttonText, setButtonText] = useState('Показать больше');
    const [buttonBool, setButtonBool] = useState(true);
    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
        buttonBool ? setButtonText('Показать больше') : setButtonText('Скрыть')
    },[buttonBool])

    const handleToggle = () => {
        setShowMore(!showMore);
        setButtonBool(!buttonBool)
    };

    return (
        <div className='attach-obj'>
            <div className='attach-title'><p>Приложения</p></div>
            <div className={showMore ? 'attaches autoheight' : 'attaches'}>
                {Object.keys(obj).map((item,index) => (
                    <Link key={index} to={obj[item].link}><div className={'img '+obj[item].type}></div><p>{obj[item].name + '.' + obj[item].type}</p></Link>
                ))}
            </div>
            { Object.keys(obj).length < 3 ? '' : (
                <div onClick={handleToggle} className='button'>{buttonText}</div>
                )}
        </div>
    )
}