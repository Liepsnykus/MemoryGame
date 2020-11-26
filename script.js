let symbols = [
    '<i class="fas fa-air-freshener"></i>',
    '<i class="fab fa-angellist"></i>',
    '<i class="fas fa-anchor"></i>',
    '<i class="fas fa-ankh"></i>',
    '<i class="fas fa-baby-carriage"></i>',
    '<i class="fas fa-award"></i>',
    '<i class="fab fa-avianex"></i>',
    '<i class="fas fa-biohazard"></i>',
    '<i class="fab fa-canadian-maple-leaf"></i>',
    '<i class="fas fa-candy-cane"></i>',
    '<i class="fas fa-car"></i>',
    '<i class="fas fa-carrot"></i>',
    '<i class="fas fa-check-circle"></i>',
    '<i class="fas fa-expand-arrows-alt"></i>',
    '<i class="fas fa-dove"></i>',
    '<i class="fas fa-dog"></i>',
    '<i class="fab fa-docker"></i>',
    '<i class="fas fa-disease"></i>',
    '<i class="fas fa-fan"></i>',
    '<i class="fas fa-fighter-jet"></i>',
    '<i class="fas fa-head-side-mask"></i>',
    '<i class="fas fa-helicopter"></i>',
    '<i class="fas fa-hippo"></i>',
    '<i class="fas fa-mitten"></i>',
    '<i class="fas fa-mask"></i>',
    '<i class="fas fa-medal"></i>'

]

const dificultyes = [
    {
        symbols: 2,
        board: 120
    },
    {
        symbols: 4,
        board: 120
    },
    {
        symbols: 6,
        board: 180
    },
    {
        symbols: 8,
        board: 240
    },
    {
        symbols: 10,
        board: 240
    },
    {
        symbols: 14,
        board: 300
    },
    {
        symbols: 18,
        board: 360
    }
]

const gameContainer = document.getElementById('gameContainer')
const startGame = document.getElementById('startGame')
const shoutOut = document.getElementById('shoutOut')
const levelID = document.getElementById('levelID')

let difficulty
let chosenSymbols = []
let randomPatern = []
let firstdBtn = true
let alowGame = true
let lastSymbol
let secondSymbol
let pressedBtn1 = []
let pressedBtn2 = []
let level = 0

function selectSymbols() {

    for (let x = difficulty.symbols*2; x > 0 ;) {
        let card = symbols[Math.floor(Math.random() * symbols.length)]
        if(!(chosenSymbols.includes(card)) ) {
            chosenSymbols.push(card)
            chosenSymbols.push(card)
            x-=2
        } 
    }
}

function createPatern () {
    for (let x = 0; x < difficulty.symbols * 2;) {
        let value = Math.floor(Math.random()*difficulty.symbols*2)
        if (!(randomPatern.includes(value))) {
            randomPatern.push(value)
            x++
        }
    }
}

function createBoard () {
    
    gameContainer.innerHTML = ''
    chosenSymbols = []
    randomPatern = []
    createPatern ()

    selectSymbols()
    levelID.innerText = `Level: ${level+1}`
    gameContainer.style.width = `${difficulty.board}px`

    randomPatern.map ( item => {
        let button = document.createElement ('div')
        button.classList.add('gameButton')
        button.innerHTML = chosenSymbols[item]
        gameContainer.appendChild(button)

        button.addEventListener('click', displayCard)

    })

}

function start () {
    difficulty = {...dificultyes[level]} 
    gameContainer.style.display = 'flex'
    startGame.style.display = 'none'
    createBoard ()
    lives = difficulty.symbols
}


function nextLevel () {
    difficulty = {...dificultyes[level]}
    createBoard ()
    shoutOut.style.display = 'none'
}

function lastCheck() {
    if (difficulty.symbols == 0 ) {
        shoutOut.style.display = 'block'
        setTimeout(nextLevel, 3000) 
        level++
    }
}

function check() {
    console.log(secondSymbol);
    if(lastSymbol == secondSymbol) {
        console.log('some');
        difficulty.symbols--
        console.log(difficulty.symbols);

    }

    lastCheck()
}

function displayCard(event) {
    if (alowGame) {
        if(firstdBtn) {
            pressedBtn1 = event
            event.target.children[0].style.display = 'block'
            event.target.removeEventListener('click', displayCard)
            lastSymbol = event.target.children[0].classList[1]
            firstdBtn = false
           
        } else{
            event.target.children[0].style.display = 'block'
            event.target.removeEventListener('click', displayCard)
            pressedBtn2 = event
            secondSymbol = event.target.children[0].classList[1]
            firstdBtn = true
            alowGame = false
            
            if(lastSymbol == secondSymbol) {
    
                difficulty.symbols--
                alowGame = true
            
            }   else {
    
                setTimeout(hideElements, 1000)
            }
    
            lastCheck()
            
        }
    }
}
    

function hideElements() {
    pressedBtn1.target.children[0].style.display = 'none'
    pressedBtn2.target.children[0].style.display = 'none'
    pressedBtn1.target.addEventListener('click', displayCard)
    pressedBtn2.target.addEventListener('click', displayCard)
    alowGame = true

}

startGame.addEventListener('click', start)




