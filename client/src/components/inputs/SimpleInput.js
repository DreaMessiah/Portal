import React, {useRef, useState,useContext} from "react";
import FilesService from "../../services/FilesService";
import CircularProgress from "../OldComponents/old/CircularProgress";
import {DataContext} from "../../context/DataContext";
import {useMessage} from "../../hooks/message.hook";
import './inputs.scss'
import onDocument from "../functions/onDocument";
import {Context} from "../../index";
export default function SimpleInput({program, file, doc ,setFile, group, progress,setProgress, setGroup, empty, name}){

    const filesInputRef = useRef({})
    const message = useMessage()
    const  {store} = useContext(Context)
    const folder = store.user.id

    const handleUploadProgress = (progressEvent,name) => {
        const percentCompleted = (progressEvent.loaded / progressEvent.total)
        setProgress(prevState => ({
            ...prevState,
            [name]: percentCompleted,
        }))
    }
    const [loadfile, setLoadfile] = useState(undefined)
    const selectFilesHandler = async (e) => {
        const selectedFiles = e.target.files[0]
        console.log(selectedFiles)
        const thisfile = selectedFiles
        setLoadfile(doc.desc)
        try{
            if(onDocument(selectedFiles.name)){
                const response = await FilesService.uploadTaskFiles(selectedFiles, (progressEvent) => handleUploadProgress(progressEvent, selectedFiles.name))
                if (response.data) {
                    console.log(response.data)
                    thisfile.docindex = doc.index
                    thisfile.docdesc = doc.desc
                    thisfile.docname = selectedFiles.name
                    thisfile.folder = program.id

                    const newgroup = group
                    newgroup.push(thisfile)
                    setGroup(newgroup)
                    setLoadfile(undefined)
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
    const deleteFileHandler = async (index) => {
        try{
            const response = await FilesService.deleteFile(group[index].name)
            const newGroup = [...group]
            newGroup.splice(index, 1);
            setGroup(newGroup)

            console.log(response.data)
        }catch (e) {
            console.log(e+': Проблема удаления')
        }
    }

    let i = 0
    return (
        <div className="glass_board_body_docs_set">
            <div className="glass_board_body_docs_set_name">
                <div className="glass_board_body_docs_set_name_title">{name}</div>
                <div className="glass_board_body_docs_set_name_docname">
                { group.map((doc, index)=>{ if(doc.docdesc === name){ i++; return(
                    <div key={index} className="glass_board_body_docs_set_name_docname_this"><div className='del-this'><i className="fa-solid fa-xmark"  onClick={()=>deleteFileHandler(index)}/></div> {(doc.name.split('.')[0].length>10)?doc.name.split('.')[0].slice(0,7)+'..'+doc.name.split('.')[0].slice(-2)+'.'+doc.name.split('.')[1]:doc.name}</div>
                )}})}
                {(i===0)&&'*не загружено...'}
                </div>
                <input onChange={(e) => selectFilesHandler(e)} ref={filesInputRef} className='hidden-upload' type='file'/>
            </div>
            <div className="glass_board_body_docs_set_btn" onClick={(e) => filesInputRef.current.click()}>
                <CircularProgress color={`${(file && file.err) ? 'red' : ''}`} progress={(file && loadfile === name && progress[file.name]) ? progress[file.name] : 0}/>
                <i className="fa-solid fa-circle-plus" style={(file && loadfile === name)?{display:'none'}:{display:'flex'}}/>
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
