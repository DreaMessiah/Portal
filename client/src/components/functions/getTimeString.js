export default function getTimeString(inputDate) {
    const date = new Date(inputDate);
    const currentDate = new Date();

    function isToday(someDate) {
        return someDate.getDate() === currentDate.getDate() &&
            someDate.getMonth() === currentDate.getMonth() &&
            someDate.getFullYear() === currentDate.getFullYear()
    }

    function isYesterday(someDate) {
        const yesterday = new Date(currentDate)
        yesterday.setDate(currentDate.getDate() - 1)
        return someDate.getDate() === yesterday.getDate() &&
            someDate.getMonth() === yesterday.getMonth() &&
            someDate.getFullYear() === yesterday.getFullYear()
    }

    function isDayBeforeYesterday(someDate) {
        const dayBeforeYesterday = new Date(currentDate)
        dayBeforeYesterday.setDate(currentDate.getDate() - 2)
        return someDate.getDate() === dayBeforeYesterday.getDate() &&
            someDate.getMonth() === dayBeforeYesterday.getMonth() &&
            someDate.getFullYear() === dayBeforeYesterday.getFullYear()
    }

    function formatDate(someDate) {
        const day = someDate.getDate().toString().padStart(2, '0')
        const month = (someDate.getMonth() + 1).toString().padStart(2, '0')
        const year = someDate.getFullYear()
        return `${day}.${month}.${year}`
    }

    if (isToday(date)) {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        return `${hours}:${minutes}`
    } else if (isYesterday(date)) {
        return "вчера"
    } else if (isDayBeforeYesterday(date)) {
        return "позавчера"
    } else if (date.getFullYear() === currentDate.getFullYear()) {
        return formatDate(date)
    } else {
        return date.toLocaleDateString()
    }
}
