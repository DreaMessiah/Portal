import React, {useContext, useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import FilesService from "../../services/FilesService";
import {DataContext} from "../../context/DataContext";
import "../../components/listtasks/listtask3.scss";
import {useMessage} from "../../hooks/message.hook";
import {Context} from "../../index";
import {ModalWin} from "../../components/modalwin/ModalWin";

import { UploadButton } from "@bytescale/upload-widget-react";

function FileManager(){
    const {icons} = useContext(DataContext)
    const {store} = useContext(Context)
    const [documents,setDocuments] = useState([])
    const [modeView,setModeView] = useState(true)
    const [selectFile,setSelectFile] = useState(-2)
    const [path,setPath] = useState([])
    const [activeM,setActiveM] = useState(false)
    const [indexM,setIndexM] = useState()
    const [activeUploadM,setActiveUploadM] = useState(false)
    const [files, setFiles] = useState([])

    const message = useMessage()
    const rule = 3

    const loadingHandler = async () => {
        try{
            const response = await FilesService.fetchFiles(store.user.id,0)
            if(response.data){
                setDocuments(response.data)
                return response.data
            }
        }catch (e){
            console.log(e.message+': Проблема загрузки списка документов')
        }
    }
    const selectPathHandler = async (parent,name = '') => {
        try{
            const response = await FilesService.fetchFiles(store.user.id,parent)
            console.log(parent)
            if(response.data){
                setDocuments(response.data)
                if(!parent) setPath([])
                const indexToDeleteFrom = path.findIndex(item => item.parent === parent);
                if (indexToDeleteFrom !== -1) {
                    const newPath = path.slice(0, indexToDeleteFrom + 1);
                    setPath(newPath);
                }else{
                    if(parent) setPath([...path,{parent:parent,name:name}])
                }
            }

        }catch (e){
            console.log(e.message+': Проблема загрузки списка документов')
        }
    }
    const handleClickOutside = (event) => {
        console.log(event.target.className)
        // Проверяем, является ли целевой элемент кнопкой
        if (!event.target.matches('button')) {
            // Снимаем выделение при клике вне кнопки
            //document.getSelection().removeAllRanges();
        }
    };

    useEffect(()=> {
        loadingHandler()
        document.addEventListener('click', handleClickOutside)
        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
        //setDocuments(docs)
    },[])

    const createDirHandler = async () => {
        try{
            const response = await FilesService.createDir(store.user.id,'3','dir',14)
            console.log(response.data.length)
            if(response.data){
                console.log(response.data)
            }
        }catch (e){
            console.log(e?.message)
        }
    }

    function Inmodal({index}) {
        return(
            <div className='delete-modal'>
                <div className='text'>
                    <p>{`Вы уверены, что хотите удалить файл?`}</p>
                </div>
                <div className='buttons'>
                    <div className='button da'>Да</div>
                    <div onClick={(e) => setActiveM(false)} className='button'>Нет</div>
                </div>
            </div>
        )
    }
    function Upload() {
        const options = {
            apiKey: "free",
            maxFileCount: 10
        };
        return(
            <UploadButton options={options}
                          onComplete={files => alert(files.map(x => x.fileUrl).join("\n"))}>
                {({onClick}) =>
                    <button onClick={onClick}>
                        Upload a file...
                    </button>
                }
            </UploadButton>
        )
    }

    return (
        <div className='file-manager'>
            <div className='file-buttons'>
                <div id='btn' className='button grey'><i className="fa-solid fa-upload"></i>Загрузить</div>
                <div id='btn' onClick={(e) => setActiveUploadM(true)} className='button'><i className="fa-solid fa-folder-plus"></i>Создать</div>
                {selectFile !== -2 ?
                    <>
                        <div id='btn' className='button'><i className="fa-solid fa-copy"></i>Копировать</div>
                        <div id='btn' className='button'><i className="fa-solid fa-file-export"></i>Переместить</div>
                        <div id='btn' onClick={(e) => setActiveM(true)} className='button'><i className="fa-solid fa-trash-arrow-up"></i>Удалить</div>
                        <div id='btn' className='button'><i className="fa-solid fa-file-pen"></i>Переименовать</div>
                        {selectFile !== 'dir' ?
                            <div id='btn' className='button'><i className="fa-solid fa-download"></i>Скачать</div>
                            :null}
                    </>
                    : null}
            </div>
            <div className='file-header'>
                <div className='file-path'>
                    <div className='l'>
                        <i onClick={() => selectPathHandler(0,'')} className="fa-solid fa-house"></i>
                        {path.length ? (
                            <div className='path'>
                                {path.map( (item,index) => (
                                    <div id='btn' className='path-item' key={index}>
                                        <i className="fa-solid fa-chevron-right ch"></i>
                                        <p id='btn' onClick={() =>selectPathHandler(item.parent,item.name)}>{item.name}</p>
                                    </div>
                                ))}
                            </div>

                        ) : ''}
                    </div>
                    <div className='r'>
                        <i onClick={(e) => setModeView(true)} className={`${modeView ? 'selected': ''} fa-solid fa-list`}></i>
                        <i onClick={(e) => setModeView(false)} className={`${modeView ? '': 'selected'} fa-solid fa-table-cells`}></i>
                    </div>
                </div>
            </div>
            {documents.length ?
                <div className={modeView ? 'files-list files' : 'files-table files'}>
                    {documents.map((item,index) => (
                        <div key={index} onDoubleClick={(e) => selectPathHandler(item.id,item.name)} onClick={() => setSelectFile(index)} className={`${selectFile === index ? 'selected' : ''} file`}>
                            <i className={`${selectFile !== index ? 'fa-regular':'fa-solid'} ${icons[item.type]}`}></i>
                            <p>{item.name}</p>
                        </div>
                    ))}
                    {!path.length ? (
                        <div onClick={() => setSelectFile(-1)} className={`${selectFile === -1 ? 'selected' : ''} file trash`}>
                            <i className="fa-solid fa-trash"></i>
                            <p>Корзина</p>
                        </div>
                    ): null}
                </div>
                :''}
            <ModalWin data={<Inmodal index={indexM}/>} active={activeM} setActive={setActiveM}/>

            <ModalWin data={<Upload />} active={activeUploadM} setActive={setActiveUploadM}/>


        </div>
    )
}
export default observer(FileManager)