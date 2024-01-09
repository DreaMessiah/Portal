import React, {useEffect, useRef} from "react";
import Navbar from "./Navbar";
import TitleObj from "./TitleObj";


const COLORS = {
    1 : 'rgba(76,196,196,1)',
    2 : 'rgba(196,76,155,1)',
    3 : 'rgba(102, 7, 223, 1)',
    4 : 'rgba(206, 17, 51, 1)',
    5 : 'rgba(170, 7, 173, 1)',
    6 : 'rgba(49, 150, 14, 1)',
    7 : 'rgba(111, 0, 7, 1)'
}

const textColor = 'rgba(11, 11, 11, 1)'
const backColor = 'rgba(246, 246, 246, 0.4)'
const backPage = 'rgba(246, 246, 246, 1)'

// Настройки для первого круга
const centerX = 100;
const centerY = 100;
const radiusB = 35;
const radiusS = 25;
const dRadius = radiusB - radiusS
const lineHeight = 80
const lineWidth = 5;

const KDS = {
    x:centerX,
    y:centerY
}
let OverKDS = {}
let tempH = lineHeight
const dwm2 =
    {
        1:{
            name:'Иванов Иван Иванович',
            date:'12.09.2023 / 12:33',
            job:'Механик',
            status:'Подписано',
            next:[9]
        },
        9:{
            name:'Романов Сергей Владимирович',
            date:'12.09.2023 / 12:33',
            job:'Зам. главного механика',
            status:'Подписано',
            next:[2]
        },
        2:{
            name:'Семенов Сергей Владимирович',
            date:'12.09.2023 / 12:33',
            job:'Зам. главного механика',
            status:'Подписано',
            next:[3,4,5]
        },
        3:{
            name:'Андреев Андрей Андреевич',
            date:'12.09.2023 / 12:33',
            job:'Начальник',
            status:'Подписано',
            next:[6]
        },
        4:{
            name:'Константинов Константин Константинович',
            date:'12.09.2023 / 12:33',
            job:'Начальник',
            status:'Подписано',
            next:[6]
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
const dwm1 =
    {
        1:{
            name:'Иванов Иван Иванович',
            date:'12.09.2023 / 12:33',
            job:'Механик',
            status:'Подписано',
            next:[9]
        },
        9:{
            name:'Романов Сергей Владимирович',
            date:'12.09.2023 / 12:33',
            job:'Зам. главного механика',
            status:'Подписано',
            next:[2]
        },
        2:{
            name:'Романов Сергей Владимирович',
            date:'12.09.2023 / 12:33',
            job:'Зам. главного механика',
            status:'Подписано',
            next:[3,4,5,6]
        },
        3:{
            name:'Андреев Андрей Андреевич',
            date:'12.09.2023 / 12:33',
            job:'Начальник',
            status:'Подписано',
            next:[7]
        },
        4:{
            name:'Константинов Константин Константинович',
            date:'12.09.2023 / 12:33',
            job:'Начальник',
            status:'Подписано',
            next:[7]
        },
        5:{
            name:'Макаров Александр Владимирович',
            date:'12.09.2023 / 12:33',
            job:'Генеральный директор',
            status:'Подписано',
            next:[7]
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
            next:[13]
        },
        13:{
            name:'Кузнецова Татьяна Александровна',
            date:'12.09.2023 / 12:33',
            job:'Бухгалтер',
            status:'Подписано',
            next:[10,11,12]
        },
        10:{
            name:'Кузнецова Татьяна Александровна',
            date:'12.09.2023 / 12:33',
            job:'Бухгалтер',
            status:'Подписано',
            next:[14]
        },
        11:{
            name:'Кузнецова Татьяна Александровна',
            date:'12.09.2023 / 12:33',
            job:'Бухгалтер',
            status:'Подписано',
            next:[14]
        },
        12:{
            name:'Кузнецова Татьяна Александровна',
            date:'12.09.2023 / 12:33',
            job:'Бухгалтер',
            status:'Подписано',
            next:[14]
        },
        14:{
            name:'Кузнецова Татьяна Александровна',
            date:'12.09.2023 / 12:33',
            job:'Бухгалтер',
            status:'Подписано',
            next:[15]
        },
        15:{
            name:'Кузнецова Татьяна Александровна',
            date:'12.09.2023 / 12:33',
            job:'Бухгалтер',
            status:'Подписано',
            next:[17,16]
        },
        16:{
            name:'Кузнецова Татьяна Александровна',
            date:'12.09.2023 / 12:33',
            job:'Бухгалтер',
            status:'Подписано',
            next:[18]
        },
        17:{
            name:'Кузнецова Татьяна Александровна',
            date:'12.09.2023 / 12:33',
            job:'Бухгалтер',
            status:'Подписано',
            next:[18]
        },
        18:{
            name:'Кузнецова Татьяна Александровна',
            date:'12.09.2023 / 12:33',
            job:'Бухгалтер',
            status:'Подписано',
            next:[19,20,21]
        },
        19:{
            name:'Кузнецова Татьяна Александровна',
            date:'12.09.2023 / 12:33',
            job:'Бухгалтер',
            status:'Подписано',
            next:[22]
        },
        20:{
            name:'Кузнецова Татьяна Александровна',
            date:'12.09.2023 / 12:33',
            job:'Бухгалтер',
            status:'Подписано',
            next:[22]
        },
        21:{
            name:'Кузнецова Татьяна Александровна',
            date:'12.09.2023 / 12:33',
            job:'Бухгалтер',
            status:'Подписано',
            next:[22]
        },
        22:{
            name:'Кузнецова Татьяна Александровна',
            date:'12.09.2023 / 12:33',
            job:'Бухгалтер',
            status:'Подписано',
            next:[23]
        },
        23:{
            name:'Кузнецова Татьяна Александровна',
            date:'12.09.2023 / 12:33',
            job:'Бухгалтер',
            status:'Подписано',
            next:[31,24,25,26,27,28,29,30]
        },
        24:{
            name:'Кузнецова Татьяна Александровна',
            date:'12.09.2023 / 12:33',
            job:'Бухгалтер',
            status:'Подписано',
            next:[32]
        },
        25:{
            name:'Кузнецова Татьяна Александровна',
            date:'12.09.2023 / 12:33',
            job:'Бухгалтер',
            status:'Подписано',
            next:[32]
        },
        26:{
            name:'Кузнецова Татьяна Александровна',
            date:'12.09.2023 / 12:33',
            job:'Бухгалтер',
            status:'Подписано',
            next:[32]
        },
        27:{
            name:'Кузнецова Татьяна Александровна',
            date:'12.09.2023 / 12:33',
            job:'Бухгалтер',
            status:'Подписано',
            next:[32]
        },
        28:{
            name:'Кузнецова Татьяна Александровна',
            date:'12.09.2023 / 12:33',
            job:'Бухгалтер',
            status:'Подписано',
            next:[32]
        },
        29:{
            name:'Кузнецова Татьяна Александровна',
            date:'12.09.2023 / 12:33',
            job:'Бухгалтер',
            status:'Подписано',
            next:[32]
        },
        30:{
            name:'Кузнецова Татьяна Александровна',
            date:'12.09.2023 / 12:33',
            job:'Бухгалтер',
            status:'Подписано',
            next:[32]
        },
        31:{
            name:'Кузнецова Татьяна Александровна',
            date:'12.09.2023 / 12:33',
            job:'Бухгалтер',
            status:'Подписано',
            next:[32]
        },
        32:{
            name:'Кузнецова Татьяна Александровна',
            date:'12.09.2023 / 12:33',
            job:'Бухгалтер',
            status:'Подписано',
            next:[8]
        },
        8:{
            name:'Петров Василий Михайлович',
            date:'12.09.2023 / 12:33',
            job:'Аутсорс',
            status:'Не подписано',
            next:null
        }
    }
let lastUser

let textsKds = []
let textsUsers = []


export default function DocumentWay(){
    const canvasRef = useRef(null)

    const elementWidth = 90;
    const elementHeight = 155;
    let canvasHeight = 0;
    const maxNextLength = Math.max(...Object.values(dwm1).map(item => (item.next ? item.next.length : 0)));
    const canvasWidth = maxNextLength * elementWidth + centerX * 3;

    Object.keys(dwm1).forEach(key => {
        const item = dwm1[key];
        if(item.next){
            const nextLength = item.next.length>1 ? (-elementHeight * ( item.next.length ) ) + (lineHeight+radiusS) * item.next.length : elementHeight;
            canvasHeight += nextLength;
        }else{
            lastUser = item
        }
    });
    canvasHeight = canvasHeight + elementHeight

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        let container = document.getElementById('canvasContainer');

        canvas.width = canvasWidth*0.8
        canvas.height = canvasHeight*0.6
        // Очищаем холст
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.scale(0.6, 0.6);
        context.save();
        const userId=1
        drawLevels(context,dwm1[userId],2, drawLine(context, drawCircle(dwm1[userId],context, KDS, radiusB), lineHeight,true, getRandomColor()))

        drawCircle(lastUser,context, OverKDS, radiusB, getRandomColor())

        textsKds.map((item,index) => {
            drawText(context,textsUsers[index],item)
        })
        let isDragging = false;
        let startDragX, startDragY;

        container.addEventListener('mousedown', function (event) {
            isDragging = true;
            startDragX = event.clientX;
            startDragY = event.clientY;
            container.style.cursor = 'grabbing';
        });
        container.addEventListener('mouseup', function () {
            isDragging = false;
            container.style.cursor = 'grab';
        });
        container.addEventListener('mousemove', function (event) {
            if (isDragging) {
                let deltaX = event.clientX - startDragX;
                let deltaY = event.clientY - startDragY;
                container.scrollLeft -= deltaX;
                container.scrollTop -= deltaY;
                startDragX = event.clientX;
                startDragY = event.clientY;
            }
        });
        document.addEventListener('mouseup', function () {
            if (isDragging) {
                isDragging = false;
                container.style.cursor = 'grab';
            }
        });
    },[])

    function drawLevels(context, user, level = 1, kds){
        let tempKds = {}
        if(dwm1[user.next[0]].next !==null){
            const L = user.next.length
            const l = dwm1[user.next[0]].next.length
            user.next.map( (item,index) => {
                if(l>1) tempH = lineHeight * ( l - ( index+1 ) )
                else {
                    tempH = lineHeight
                }
                if(L>1) tempH = lineHeight * ( L - ( L - 1 - index ) )
                tempKds = drawLine(context, drawCircle(dwm1[user.next[index]],context,{x: (kds.x + index*centerX) ,y: (kds.y - index*lineHeight)}),tempH,true,getRandomColor() ) //+ (lineHeight*(l - index - 1))
                if(index === 0) drawLevels(context,dwm1[user.next[index]],level+1, tempKds)
                else {
                    drawConnect(context,tempKds,index,L)
                    return kds
                }
            })
        }else{
            OverKDS = {x: kds.x,y: kds.y+dRadius}
        }
    }
    function drawCircle(user,context, kds, radius=radiusS, color= COLORS[2]){
        context.lineWidth = lineWidth;
        context.strokeStyle = color;
        context.beginPath();
        context.arc(kds.x, kds.y, radius, 0, 2 * Math.PI);
        context.arc(kds.x, kds.y, radius, 0, 2 * Math.PI);
        context.fillStyle = 'transparent';
        context.fill();
        context.stroke();

        textsUsers.push( user )
        textsKds.push( kds )

        return {x: kds.x,y: (kds.y+radius) }
    }
    function drawLine(context, kds, length=lineHeight, direction = true, color= COLORS[2]){
        context.strokeStyle = color;
        if(direction){
            context.moveTo(kds.x, kds.y);
            context.lineTo(kds.x, kds.y + length);
            context.stroke();
            //
            // context.font = '20px Arial';
            // context.fillStyle = 'blue';
            // context.fillText('Привет, мир!', kds.x, kds.y);
            //
            return {x:kds.x,y:(kds.y+length+radiusS)}
        }else{
            context.moveTo(kds.x, kds.y);
            context.lineTo(kds.x+length, kds.y);
            context.stroke();
            return {x: (kds.x+length+radiusS),y: kds.y}
        }
    }
    function drawConnect(context,kds,index,L){
        context.beginPath();
        context.arc(kds.x-radiusS, kds.y-radiusS, radiusS, 6.2, 0.5 * Math.PI);
        drawLine(context, {x: (centerX+radiusS),y: (kds.y)},kds.x-centerX-radiusS-20,false )
        const tempkds = drawLine(context, {x: (centerX+radiusS),y: (kds.y - lineHeight * (L+1) - radiusS+5 )},kds.x-centerX-radiusS-20,false )
        context.arc(tempkds.x-radiusS-5, tempkds.y+radiusS, 25, 4.7, 0.001 * Math.PI);
        drawLine(context, {x: (tempkds.x-5),y: (tempkds.y+radiusS)},lineHeight*(L-index-1)+3,true )
    }
    function drawText(context, user, kds){
        const fontSize = 20
        context.font = `${fontSize}px Calibri`;
        const massL = [user.name.length,user.date.length,user.status.length,user.job.length]
        const mass = [user.name,user.date,user.status,user.job]
        const maxId = calcMax(massL)
        let textMetrics = context.measureText(mass[maxId]);
        const dx = 40
        context.fillStyle = backColor;
        context.fillRect(kds.x + dx-5, kds.y  - 45, textMetrics.width+10, fontSize*4+10);
        context.fillStyle = textColor;
        context.fillText(user.job, kds.x + dx, kds.y  - 20);
        context.fillText(user.name, kds.x + dx,kds.y);
        context.fillText(user.date, kds.x + dx, kds.y + 20);
        context.fillText(user.status, kds.x + dx, kds.y + 40);
    }
    function calcMax(mass){
        let maxElement = mass[0];
        let maxIndex = 0;

        for (let i = 1; i < mass.length; i++){
            if (mass[i] > maxElement) {
                maxElement = mass[i];
                maxIndex = i;
            }
        }
        return maxIndex
    }
    function getRandomColor() {
        return COLORS[ Math.floor(Math.random() * 7) + 1 ]
    }
////////////////////////////////////////////////////////////////////////////////
    const titleText = 'Привязан к проекту №774655-2/22 “Название” от 01.09.2023'
    return (
        <div>
            <TitleObj text={titleText}/>

            <div id='canvasContainer'>
                <canvas id='documentway' ref={canvasRef} ></canvas>
            </div>
        </div>

    );
};
