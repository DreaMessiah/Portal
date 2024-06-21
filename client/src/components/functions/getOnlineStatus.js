const moment = require('moment')

export default function getOnlineStatus(gender, lastVisit=null) {
    if(!lastVisit) return 'Был(а) в сети очень давно'
    const now = moment()
    const visitTime = moment(lastVisit)

    let prefix
    if (gender === 'Мужской') {
        prefix = 'Был в сети'
    } else if (gender === 'Женский') {
        prefix = 'Была в сети'
    } else {
        prefix = 'Был(а) в сети'
    }

    if (now.isSame(visitTime, 'day')) {
        const hoursAgo = now.diff(visitTime, 'hours')
        const minutesAgo = now.diff(visitTime, 'minutes')
        if (hoursAgo < 1) {
            return `${prefix} ${minutesAgo} ${getMinutesText(minutesAgo)} назад`
        }
        return `${prefix} ${hoursAgo} ${getHoursText(hoursAgo)} назад`
    } else if (now.subtract(1, 'day').isSame(visitTime, 'day')) {
        return `${prefix} вчера в ${visitTime.format('HH:mm')}`
    } else {
        return `${prefix} ${visitTime.format('DD.MM.YY в HH:mm')}`
    }
}

function getHoursText(hours) {
    if (hours === 1) {
        return 'час'
    } else if (hours >= 2 && hours <= 4) {
        return 'часа'
    } else {
        return 'часов'
    }
}

function getMinutesText(minutes) {
    if (minutes === 1) {
        return 'минуту'
    } else if (minutes >= 2 && minutes <= 4) {
        return 'минуты'
    } else {
        return 'минут'
    }
}