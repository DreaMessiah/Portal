import React, {useEffect, useLayoutEffect, useRef} from "react";
import Navbar from "./Navbar";
import TitleObj from "./TitleObj";

export default function DocumentWay({dwm1}){
    const COLORS = {
        1 : 'rgba(18,19,56,1)',
        2 : 'rgba(11,14,162,0.8)',
        3 : 'rgba(0,2,108,0.6)',
        4 : 'rgba(55,55,68,0.4)',
        5 : 'rgba(106,114,128,0.8)',
        6 : 'rgba(195,209,229,0.69)',
        7 : 'rgba(182,107,180,0.4)',
        8 : 'rgb(89,69,69)'
    }

    const textColor = 'rgba(11, 11, 11, 1)'
    const backColor = 'rgba(246, 246, 246, 0.4)'

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

    let lastUser

    let textsKds = []
    let textsUsers = []

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
    canvasHeight = canvasHeight + elementHeight+100

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

        return () => {
            // Код, который будет выполнен при размонтировании компонента
            context.clearRect(0, 0, canvas.width, canvas.height);
        };
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
        return COLORS[ Math.floor(Math.random() * 8) + 1 ]
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
