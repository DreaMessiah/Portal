import React from "react";
import {DatePicker, Stack} from "rsuite";
import 'rsuite/DatePicker/styles/index.css';
import './inputs.scss'
export default function TableDatePicker({placeholder,onChange,empty=false,index,value, size='100px',disabled=false}){
    return (
        <Stack style={{width:size,height:'auto',borderRadius:'none'}}  direction="column" alignItems="flex-start">
            <DatePicker style={{
                border:empty ? '3px solid rgba(215,26,0,0.5)' : "none",
                borderRadius:'0px',
                width:"100%",
                margin:'0',
                height:'auto',
                backgroundColor:'transparent',
                outline:"none",
                appearance:'none',
                ':hover': {
                    borderColor:'rgba(1, 1, 1, 1)',  // Замените цветом, который вы хотите видеть при наведении
                },
            }}
                        disabled={disabled}
                        value={value ? new Date(value) : new Date()}
                        size="md"
                        onChange={(e) => onChange(e,index)}
                        format="dd.MM.yyyy"
                        placeholder={placeholder.length ? placeholder : "dd.MM.yyyy"}/>
        </Stack>
    )
}