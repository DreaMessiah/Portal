import React, {useState, useEffect, useContext} from 'react';
import NewsNavbar from "../../components/OldComponents/old/NewsNavbar"
import {Link,useLocation} from "react-router-dom";
import NewsFooter from "../../components/OldComponents/old/NewsFooter";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";

const news = [
    {
        title:'Была выполнена замена участка основной нитки магистрального нефтепровода «Холмогоры -Клин».',
        text:'На объекте «Нефтепровод Холмогоры-Клин 1220 мм 213-328 км. Замена трубы на ПП через пр. Бол. Сонторова, 325,1-325,75 км. Сургутское УМН. Техническое перевооружение» была выполнена  замена участка основной нитки магистрального нефтепровода «Холмогоры -Клин» с укладкой нового участка трубопровода в створ существующего. На всем протяжении была выполнена подземная прокладка нефтепровода. Строительство трубопровода через водные преграды осуществлено траншейным способом.',
        img:'/news/new001/',
        ni:5,
        link:'/'
    },
    {
        title:'ООО «Сургутское РСУ» выполнило уникальные работы по замене кольцевого фундамента.',
        text:'ООО «Сургутское РСУ» выполнило уникальные работы по замене кольцевого фундамента РВС V=20 000 м3 методом подъема резервуара на 0,5 м. Подъем выполнялся при помощи гидравлических домкратов установленных на подготовленное основание с шагом не более 6 метров по периметру резервуара. С соответствующим шагом снаружи к стенке РВС монтируются стойки жесткости из двух спаренных швеллеров №24. К нижней части стоек жесткости приваривается опорная пластина, которая служит упором для домкратов. Подъем осуществлялся в несколько этапов путем перестановки домкратов на дополнительные опоры. Во время переустановки домкратов под резервуар устанавливались пакеты подкладок из наборных металлических пластин. По достижении требуемой высоты подъема резервуар устанавливают на консольные опорные конструкции. Опорные конструкции привариваются к оголовкам металлических сваям из трубы 620х8 мм длиной 4 метра, расположенных в промежутках между стойками жестокости.',
        img:'/news/new002/',
        ni:5,
        link:'/'
    },
    {
        title:'При реконструкции нефтепровода силами ООО Сургутское РСУ были выполнены работы по укладке дюкера.',
        text:'При реконструкции резервной нитки нефтепровода СГП на 301-346 км силами ООО Сургутское РСУ были выполнены работы по укладке дюкера через р. Гатилова методом протаскивания. Перед протаскиванием была выполнена футеровка дюкера и балластировка пригрузами типа УТК-1220. К головному концу протаскиваемого трубопровода был приварен оголовок для крепления тягового троса. На другом берегу установлена  тяговая лебедка ЛП-152, от нее по дну реки проложен тяговый трос к приваренному ранее оголовку и на нем закрепляется. При протаскивании плеть удерживалась трубоукладчиками.',
        img:'/news/new003/',
        ni:3,
        link:'/'
    },
    {
        title:'Было выполнено протаскивание трубопровода через протоку Юганская Обь',
        text:'Протаскивание трубопровода в предварительно пробуренную и расширенную скважину при строительстве, методом наклонно-направленного бурения, подводного перехода через протоку Юганская Обь на объекте: «Газопровод ДНС восточно-сургутского месторождения - Сургутский ГПЗ (3 этап)». Протаскивание трубопровода диаметром 1020 мм  осуществлено буровым комплексом ПД500/150 (производства Германии).  Длина дюкера составила 1787 метров',
        img:'/news/new004/',
        ni:6,
        link:'/'
    },
    {
        title:'Мы закончили строительство переходов через водные преграды нефтепровода диаметром 1220х19 мм по объекту: «Нефтепровод СГП 346-433 км Ду-1200.',
        text:'Строительство переходов через водные преграды нефтепровода диаметром 1220х19 мм по объекту: «Нефтепровод СГП 346-433 км Ду-1200. Замена основной нитки ППМН в пойме р. Киргаз на 348 км, резервной нитки 348,83 - 358 км. Тобольское УМН. Реконструкция». Укладка дюкера в подводную траншею выполнена методом протаскивания с выводом дюкера, разгруженного понтонами в створ перехода на плаву, с помощью тяговой лебедки. Длина дюкера 219 метров.',
        img:'/news/new005/',
        ni:5,
        link:'/'
    },

]

function NewsPage(){
    const {store} = useContext(Context)
    let shortTexts = []
    let imageStiles = []
    function truncateText(text, maxLength) {
        if (text.length > maxLength) {
            let truncated = text.substring(0, maxLength);
            const lastSpaceIndex = truncated.lastIndexOf(' ');
            if (lastSpaceIndex !== -1) {
                const punctuationRegex = /[.,\/#!$%\^&\*;:{}=\-_`~()]/;
                if (punctuationRegex.test(truncated.charAt(lastSpaceIndex - 1))) {
                    truncated = truncated.substring(0, lastSpaceIndex - 1);
                }
            }
            truncated += '...';
            return truncated;
        }
        return text;
    }
    news.map( (item,index) => {
        shortTexts[index] = truncateText(item.text,250)
        imageStiles[index] = {backgroundImage: `url(${item.img + '001.jpg'})`}
    })

    const dataToSend = {
        id: 1,
        name: 'Example',
        // Другие данные...
    };

    return (
        <div className='thispage'>
            <div className='newspage'>
                <div className='main_path'>
                    <NewsNavbar/>
                    <div className='new_back'>
                        <div className='info_news'>
                            <div className='info between'>
                                <Link className='button' to='/main'>Корпоративный Портал</Link>
                                <Link className='button' to='/paylist'>Расчетный лист</Link>
                                <Link className='button' to='/phonebook'>Телефонный справочник</Link>
                            </div>
                            <div className='polosa'></div>
                            <div className='info'>
                                <p>ФИО: {store.user.full_name}</p>
                                <p>Должность: {store.t13.developer}</p>
                                <p>Подразделение: {store.t13.branch}</p>
                                <p>Стаж работы: {store.onboard}</p>
                            </div>
                        </div>
                        <div className='rows_news'>
                            {news.map( (item,index) => (
                                <div key={index} className='news'>
                                    <div style={imageStiles[index]} className='news_img'></div>
                                    <div className='news_text'>
                                        <div className='info'>
                                            <div className='title'><p>{item.title}</p></div>
                                            <div className='text'>{shortTexts[index]}</div>
                                        </div>
                                        <div className='buttom_block'><Link to={`/selected_news/${index}`}>Открыть</Link></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <NewsFooter/>
                <div className='backimg'>
                    <div className='backcol'></div>
                </div>
            </div>
        </div>
    )
}
export default observer(NewsPage)