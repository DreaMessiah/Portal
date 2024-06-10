import React, {useEffect, useRef, useState} from "react"
import LoadingSpinner from "../../components/loading/LoadingSpinner";
import AiService from "../../services/AiService";
import './chat.scss'
export default function Offerpost(){

    const [message, setMessage] = useState('')
    const [response, setResponse] = useState('')
    const [loading, setLoading] = useState(false)
    const [height,setHeight] = useState('20px')

    const textareaRef = useRef(null);

    const handleChange = (e) => {
        setMessage(e.target.value)
    }
    const sendMessage = async () => {
        try {
            setLoading(true)
        }catch (e) {
            console.log(e)
        }finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const textarea = textareaRef.current;
        const maxHeight = 200;
        const minHeight = 22; // Установите минимальную высоту

        // Сначала установим высоту в 'auto', чтобы textarea могла вычислить новую высоту
        textarea.style.height = 'auto';

        // Рассчитаем новую высоту, учитывая максимальную и минимальную высоты
        const newHeight = Math.min(Math.max(textarea.scrollHeight-20, minHeight), maxHeight);
        textarea.style.height = `${newHeight}px`;
    }, [message]);

    return (

                    <div className={'chat-gpt'}>
                        {/*<h1>Open AI</h1>*/}
                        <div>
                            <p>{response}</p>
                        </div>
                        <div className={'text-box'}>
                            <textarea ref={textareaRef}  rows="1" cols="50" value={message} onChange={handleChange} placeholder="Опишите новость"/>
                            <div onClick={sendMessage} className={`left-box`}><div className={`circle`}>{!loading ? <i className="fa-solid fa-arrow-up"></i> : <i className="fa-solid fa-hourglass-half"></i>}</div></div>
                        </div>
                        {loading ? (<LoadingSpinner/>) : null}
                    </div>


    )
}
