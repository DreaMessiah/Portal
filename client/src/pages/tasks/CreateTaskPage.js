import React, {useContext, useState} from "react";
import {DataContext} from "../../context/DataContext";
import Navbar from "../../components/Navbar";
import SearchObj from "../../components/SearchObj";
import ChangeObj from "../../components/ChangeObj";
import WrapButtonsObj from "../../components/WrapButtonsObj";
import BridgeLeftBar from "../../components/leftbar/ BridgeLeftBar";
import {Link} from "react-router-dom";

export default function CreateTaskPage(){
    const {mass_create,menu_mass,wrap_buttons} = useContext(DataContext)

    const [name,setName] = useState('')
    const [task,setTask] = useState('')
    const [aboutTask,setAboutTask] = useState('')
    const [params,setParams] = useState('')

    const handleNameChange = (event) => {
        setName(event.target.value);
        setParams(new URLSearchParams({name:name,task:task,about:aboutTask}).toString())
    };
    const handleTaskChange = (event) => {
        setTask(event.target.value);
        setParams(new URLSearchParams({name:name,task:task,about:aboutTask}).toString())
    };
    const handleAboutChange = (event) => {
        setAboutTask(event.target.value);
        setParams(new URLSearchParams({name:name,task:task,about:aboutTask}).toString())
    };


    return (
        <div className='container'>
            <Navbar/>
            <div id='DocumentPage' >
                <BridgeLeftBar arrcreate={mass_create} arrmenu={menu_mass}/>
                <div className='right-block'>
                    <div className='top-box'>
                        <div className='left-box'>
                            <WrapButtonsObj mass={wrap_buttons}/>
                            <SearchObj/>
                        </div>
                        <div className='right-box'>
                            <ChangeObj/>
                        </div>
                    </div>

                    <div className='next-box'>
                        <div className='left-box'>
                            <div className='form'>
                                <label>Ответственный исполнитель</label>
                                <input type="text" placeholder='' value={name} onChange={handleNameChange}  autoComplete="off"/>
                                <label>Название задачи</label>
                                <input type="text" placeholder='' value={task} onChange={handleTaskChange}  autoComplete="off" />
                                <label>Описание задачи</label>
                                <textarea placeholder='' value={aboutTask} onChange={handleAboutChange} autoComplete="off"/>
                                <label>Привязать к проекту</label>
                                <select>
                                    <option value="">Выберите проект</option>
                                    <option value="1">Проэкт №774655\22</option>
                                    <option value="2">Проэкт №865309\23</option>
                                    <option value="3">Проэкт №778611\24</option>
                                </select>
                                <label>Закончить до</label>
                                <input type="date" placeholder='' autoComplete="off"/>
                                <label>Прикрепить файл</label>
                                <input type="file" className='file-input' placeholder='' autoComplete="off"/>
                                <Link to={`/testtaskpage/params?${params}`} className='button' >Создать задачу</Link>
                            </div>
                        </div>
                        <div className='right-box'>
                            <div className='top-box-inside'>
                                <div className='top-box-inside-left'>

                                </div>
                                <div className='top-box-inside-right'>

                                </div>
                            </div>
                            <div className='bottom-box'>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
