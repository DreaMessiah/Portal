import React from "react";
import Select from "react-select";

export default function CmsSelect({placeholder,defaultValue,options,onChange,empty = false,width='100%'}){
    return (
        <Select
            placeholder={placeholder}
            defaultValue={defaultValue}
            options={options}
            onChange={(e) => onChange(e)}

            styles={{
                container:(baseStyles, state) => ({
                    ...baseStyles,
                    width:width,
                }),
                option: (baseStyles, state) => ({
                    ...baseStyles,
                    color: 'rgba(33, 33, 33, 1)',
                    backgroundColor: 'rgba(255, 255, 255, 1)',
                    fontFamily:'Montserrat, sans-serif',
                    textTransform:'uppercase',
                    fontSize:'0.7rem',
                    fontWeight:'600',
                }),
                indicatorsContainer:(baseStyles, state) => ({
                    display:'none',
                }),
                control: (baseStyles, state) => ({
                    ...baseStyles,
                    backgroundColor: 'rgba(255, 255, 255, 1)',
                    borderWidth:'3px',
                    borderStyle:'dotted',
                    borderRadius:'10px',
                    borderColor:empty ? 'rgba(215,26,0,0.5)' : 'rgba(180, 180, 180, 1)',
                    height:'40px',
                    width:'100%',
                    marginBottom:'10px',
                    outline: 'none',
                    appearance:'none',
                    div: {
                        fontFamily:'Montserrat, sans-serif',
                        textTransform:'uppercase',
                        fontSize:'0.7rem',
                        fontWeight:'600',
                        color: 'rgba(180, 180, 180, 1) !important', // Устанавливаем цвет текста внутри input
                    },
                    ':hover': {
                        borderColor:'rgba(180, 180, 180, 1)',  // Замените цветом, который вы хотите видеть при наведении
                    },
                    ':focus-within': {
                        color:'rgba(180, 180, 180, 1)',
                        outline: 'none',
                        boxShadow: 'none',
                    }
                }),
            }}
        />
    )
}