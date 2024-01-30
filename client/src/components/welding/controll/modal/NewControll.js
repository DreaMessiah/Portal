import './newcontroll.scss'

export const NewControll = () => {
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
                        <div className='new_controll_form_this_strock_number'><input type="text" /></div>
                        <div className='new_controll_form_this_strock_shifr'><input type="text" /></div>
                        <div className='new_controll_form_this_strock_date'><input type="text" /></div>
                        <div className='new_controll_form_this_strock_way'><input type="text" /></div>
                        <div className='new_controll_form_this_strock_access'><input type="text" /></div>
                        <div className='new_controll_form_this_strock_size'><input type="text" /></div>
                        <div className='new_controll_form_this_strock_tube'><input type="text" /></div>
                    </div>
                </div>
                <div className='new_controll_form_btns'></div>
            </div>
            <div className='new_controll_list'></div>
        </div>
    )
}