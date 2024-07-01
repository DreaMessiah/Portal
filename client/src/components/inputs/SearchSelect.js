import React, {useEffect, useState} from "react";
import Select, {components} from "react-select";
import './inputs.scss'

const CustomOption = (props) => {
    return (
        <components.Option {...props}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div
                    alt={props.data.label}
                    style={{ width: 50, height: 50, marginRight: 10,borderRadius:50,backgroundImage:`url('/files/profile/${props.data.avatar ? props.data.avatar : 'face.png' }')`,backgroundRepeat:'no-repeat',backgroundSize:"cover",backgroundPosition:'center' }}
                />
                {props.data.socket ? <span className={`green-circle1`}></span> : null}
                {props.data.label}

            </div>
        </components.Option>
    )
}
export default function SearchSelect({value,placeholder,defaultValue,online,options,onChange,empty = false,height='100%',width='100%',radius='10px'}){
    const updatedOptions = options ? options.map(option => ({ ...option, key: option.tn, socket: online ? online.includes(option.tn) : null })) : null

    return (
        <>
            <i className="selecticon fa-solid fa-magnifying-glass"></i>
            <Select
                placeholder={placeholder}
                defaultValue={defaultValue}
                value={value}
                options={updatedOptions}
                onChange={(e) => onChange(e)}
                components={{ Option: CustomOption }} // Указание кастомного компонента
                styles={{
                    container:(baseStyles, state) => ({
                        ...baseStyles,
                        width:width,
                        height:height,
                    }),
                    option: (baseStyles, state) => ({
                        ...baseStyles,
                        color: 'rgba(33, 33, 33, 1)',
                        backgroundColor: 'transparent',
                        fontFamily:'Montserrat, sans-serif',
                        textTransform:'uppercase',
                        fontSize:'0.7rem',
                        fontWeight:'600',
                        cursor:'pointer',
                    }),
                    indicatorsContainer:(baseStyles, state) => ({
                        display:'none',
                    }),
                    menu: (baseStyles, state) => ({
                        ...baseStyles,
                        marginTop:'0',
                        //width:'150%'
                    }),
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        display:'flex',
                        alignItems:'center',
                        backgroundColor: 'transparent',
                        borderWidth:'0',
                        borderStyle:'solid',
                        borderRadius:radius,
                        borderColor:empty ? 'rgba(215,26,0,0.5)' : 'rgba(180, 180, 180, 1)',
                        height:'50px',
                        width:'100%',
                        marginBottom:'0',
                        outline: 'none',
                        appearance:'none',
                        cursor:'pointer',
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