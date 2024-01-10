import React,{useState} from "react";

const statuses = {
    1:{
        classes:'grey',
        text:'В работе'
    },
    2:{
        classes:'red',
        text:'Просрочено'
    },
    3:{
        classes:'green',
        text:'Завершено'
    }
}
const levels = {
    1:{
        classes:'green',
        text:'Низкий'
    },
    2:{
        classes:'orange',
        text:'Средний'
    },
    3:{
        classes:'dblue',
        text:'Повышенный'
    }
}

export default function WorksTasksObj ({obj}){
    const [displayText, setDisplayText] = useState(obj.text);
    const [showMore, setShowMore] = useState(false);

    const handleToggle = () => {
        setShowMore(!showMore);
    };

    return (
        <div className='tasks-obj'>
            <div className='top-box'>
                <div className={'status ' + statuses[obj.status].classes}><p>{statuses[obj.status].text}</p></div>
                <div className={'level ' + levels[obj.level].classes}><p>{levels[obj.level].text}</p></div>
            </div>
            <div className='info'>
                <div className='left-box-info'>
                    <p>Задание</p>
                    <p>{obj.key}</p>
                </div>
                <div className='right-box-info'>
                    <h3>{obj.title}</h3>
                    <p className={`text ${showMore ? 'expanded' : ''}`} >{showMore ? obj.text : `${displayText.split(' ').slice(0, 25).join(' ')}...`}</p>
                    <div className='button' onClick={handleToggle}>{showMore ? 'Скрыть' : 'Показать больше'}</div>
                </div>
            </div>
            <div className='info'>
                <div className='left-box-info'><p>Создано:</p></div>
                <div className='right-box-info'><p>{obj.datestart}</p></div>
            </div>
        </div>
    )
}