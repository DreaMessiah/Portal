import React, {useContext, useEffect, useRef, useState} from "react";
import {observer} from "mobx-react-lite";
import FilesService from "../../services/FilesService";
import {DataContext} from "../../context/DataContext";
import "../../components/listtasks/listtask3.scss";
import {useMessage} from "../../hooks/message.hook";
import {Context} from "../../index";
import {ModalWin} from "../../components/modalwin/ModalWin";

import ModalUpload from "../../components/modalwin/ModalUpload";
import CircularProgress from "../../components/CircularProgress";

function FileManager(){
    const {icons} = useContext(DataContext)
    const {store} = useContext(Context)
    const [documents,setDocuments] = useState([])
    const [modeView,setModeView] = useState(true)
    const [selectFile,setSelectFile] = useState(-2)
    const [path,setPath] = useState([])
    const [parentId,setParentId] = useState(0)
    const [activeM,setActiveM] = useState(false)
    const [indexM,setIndexM] = useState()
    const [activeUploadM,setActiveUploadM] = useState(false)
    const [files, setFiles] = useState([])
    const [progress, setProgress] = useState({});
    const filesInputRef = useRef(null)

    const message = useMessage()
    const rule = 3

    const loadingHandler = async () => {
        try{
            const response = await FilesService.fetchFiles(store.user.id,0)
            setParentId(0)
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
            setParentId(parent)
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
        const handleUploadProgress = (progressEvent,name) => {
            const percentCompleted = (progressEvent.loaded / progressEvent.total)
            console.log(percentCompleted)
            setProgress(prevState => ({
                ...prevState,
                [name]: percentCompleted,
            }))
        }

        const selectFilesHandler = async (e) => {
            const selectedFiles = e.target.files
            setFiles(selectedFiles)

            for (const file of selectedFiles) {
                try{
                    const response = await FilesService.uploadFile(file,store.user.id,parentId,(progressEvent) => handleUploadProgress(progressEvent, file.name))
                    if(response.data){
                        console.log(response.data)
                    }
                }catch (e){
                    console.log(e+': Проблема загрузки списка документов')
                }
            }
        }
        const pro = 0.6
        return(
            <>
                {files.length ? (
                    <div className='files-list files'>
                        {Array.from(files).map((item,index) => (
                            <div key={index} className={`file list`}>
                                <div className='l'>
                                    <i className={`${selectFile !== index ? 'fa-regular':'fa-solid'} fa-file-lines ${icons[item.name.split('.').pop()]}`}></i>
                                    <p>{item.name}</p>
                                </div>
                                <div className='l'>
                                    <CircularProgress progress={progress[item.name] ? progress[item.name] : 0}/>
                                    <i className="fa-solid fa-xmark del"></i>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className='draganddrop'>
                        <div onClick={(e) => filesInputRef.current.click()} className='upload-button'>Выберите файлы
                            <input onChange={(e) => selectFilesHandler(e)} multiple ref={filesInputRef} className='hidden-upload' type='file'/>
                        </div>
                    </div>
                )}
            </>
        )
    }
    return (
        <div className='file-manager' onClick={(e) => console.log(path)}>
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

            <div className={modeView ? 'files-list files' : 'files-table files'}>
            {path.length ? (
                <div onClick={(e) => setSelectFile(-3)} onDoubleClick={(e) => selectPathHandler(path[path.length-2] ? path[path.length-2].parent : 0,path[path.length-2] ? path[path.length-2].name : '')} className={`file back`}>
                    <i className="fa-regular fa-circle-left"></i>
                    <p>Назад</p>
                </div>
            ) : null}
            {documents.length ?
                <>
                    {documents.map((item,index) => (
                        <div key={index} onDoubleClick={(e) => selectPathHandler(item.id,item.name)} onClick={() => setSelectFile(index)} className={`${selectFile === index ? 'selected' : ''} file`}>
                            <i className={`${selectFile !== index ? 'fa-regular':'fa-solid'} fa-file-lines ${icons[item.type]}`}></i>
                            <p>{item.name}</p>
                        </div>
                    ))}
                    {!path.length ? (
                        <div onClick={() => setSelectFile(-1)} className={`${selectFile === -1 ? 'selected' : ''} file trash`}>
                            <i className="fa-solid fa-trash"></i>
                            <p>Корзина</p>
                        </div>
                    ): null}
                </>
                :''}
            </div>
            <ModalWin data={<Inmodal index={indexM}/>} active={activeM} setActive={setActiveM}/>

            <ModalUpload data={<Upload />} active={activeUploadM} setActive={setActiveUploadM}/>


        </div>
    )
}
export default observer(FileManager)