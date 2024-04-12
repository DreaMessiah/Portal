import React from 'react'

const TextInput = ({empty=false,text,setText,label='',placeholder=''}) => {
    const handleChange = (event) => {
        setText(event.target.value)
    }
    return (
        <div className={`text-input-container`}>
            <label>{label}</label>
            <input
                type="text"
                value={text}
                onChange={handleChange}
                placeholder={placeholder}
                className={`text-input ${empty && 'red-solid-border'}`}
            />
        </div>

    )
}

export default TextInput