import React, {useEffect, useRef} from "react";

const color01 = 'rgba(76,196,196,1)'
const color02 = 'rgba(196,76,155,1)'
const color03 = 'rgba(102, 7, 223, 1)'
const color04 = 'rgba(206, 17, 51, 1)'
const color05 = 'rgba(170, 7, 173, 1)'
const color06 = 'rgba(49, 150, 14, 1)'
const color07 = 'rgba(111, 0, 7, 1)'

// Настройки для первого круга
const centerX = 100;
const centerY = 100;
const radiusOuter01 = 35;
const radiusOuter02 = 25;
const lineHeight = 80
const lineWidth = 5;
const radiusInner = radiusOuter01 - lineWidth;

const levelWidth = 120
const levelHeight = 130

const horizonLevelWidth = 60
const horizonLevelHeight = 10

const lineLength = lineHeight + 25

const secondCircleY = centerY + radiusOuter01;

const endX = centerX + radiusOuter01 + horizonLevelWidth;

const dwm1 =
    {
        1:{
            name:'Иванов Иван Иванович',
            date:'12.09.2023 / 12:33',
            job:'Механик',
            status:'Подписано',
            next:[2]
        },
        2:{
            name:'Романов Сергей Владимирович',
            date:'12.09.2023 / 12:33',
            job:'Зам. главного механика',
            status:'Подписано',
            next:[3,4]
        },
        3:{
            name:'Андреев Андрей Андреевич',
            date:'12.09.2023 / 12:33',
            job:'Начальник',
            status:'Подписано',
            next:[5]
        },
        4:{
            name:'Константинов Константин Константинович',
            date:'12.09.2023 / 12:33',
            job:'Начальник',
            status:'Подписано',
            next:[5]
        },
        5:{
            name:'Макаров Александр Владимирович',
            date:'12.09.2023 / 12:33',
            job:'Генеральный директор',
            status:'Подписано',
            next:[6]
        },
        6:{
            name:'Гаврилова Наталья Владимировна',
            date:'12.09.2023 / 12:33',
            job:'Главный бухгалтер',
            status:'Подписано',
            next:[7]
        },
        7:{
            name:'Кузнецова Татьяна Александровна',
            date:'12.09.2023 / 12:33',
            job:'Бухгалтер',
            status:'Подписано',
            next:null
        }
    }


export default function SettingsPage(){
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        canvas.width = 1000
        canvas.height = 1000
        // Очищаем холст
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Рисуем внешний круг
        context.beginPath();
        context.arc(centerX, centerY, radiusOuter01, 0, 2 * Math.PI);
        context.lineWidth = lineWidth;
        context.strokeStyle = color01;
        context.stroke();

        // Рисуем внутренний круг
        context.beginPath();
        context.arc(centerX, centerY, radiusOuter01, 0, 2 * Math.PI);
        context.fillStyle = 'transparent';
        context.fill();

        // Рисуем вертикальную полоску вниз от второго круга

        context.beginPath();
        context.moveTo(centerX, secondCircleY);
        context.lineTo(centerX, secondCircleY + lineHeight); // 50 - длина вертикальной полоски
        context.strokeStyle = color01;
        context.stroke();

        const userId = 1
        const user = dwm1[userId]

        drawLevel(context,user,2)

    },[])

    function drawLevel(context, user, level){
        if(!user.next || user.next.length === 0){
            context.beginPath();
            context.strokeStyle = color02;
            context.arc(centerX, secondCircleY + 10 + lineLength*(level-1), radiusOuter01, 0, 2 * Math.PI);
            context.fillStyle = 'transparent';
            context.fill();
            context.stroke();
            return
        }

        const nextUser = user.next[0];

        if(!dwm1[nextUser].next || dwm1[nextUser].next.length === 0) return drawLevel(context,dwm1[nextUser],level)

        if(nextUser){
            user.next.map( (nextUserId,index) => {
                context.beginPath();
                context.strokeStyle = color02;
                context.arc(centerX*(index+1), secondCircleY + lineLength*(level-1), radiusOuter02, 0, 2 * Math.PI);
                context.fillStyle = 'transparent';
                context.fill();
                context.stroke();

                context.beginPath();
                let line = 25
                context.moveTo(centerX*(index+1), (secondCircleY + radiusOuter02 + lineLength) + (radiusOuter02+lineLength-line) * (level-2) );
                context.lineTo(centerX*(index+1), (secondCircleY + radiusOuter02 + lineLength) + (radiusOuter02+lineLength-line) * (level-2) + (lineLength-50)); // 50 - длина вертикальной полоски

                context.stroke();

                console.log('userName = ' + dwm1[nextUserId].name )

                if(index){
                    context.beginPath();
                    context.moveTo(centerX*(index+1), (secondCircleY + radiusOuter02 + lineLength) * (level-2) )
                    context.lineTo(centerX*(index+1), (secondCircleY + radiusOuter02 + lineLength) * (level-2) + (lineLength-50)); // 50 - длина вертикальной полоски
                    context.stroke();

                    context.moveTo( centerX + (radiusOuter01 - horizonLevelHeight )*(index-1)+22, secondCircleY + lineLength);
                    context.lineTo( centerX + (radiusOuter01 + horizonLevelWidth )*(index-1) + 75, secondCircleY + lineLength); // 30 - длина горизонтальной полоски
                    context.stroke();

                    context.beginPath();
                    context.arc(endX-20, secondCircleY + levelHeight, 25, 4.7, 0.01 * Math.PI);
                    context.stroke();
                }
            })
            drawLevel(context,dwm1[nextUser],level+1)
        }
    }

    return (
        <div>
            <h1>SettingsPage</h1>
            <p>SettingsPage</p>

            <canvas id='documentway' ref={canvasRef} ></canvas>


        </div>
    );
};
