import React, {useRef, useState,useContext} from "react";
import FilesService from "../../services/FilesService";
import CircularProgress from "../CircularProgress";
import {DataContext} from "../../context/DataContext";
import {useMessage} from "../../hooks/message.hook";
import './inputs.scss'
import onDocument from "../functions/onDocument";
export default function FileInput({files,setFiles,empty}){
    const {icons} = useContext(DataContext)
    const [dragEnter,setDragEnter] = useState(false)
    const [progress,setProgress] = useState(0)
    const filesInputRef = useRef({})
    const message = useMessage()

    function dragEnterHandler(event){
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(true)
    }
    function dragLeaveHandler(event){
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(false)
    }
    function dropHandler(event){
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(false)
        selectFilesHandler(event,[...event.dataTransfer.files])
    }
    const handleUploadProgress = (progressEvent,name) => {
        const percentCompleted = (progressEvent.loaded / progressEvent.total)
        setProgress(prevState => ({
            ...prevState,
            [name]: percentCompleted,
        }))
    }

    const selectFilesHandler = async (e,drop = null) => {
        let selectedFiles
        if(drop===null){
            selectedFiles = Array.from(e.target.files)
        }
        else selectedFiles = drop
        setFiles(selectedFiles)
        let index = 0
        for (const file of selectedFiles) {
            try{
                if(onDocument(file.name)){
                    const response = await FilesService.uploadTaskFiles(file, (progressEvent) => handleUploadProgress(progressEvent, file.name))
                    if (response.data) {
                        console.log(response.data)
                    }
                }else{
                    const errFiles = [...selectedFiles]
                    errFiles[index].err = 'Неподдерживаемый фомат файла'
                    setFiles(errFiles)
                }
            }catch (e){
                console.log(e+': Проблема загрузки списка документов')
            }
            index++
        }

    }
    const deleteFileHandler = async (index) => {
        try{
            const response = await FilesService.deleteFile(files[index].name)
            const newFiles = [...files]
            newFiles.splice(index, 1);
            setFiles(newFiles)

            console.log(response.data)
        }catch (e) {
            console.log(e+': Проблема удаления')
        }
    }
    return (
        <>
            {files && files.length ? (
                <div className={`files-box`}>
                    <div className='files-list files '>
                        {Array.from(files).map((item,index) => (
                            <div key={index} className={`file list`}>
                                <div className='l'>
                                    <i className={`fa-regular fa-file-lines ${icons[item.name.split('.').pop()]}`}></i>
                                    <p>{item.name}<span> {item.err}</span></p>
                                </div>
                                <div className='l'>
                                    <CircularProgress color={`${item.err ? 'red' : ''}`} progress={progress[item.name] ? progress[item.name] : 0}/>
                                    <i onClick={(e) => deleteFileHandler(index)} className="fa-solid fa-xmark del"></i>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div onClick={(e) => filesInputRef.current.click()} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler} onDrop={dropHandler} className={`draganddrop files-box upload ${empty && 'red-dotted-border'}`}>
                    <div className='upload-button'>{dragEnter ? <i className="fa-solid fa-upload"></i> : <i className="fa-solid fa-upload"></i>}
                        <input onChange={(e) => selectFilesHandler(e)} multiple ref={filesInputRef} className='hidden-upload' type='file'/>
                        <div>Здесь вы можете загрузить документы и изображения</div>
                    </div>
                </div>
            )}
        </>
    )
}
