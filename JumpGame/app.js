
/**
 *  VARIAVEIS
 */

/** 
 * O evento DOMContentLoaded é acionado quando todo o HTML foi completamente carregado e analisado, * sem aguardar pelo CSS, imagens, e subframes para encerrar o carregamento. 
 * 
 * https://developer.mozilla.org/pt-BR/docs/Web/API/Window/DOMContentLoaded_event
 */

document.addEventListener('DOMContentLoaded', () => {
    // Carregando o fundo
    const grid = document.querySelector('.grid')

    // Criando uma div para o doodler (personagem do jogo)
    const doodler = document.createElement('div')

    // Ponto inicial
    let startPoint = 150

    // Variavel que armazena o espaço que o doodler se movimenta
    let doodlerLeftSpace = 50
    let doodlerBottomSpace = startPoint

    // Variavel de game over
    let isGameOver = false

    // Quantidade de plataformas
    let platformCount = 5

    // Altura do grid (fundo)
    let heightGrid = 600

    // Variavel para armazenas as plataformas
    let platforms = []

    // Variaveis de tempo, plataforma e doodler
    let upTimerId
    let downTimeId

    // Variaveis do pulo
    let isJumping = true

    // Variaveis de movimento
    let isGoingLeft = false
    let leftTimerId
    let isGoingRight = false
    let rightTimerId

    // pontuação
    let score = 0

    /**
     *  FUNÇÕES
     */

    // Função que cria um Doodle dentro do grid
    function createDoodle() {
        // O grid chama a função, appendChild, que cria um "filho" doodler
        grid.appendChild(doodler)

        // adiciona a class doodler com os elementos css
        doodler.classList.add('doodler')

        doodlerLeftSpace = platforms[0].left

        // move o doodler para a esquerda
        doodler.style.left = doodlerLeftSpace + 'px'
        doodler.style.bottom = doodlerBottomSpace + 'px'
    }

    class Platform {
        constructor(newPlatBottom) {
            // Espaçamento do topo
            this.bottom = newPlatBottom

            // Espaçamento da esqurda, pode ser qualquer numero entre 0 e 315
            // sendo assim, um valor aleatorio em cada plataforma
            this.left = Math.random() * 315

            // Certifica de criar um elemento visual para cada plataforma
            this.visual = document.createElement('div')
            const visual = this.visual
            visual.classList.add('platform')
            visual.style.left = this.left + 'px'
            visual.style.bottom = this.bottom + 'px'
            grid.appendChild(visual)
        }
    }

    // Função que cria as plataformas
    function createPlatforms() {
        // For que gera 5 plataformas
        for (let i = 0; i < platformCount; i++) {
            // Criando o tamanho das plataformas
            let platGap = heightGrid / platformCount

            // Criando o espaçamento entre as plataformas
            let newPlatBottom = 100 + i * platGap

            // Criando uma nova plataforma
            let newPlatform = new Platform(newPlatBottom)

            // Salva todas as plataformas criadas
            platforms.push(newPlatform)
        }
    }

    // Função de mover as plataformas
    function movePLatforms() {
        if (doodlerBottomSpace > 200) {
            platforms.forEach(platform => {
                // Tira 4pixels da plataforma, fazendo ela se mover
                platform.bottom -= 4
                let visual = platform.visual
                visual.style.bottom = platform.bottom + 'px'

                if(platform.bottom < 10){
                    let firstPLatform = platforms[0].visual
                    firstPLatform.classList.remove('platform')
                    platforms.shift()
                    let newPlatform = new Platform(600)
                    platforms.push(newPlatform)
                }
            })
        }
    }

    // Função de pulo do doodler
    function jump() {
        clearInterval(downTimeId)
        isJumping = true
        upTimerId = setInterval(function () {
            doodlerBottomSpace += 20
            doodler.style.bottom = doodlerBottomSpace + 'px'
            if (doodlerBottomSpace > startPoint + 200) {
                fall()
            }
        }, 20)
    }

    // Função para cair
    function fall() {
        clearInterval(upTimerId)
        isJumping = false
        downTimeId = setInterval(function () {
            doodlerBottomSpace -= 5
            doodler.style.bottom = doodlerBottomSpace + 'px'

            // Game Over
            if (doodlerBottomSpace <= 0) {
                gameOver()
            }
            platforms.forEach(platform => {
                if (
                    (doodlerBottomSpace >= platform.bottom) &&
                    (doodlerBottomSpace <= (platform.bottom + 15)) &&
                    ((doodlerLeftSpace + 60) >= platform.left) &&
                    (doodlerLeftSpace <= (platformleft + 85)) &&
                    !isJumping
                ) {
                    startPoint = doodlerBottomSpace
                    jump()
                }
            })

        }, 20)
    }

    // Game over + Zerar contadores
    function gameOver() {
        console.log('game over')
        isGameOver = true
        while(grid.firstChild){
            grid.removeChild(grid.firstChild)
        }
        grid.innerHTML = score
        clearInterval(upTimerId)
        clearInterval(downTimeId)
        clearInterval(leftTimerId)
        clearInterval(rightTimerId)
    }

    // Função de controle
    function control(e) {
        if (e.key === 'ArrowLeft') {
            // mover para esquerda
            moveLeft()
        } else if (e.key === "ArrowRight") {
            // mover para direita
            moveRight()
        } else if (e.key === "ArrowUp") {
            // mover para cima
            moveStrainght()
        }
    }

    function moveLeft() {
        if(isGoingRight){
            clearInterval(rightTimerId)
            isGoingRight = false
        }
        isGoingLeft = true
        leftTimerId - setInterval(function () {
            if (doodlerLeftSpace >= 0) {
                doodlerLeftSpace -= 5
                doodler.style.left = doodlerLeftSpace + 'px'
            } else moveRight()

        }, 30)
    }

    function moveRight() {
        if(isGoingLeft){
            clearInterval(leftTimerId)
            isGoingLeft = false
        }
        isGoingRight = true
        rightTimerId = setInterval(function(){
            if(doodlerLeftSpace <= 340){
                 doodlerLeftSpace += 5
                 doodler.style.left= doodlerLeftSpace + 'px'
            } else moveLeft()
        })
    }

    function moveStrainght() {
        isGoingRight = false
        isGoingLeft = false
        clearInterval(rightTimerId)
        clearInterval(leftTimerId)
    }

    // Função de start do jogo
    function start() {
        // Caso o isGameOver for diferente de falso, começa o jogo
        if (!isGameOver) {
            createPlatforms()
            createDoodle()
            setInterval(movePLatforms, 30)
            jump()
            document.addEventListener('keyup', control)
        }
    }

    start()
})