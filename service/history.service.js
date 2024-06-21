const ApiError = require('../exceptions/api.error')
const sequelize = require("sequelize");
const {HistoryTypes,History, Messages, ProtocolOfSoc, MyProgram, User, SocketActions, T13Uni, T13Black} = require("../models/models");
const {Op, literal, fn, col, Sequelize} = require("sequelize");
const moment = require('moment-timezone')

require('moment/locale/ru')
moment.locale('ru')
class HistoryService {
    async createType(name) {
        return await HistoryTypes.create({name})
    }
    async getTypes() {
        const types = await HistoryTypes.findAll()
        return types.map(item => {
            return {...item.dataValues,value:item.name,label:item.name}
        } )
    }
    async getAllHistory(sort,direct,page,type,date,user) {
        const sortingOptions = {
            'abc': [['id', direct ? 'ASC' : 'DESC']],
            'type': [['type_id', direct ? 'ASC' : 'DESC']],
            'action': [['action', direct ? 'ASC' : 'DESC']],
            'time': [['createdAt', direct ? 'ASC' : 'DESC']],
            'marker': [['marker', direct ? 'ASC' : 'DESC']]

        }
        const order = sortingOptions[sort] || [['id', direct ? 'ASC' : 'DESC']]

        const where = {}
        if (type) {
            where.type_id = type.id
        }
        if (user) {
            where.user_id = user.id
        }
        if (date) {
            const startDate = new Date(date)
            startDate.setHours(0, 0, 0, 0)
            const endDate = new Date(startDate)
            endDate.setHours(23, 59, 59, 999)

            where.createdAt = {
                [Op.gte]: startDate,
                [Op.lte]: endDate
            }
        }
        console.log(where)
        const {length} =  await History.findAll({where})
        const history =  await History.findAll({
            where,
            order,
            include: [
                { model: User, attributes: ['id', 'full_name'] }, // Включение данных из таблицы User с указанием нужных атрибутов
                { model: HistoryTypes, attributes: ['id', 'name'] } // Включение данных из таблицы HistoryTypes с указанием нужных атрибутов
            ],
            limit: 1000,
            offset: ( page * 1000)
        })//,'t13uni'
        return {history,length}
    }
    async getHoursHistory(day,timezone = 'Asia/Yekaterinburg'){
        const remove = await History.findAll({where:{type_id:6}})
        console.log(remove)

        const now = moment(day).tz(timezone)
        const startDate = now.clone().startOf('day').utc().toDate()
        const endDate = now.clone().endOf('day').utc().toDate()

        // Выполняем запрос на получение данных, сгруппированных по часам
        const history = await History.findAll({
            attributes: [
                [fn('DATE_TRUNC', 'hour', literal(`"createdAt" AT TIME ZONE '${timezone}'`)), 'hour'],
                [fn('COUNT', '*'), 'count']
            ],
            where: {
                createdAt: {
                    [Op.between]: [startDate, endDate]
                }
            },
            group: [literal('hour')],
            order: [literal('hour')]
        });

        const historyData = history.map(entry => ({
            hour: entry.get('hour'),
            count: entry.get('count')
        }));

        // Создаем массив всех часов текущего дня
        const result = Array.from({ length: 24 }, (_, i) => ({
            hour: moment(startDate).add(i, 'hours').tz(timezone).format('YYYY-MM-DD HH:00:00'),
            count: 0
        }));

        // Заполняем часы из результата запроса
        historyData.forEach(data => {
            const hourIndex = result.findIndex(h => h.hour === moment(data.hour).tz(timezone).format('YYYY-MM-DD HH:00:00'));
            if (hourIndex !== -1) {
                result[hourIndex].count = data.count;
            }
        });
       //const counts = result.map(entry => entry.get('count') )
        //const hours = result.map(entry => entry.get('hour') )

        const counts = result.map( item => {
            return item.count
        })
        return [0,...counts]
    }
    async getActionCountsForLast7Days(timezone = 'Asia/Yekaterinburg') {
        const now = moment().tz(timezone);
        const startDate = now.clone().subtract(6, 'days').startOf('day').utc().toDate(); // 7 дней назад включая сегодня
        const endDate = now.clone().endOf('day').utc().toDate(); // Текущий момент

        console.log(`Start Date (UTC): ${startDate}`)
        console.log(`End Date (UTC): ${endDate}`)

        // Выполняем запрос на получение данных за последние 7 дней
        const history = await History.findAll({
            attributes: [
                [fn('DATE_TRUNC', 'day', literal(`"createdAt" AT TIME ZONE 'UTC'`)), 'day'],
                [fn('COUNT', '*'), 'count']
            ],
            where: {
                createdAt: {
                    [Op.between]: [startDate, endDate]
                }
            },
            group: [literal('day')],
            order: [literal('day')]
        });

        // Инициализируем массив с нулевыми значениями для всех дней
        const days = Array.from({ length: 7 }, (_, i) => ({
            day: now.clone().subtract(6 - i, 'days').startOf('day').format('dddd'),
            count: 0
        }));

        // Заполняем массив данными из запроса
        history.forEach(entry => {
            const day = moment(entry.get('day')).tz(timezone).format('dddd')
            const index = days.findIndex(d => d.day === day)
            if (index !== -1) {
                days[index].count = entry.get('count')
            }
        })
        console.log(days)
        return days
    }
    async getActionCountsForMonth(month, timezone = 'Asia/Yekaterinburg') {
        const now = moment().tz(timezone);
        const startDate = moment().tz(timezone).month(month).startOf('month').utc().toDate(); // Начало указанного месяца
        const endDate = moment().tz(timezone).month(month).endOf('month').utc().toDate(); // Конец указанного месяца

        console.log(`Start Date (UTC): ${startDate}`);
        console.log(`End Date (UTC): ${endDate}`);

        // Выполняем запрос на получение данных за указанный месяц
        const history = await History.findAll({
            attributes: [
                [fn('DATE_TRUNC', 'day', literal(`"createdAt" AT TIME ZONE 'UTC'`)), 'day'],
                [fn('COUNT', '*'), 'count']
            ],
            where: {
                createdAt: {
                    [Op.between]: [startDate, endDate]
                }
            },
            group: [literal('day')],
            order: [literal('day')]
        });

        // Определяем количество дней в указанном месяце
        const daysInMonth = moment().month(month).daysInMonth();

        // Инициализируем массив с нулевыми значениями для всех дней месяца
        const days = Array.from({ length: daysInMonth }, (_, i) => ({
            day: moment(startDate).add(i, 'days').tz(timezone).format('YYYY-MM-DD'),
            count: 0
        }));

        // Заполняем массив данными из запроса
        history.forEach(entry => {
            const day = moment(entry.get('day')).tz(timezone).format('YYYY-MM-DD');
            const index = days.findIndex(d => d.day === day);
            if (index !== -1) {
                days[index].count = entry.get('count');
            }
        });

        return days;
    }
    async createAction(user_id,type_id,action,marker=0) {
        if( user_id !== 2216){ //user_id !== 2 &&
            return await History.create({user_id,type_id,marker,action})
        }
    }
    async createSocketAction(user_id,socket,action) {
        if( user_id !== 2216) {
            return await SocketActions.create({user_id, socket, action})
        }
    }
    async getSocketActions(user_id=null) {
        const subQuery = await SocketActions.findAll({
            attributes: [
                'user_id',
                [Sequelize.fn('MAX', Sequelize.col('socketactions.createdAt')), 'maxCreatedAt'],
                'user.full_name',
            ],
            where: {
                action: 'disconnection',
                ...(user_id && { user_id })
            },
            include: [{
                model: User,
                attributes: ['id','full_name'] // Укажите нужные поля из таблицы User
            }],
            group: ['socketactions.user_id', 'user.id'],
            order: [['user_id', 'ASC']],
        })
        const formattedResults = subQuery.map(entry => ({
            user_id: entry.user_id,
            maxCreatedAt: entry.get('maxCreatedAt'),
            name: entry.user.full_name,
        }));
        // return await Promise.all( subQuery.map( async item => {
        //     const user = await User.findByPk(item.dataValues.user_id)
        //     return {...item.dataValues,name:user.full_name}
        // }))
        return formattedResults
    }
    async getSocketActionsToday() {
        const timezone = 'Asia/Yekaterinburg';
        const startDate = moment().tz(timezone).startOf('day').toDate();
        const endDate = moment().tz(timezone).endOf('day').toDate();

        const subQuery = await SocketActions.findAll({
            attributes: [
                'user_id',
                [Sequelize.fn('MAX', Sequelize.col(`socketactions.createdAt`)), 'maxCreatedAt'],
                'user.full_name',
                'user.developer'
            ],
            //'Asia/Yekaterinburg'
            where: {
                action: 'connection',
                createdAt: {
                    [Op.between]: [startDate, endDate]
                },
            },
            include: [{
                model: User,
                attributes: ['id', 'full_name','developer'] // Укажите нужные поля из таблицы User
            }],
            group: ['socketactions.user_id', 'user.id'],
            order: [['maxCreatedAt', 'ASC']]
        });

        const formattedResults = subQuery.map(entry => ({
            user_id: entry.user_id,
            maxCreatedAt:moment(entry.get('maxCreatedAt')).tz(timezone).format('YYYY-MM-DD HH:mm:ss'),
            full_name: entry.user.full_name,
            developer:entry.user.developer
        }));

        return formattedResults
    }
}
module.exports = new HistoryService()