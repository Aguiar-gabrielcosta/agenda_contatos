const form = document.getElementById('form')
const contatos = new Map() // Map como contatos, onde as chaves são os telefones e o nome do contato o valor.
const nome = document.getElementById('input-nome')
const celular = document.getElementById('input-celular')

function adicionaContato(nome, celular){

    const novaLinha = document.createElement('tr')
    const novoContatoNome = document.createElement('td')
    const novoContatoCel = document.createElement('td')

    novoContatoNome.innerHTML = nome
    novoContatoCel.innerHTML = celular
    novaLinha.appendChild(novoContatoNome)
    novaLinha.appendChild(novoContatoCel)

    document.getElementById('lista-contatos').appendChild(novaLinha)
}

function atualizaContatos() {
    document.getElementById('lista-contatos').innerHTML = ''

    for (const [celular, nome] of contatos) {
        adicionaContato(nome, celular)
    }
}

function liberaCadastro(boolean) {
    if (boolean) {
        document.getElementById('btn-cadastro').disabled = false;
        document.getElementById('btn-cadastro').classList.remove('btn-disabled')
    } else {
        document.getElementById('btn-cadastro').disabled = true;
        document.getElementById('btn-cadastro').classList.add('btn-disabled')
    }
}

function mostrarAlerta(mensagem) {
    const painel = document.getElementById('msg-to-user')
    painel.innerHTML = mensagem
    painel.classList.add('alerta')
    painel.classList.remove('hide') 
}

function removerAlertas() {
    const painel = document.getElementById('msg-to-user')
    painel.innerHTML = ''
    painel.classList.remove('alerta')
    painel.classList.add('hide')
}

form.addEventListener('submit', (e) => {

    e.preventDefault()

    // Regra de negócio (Cada celular corresponde a 1 contato) - Uso da classe Map.
    contatos.set(celular.value, nome.value)

    atualizaContatos()

    // Reset
    celular.value = ''
    nome.value = ''
    liberaCadastro(false)
    removerAlertas()
})

// Mascara para celular
celular.addEventListener('input', (e) => {
    valor = celular.value
    valor = valor.replace(/\D/g, "")
    valor = valor.replace(/^(\d{2})(\d)/g, "($1) $2")
    valor = valor.replace(/(\d)(\d{4})$/, "$1-$2")
    celular.value = valor
})

// Condições para liberação da adição de contato
// Nome e celular preenchidos
nome.addEventListener('input', (e) => {
    if ((nome.value !== '') & (celular.value === 15)) {
        liberaCadastro(true)
    } else {
        liberaCadastro(false)
    }
})

celular.addEventListener('input', (e) => {
    if ((nome.value !== '') & (celular.value.length === 15)) {
        liberaCadastro(true)
    } else {
        liberaCadastro(false)
    }
})

// Avisos ao usuário
celular.addEventListener('input', (e) => {
    if (contatos.has(celular.value)) {
        mostrarAlerta('O celular digitado já está ligado a um contato existente, o resultado do cadastro resultará na mudança do nome ligado ao celular.')
    } else {
        removerAlertas()
    }
})

