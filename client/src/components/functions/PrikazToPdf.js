import React from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import amiriFont from "../../assets/fonts/amirifont";

import formatDate from "./formatDate";
const PrikazToPdf = (protocol) => {
    const doc = new jsPDF('portrait', 'mm',[210,297])

    const months = [
        "января", "февраля", "марта", "апреля", "мая", "июня",
        "июля", "августа", "сентября", "октября", "ноября", "декабря"
    ]

    const today = new Date()

    const day = today.getDate()
    const month = months[today.getMonth()]
    const year = today.getFullYear()

    const formattedDate = `${day} ${month} ${year} г`;

    doc.addFileToVFS("Amiri-Regular.ttf", amiriFont)
    doc.addFont("Amiri-Regular.ttf", "Amiri", "normal")
    doc.setFont("Amiri")
    doc.setFontSize(10)
    // Заголовок документа

    doc.text("РОССИЙСКАЯ ФЕДЕРАЦИЯ", 105, 15, null, null, "center");
    doc.text("ТЮМЕНСКАЯ ОБЛАСТЬ", 105, 20, null, null, "center");
    doc.text("ХАНТЫ-МАНСИЙСКИЙ АВТОНОМНЫЙ ОКРУГ", 105, 25, null, null, "center");
    doc.text("ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ", 105, 30, null, null, "center");
    doc.text("СУРГУТСКОЕ РЕМОНТНО-СТРОИТЕЛЬНОЕ УПРАВЛЕНИЕ", 105, 35, null, null, "center");

    // Дата и номер приказа
    doc.text("Сургутский район", 15, 45);
    doc.text("ПРИКАЗ", 105, 55, null, null, "center");
    doc.text(`№ ${protocol.id}`, 105, 60, null, null, "center");
    doc.text(formattedDate, 200, 45, null, null, "right");

    // Тело документа
    const body = `О предоставлении
материальной помощи

В соответствии с действующим Положением по предоставлению дополнительных социальных гарантий 
и компенсаций работникам ООО "Сургутское РСУ", подавшим заявления о материальной помощи:

ПРИКАЗЫВАЮ:
    
1. Комиссии социального фонда провести заседание по рассмотрению поступивших заявлений 
о предоставлении материальной помощи и утвердить протокол заседания комиссии.
2. Бухгалтерии произвести выплаты из социального фонда следующим сотрудникам, согласно 
протокола заседания комиссии:`;

    doc.setFontSize(9);
    doc.text(body, 15, 70);

    const headers = [["№", "Ф.И.О.", "пункт Положения", "Материальная помощь в связи с", "сумма (руб.)", "Дата приема"]];
    const tableRows = protocol.myprograms.map((item, index) => [
        index + 1,
        item.user.full_name,
        "п. 3.3.7 Положения",
        item.programofsoc.name,
        item.programofsoc.sum,
        formatDate(item.createdAt)
    ])
    doc.autoTable({
        head: headers,
        body: tableRows,
        startY: 120,
        styles: {font: 'Amiri',
            fontStyle: 'normal',
            cellPadding: 1,
            lineWidth: 0.1,
            lineColor: [0, 0, 0],
            fontSize: 6 },
        headStyles: {font: 'Amiri',fontStyle: 'normal',fontSize:8, textColor:[0, 0, 0],fillColor: [0, 0, 0, 0] },
        theme: 'grid',
    })
    doc.setFontSize(9)
    doc.text(`Итого:`, 15, doc.lastAutoTable.finalY + 10)
    doc.text(`${protocol.myprograms.reduce((accumulator, row) => {return accumulator + row.programofsoc.sum }, 0)} руб.`, 200, doc.lastAutoTable.finalY + 10, null, null, "right")
    const ctrltext = `3. Контроль за исполнением настоящего приказа возлагаю на заместителя генерального директора
     по общим вопросам Чуплатова А.И.`
    // Конец документа
    doc.text(ctrltext, 15, doc.lastAutoTable.finalY + 20)
    doc.text("Генеральный директор", 15, doc.lastAutoTable.finalY + 30)
    doc.text("А.В. Макаров", 200, doc.lastAutoTable.finalY + 30, null, null, "right")
    doc.save(`prikaz_${protocol.id}.pdf`)
}

export default PrikazToPdf