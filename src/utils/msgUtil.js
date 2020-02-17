'use strict';

export const crudSucess = {
    add: {code: '200', message: 'Inclusão efetuada com Sucesso!'},
    update: {code: '200', message: 'Atualização efetuada com Sucesso!'},
    delete: {code: '200', message: 'Exclusão efetuada com Sucesso!'},
    search: {code: '200', message: 'Busca efetuada com Sucesso!'}
}

export const crudError = {
    add: {code: '500', message: 'Inclusão não efetuada!'},
    update: {code: '500', message: 'Atualização não efetuada!'},
    delete: {code: '500', message: 'Exclusão não efetuada!'},
    search: {code: '500', message: 'Busca não efetuada!'}
}

export const validarDados = {
    fildNull: {code: '500', message: 'É necessário preencher os campos obrigatórios!'}
}