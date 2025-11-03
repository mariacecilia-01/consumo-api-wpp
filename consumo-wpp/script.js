'use strict'

//aqui é a tela principal, um container que contem duas divs, a primeira div exibe os contatos e a outra mostrará as conversas
const container = document.getElementById('container')
const divContatos = document.getElementById('contatos')
const divConversas = document.getElementById('conversas')

//lista todos os contatos do usuário Ricardo da Silva
async function listarContatos() {
    divContatos.innerHTML = ''

    try {
        //fetch endpoint da api - endpoint tirado do render.
        const response = await fetch('https://api-whatsapp-4z37.onrender.com/v1/user-contacts?number=11987876567')

        const contatosData = await response.json()


        //criando a maneira que os contatos aparecerão em lista
        if (contatosData && Array.isArray(contatosData.contacts)) {
            console.log(contatosData)
            contatosData.contacts.forEach(contato => {

                const divContato = document.createElement('div')
                divContato.classList.add('contato')

                console.log(contato)
                divContato.dataset.contactNumber = contato.contact_number

                //cria a imagem. Como a imagem que está no array não existe, estou puxando do diretorio local as fotos salvas manualmente, concatenando com a requisição na api
                const imageContato = document.createElement('img')
                imageContato.src = `./fotos_contatos/${contato.photo}`
                imageContato.alt = contato.name
                imageContato.classList.add('imagemContato')

                const nomeContato = document.createElement('h2')
                nomeContato.classList.add('nome')
                nomeContato.textContent = contato.name_contact

                const descricaoContato = document.createElement('p')
                descricaoContato.classList.add('descricao')
                descricaoContato.textContent = contato.description

                const numeroContato = document.createElement('p')
                numeroContato.classList.add('numero')
                numeroContato.textContent = contato.number

                const nomeDescricaoContato = document.createElement('div')
                nomeDescricaoContato.classList.add('nomeDescricao')


                nomeDescricaoContato.appendChild(nomeContato)
                nomeDescricaoContato.appendChild(numeroContato)
                nomeDescricaoContato.appendChild(descricaoContato)
                

                divContato.appendChild(imageContato)
                divContato.appendChild(nomeDescricaoContato)

                divContato.addEventListener('click', () => {
                    const contactNumber = divContato.dataset.contactNumber
                    if (contactNumber) {
                        listarConversas(contactNumber)
                    }
                })
                divContatos.appendChild(divContato)
            });

        }

    } catch (error) {
        console.error('Erro ao listar contatos:', error)
    }

}

async function listarConversas(numberContact) {
    divConversas.innerHTML = ''



    try {
        const response = await fetch(`https://api-whatsapp-4z37.onrender.com/v1/chat/?numberUser=11987876567&numberContact=${numberContact}`)

        const conversasData = await response.json()
        
        if (conversasData && Array.isArray(conversasData.chat)) {
            conversasData.chat.forEach(conversa => {

                const divBlocoMensagem = document.createElement('div')
                divBlocoMensagem.classList.add('blocoMensagem')

                if (conversa.sender === 'me') {
                    divBlocoMensagem.classList.add('mensagemUser') // mensagem enviada por mim
                } else {
                    divBlocoMensagem.classList.add('mensagemContato') // mensagem recebida
                }

                const mensagem = document.createElement('p')
                mensagem.classList.add('mensagem')
                mensagem.textContent = conversa.content

                const horaMensagem = document.createElement('span')
                horaMensagem.classList.add('horario')
                horaMensagem.textContent = conversa.time


                divBlocoMensagem.appendChild(mensagem)
                divBlocoMensagem.appendChild(horaMensagem)

                divConversas.appendChild(divBlocoMensagem)
            })
        } else {
            divConversas.textContent = "Clique em um contato para começar a conversar."
        }
    } catch (error) {
        return false
    }
}


listarContatos()
// listarConversas('26999999963')