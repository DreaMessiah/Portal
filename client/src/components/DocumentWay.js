import {Link} from "react-router-dom";

export default function DocumentWay () { // получается массив обьектов

    // Рисуем второй круг на конце вертикальной полоски
    context.beginPath();
    context.strokeStyle = color02;
    context.arc(centerX, secondCircleY + lineLength, radiusOuter02, 0, 2 * Math.PI);
    context.fillStyle = 'transparent';
    context.fill();
    context.stroke();
    // LEVEL 2 ///////////////////////////////////
    // Рисуем горизонтальную полоску от второго круга
    context.beginPath();
    context.moveTo(centerX + radiusOuter01 - horizonLevelHeight, secondCircleY + lineLength);
    context.lineTo(centerX + radiusOuter01 + horizonLevelWidth, secondCircleY + lineLength); // 30 - длина горизонтальной полоски
    context.stroke();

    // Рисуем плавное соединение вниз
    const endX = centerX + radiusOuter01 + horizonLevelWidth;
    context.beginPath();
    context.arc(endX, secondCircleY + levelHeight, 25, 4.7, 0.01 * Math.PI);
    context.stroke();

    context.beginPath();
    context.moveTo(centerX+levelWidth, secondCircleY+levelHeight);
    context.lineTo(centerX+levelWidth, secondCircleY + lineHeight+levelHeight); // 50 - длина вертикальной полоски
    context.strokeStyle = color02;
    context.stroke();

    context.beginPath();
    context.moveTo(centerX, secondCircleY + levelHeight);
    context.lineTo(centerX, secondCircleY + lineHeight+levelHeight); // 50 - длина вертикальной полоски
    context.strokeStyle = color02;
    context.stroke();
    // LEVEL 3 ///////////////////////////////////
    context.beginPath();
    context.moveTo( centerX + (radiusOuter01 - horizonLevelHeight )*2 + 50, secondCircleY + lineLength);
    context.lineTo( centerX + (radiusOuter01 + horizonLevelWidth )*2 + 50, secondCircleY + lineLength); // 30 - длина горизонтальной полоски
    context.stroke();

    context.beginPath();
    context.arc(endX, secondCircleY + levelHeight, 25, 4.7, 0.01 * Math.PI);
    context.stroke();


    return (
        <div className='DocumentWay'>

        </div>
    )
}
