import React, {useContext, useEffect, useRef, useState} from "react";
import {DataContext} from "../../context/DataContext";
import './structure.scss'
export default function StructurePagCanvas(){
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const {structure} = useContext(DataContext)
    const canvasRef = useRef(null)
    const textColor = 'rgba(11, 11, 11, 1)'
    const backColor = 'rgba(246, 246, 246, 0.4)'
    const centerX = 10;
    const centerY = 10;
    const borderRadius = 10

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        let container = document.getElementById('canvasContainerStructure');
        context.clearRect(0, 0, canvas.width, canvas.height);
        //context.scale(0.6, 0.6);
        context.save()
        const razy = 38
        const liny = 70
        drawBlock(context,structure[0].label,{x:centerX,y:centerY}, windowWidth-80)
        drawLine(context,{x:300,y:42},{x:300,y:80})
        drawBlock(context,structure[1].label,{x:centerX,y:centerY+liny}, (windowWidth-80)/2)
        drawLine(context,{x:150,y:42+liny},{x:150,y:80+liny})
        drawBlock(context,structure[1].label,{x:centerX,y:centerY+liny*2}, (windowWidth-80)/4)


        let isDragging = false
        let startDragX, startDragY

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
        const handleResize = () => {
            setWindowWidth(window.innerWidth-300);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    },[windowWidth])
    function drawLine(context,kdsfrom,kdsto) {
        context.moveTo(kdsfrom.x, kdsfrom.y);
        context.lineTo(kdsto.x, kdsto.y);
        context.stroke();
        drawArrowhead(context, kdsto.x, kdsto.y, Math.atan2(kdsto.y - kdsfrom.y, kdsto.x -kdsfrom.x))
    }
    function drawBlock(context,text,kds,textMetrics){
        const fontSize = 16
        const heigth = fontSize*2
        context.font = `bold ${fontSize}px Montserrat`;
        context.textAlign = 'center'
        const dx = 40
        context.fillStyle = '#fff';
        context.beginPath();
        context.moveTo(kds.x + borderRadius, kds.y);
        context.arcTo(kds.x + textMetrics, kds.y, kds.x + textMetrics, kds.y + textMetrics, borderRadius);
        context.arcTo(kds.x + textMetrics, kds.y + heigth, kds.x, kds.y + heigth, borderRadius);
        context.arcTo(kds.x, kds.y + heigth, kds.x, kds.y, borderRadius);
        context.arcTo(kds.x, kds.y, kds.x + textMetrics, kds.y, borderRadius);
        context.closePath();
        context.fillStyle = 'white'; // Задаем цвет заливки
        context.fill();
        context.beginPath();
        context.moveTo(kds.x + borderRadius, kds.y);
        context.arcTo(kds.x + textMetrics, kds.y, kds.x + textMetrics, kds.y + heigth, borderRadius);
        context.arcTo(kds.x + textMetrics, kds.y + heigth, kds.x, kds.y + heigth, borderRadius);
        context.arcTo(kds.x, kds.y + heigth, kds.x, kds.y, borderRadius);
        context.arcTo(kds.x, kds.y, kds.x + textMetrics, kds.y, borderRadius);
        context.closePath();
        context.fillStyle = '#333';
        context.lineWidth = 1; // Толщина линии
        context.stroke();
        //context.fillRect(kds.x, kds.y, textMetrics, fontSize*2+10);
        context.textTransform = 'uppercase'
        context.fillText(text.toUpperCase(), kds.x + textMetrics/2, kds.y+fontSize+5);

    }
    function drawArrowhead(context, x, y, angle) {
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(x - 10 * Math.cos(angle - Math.PI / 6), y - 10 * Math.sin(angle - Math.PI / 6));
        context.lineTo(x - 10 * Math.cos(angle + Math.PI / 6), y - 10 * Math.sin(angle + Math.PI / 6));
        context.closePath();
        context.fill();
    }
    function getTextWidth(text, fontSize, fontFamily) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        context.font = `${fontSize}px ${fontFamily}`;
        const metrics = context.measureText(text);
        return metrics.width;
    }
    return (
        <div className='structure'>
            <div className={`title`}>Организационная структура ООО "Сургутское РСУ" {windowWidth}</div>
            {structure.ouid}

            <div id='canvasContainerStructure'>
                <canvas height={700} width={windowWidth} id='structure' ref={canvasRef} ></canvas>
            </div>
        </div>
    )
}
