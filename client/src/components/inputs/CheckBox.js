import React from "react";

export default function CheckBox({checked,onChange,label}){
    return(
        <label style={{margin:'15px'}} className="checkbox-container">
            <input type="checkbox" checked={checked} onChange={(e) => onChange(!checked)} />
            <span className="checkmark"></span>
            <p style={{marginTop:'5px'}}>{label}</p>
        </label>
        )
}
