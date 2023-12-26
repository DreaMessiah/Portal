import {Link} from "react-router-dom";
import {useState} from "react";

export default function WorksObj ({mass}) { // получается массив обьектов

    const [scrollOffset, setScrollOffset] = useState(0);

    const scrollLeft = () => setScrollOffset(Math.max(scrollOffset - 384, 0));
    const scrollRight = () => setScrollOffset(scrollOffset + 384);

    let classesLevel = []
    let classesDates = []

    const currentDate = new Date();

    mass.map((item,index) => {
        if(item.level === 'повышенный'){
            classesLevel[index] = 'level purple'
        }else{
            classesLevel[index] = 'level orange'
        }

        const targetDateArray = item.dateend.split('.');
        const targetDate = new Date(targetDateArray[2], targetDateArray[1] - 1, targetDateArray[0]);

        if(currentDate > targetDate){
            item.datestart = 'Просрочено'
            classesDates[index] = 'red date'
        }else if(item.viewed === '0'){
            item.datestart = 'Новое'
            classesDates[index] = 'green date'
        }else{
            classesDates[index] = 'date'
        }
    })

    return (
        <div className='worksobj'>

            <div className='scrollOffset' style={{transform: `translateX(${-scrollOffset}px)`}}>
                {mass.map( (item,index) => (
                        <div className='work' key={index}>
                            <div className='top-block'>
                                <div className={classesDates[index]}> <p>{item.datestart}</p></div>
                                <div className={classesLevel[index]}><p>Уровень: {item.level}</p></div>
                            </div>
                            <div className='info-block'>
                                <h4>{item.title}</h4>
                                <p>{item.text}</p>
                                <div className='end'>
                                    <hr/>
                                    <p>Крайняя дата исполения: {item.dateend}</p>
                                </div>
                            </div>
                        </div>
                ))}
            </div>
            <div className='buttonsBlock'>
                <div className='pust'>{scrollOffset > 0 && <div className='button leftb' onClick={scrollLeft}><i className="fa-solid fa-caret-left"></i></div>} </div>
                <div className='pust'>{scrollOffset < (mass.length - 3) * 394 - 100 && <div className='button rightb' onClick={scrollRight}><i className="fa-solid fa-caret-right"></i></div>}</div>
            </div>
        </div>
    )
}