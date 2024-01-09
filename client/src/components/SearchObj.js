import React, {useState} from "react";

export default function SearchObj(){
    const [input, setInput] = useState('');

    const handleInputChange = (event) => {
        setInput(event.target.value)
    }

    return (
        <div id='search'>
            <input type="text" placeholder='Поиск' value={input} onChange={handleInputChange} autoComplete="off"/>
            <div/>
        </div>
    )
}
