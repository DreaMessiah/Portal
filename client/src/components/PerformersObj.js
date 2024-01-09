import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

export default function PerformersObj ({obj}){
    const [buttonText, setButtonText] = useState('Показать больше');
    const [buttonBool, setButtonBool] = useState(true);
    const [displayWorks, setDisplayWorks] = useState(false);

    const handleWorks = () => {
        setDisplayWorks(!displayWorks);
    };

    return (
        <div className='performers-obj'>
            <div className='title-performers'><p>Исполнители</p></div>
            <div className='info-box'>
                <h3>Ответственный</h3>
                <p>{obj.main.job}</p>
                <h4>{obj.main.name}</h4>
                <p>{obj.main.date}</p>
                <p onClick={handleWorks} className='list-button'>Список задач ({Object.keys(obj.works).length})</p>
                <div className={displayWorks ? 'block works-list' : 'works-list'}>
                    {Object.keys(obj.works).map((item,index) => (
                        <Link key={index} to={obj.works[item].link}><p>{obj.works[item].name}</p></Link>
                    ))}
                </div>
                <h3>Дополнительно</h3>
                {Object.keys(obj.people).map((item,index) => (
                    <div key={index} className='people-list'>
                        <p>{obj.people[item].job}</p>
                        <h4>{obj.people[item].name}</h4>
                    </div>
                ))}

            </div>
        </div>
    )
}