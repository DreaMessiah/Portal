import React,{useContext,useState} from "react";
import "./wel.scss"
import CheckBox from "../../components/inputs/CheckBox";
import {Context} from "../../index";
import {useMessage} from "../../hooks/message.hook";
import {Link, useLocation} from "react-router-dom";

export function Welcomepage(){
    const {store} = useContext(Context)
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search);
    const ok = !!searchParams.get('ok')

    const message = useMessage()
    const [onCheck,setOnCheck] = useState(ok)

    const submitHandler = async event => {
        try {
            event.preventDefault()
            if(onCheck){
                const promise = await store.setFz152(store.user.tn)
                if(promise?.response?.data?.message){
                    message(promise.response.data.message)
                }else {
                    message('Добро пожаловать! Теперь пройдите авторизацию. ')
                }
            }
        }catch (e) {
            console.log(e)
        }
    }

    return (
        <div className='welcomepage'>
            <div className='imgback'>
                <div className='welcomepage_white'>
                    <div className="welcomepage_white_mess">
                        <b>{store.uni.gender === 'Мужской' ? 'Уважаемый' : 'Уважаемая' } {store.uni.name}</b>,<br/>
                        С большим удовольствием обращаюсь к каждому из Вас через наш корпоративный портал, который станет важным инструментом цифровизации производственных процессов и послужит надежным, оперативным каналом для формирования и функционирования устойчивой системы взаимосвязи, где готовы услышать каждого.  Технический прогресс и инновации помогли нам по-новому взглянуть на  организацию процессов корпоративной коммуникации и создать уникальную платформу – корпоративный портал.  Этот портал станет для Вас не только источником необходимой информации и актуальных новостей о нашей компании, но и средством для Вашего активного участия в жизни ООО «Сургутское РСУ». Что в конечном итоге, будет способствовать формированию продуктивной стратегии социальной политики и повышению уровня производительности труда при сокращении трудо-временных затрат на рутинные процессы.
                        Мы ценим каждого из Вас и стремимся создать условия, при которых Ваш труд будет максимально эффективным и комфортным. Корпоративный портал — это именно то место, где каждый может выразить свое мнение, поделиться идеями или получить поддержку от коллег и руководства. Это уникальная платформа, где всегда найдется место для творческих идей, рационализаторских предложений и профессионального самовыражения. Я убежден, что открытое и честное общение поможет нам еще сильнее сплотиться и повысить эффективность нашей совместной работы.
                        Пользуйтесь порталом для обмена опытом, для профессионального и личностного роста. Ваш активный вклад в жизнь компании, Ваше участие в опросах позволит нам лучше понять ваши потребности и быстрее реагировать на изменения в нашей динамичной отрасли.
                        Вместе мы не только достигнем новых высот в бизнесе, но и продолжим поддерживать атмосферу взаимоуважения и поддержки, которая является залогом нашего с Вами успеха. Желаю вам новых профессиональных достижений и надеюсь, что работа в ООО «Сургутское РСУ» принесет Вам стабильность и откроет новые перспективы.
                        <br/><b>С уважением,<br/>
                        Александр Владимирович Макаров<br/>
                        Генеральный директор ООО «Сургутское РСУ»</b>
                    </div>
                    {!onCheck ?
                        <Link to={'/fz152'} className="fz152">
                            <label style={{margin:'15px'}} className="checkbox-container">
                                <input type="checkbox" checked={onCheck} onChange={(e) => setOnCheck(!onCheck)} />
                                <span className="checkmark"></span>
                                <p className={'fz152_text'}>Даю согласие на <br /><span>обработку персональных данных</span></p>
                            </label>
                        </Link>
                        :
                        <div className="fz152">
                            <label style={{margin:'15px'}} className="checkbox-container">
                                <input type="checkbox" checked={onCheck} onChange={(e) => setOnCheck(!onCheck)} />
                                <span className="checkmark"></span>
                                <p className={'fz152_text'}>Даю согласие на <br /><span>обработку персональных данных</span></p>
                            </label>
                        </div>
                    }
                    <div className="welcomepage_white_btns">
                        <div onClick={(event) => submitHandler(event)} className={`welcomepage_white_btns_ok ${!onCheck && 'disable'}`}>Принять и продолжить</div>
                    </div>
                </div>
            </div>

        </div>
    )
}