
// Pegando o ID do player 1

const rockOne = document.querySelector('#rock-one')
const paperOne = document.querySelector('#paper-one')
const scissorsOne = document.querySelector('#scissors-one')

// Pegando o ID do computador  (Player 2)

const rockTwo = document.querySelector('#rock-two')
const paperTwo = document.querySelector('#paper-two')
const scissorsTwo = document.querySelector('#scissors-two')

// Pontuações
const ptsPlayer1 = document.querySelector('#pts-player1')
let pts1 = 0
const ptsPlayer2 = document.querySelector('#pts-player2')
let pts2 = 0

// função principal
main()

function main() {
    beforeChoice()
}

// Função responsavel por pegar o clicks 
function beforeChoice() {
    // variavel para guarda opção selecionada pelo jogador
    let option = 0

    rockOne.addEventListener('click', (e) => {
        option = 1
        // Adiciona a class select para ficar marcado
        rockOne.classList.add("select")
        computer(option)
    })

    paperOne.addEventListener('click', (e) => {
        option = 2
        paperOne.classList.add("select")
        computer(option)
    })

    scissorsOne.addEventListener('click', (e) => {
        option = 3
        scissorsOne.classList.add("select")
        computer(option)
    })
}
// numero randomico do computador
function computer(option) {
    let option1 = option
    let option2 = random()

    if(option2 === 1){
        rockTwo.classList.add("select")
        winner(option1,option2)
    } 

    if(option2 === 2){
        paperTwo.classList.add("select")
        winner(option1,option2)
    } 

    if(option2 === 3){
        scissorsTwo.classList.add("select")
        winner(option1,option2)
    } 
}
// Gera um numero aleatorio entre 1 e 3
function random(){
    let numRandom = Math.floor(Math.random() * (4 - 1) + 1)
    return numRandom 
}

// função que chama o vencedor
function winner(option1,option2) {

    if(option1 === option2) return afterChoice(0)

    if(option1 === 1 && option2 === 2) return afterChoice(2)
    if(option1 === 2 && option2 === 3) return afterChoice(2)
    if(option1 === 3 && option2 === 1) return afterChoice(2)

    if(option1 === 2 && option2 === 1) return afterChoice(1)
    if(option1 === 3 && option2 === 2) return afterChoice(1)
    if(option1 === 1 && option2 === 3) return afterChoice(1)
}

// função que remove todas as classes de select
function removeClass() {
    rockOne.classList.remove("select")
    rockTwo.classList.remove("select")
    paperOne.classList.remove("select")
    paperTwo.classList.remove("select")
    scissorsOne.classList.remove("select")
    scissorsTwo.classList.remove("select")
}

// o que acontece apos ter um vencedor
function afterChoice(ganhador) {
    const winner = ganhador
    setInterval(removeClass,4000)
    if(winner === 0){
        pts1++
        ptsPlayer1.innerText = pts1

        pts2++
        ptsPlayer2.innerText = pts2
    } 

    if(winner === 1){
        pts1++
        ptsPlayer1.innerText = pts1
    }

    if(winner === 2){
        pts2++
        ptsPlayer2.innerText = pts2
    }
}


