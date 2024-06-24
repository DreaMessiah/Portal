import React from 'react';

import Select, { components } from 'react-select';
const CustomOption = (props) => {
    return (
        <components.Option {...props}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div
                    alt={props.data.label}
                    style={{ width: 50, height: 50, marginRight: 10,borderRadius:50,backgroundImage:`url('/files/profile/${props.data.avatar ? props.data.avatar : 'face.png' }')`,backgroundRepeat:'no-repeat',backgroundSize:"cover",backgroundPosition:'center' }}
                />
                {props.data.label}
            </div>
        </components.Option>
    )
}
export default function MessagesMultySelect({values=[],options,setOptions,disable = false,empty=false,heigth='auto',radius='0',placeholder='Выберете людей...'}){
    return (
        <>
            <Select
                isMulti
                onChange={(e) => setOptions(e)}
                value={values}
                options={options}
                placeholder={placeholder}
                className={`basic-multi-select ${empty && 'red-solid-select-border'} ${disable && 'disable-select'}`}
                classNamePrefix="select"
                isDisabled={disable}
                components={{ Option: CustomOption }} // Указание кастомного компонента
                styles={{
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
                        height:heigth,
                        backgroundColor: 'transparent',
                        borderWidth:'0',
                        borderStyle:'solid',
                        borderRadius:radius,
                        borderColor:'rgba(180, 180, 180, 1)',
                        borderBottom:'1px solid #ddd',
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

        </>

    )
}