import entity from '../entites/assistant';
import { find, add, change, remover } from './generic/genericDAO'

export function insert(dados) {
    let body = {
        dados: dados
    }

    add(entity, body).then(retorno => {
        console.log('Insert com sucesso!')
    }).catch(error => {
        console.error(error)
    })
}
