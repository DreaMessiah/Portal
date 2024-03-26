import React from 'react'

const PhoneInput = ({empty=false,mail,setMail}) => {
    const handleChange = (event) => {
        setMail(event.target.value)
    }
    return (
        <input
            type="email"
            value={mail}
            onChange={handleChange}
            placeholder="mail@mail.ru"
            className={`${empty && 'red-solid-border'}`}
        />
    )
}

export default PhoneInput