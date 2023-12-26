import {Link} from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.css';
import {useEffect, useState} from "react";

const addLeadingZero = (number) => (number < 10 ? '0' : '') + number;
export default function calendarobj({mass}) { // получается массив обьектов
    const months = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь']
    const fullDaysArray = [];

    function getSixWeeksArray() {
        const today = new Date();
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const firstDayOfWeek = firstDayOfMonth.getDay(); // 0 - воскресенье, 1 - понедельник, и так далее
        const startDay = new Date(today.getFullYear(), today.getMonth(), 0);
        while (startDay.getDay() !== 1) {
            startDay.setDate(startDay.getDate() - 1);
        }

        const daysArray = [];
        for (let i = 0; i < 6 * 7; i++) {
            const currentDay = new Date(startDay.getFullYear(), startDay.getMonth(), startDay.getDate() + i);
            fullDaysArray.push(`${addLeadingZero(currentDay.getDate())}.${addLeadingZero(currentDay.getMonth() + 1)}.${currentDay.getFullYear()}`)
            daysArray.push(currentDay.getDate());
        }
        return daysArray;
    }

    function getCurrentMouth(){
        const today = new Date();
        const monthName = months[today.getMonth()];
        const year = today.getFullYear();

        return `${monthName} ${year}`;
    }
    function getToday(){
        const today = new Date();
        return today.getDate();
    }

    const resultArray = getSixWeeksArray();
    let classname = []
    let titles = []
    let texts = []

    fullDaysArray.map( function (item,index){
        if(item.split('.')[0] === getToday().toString()){
            classname[index] = 'today'
        }else{
            classname[index] = 'hov'
        }
        mass.forEach( function (dates) {
             if(dates.date === item.toString()){
                 titles[index] = dates.title
                 texts[index] = dates.text
                switch (dates.status){
                    case '1':
                        classname[index] = 'clue over'
                        break
                    case '2':
                        classname[index] = 'clue pending'
                        break
                    default:
                        classname[index] = 'hov'
                }
            }
        })
    })

  setTimeout(() => {
    const clueElement = document.querySelectorAll('.clue')
    clueElement.forEach( (item) => {
        item.addEventListener('mouseover', function(event) {
            const modalElement = item.querySelector('.modal_clue');
            modalElement.style.display = 'block';
            item.addEventListener('mouseleave', function(event) {
                const modalElement = item.querySelector('.modal_clue');
                modalElement.style.display = 'none';
            });
        });
    })
  },0)

    return (
        <div className='calendarobj'>
            <div className="calendar_border">
                <div className="back cal_bor_one">
                    <div className="cal_bor_one_orange"></div>
                </div>
                <div className="back cal_bor_two">
                    <div className="cal_bor_two_blue"></div>
                </div>
                <div className="back cal_bor_three">
                    <div className="cal_bor_three_green"></div>
                </div>
            </div>
            <div className="calendar_content">
                <h4>{getCurrentMouth()}</h4>
                <div className='dates'>
                    {resultArray.map( (item,index) => (
                        <div key={index} className={classname[index]}><p>{item}</p><div className={`modal_clue n-${index%7}`}><h5>{titles[index]}</h5><p>{texts[index]}</p></div></div>
                    ))}
                </div>
            </div>

        </div>

    )
}