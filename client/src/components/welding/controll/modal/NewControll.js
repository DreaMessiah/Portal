import './newcontroll.scss'
import {useState, useEffect} from "react";

export const NewControll = () => {

    let arrConnectionList = [];
    const plusConnection = () => {

    }
    // const [arrConnection, setArrConnection] = useState([])
    // //
    useEffect(()=>{
        const controllList = document.getElementById('new_controll_list')
        let timeArrValues = {}
        const plusConnectionBtn = document.getElementById('plusConnection')
        plusConnectionBtn.addEventListener('click', () => {
            const inputsValue = document.querySelectorAll('.input_form')
            inputsValue.forEach(input => {
                timeArrValues[input.id] = input.value
            })
            arrConnectionList.push(timeArrValues)
            console.log(timeArrValues)
            if(arrConnectionList.length > 0) {
                controllList.insertAdjacentHTML('beforeend', `
                <div className='new_controll_list_this_strock'>
                    <div className='new_controll_list_this_strock_pp'>${arrConnectionList.length}</div>
                    <div className='new_controll_list_this_strock_number'>${timeArrValues.number}</div>
                    <div className='new_controll_list_this_strock_shifr'>${timeArrValues.shifr}</div>
                    <div className='new_controll_list_this_strock_date'>${timeArrValues.date}</div>
                    <div className='new_controll_list_this_strock_way'>${timeArrValues.way}</div>
                    <div className='new_controll_list_this_strock_access'>${timeArrValues.access}</div>
                    <div className='new_controll_list_this_strock_size'>${timeArrValues.size}</div>
                    <div className='new_controll_list_this_strock_tube'>${timeArrValues.tube}</div>
                </div>
                `)
            }
        })

    }, [])

    return (
        <div className='new_controll'>
            <div className='new_controll_form'>
                <div className='new_controll_form_title'>Новая заявка</div>
                <div className='new_controll_form_this'>
                    <div className='new_controll_form_this_strock'>
                        <div className='new_controll_form_this_strock_number'>№ Соединения</div>
                        <div className='new_controll_form_this_strock_shifr'>Клеймо звена</div>
                        <div className='new_controll_form_this_strock_date'>Дата сварки</div>
                        <div className='new_controll_form_this_strock_way'>Способ сварки и положение</div>
                        <div className='new_controll_form_this_strock_access'>Доступ к сварному соединению</div>
                        <div className='new_controll_form_this_strock_size'>Размер св.соединения Тип св.соединения</div>
                        <div className='new_controll_form_this_strock_tube'>Зав. № труб (деталей)</div>
                    </div>
                    <div className='new_controll_form_this_strock'>
                        <div className='new_controll_form_this_strock_number'><input className='input_form' id='number' type="text" /></div>
                        <div className='new_controll_form_this_strock_shifr'><input className='input_form' id='shifr' type="text" /></div>
                        <div className='new_controll_form_this_strock_date'><input className='input_form' id='date' type="text" /></div>
                        <div className='new_controll_form_this_strock_way'><input className='input_form' id='way' type="text" /></div>
                        <div className='new_controll_form_this_strock_access'><input className='input_form' id='access' type="text" /></div>
                        <div className='new_controll_form_this_strock_size'><input className='input_form' id='size' type="text" /></div>
                        <div className='new_controll_form_this_strock_tube'><input className='input_form' id='tube' type="text" /></div>
                    </div>
                </div>
                <div className='new_controll_form_btns'>
                    <div className='new_controll_form_btns_insert' id='plusConnection'>Добавить</div>
                    <div className='new_controll_form_btns_create'>Создать</div>
                    <div className='new_controll_form_btns_create_noactive'>Создать</div>
                </div>
            </div>
            <div className='new_controll_list' id='new_controll_list'>
                <div className='new_controll_list_this_strock_up'></div>
                <div className='new_controll_list_this_strock'>
                    <div className='new_controll_list_this_strock_pp'>1</div>
                    <div className='new_controll_list_this_strock_number'>№ Соединения</div>
                    <div className='new_controll_list_this_strock_shifr'>Клеймо звена</div>
                    <div className='new_controll_list_this_strock_date'>Дата сварки</div>
                    <div className='new_controll_list_this_strock_way'>Способ сварки и положение</div>
                    <div className='new_controll_list_this_strock_access'>Доступ к сварному соединению</div>
                    <div className='new_controll_list_this_strock_size'>Размер св.соединения Тип св.соединения</div>
                    <div className='new_controll_list_this_strock_tube'>Зав. № труб (деталей)</div>
                </div>
            </div>
        </div>
    )
}