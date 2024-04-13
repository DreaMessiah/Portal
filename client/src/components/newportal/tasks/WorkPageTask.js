import "./style.scss"
import React, {useContext} from "react";
import {DataContext} from "../../../context/DataContext";
import {Link} from "react-router-dom";
import AttachObj from "../../old/AttachObj";
import PerformersObj from "../../old/PerformersObj";
import ResultsObj from "../../old/ResultsObj";
import NewDocumentWay from "./NewDocumentWay";
import {useState} from "react";
import {useEffect} from "react";

export const WorkPageTask = () => {

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

    const { mass_create, menu_mass, wrap_buttons, task1, attach1, performers, results, dwm1} = useContext(DataContext)
    const [displayText, setDisplayText] = useState(task1.text);
    const [showMore, setShowMore] = useState(false);

    const handleToggle = () => {
        setShowMore(!showMore);
    };

    const icons = {
        'dir':'fa-folder',
        'doc':'fa-file-word',
        'xls':'fa-file-excel',
        'docx':'fa-file-word',
        'wps':'fa-file-lines',
        'xlsx':'fa-file-excel',
        'csv':'fa-file-excel',
        'pdf':'fa-file-pdf',
        'rar':'fa-file-zipper',
        'zip':'fa-file-zipper',
        '7z':'fa-file-zipper',
        'gzip':'fa-file-zipper',
        'jpg':'fa-file-image',
        'png':'fa-file-image',
        'bmp':'fa-file-image',
        'gif':'fa-file-image',
        'tif':'fa-file-image',
        'txt':'fa-file-lines',
        'vsdx':'fa-file-lines',
        'vsd':'fa-file-lines',
        'gsf':'fa-file-lines',
        'xml':'fa-file-excel',
        'fb2':'fa-file-lines'
    }

    const [buttonText, setButtonText] = useState('Показать больше');
    const [buttonBool, setButtonBool] = useState(true);
    const [showMore2, setShowMore2] = useState(false);

    useEffect(() => {
        buttonBool ? setButtonText('Показать больше') : setButtonText('Скрыть')
    },[buttonBool])

    const handleToggle2 = () => {
        setShowMore2(!showMore2);
        setButtonBool(!buttonBool)
    };

    const [displayWorks, setDisplayWorks] = useState(false);

    const handleWorks = () => {
        setDisplayWorks(!displayWorks);
    }


    const [displayText2, setDisplayText2] = useState(results.text);
    const [showMore3, setShowMore3] = useState(false);
    const [showMoreDocs, setShowMoreDocs] = useState(false);
    const [buttonText3, setButtonText3] = useState('Показать больше');
    const [buttonBool3, setButtonBool3] = useState(true);

    useEffect(() => {
        buttonBool ? setButtonText3('Показать больше') : setButtonText3('Скрыть')
    },[buttonBool])

    const handleToggleDocs = () => {
        setShowMoreDocs(!showMoreDocs);
        setButtonBool3(!buttonBool3)
    };

    const handleToggle3 = () => {
        setShowMore3(!showMore3);
    };
    const mass = [1,2,3,4,5]

    return (
        <div className="task_work_page">
            <div className='task_work_page_box'>
                <div className='left-box'>
                    <NewDocumentWay dwm1={dwm1}/>
                </div>
                <div className='right-box'>
                    <div className='top-box-inside'>
                        <div className='top-box-inside-left_new'>
                            <div className='title_name_task'>
                                <div className='top-box'>
                                    <div className={'status ' + statuses[task1.status].classes}><p>{statuses[task1.status].text}</p></div>
                                    <div className={'level ' + levels[task1.level].classes}><p>{levels[task1.level].text}</p></div>
                                </div>
                                <div className='info'>
                                    <div className='left-box-info'>
                                        <p>Задание</p>
                                        <p>{task1.key}</p>
                                    </div>
                                    <div className='right-box-info'>
                                        <h3>{task1.title}</h3>
                                        <p className={`text ${showMore ? 'expanded' : ''}`} >{showMore ? task1.text : `${displayText.split(' ').slice(0, 25).join(' ')}...`}</p>
                                        <div className='button' onClick={handleToggle}>{showMore ? 'Скрыть' : 'Показать больше'}</div>
                                    </div>
                                </div>
                                <div className='info'>
                                    <div className='left-box-info'><p>Создано:</p></div>
                                    <div className='right-box-info'><p>{task1.datestart}</p></div>
                                </div>
                            </div>
                            <div className='attach-obj-new'>
                                <div className='attach-title'><p>Приложения</p></div>
                                <div className={showMore2 ? 'attaches autoheight' : 'attaches'}>
                                    {Object.keys(attach1).map((item,index) => (
                                        <Link key={index} to={attach1[item].link}><i className={'fa-regular '+ icons[attach1[item].type]}></i><p>{attach1[item].name + '.' + attach1[item].type}</p></Link>
                                    ))}

                                    {/*<div className={'img '+attach1[item].type}></div>*/}
                                    {/*icons*/}
                                    {/*<i className="fa-regular fa-copy"></i>*/}
                                </div>
                                { Object.keys(attach1).length < 3 ? '' : (
                                    <div onClick={handleToggle2} className='button'>{buttonText}</div>
                                )}
                            </div>
                        </div>
                        <div className='top-box-inside-right_new'>
                            <div className='performers-obj_new' style={Object.keys(performers.people).length > 2 ? {paddingBottom:10} : {paddingBottom:0}}>
                                <div className='title-performers'><p>Исполнители</p></div>
                                <div className='info-box'>
                                    <h3>Ответственный</h3>
                                    <p>{performers.main.job}</p>
                                    <h4>{performers.main.name}</h4>
                                    <p>{performers.main.date}</p>
                                    <p onClick={handleWorks} className='list-button'>Список задач ({Object.keys(performers.works).length})</p>
                                    <div className={displayWorks ? 'block works-list' : 'works-list'}>
                                        {Object.keys(performers.works).map((item,index) => (
                                            <Link key={index} to={performers.works[item].link}><p>{performers.works[item].name}</p></Link>
                                        ))}
                                    </div>
                                    <h3>Дополнительно</h3>
                                    {Object.keys(performers.people).map((item,index) => (
                                        <div key={index} className='people-list'>
                                            <p>{performers.people[item].job}</p>
                                            <h4>{performers.people[item].name}</h4>
                                        </div>
                                    ))}

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='bottom-box_new'>
                        <div className='attach-obj_new results-obj_new performers-obj_new'>
                            <div className='title-performers'><p>Итоги выполнения</p></div>
                            <div className='info-box'>
                                <h3>Итоги</h3>
                                <div className='right-box-info'>
                                    <p className='text'>{showMore3 ? results.text : `${displayText2.split(' ').slice(0, 25).join(' ')}...`}</p>
                                    <div className='button-text' onClick={handleToggle3}>{showMore3 ? 'Скрыть' : 'Показать больше'}</div>
                                </div>
                                <h3>Документы</h3>
                                <div className={showMoreDocs ? 'attaches autoheight' : 'attaches'}>
                                    {Object.keys(results.attaches).map((item,index) => (
                                        <Link key={index} to={results.attaches[item].link}><i className={'fa-regular '+ icons[results.attaches[item].type]}></i><p>{results.attaches[item].name + '.' + results.attaches[item].type}</p></Link>
                                    ))}

                                </div>
                            </div>
                            { Object.keys(results.attaches).length < 5 ? '' : (
                                <div onClick={handleToggleDocs} className='button'>{buttonText3}</div>
                            )}
                        </div>
                        <div className='docbuttons'>
                            <div className='button'><p>Подписать/Направить</p></div>
                            <div className='button'><p>Вернуть на доработку</p></div>
                            <div className='button'><p>Закрыть</p></div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
