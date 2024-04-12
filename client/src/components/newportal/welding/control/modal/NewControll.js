import './newcontroll.scss'
import {useState, useEffect} from "react";

export const NewControll = ({list, active, setActive}) => {

    let arrConnectionList = [];
    let timeArrValues = {}
    const plusConnection = () => {

    }
    const [arrConnection, setArrConnection] = useState(false)
    const [defs, setDefs] = useState([])

    const pushController = (push) => {


        const controllList = document.getElementById('new_controll_list')
        const createBtn = document.getElementById('plusBtn')

        if(push) {

            const inputsValue = document.querySelectorAll('.input_form')
            inputsValue.forEach(input => {
                console.log(input.value)
                timeArrValues[input.id] = input.value
                input.value = ''
            })
            arrConnectionList.push(timeArrValues)

            controllList.insertAdjacentHTML('beforeend', `
            <div class='new_controll_list_this_strock'>
                <div class='new_controll_list_this_strock_pp'>${arrConnectionList.length}</div>
                <div class='new_controll_list_this_strock_number'>${timeArrValues.number}</div>
                <div class='new_controll_list_this_strock_shifr'>${timeArrValues.shifr}</div>
                <div class='new_controll_list_this_strock_date'>${timeArrValues.date}</div>
                <div class='new_controll_list_this_strock_way'>${timeArrValues.way}</div>
                <div class='new_controll_list_this_strock_access'>${timeArrValues.access}</div>
                <div class='new_controll_list_this_strock_size'>${timeArrValues.size}</div>
                <div class='new_controll_list_this_strock_tube'>${timeArrValues.tube}</div>
            </div>
            `)


        }

        if(arrConnectionList.length > 0) {
            createBtn.classList = 'new_controll_form_btns_create'
        }  else {
            createBtn.classList = 'new_controll_form_btns_create_noactive'
        }


    }

    const createStrockControll = () => {
        const controllList = document.getElementById('new_controll_list')
        setActive(false)
        list.insertAdjacentHTML('afterend', `
                    <div class="controll_welding_list_strock">
                        <div class="controll_welding_list_strock_pp">1</div>
                        <div class="controll_welding_list_strock_num">А4654864</div>
                        <div class="controll_welding_list_strock_date">28-01-2024</div>
                        <div class="controll_welding_list_strock_total">${arrConnectionList.length}</div>
                        <div class="controll_welding_list_strock_autor">Аббасов Артур Яшарович</div>
                        <div class="controll_welding_list_strock_obj">390</div>
                        <div class="controll_welding_list_strock_status">Новая</div>
                        <div class="controll_welding_list_strock_comm">нет</div>
                        <div class="controll_welding_list_strock_editor">
                            <div class="controll_welding_list_strock_editor_open">Открыть</div>
                            <div class="controll_welding_list_strock_editor_del"></div>
                        </div>
                    </div>
                `)
        // console.log(list)
        controllList.innerHTML = ''
        //
console.log(defs)
        const olddef = defs + arrConnectionList
        setDefs([olddef])
        arrConnectionList = []



        timeArrValues = {}
    }

    useEffect(() => {
// console.log(defs)
        },[defs])

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
                    <div className='new_controll_form_btns_insert' id='plusConnection' onClick={()=>{pushController(true)}}>Добавить</div>
                    <div className='new_controll_form_btns_create_noactive' id='plusBtn' onClick={()=>createStrockControll()}>Создать</div>
                </div>
            </div>
            <div className='new_controll_list'>
                <div className='new_controll_list_this_strock_up' id='cap_list'></div>
                <div className='new_controll_list_this_strock' id='title_list'>
                    <div className='new_controll_list_this_strock_pp'>П/П</div>
                    <div className='new_controll_list_this_strock_number'>№ Соединения</div>
                    <div className='new_controll_list_this_strock_shifr'>Клеймо звена</div>
                    <div className='new_controll_list_this_strock_date'>Дата сварки</div>
                    <div className='new_controll_list_this_strock_way'>Способ сварки и положение</div>
                    <div className='new_controll_list_this_strock_access'>Доступ к сварному соединению</div>
                    <div className='new_controll_list_this_strock_size'>Размер св.соединения Тип св.соединения</div>
                    <div className='new_controll_list_this_strock_tube'>Зав. № труб (деталей)</div>
                </div>
                <div className='new_controll_list' id='new_controll_list'></div>
            </div>
        </div>
    )
}