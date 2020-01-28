import { loadFragment, timeSleep } from './modules/utils.mjs'
import { validateLogin } from './modules/utilsServ.mjs'
import { preLoadLogin, setHeaderAndFooter } from './modules/login.mjs'
import { loadFormClinicas } from './modules/clinicas.mjs'
import { loadFormProfissionais } from './modules/profissionais.mjs'
import { loadFormParceiros } from './modules/parceiros.mjs'
import { loadFormPacientes } from './modules/pacientes.mjs'
import { loadFormAgendas } from './modules/agendas.mjs'
import { loadFormDashboard } from './modules/dashboard.mjs'
import { getDadosProfile } from './modules/profiles.mjs'

$(document).ready(function () {
    var linkAll = document.querySelectorAll('link[rel="import"]')
    linkAll.forEach(item => {
        loadFragment(item)
    })


    if (document.location.pathname == "/login.html") {
        preLoadLogin()
    }

    $('#log-out-sys').on('click', function () {
        localStorage.setItem("SESSIONUID", null)
        window.location.replace("/login.html")
    })

    if (validateLogin()) {
        let dashboard = '<li class="nav-item"><a href="#dashboard" class="btn active" data-toggle="pill"><i class="fa fa-bar-chart mx-1 my-1" style="font-size:24px;" aria-hidden="true"> </i><label>Dashboard</label></a></li>'
        let agendas = '<li class="nav-item" ><a href="#agendas" class="btn" data-toggle="pill"><i class="fa fa-calendar  mx-1 my-1" style="font-size:24px;" aria-hidden="true"></i><span>Agendas</span></a></li>'
        let messages = '<li class="nav-item"><a href="#messages" class="btn" data-toggle="pill"><i class="fa fa-comments mx-1 my-1" style="font-size:24px;" aria-hidden="true"></i><span>Mensagens</span></a></li>'
        let clinicas = '<li class="nav-item"><a href="#clinicas" class="btn" data-toggle="pill"><i class="fa fa-medkit mx-1 my-1" style="font-size:24px;" aria-hidden="true"></i><span>Clinicas</span></a></li>'
        let profissionais = '<li class="nav-item"><a href="#profissionais" class="btn" data-toggle="pill"><i class="fa fa-users mx-1 my-1" style="font-size:24px;" aria-hidden="true"></i><span>Profissionais</span></a></li>'
        let parceiros = '<li class="nav-item"><a href="#parceiros" class="btn" data-toggle="pill"><i class="fa fa-briefcase mx-1 my-1" style="font-size:24px;" aria-hidden="true"></i><span>Parceiros</span></a></li>'
        let pacientes = '<li class="nav-item"><a href="#pacientes" class="btn" data-toggle="pill"><i class="fa fa-heartbeat mx-1 my-1" style="font-size:24px;" aria-hidden="true"></i><span>Pacientes</span></a></li>'
        let financeiro = '<li class="nav-item"><a href="#financeiro" class="btn" data-toggle="pill"><i class="fa fa-money mx-1 my-1" style="font-size:24px;" aria-hidden="true"></i><span>Financeiro</span></a></li>'

        let userLogado = JSON.parse(localStorage.getItem("UserLogado"))
        getDadosProfile({ id: userLogado.id_profile }).then(retorno => {
            let dadosOne = retorno.dados[0]
            let permissions = dadosOne.permissions.sort()

            permissions.forEach(item => {
                if (item.toLowerCase() == "dashboard") {
                    $('#menu').append(dashboard)
                    loadFormDashboard()
                } else if (item.toLowerCase() == "agendas") {
                    $('#menu').append(agendas)
                } else if (item.toLowerCase() == "messages") {
                    $('#menu').append(messages)
                } else if (item.toLowerCase() == "clinicas") {
                    $('#menu').append(clinicas)
                } else if (item.toLowerCase() == "profissionais") {
                    $('#menu').append(profissionais)
                } else if (item.toLowerCase() == "parceiros") {
                    $('#menu').append(parceiros)
                } else if (item.toLowerCase() == "pacientes") {
                    $('#menu').append(pacientes)
                } else if (item.toLowerCase() == "financeiro") {
                    $('#menu').append(financeiro)
                }

            })

            $('a[data-toggle="pill"]').on('shown.bs.tab', function (e) {
                timeSleep(true)
                validateLogin()
                let nameTableDestino = e.target.hash // newly activated tab

                if ("#clinicas" == nameTableDestino) {
                    loadFormClinicas()

                } else if ("#profissionais" == nameTableDestino) {
                    loadFormProfissionais()

                } else if ("#agendas" == nameTableDestino) {
                    loadFormAgendas()

                } else if ("#parceiros" == nameTableDestino) {
                    loadFormParceiros()

                } else if ("#pacientes" == nameTableDestino) {
                    loadFormPacientes()

                } else if ("#dashboard" == nameTableDestino) {
                    loadFormDashboard()

                }

                timeSleep(false)
            })
        })

        setHeaderAndFooter()
    }
})

$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})