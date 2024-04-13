import React, { useState } from 'react';

function KtuInput({classes='input',index,value,setValue}) {
    const handleChange = (event) => {
        console.log(event.target.value)
        let newValue = parseFloat(event.target.value); // Преобразуем введенное значение в число

        if (newValue <= 0) {
            newValue = '0';
        } else if (newValue > 2) {
            newValue = 2;
        }
        setValue(newValue,index)
    }
    return (
        <>
            <input
                type="number"
                step="0.01"
                min="0"
                max="2"
                className={classes}
                value={value}
                onChange={(e) => handleChange(e)}
                style={{appearance:'none'}}
            />
        </>
    )
}

export default KtuInput;