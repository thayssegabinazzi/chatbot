"use strict";

require("dotenv").config({ silent: true });
const moment = require('moment-timezone');
const format_pattern = 'YYYY-MM-DD HH:mm:ss';

const dateUtil = {}

/**
 * Este metodo now é destinado apenas para retornar a data atual 
 * com a Time zone de identificado na variavel de ambiente
 * Este metodo espera os parametros
 * @param {string} pattern o não é obrigatório pattern padrão 'YYYY-MM-DD HH:mm:ss'
 */
dateUtil.now = (pattern = null) => {
    let date =  moment(new Date().now).tz(process.env.TZ).format(format_pattern);
    if(pattern != null){
        date =  moment(new Date().now).tz(process.env.TZ).format(pattern);
    }

    return date;
}

dateUtil.getFirstDayMonth = (data_referencia = new Date().now) => {
    return moment(data_referencia).tz(process.env.TZ).date(1).format(format_pattern);
}

dateUtil.getLastDayMonth = (data_referencia = new Date().now) => {
    return moment(data_referencia).tz(process.env.TZ).date(1).add(1, 'months').subtract(1, 'days').format(format_pattern);
}


module.exports = dateUtil;