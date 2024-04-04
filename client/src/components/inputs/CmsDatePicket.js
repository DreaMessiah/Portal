import React from "react";
import {DatePicker, Stack} from "rsuite";
import 'rsuite/DatePicker/styles/index.css';
import './inputs.scss'
export default function CmsDatePicket({placeholder,onChange,empty=false}){
    return (
        <Stack style={{width:"100%"}} spacing={10} direction="column" alignItems="flex-start">
            <DatePicker style={{
                border:"3px dotted #aaa",
                borderColor:empty ? 'rgba(215,26,0,0.5)' : "#aaa",
                borderRadius:"10px",
                width:"100%",
                outline:"none",
                appearance:'none',

                ':hover': {
                    borderColor:'rgba(1, 1, 1, 1)',  // Замените цветом, который вы хотите видеть при наведении
                }
            }}
                        size="md"
                        onChange={(e) => onChange(e)}
                        format="dd.MM.yyyy"
                        placeholder={placeholder}/>
        </Stack>
    )
}