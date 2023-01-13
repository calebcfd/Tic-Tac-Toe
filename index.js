let playerTeam = null
let botTeam = null
let moves = 0

function makeO() {
    let O = document.createElement('div')
    O.setAttribute('class', 'O wrapper')

    let circle = document.createElement('div')
    circle.setAttribute('class', 'circle wrapper')

    let circleFiller = document.createElement('div')
    circleFiller.setAttribute('class', 'circleFiller')

    circle.appendChild(circleFiller)
    O.appendChild(circle)

    return O
}

function makeX() {
    let X = document.createElement('div')
    X.setAttribute('class', 'X wrapper')

    let cross1 = document.createElement('div')
    cross1.setAttribute('class', 'cross cross1')

    let cross2 = document.createElement('div')
    cross2.setAttribute('class', 'cross cross2')

    X.appendChild(cross1)
    X.appendChild(cross2)

    return X
}

let combos = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4 ,7],
    [2, 5, 8],
    [3 ,6 ,9],
    [1, 5, 9],
    [3, 5, 7]
]

let board = [null, '', '', '', '', '', '', '', '', '']
let alpha = [null, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']

function reset() {
    location.reload()
}

function win(team) {

    console.log('win')

    let popup = document.createElement('div')
        popup.setAttribute('class', 'overlay')

    let winner = document.createElement('h1')
        winner.innerHTML = team+' Wins!'

    let wrapper = document.createElement('div')
        wrapper.setAttribute('class', 'wrapper')

    let reset = document.createElement('button')
        reset.innerHTML = 'Play Again?'
        reset.setAttribute('onclick', 'reset()')

    if (team === 'draw') {
        winner.innerHTML = 'Draw!'
    }

    wrapper.appendChild(reset)
    popup.appendChild(winner)
    popup.appendChild(wrapper)
    document.querySelector('body').appendChild(popup)

}

function check() {

    console.log('check', board)

    for (let combo of combos) {

        if (board[combo[0]] === 0 && board[combo[1]] === 0 && board[combo[2]] === 0 ) {
            console.log('player1 wins')
            setTimeout(()=>{win('Player1')}, 1000)
        } else if (board[combo[0]] == 1 && board[combo[1]] == 1 && board[combo[2]] == 1) {
            console.log('computer wins')
            setTimeout(()=>{win('Computer')}, 1000)
        } 

    }

    if ( moves === 9) {
        win('draw')
    }

    return false

}

function respond(callbackCheck) {

    /* This for statement checks for winning moves*/
    for (let combo of combos) {

        let counter = 0
        let x = true
        let index = null

        for (let val of combo) {
            if (board[val] === 1) {
                counter++
            } else if (board[val] === 0) {
                x = false
            } else if (board[val] === '') {
                index = val
            }
        }

        if (counter === 2 && x === true && index != null) {
           board[index] = 1
           document.querySelector('#'+alpha[index]).appendChild(botTeam())
           callbackCheck()
           return null
        }

    }

    /* This for statement blocks winning moves from the Player */
    for (let combo of combos) {

        let counter = 0
        let x = true
        let index = null

        for (let val of combo) {
            if (board[val] === 0) {
                counter++
            } else if (board[val] === 1) {
                x = false
            } else if (board[val] === '') {
                index = val
            }
        }

        if (counter === 2 && x === true && index != null) {
           board[index] = 1
           document.querySelector('#'+alpha[index]).appendChild(botTeam())
           moves++
           return null
        }

    }

    let prefered = [1, 9, 3, 7, 5]
    let other = [2, 4, 6, 8]

    for (let num of prefered) {
        if (board[num] === '') {
            board[num] = 1
            document.querySelector('#'+alpha[num]).appendChild(botTeam())
            moves++
            return null
        }
    }

    for (let num of other) {
        if (board[num] === '') {
            board[num] = 1
            let id = alpha[num]
            document.querySelector('#'+id).appendChild(botTeam())
            moves++
            return null
        }
    }


}

function place(event, callbackCheck, callbackRespond) {
    
    let tileNum = alpha.indexOf(event.target.id)
    let tile = event.target
    console.log(tileNum)

    if (board[tileNum] === '') {
        board[tileNum] = 0
        event.target.appendChild(playerTeam())
    }
    console.log(board)
    moves++

    callbackCheck()
    callbackRespond(check)

}

function selectTeam(param) {
    if (param === 'X') {
        playerTeam = ()=>makeX()
        botTeam = ()=>makeO()
    } else {
        playerTeam = ()=>makeO()
        botTeam = ()=>makeX()
        respond()
    }
    document.querySelector('#teamSelect').remove()
    console.log('playerTeam', playerTeam, 'botTeam', botTeam)
}
