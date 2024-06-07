import React from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import amiriFont from "../../assets/fonts/amirifont";

import formatDate from "./formatDate";
const ProtocolToPdf = (protocol,commission) => {
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

    const predsed = commission.find(item => item.possion === 2)
    const members = commission.filter(item => item.possion === 1 && item.user_tn !== predsed.user_tn)

    doc.addFileToVFS("Amiri-Regular.ttf", amiriFont)
    doc.addFont("Amiri-Regular.ttf", "Amiri", "normal")
    doc.setFont("Amiri")
    doc.setFontSize(10)
    // Заголовок документа

    // Заголовок документа
    doc.setFontSize(10);
    doc.text("ПРОТОКОЛ", 105, 15, null, null, "center");
    doc.text("заседания комиссии социального фонда", 105, 20, null, null, "center");

    doc.text("№ 4", 15, 30);

    doc.text("Присутствовали:", 15, 35);

    // Присутствовали
    let participants1 = `${toShortFormat1(predsed.t13uni.name)} - председатель комиссии`
    let participants2 = members.map(member => {
        const shortName = member.t13uni.name.split(' ').length === 3 ? toShortFormat1(member.t13uni.name) : member.t13uni.name
        return `${shortName} - член комиссии`
    }).join(',\n')

    doc.setFontSize(9);
    doc.text(participants1, 60, 35);
    doc.text(participants2, 60, 38);

    doc.text(formattedDate, 200, 30, null, null, "right");
    doc.text("Повестка дня", 15, 45 + (members.length*5) )
    doc.text("Рассмотрение поступивших заявлений", 15, 60 + (members.length*4));

    // Данные для первой таблицы
    const headers1 = [["№", "Ф.И.О.", "профессия/должность", 'Вид',"Материальная помощь в связи с"]];
    const data1 = protocol.myprograms.map((item, index) => [
        index + 1,
        item.user.full_name,
        item.user.developer,
        'выделение материальной помощи',
        item.programofsoc.name,
    ])

    // Первая таблица
    doc.autoTable({
        head: headers1,
        body: data1,
        startY: 70,
        styles: {font: 'Amiri',
            fontStyle: 'normal',
            cellPadding: 1,
            lineWidth: 0.1,
            lineColor: [0, 0, 0],
            fontSize: 6 },
        headStyles: {font: 'Amiri',fontStyle: 'normal',fontSize:7, textColor:[0, 0, 0],fillColor: [0, 0, 0, 0] },
        theme: 'grid',
    });

    // Решение
    const decision = `Решение:
    1. Выделить материальную помощь следующим лицам:`;
    doc.text(decision, 15, doc.lastAutoTable.finalY + 10);

    // Данные для второй таблицы
    const headers2 = [["№", "Ф.И.О.", "пункт Положения", "Материальная помощь в связи с", "сумма (руб.)", "Дата приема"]];
    const data2 = protocol.myprograms.map((item, index) => [
        index + 1,
        item.user.full_name,
        "п. 3.3.7 Положения",
        item.programofsoc.name,
        item.programofsoc.sum,
        formatDate(item.createdAt)
    ])

    // Вторая таблица
    doc.autoTable({
        head: headers2,
        body: data2,
        startY: doc.lastAutoTable.finalY + 20,
        styles: {font: 'Amiri',
            fontStyle: 'normal',
            cellPadding: 1,
            lineWidth: 0.1,
            lineColor: [0, 0, 0],
            fontSize: 6 },
        headStyles: {font: 'Amiri',fontStyle: 'normal',fontSize:8, textColor:[0, 0, 0],fillColor: [0, 0, 0, 0] },
        theme: 'grid',
    });

    doc.setFontSize(9)
    doc.text(`Итого:`, 15, doc.lastAutoTable.finalY + 10)
    doc.text(`${protocol.myprograms.reduce((accumulator, row) => {return accumulator + row.programofsoc.sum }, 0)} руб.`, 200, doc.lastAutoTable.finalY + 10, null, null, "right")

    // Подписи
    doc.text("Подписи:", 15, doc.lastAutoTable.finalY + 15);

    participants1 = `${toShortFormat1(predsed.t13uni.name)}      ____________`
    participants2 = members.map(member => {
        const shortName = member.t13uni.name.split(' ').length === 3 ? toShortFormat2(member.t13uni.name) : member.t13uni.name
        return `${shortName}      ____________`
    }).join('\n\n')

    doc.text(participants1, 200, doc.lastAutoTable.finalY + 20, null, null, "right");
    doc.text(participants2, 200, doc.lastAutoTable.finalY + 27, null, null, "right");

    // Сохранение PDF
    doc.save(`protocol_${protocol.id}.pdf`)
}

function toShortFormat1(fullName) {
    const parts = fullName.split(' ')
    if (parts.length !== 3) {
        throw new Error('Full name must have three parts: last name, first name, and patronymic.')
    }
    const [lastName, firstName, patronymic] = parts;
    return `${lastName} ${firstName.charAt(0)}. ${patronymic.charAt(0)}.`
}
function toShortFormat2(fullName) {
    const parts = fullName.split(' ')
    if (parts.length !== 3) {
        throw new Error('Full name must have three parts: last name, first name, and patronymic.')
    }
    const [lastName, firstName, patronymic] = parts;
    return `${firstName.charAt(0)}. ${patronymic.charAt(0)}. ${lastName}`
}
export default ProtocolToPdf