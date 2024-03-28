import React, {useRef, useState} from 'react'
import './inputs.scss'
const FileInput = ({image='',path='',empty=false,check=''}) => {
    const fileRef = useRef()
    const uploadFile = async (event) => {
        try{

        }catch (e) {
            console.log(e?.message)
        }
    }
    return (
        <div style={image.length ? {backgroundImage: `url(/files/${image})`} : {}}
             onClick={(e) => fileRef.current.click()}
             className={`create_new_post_worklist_mainimg ${empty[106] ? 'red-border' : ''}`}>
            <i className="fa-solid fa-upload"></i>
            <input onChange={(e) => uploadFile(e)} ref={fileRef} className='hidden-upload' type='file'/>
        </div>

    )
}

export default FileInput