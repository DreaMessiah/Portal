import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

export default function ResultsObj ({obj}){
    const [displayText, setDisplayText] = useState(obj.text);
    const [showMore, setShowMore] = useState(false);
    const [showMoreDocs, setShowMoreDocs] = useState(false);
    const [buttonText, setButtonText] = useState('Показать больше');
    const [buttonBool, setButtonBool] = useState(true);

    useEffect(() => {
        buttonBool ? setButtonText('Показать больше') : setButtonText('Скрыть')
    },[buttonBool])

    const handleToggleDocs = () => {
        setShowMoreDocs(!showMoreDocs);
        setButtonBool(!buttonBool)
    };

    const handleToggle = () => {
        setShowMore(!showMore);
    };

    return (
        <div className='attach-obj results-obj performers-obj'>
            <div className='title-performers'><p>Итоги выполнения</p></div>
            <div className='info-box'>
                <h3>Итоги</h3>
                <div className='right-box-info'>
                    <p className='text'>{showMore ? obj.text : `${displayText.split(' ').slice(0, 25).join(' ')}...`}</p>
                    <div className='button-text' onClick={handleToggle}>{showMore ? 'Скрыть' : 'Показать больше'}</div>
                </div>
                <h3>Документы</h3>
                <div className={showMoreDocs ? 'attaches autoheight' : 'attaches'}>
                    {Object.keys(obj.attaches).map((item,index) => (
                        <Link key={index} to={obj.attaches[item].link}><div className={'img '+obj.attaches[item].type}></div><p>{obj.attaches[item].name + '.' + obj.attaches[item].type}</p></Link>
                    ))}
                </div>

            </div>
            { Object.keys(obj.attaches).length < 5 ? '' : (
                <div onClick={handleToggleDocs} className='button'>{buttonText}</div>
            )}
        </div>
    )
}