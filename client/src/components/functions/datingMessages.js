export default function datingMessages(messages){
    const result = [];
    let lastDate = null;

    messages.slice().reverse().forEach(message => {
        const messageDate = formatDateString(message.createdAt);
        if (messageDate !== lastDate) {
            result.push({ id: `date-${message.id}`, text: messageDate, createdAt: message.createdAt, service: true })
            lastDate = messageDate;
        }
        result.push(message)
    })
    return result
}
function formatDateString(date) {
    const now = new Date();
    const messageDate = new Date(date);

    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
    const dayBeforeYesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 2);

    if (messageDate >= today) {
        return "Сегодня";
    } else if (messageDate >= yesterday) {
        return "Вчера";
    } else if (messageDate >= dayBeforeYesterday) {
        return "Позавчера";
    } else if (messageDate.getFullYear() === now.getFullYear()) {
        return messageDate.toLocaleDateString('ru-RU', { month: 'long', day: 'numeric' });
    } else {
        return messageDate.toLocaleDateString('ru-RU');
    }
}