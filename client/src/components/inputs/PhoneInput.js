import React, {useEffect, useState} from 'react'

const PhoneInput = ({empty=false,phone,setPhone}) => {
    const handleChange = (event) => {
        const value = event.target.value
        const cleanNumber = value.replace(/\D+/g, '')
        let formattedNumber = '+7 '
        if (cleanNumber.length > 1) {
            formattedNumber += cleanNumber.slice(1)
                .replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4')
                .trim()
        }
        if (formattedNumber.length <= 16) {
            setPhone(formattedNumber)
        }
    }
    return (
        <input
            type="tel"
            value={phone}
            onChange={handleChange}
            placeholder="+7 XXX XXX XX XX"
            className={`${empty && 'red-solid-border'}`}
        />
    )
}

export default PhoneInput