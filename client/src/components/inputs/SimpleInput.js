import React, {useRef, useState,useContext} from "react";
import FilesService from "../../services/FilesService";
import CircularProgress from "../OldComponents/old/CircularProgress";
import {DataContext} from "../../context/DataContext";
import {useMessage} from "../../hooks/message.hook";
import './inputs.scss'
import onDocument from "../functions/onDocument";
export default function SimpleInput({file, doc ,setFile, group, setGroup, empty, name}){
    const [progress,setProgress] = useState(0)
    const filesInputRef = useRef({})
    const message = useMessage()
    const handleUploadProgress = (progressEvent,name) => {
        const percentCompleted = (progressEvent.loaded / progressEvent.total)
        setProgress(prevState => ({
            ...prevState,
            [name]: percentCompleted,
        }))
    }

    const selectFilesHandler = async (e) => {
        const selectedFiles = e.target.files[0]
        console.log(selectedFiles)
        const thisfile = selectedFiles

        try{
            if(onDocument(selectedFiles.name)){
                const response = await FilesService.uploadTaskFiles(selectedFiles, (progressEvent) => handleUploadProgress(progressEvent, selectedFiles.name))
                if (response.data) {
                    console.log(response.data)
                    thisfile.docindex = doc.index
                    thisfile.docdesc = doc.desc
                    const newgroup = group
                    newgroup.push(thisfile)
                    setGroup(newgroup)
                }
                selectedFiles.err = false
                setFile(selectedFiles)
            }else{
                message('Неподдерживаемый фомат файла')
                // const errFiles = [...selectedFiles]
                // errFiles[index].err = 'Неподдерживаемый фомат файла'
                setFile({err:true})
            }
        }catch (e){
            console.log(e+': Проблема загрузки списка документов')
        }

    }
    // const deleteFileHandler = async (index) => {
    //     try{
    //         const response = await FilesService.deleteFile(file[index].name)
    //         const newFiles = [...file]
    //         newFiles.splice(index, 1);
    //         setFile(newFiles)
    //
    //         console.log(response.data)
    //     }catch (e) {
    //         console.log(e+': Проблема удаления')
    //     }
    // }
    return (
        <div className="glass_board_body_docs_set">
            <div className="glass_board_body_docs_set_name">
                <div className="glass_board_body_docs_set_name_title">{name}</div>
                <div className="glass_board_body_docs_set_name_docname">*не загружено...</div>
                <input onChange={(e) => selectFilesHandler(e)} ref={filesInputRef} className='hidden-upload' type='file'/>
            </div>
            <div className="glass_board_body_docs_set_btn" onClick={(e) => filesInputRef.current.click()}>
                {/*<CircularProgress color={`${file.err ? 'red' : ''}`} progress={progress[file.name] ? progress[file.name] : 0}/>*/}
                <i className="fa-solid fa-circle-plus"/>
            </div>
        </div>
        // <>
        //     {files && files.length ? (
        //         <div className={`files-box`}>
        //             <div className='files-list files '>
        //                 {Array.from(files).map((item,index) => (
        //                     <div key={index} className={`file list`}>
        //                         <div className='l'>
        //                             <i className={`fa-regular fa-file-lines ${icons[item.name.split('.').pop()]}`}></i>
        //                             <p>{item.name}<span> {item.err}</span></p>
        //                         </div>
        //                         <div className='l'>
        //                             <CircularProgress color={`${item.err ? 'red' : ''}`} progress={progress[item.name] ? progress[item.name] : 0}/>
        //                             <i onClick={(e) => deleteFileHandler(index)} className="fa-solid fa-xmark del"></i>
        //                         </div>
        //                     </div>
        //                 ))}
        //             </div>
        //         </div>
        //     ) : (
        //         <div onClick={(e) => filesInputRef.current.click()} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler} onDrop={dropHandler} className={`draganddrop files-box upload ${empty && 'red-dotted-border'}`}>
        //             <div className='upload-button'>{dragEnter ? <i className="fa-solid fa-upload"></i> : <i className="fa-solid fa-upload"></i>}
        //                 <input onChange={(e) => selectFilesHandler(e)} multiple ref={filesInputRef} className='hidden-upload' type='file'/>
        //                 <div>Здесь вы можете загрузить документы и изображения</div>
        //             </div>
        //         </div>
        //     )}
        // </>
    )
}
