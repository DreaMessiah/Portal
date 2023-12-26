import {Link} from "react-router-dom";
import {useState} from "react";

export default function WorksTmcObj ({mass}) { // получается массив обьектов

    const [scrollOffset, setScrollOffset] = useState(0);

    const scrollLeft = () => setScrollOffset(Math.max(scrollOffset - 384, 0));
    const scrollRight = () => setScrollOffset(scrollOffset + 384);

    let classesLevel = []
    let classesDirections = []
    let classesImages = []
    let directions = []


    mass.map((item,index) => {
        if(item.level === 'повышенный'){
            classesLevel[index] = 'level purple'
        }else{
            classesLevel[index] = 'level orange'
        }

        switch (item.direction){
            case '0':
                directions[index] = 'Поступление'
                classesDirections[index] = 'dblue date'
                classesImages[index] = 'img tmc'
                break
            case '1':
                directions[index] = 'Отгрузка'
                classesDirections[index] = 'dgrey date'
                classesImages[index] = 'img tmc'
                break
            default:
                classesImages[index] = 'img tmc'
                classesDirections[index] = 'dblue date'
                directions[index] = ''
        }

    })

    return (
        <div className='worksobj'>
            <div className='scrollOffset' style={{transform: `translateX(${-scrollOffset}px)`}}>
                {mass.map( (item,index) => (
                    <div className='work work2' key={index}>
                        <div className='top-block'>
                            <div className={classesDirections[index]}> <p>{directions[index]}</p></div>
                            <div className={classesLevel[index]}><p>Уровень: {item.level}</p></div>
                        </div>
                        <div className='info-block info2'>
                            <div className={classesImages[index]}/>
                            <div className='texts'>
                                <h4>{item.title}</h4>
                                <p>{item.text}</p>
                                <hr/>
                                <p>Статус: {item.status}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='buttonsBlock buttonsBlock2'>
                <div className='pust'>{scrollOffset > 0 && <div className='button leftb' onClick={scrollLeft}><i className="fa-solid fa-caret-left"></i></div>} </div>
                <div className='pust'>{scrollOffset < (mass.length - 3) * 394 - 100 && <div className='button rightb' onClick={scrollRight}><i className="fa-solid fa-caret-right"></i></div>}</div>
            </div>
        </div>
    )
}