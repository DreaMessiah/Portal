import "./style.scss"
import {Link} from "react-router-dom";
import ObjsService from "../../../services/ObjsService";
import {useContext, useState} from "react";
import {Context} from "../../../index";
import {useEffect} from "react";
import AuthServise from "../../../services/AuthService";

export const BirthDay = () => {

    const [birthman, setBirthman] = useState([])

    const users = async (e) => {
        try {



            // if(birthman.length !== 0 && list.data){
            //     const listUsers = list.data.users
            //
            //     birthman.forEach(man => {
            //         listUsers.forEach(user => {
            //             if(user.tn === man.tn && user.avatar !== ''){
            //                 man.avatar = user.avatar
            //                 newArr.push(man)
            //             }
            //         })
            //     })
            //
            //
            //     setBirthman([... newArr])
            // } else {
            //     // users()
            // }


        } catch(e) {
            console.log(e)
        }
    }

    const months = [
        'январь', 'февраль', 'март', 'апрель', 'май', 'июнь',
        'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'
    ];
    const  {store} = useContext(Context)
    const inn = store.user.inn

    const currentDate = new Date();
    let thisday = currentDate.getDate();
    // console.log(thisday)
    const year = currentDate.getFullYear() + '';
    // console.log(year)
    const currentMonth = currentDate.getMonth(); // Получаем номер текущего месяца
    let month = months[currentMonth];
    // console.log(month)
    // month = 'январь' // убрать перед началом работы


    // Функция для проверки, находится ли дата рождения в ближайших 30 днях
    function isBirthdayWithin30Days(birthdate) {
        // Получаем текущую дату
        let currentDate = new Date();
        // Получаем дату рождения в текущем году
        let currentYear = currentDate.getFullYear();
        let birthdayThisYear = new Date(currentYear, birthdate.getMonth(), birthdate.getDate());

        // Проверяем, если день рождения в текущем году уже прошел, добавляем год
        if (birthdayThisYear < currentDate) {
            birthdayThisYear.setFullYear(currentYear + 1);
        }

        // Разница между текущей датой и датой рождения в днях
        let differenceInDays = Math.round((birthdayThisYear - currentDate) / (1000 * 60 * 60 * 24));

        // Проверяем, находится ли день рождения в ближайших 30 днях
        return differenceInDays <= 7 && differenceInDays >= 0;
    }

    function calculateAge(birthday) {

        const dayarr = birthday.split(".")
        // man.
        const day = parseInt(dayarr[0])
        const mon = parseInt(dayarr[1])
        const ye = parseInt(dayarr[2])
        let birthdate = new Date(ye, mon - 1, day);

        // Получаем текущую дату
        let currentDate = new Date();
        // Получаем дату рождения в текущем году
        let currentYear = currentDate.getFullYear();
        let birthdayThisYear = new Date(currentYear, birthdate.getMonth(), birthdate.getDate());

        // Проверяем, если день рождения в текущем году уже прошел, добавляем год
        if (birthdayThisYear > currentDate) {
            currentYear -= 1;
            birthdayThisYear = new Date(currentYear, birthdate.getMonth(), birthdate.getDate());
        }

        // Вычисляем разницу в годах
        let age = currentYear - birthdate.getFullYear();

        return age;
    }



    const t13List = async (e) => {
        const newArr = []

        try {
            const listMan = await ObjsService.getT13({inn, month, year})
            // console.log(listMan.data)
            const listHB = []
            // console.log(thisday)
            listMan.data.forEach(man => {
                const dayarr = man.birthday.split(".")
                // man.
                const day = parseInt(dayarr[0])
                const mon = parseInt(dayarr[1])
                const ye = parseInt(dayarr[2])
                let date = new Date(ye, mon - 1, day);
                if(isBirthdayWithin30Days(date)){
                    // console.log(man.birthday)
                    man.avatar = 'face.png'
                    newArr.push(man)
                }

                // console.log(man.birthday + ' = ' + date)


            })
            const list = await AuthServise.getusers()

            if(list.data){
                newArr.map( item => {
                    list.data.users.map( row => {
                        if(item.tn === row.tn){
                            item.avatar = row.avatar ? row.avatar : 'face.png'
                        }
                    })
                })
            }


            // console.log(newArr)
            setBirthman(newArr ? [...newArr] : [])



        } catch(e) {
            console.log(e)
        }
    }

    useEffect(() => {
        t13List()

    }, [])
    useEffect(() => {
        if(birthman.length){
            users()
        }
    },[])
    return (
        <div className="frame_block ">
            <div className="frame_block_title">
                <div className="frame_block_title_name">Дни рождения <i className="fa-solid fa-gift"></i></div>
                {/*<div className="frame_block_title_edit">Редактировать</div>*/}
            </div>
            <div className="frame_block_birthday borderbirthday birthdaycolor">
                <div className="frame_block_birthday_main">
                    {birthman.map((man, index) => {
                        // let dopstyle
                        // if(man.avatar === 'face.png'){
                        //     dopstyle = {backgroundPosition: 'center center', backgroundSize: '100%'}
                        // } else {
                        //     dopstyle = {}
                        // }
                        return (
                        <div className="frame_block_birthday_main_man" key={index}>
                            <div className="frame_block_birthday_main_man_photo" style={{backgroundImage: `url("/files/profile/${man.avatar}")`}}></div>
                            <div className="frame_block_birthday_main_man_text">
                                <div className="frame_block_birthday_main_man_name">{man.name}</div>
                                <div className="frame_block_birthday_main_man_dev">{man.developer}</div>
                                <div className="frame_block_birthday_main_man_date">{man.birthday}</div>
                                <div className="frame_block_birthday_main_man_years">{calculateAge(man.birthday)}</div>
                            </div>
                        </div>
                    )})}
                </div>
            </div>
        </div>
    )
}