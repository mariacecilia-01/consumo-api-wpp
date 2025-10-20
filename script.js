'use strict'

//aqui é a tela principal, um container que contem duas divs, a primeira div exibe os contatos e a outra mostrará as conversas
const container = document.getElementById('container')

const divContatos = document.createElement('div')
divContatos.id = 'divContatos'

const divConversa = document.createElement('div')
divConversa.id = 'divConversa'

//lista todos os contatos do usuário Ricardo da Silva
async function listarContatos() {
    //fetch endpoint da api - endpoint tirado do render.
    const response = await fetch('https://api-whatsapp-4z37.onrender.com/v1/whats-users')
    const contatos = await response.json()

    //criando a maneira que os contatos aparecerão em lista
    contatos.forEach(contato => {
        const divContato = document.createElement('div')
        divContato.classList.add('contato')

        //cria a imagem. Como a imagem que está no array não existe, estou puxando do diretorio local as fotos salvas manualmente, concatenando com a requisição na api
        const imageContato = document.createElement('img')
        imageContato.src = `./fotos_contatos/${contato.image}`
        imageContato.alt = contato.name
        imageContato.classList.add('imagemContato')

        const nomeContato = document.createElement('h2')
        nomeContato.textContent = contato.name

        const infoContato = document.createElement('div')
        infoContato.classList.add('infoContato')

        infoContato.appendChild(imageContato)
        infoContato.appendChild(nomeContato)

        divContato.appendChild(infoContato)

        divContatos.appendChild(divContato)
 
    });


}

listarContatos()