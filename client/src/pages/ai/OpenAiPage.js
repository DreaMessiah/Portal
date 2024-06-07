import React, {useEffect, useRef, useState} from "react"
import {MainHeader} from "../../components/header/Mainheader"
import {Mainnavbar} from "../../components/navbar/Mainnavbar"
import LoadingSpinner from "../../components/loading/LoadingSpinner";
import AiService from "../../services/AiService";
import './chat.scss'
export default function OpenAiPage(){

    const [message, setMessage] = useState('')
    const [response, setResponse] = useState('')
    const [loading, setLoading] = useState(false)
    const [height,setHeight] = useState('20px')

    const textareaRef = useRef(null);

    const handleChange = (e) => {
/*
        const textareaLineHeight = 22; // Можете настроить это значение в зависимости от стилей вашего textarea
        const previousRows = e.target.rows;
        console.log(e.target.scrollHeight-20)
        e.target.rows = 1; // Сначала установим количество строк в 1, чтобы textarea мог вычислить новую высоту
        const currentRows = Math.ceil((e.target.scrollHeight-20) / textareaLineHeight);
        e.target.rows = currentRows;
        let newHeight = `${currentRows * textareaLineHeight}px`;

        // Установка высоты с учетом ограничения до 200 пикселей
        if (currentRows * textareaLineHeight > 200) {
            newHeight = '200px';
        }
*/

        //setHeight(newHeight);
        setMessage(e.target.value);

        // Проверка изменения количества строк
/*        if (currentRows !== previousRows) {
            window.scrollTo({
                top: e.target.offsetTop,
                behavior: 'smooth',
            });
        }*/
        setMessage(e.target.value)
    }
    const sendMessage = async () => {
        try {
            setLoading(true)
            const {data} = await AiService.sendMessage(message)
            console.log(data)
            setResponse(data.response)
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
        <div className='new_container'>
            <div className="up_path"><MainHeader /></div>
            <div className="main_path">
                <Mainnavbar />
                <div className="workpage_block">
                    <div className={'chat-gpt'}>
                        <h1>Open AI</h1>
                        <div>
                            <p>{response}</p>
                        </div>
                        <div className={'text-box'}>
                            <div className={`rigth-box`}><div className={`circle unactive`}><i className="fa-solid fa-paperclip"></i></div></div>
                            <textarea ref={textareaRef}  rows="1" cols="50" value={message} onChange={handleChange} placeholder="Напишите свой вопрос"/>
                            <div onClick={sendMessage} className={`left-box`}><div className={`circle`}>{!loading ? <i className="fa-solid fa-arrow-up"></i> : <i className="fa-solid fa-hourglass-half"></i>}</div></div>
                        </div>
                    </div>

                </div>
            </div>
            {loading ? (<LoadingSpinner/>) : null}
        </div>

    )
}
