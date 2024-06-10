import React from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import amiriFont from "../../assets/fonts/amirifont";
const TabelToPdf = (data,object) => {
    // const doc = new jsPDF();//'landscape', 'mm',[297, 210]
    const doc = new jsPDF('landscape', 'mm',[297, 210]);

    const tableColumn = [
        '№',
        'Имя',
        'Должность',
        ...Array.from({ length: 31 }, (_, i) => `${i + 1}`),
        'Σ',
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
        item.developer,
        ...item.days,
        item.total,
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
    const text = `ООО "СУРГУТСКОЕ РСУ" | ${data[0].month} ${data[0].year} | ${data[0].shifr} | ${object}`
    const maxWidth = doc.internal.pageSize.getWidth() - 40
    const lines = doc.splitTextToSize(text, maxWidth)
    lines.forEach((line, index) => {
        doc.text(line, 20, 20 + (index * 5))
    })
    doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 20 + ( lines.length*6),
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
    doc.text("Начальник отдела  ______________________________  ________________________  _____________________", 20, finalY + 10);
    doc.text("Согласовано       ______________________________  ________________________  _____________________", 20, finalY + 25);
    // doc.autoPrint()
    doc.save(`tabel_${data[0].shifr}_${data[0].month}_${data[0].year}.pdf`)
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
export default TabelToPdf