import { isEmpty } from '../../../utils/utils'
import { now } from '../../../utils/dateUtil';

export function find(entity, body, sort = null, isPagination = true) {
    return new Promise((resolve, reject) => {

        body.dados.aplication = process.env.NAME_APLICATION || "AFIRMANET"

        if ("sistematico" != isAuth.user.id_user) {
            body.dados.id_user = isAuth.user.id
        }

        let count = 0
        let countRows = entity.countDocuments(body.dados);
        countRows.then(retorno => {
            count = retorno
            let result = entity.find(body.dados)
            if (sort != null) {
                result.sort(sort)
            }

            if (isPagination) {
                result.skip((body.details.maxRows * body.details.page) - body.details.maxRows).limit(body.details.maxRows)
            }

            return result

        }).then(retorno => {
            let start = ((body.details.maxRows * body.details.page) - body.details.maxRows + 1)
            let rowsPage = count
            if (count > (body.details.maxRows * body.details.page)) {
                rowsPage = (body.details.maxRows * body.details.page)
            }

            body.message = ' ' + start + ' - ' + rowsPage + ' de ' + count + ' '
            body.details.rows = count
            body.dados = retorno

            resolve(body)

        }).catch(error => {
            body = logError(body, error, "find")
            reject(body)
        })
    })
}

export function add(entity, body) {
    return new Promise((resolve, reject) => {
        body.dados.aplication = process.env.NAME_APLICATION || "AFIRMANET"
        body.dados.date_system = now()

        let doc = entity(body.dados)
        let result = doc.save()
        result.then(retorno => {
            resolve(retorno)

        }).catch(error => {
            body = logError(body, error, "add")
            reject(body)

        })
    })
}

export function change(entity, body) {
    return new Promise((resolve, reject) => {
        body.dados.id_user = isAuth.user.id
        body.dados.aplication = process.env.NAME_APLICATION || "AFIRMANET"
        body.dados.date_system = now()

        let find = entity.findById({ _id: body.dados.id }).filter._id()
        find.then(doc => {
            doc.set(body.dados)
            return doc.save()

        }).then(retorno => {
            resolve(retorno)

        }).catch(error => {
            body = logError(body, error, "change")
            reject(body)

        })
    })
}

export function remover(entity, body, sort = null) {
    return new Promise((resolve, reject) => {
        body.dados.id_user = isAuth.user.id
        body.dados.aplication = process.env.NAME_APLICATION || "AFIRMANET"
        body.dados.date_system = now()

        let result = entity.deleteOne({ _id: body.dados.id }).filter._id()
        result.then(retorno => {
            resolve(retorno)

        }).catch(error => {
            body = logError(body, error, "remover")
            reject(body)

        })
    })
}