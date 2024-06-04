import React from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import amiriFont from "../../assets/fonts/amirifont";
const KTUToPdf = (data,object) => {
    const doc = new jsPDF('portrait', 'mm',[210, 297]);

    const tableColumn = [
        '№',
        'Имя',
        'Таб. номер',
        'Должность',
        'КТУ'
    ];
    data.map( (item,index) => {
        const {days,total} = transformDaysObject(item)
        data[index].days = days
        data[index].total = total
    })
    console.log(data)
    const tableRows = data.map((item, index) => [
        index + 1,
        item.name,
        item.tn,
        item.developer,
        item.ktu
    ])

    const maxTableWidth = doc.internal.pageSize.getWidth();

    // doc.addFileToVFS("Montserrat-normal.ttf", MontserratNormal)
    // doc.addFont("Montserrat-normal.ttf", "Montserrat", "normal")
    // doc.setFont("Montserrat",'normal')
    // doc.setFontSize(7)
    doc.addFileToVFS("Amiri-Regular.ttf", amiriFont);
    doc.addFont("Amiri-Regular.ttf", "Amiri", "normal");
    doc.setFont("Amiri");
    doc.setFontSize(10)
    // const text = `${data[0].month} ${data[0].year} | ${data[0].shifr} | ${object}`
    const text = `${object}`
    const maxWidth = doc.internal.pageSize.getWidth() - 40
    const lines = doc.splitTextToSize(text, maxWidth)
    doc.text(`ООО "СУРГУТСКОЕ РСУ"`, 20, 20);
    doc.text(`ПРОТОКОЛ`, 100, 30);
    doc.text(`${data[0].shifr}"`, 20, 40);
    lines.forEach((line, index) => {
        doc.text(line, 20, 45 + (index * 5))
    })
    doc.text(`Совещание вёл:_________________________________________________________`, 20, 50 + lines.length * 5);
    doc.text(`Присутствовали:`, 20, 55 + lines.length * 5);
    doc.text(`_______________________________________________________________________`, 20, 60 + lines.length * 5);
    doc.text(`_______________________________________________________________________`, 20, 65 + lines.length * 5);
    doc.text(`_______________________________________________________________________`, 20, 70 + lines.length * 5);
    doc.text(`_______________________________________________________________________`, 20, 75 + lines.length * 5);
    doc.text(`_______________________________________________________________________`, 20, 80 + lines.length * 5);
    doc.text(`_______________________________________________________________________`, 20, 85 + lines.length * 5);

    doc.text(`ПОВЕСТКА ДНЯ:`, 20, 90 + lines.length * 5);
    doc.text(`1. Установление коэффициента трудового участия (КТУ) между членами бригады`, 20, 95 + lines.length * 5);
    doc.text(`РЕШИЛИ:`, 20, 100 + lines.length * 5);
    doc.text(`По 1 вопросу установить КТУ между членами бригады в соответствии с таблицей`, 20, 105 + lines.length * 5);
    doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 110 + ( lines.length*6),
        styles: {font: 'Amiri',
            fontStyle: 'normal',
            cellPadding: 1,
            lineWidth: 0.1,
            lineColor: [0, 0, 0],
            fontSize: 6 },
        headStyles: {font: 'Amiri',fontStyle: 'normal',fontSize: 7, textColor:[0, 0, 0],fillColor: [0, 0, 0, 0] },
        columnStyles: {
            0: { cellWidth: '2%' },
            1: { cellWidth: '13%' },
            2: { cellWidth: '15%' },
            // Настройка ширины столбцов для дней
            ...Array.from({ length: 31 }, (_, i) => ({ [i + 3]: { cellWidth: '1%' } })),
            34: { cellWidth: '4%' },
            35: { cellWidth: '4%' },
        }
    })
    const finalY = doc.lastAutoTable.finalY || 20;
    doc.text(`Зам.генерального директора    _____________________________________________ ${data[0].year}`, 20, finalY + 20);
    doc.text(`Руководитель ответственный`, 20, finalY + 30);
    doc.text(`за проведение заседания       _____________________________________________ ${data[0].year}`, 20, finalY + 35);
    doc.text(`Бригадир (рабочий-исполнтель) _____________________________________________ ${data[0].year}`, 20, finalY + 45);
    doc.text(`Протокол вел                  _____________________________________________ ${data[0].year}`, 20, finalY + 55);
    // doc.autoPrint()
    doc.save(`Протокол_КТУ_${data[0].shifr}_${data[0].month}_${data[0].year}.pdf`)
}
const transformDaysObject = (daysObj) => {
    const days = [];
    let total = 0
    for (let i = 1; i <= 31; i++) {
        const dKey = `d${i}`
        const mKey = `m${i}`
        if(daysObj[mKey].length) total++
        days[i-1] = ( daysObj[dKey] && daysObj[dKey].length ) ? daysObj[dKey] : daysObj[mKey]
    }
    return {days,total}
}
export default KTUToPdf