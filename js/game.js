'use strict'

const WALL = '🟫'
const FOOD = '•'
const EMPTY = ' '
const POWERFOOD = '🎁'
const CHERRY = '🍒'

const PACMAN_IMG = '<img src="img/pacman.png">'

const gGame = {
    score: 0,
    isOn: false
}
var gBoard
var gFoodCounter = 0
var gIntervalCherrys
var gEmptyCells

function onInit() {
    // console.log('hello')
    gBoard = buildBoard()
    createGhosts(gBoard)
    countFood()
    createPacman(gBoard)
    renderBoard(gBoard, '.board-container')
    gIntervalCherrys = setInterval(placeCherry, 15000)
    gGame.isOn = true
    gGame.score = 0
    document.querySelector('h2 span').innerText = 0

}
function buildBoard() {
    const size = 10
    const board = []
    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD
            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL

            }
        }
    }
    board[1][1] = POWERFOOD
    board[8][8] = POWERFOOD
    board[8][1] = POWERFOOD
    board[1][8] = POWERFOOD
    return board
}
function updateScore(diff) {
    // TODO: update model and dom
    // Model
    gGame.score += diff
    // DOM
    document.querySelector('h2 span').innerText = gGame.score

}
function gameOver() {
    console.log('Game Over')
    // TODO
    onOpenModal()
    clearInterval(gIntervalGhosts)
    gGame.isOn = false
    renderCell(gPacman.location, '🪦')
    clearInterval(gIntervalCherrys)
}
function onOpenModal() {
    // show the modal
    var modal = document.querySelector('.modal')
    modal.style.display = 'block'
    // change text
    if (gFoodCounter === 0) {
        var elModalH2 = document.querySelector('.modal h2')
        elModalH2.innerText = 'YOU WON! 🤗'
    } else {
        var elModalH2 = document.querySelector('.modal h2')
        elModalH2.innerText = 'Game Over 😔 '
    }
    // show button
}
function onCloseModal() {
    // hide the modal
    var modal = document.querySelector('.modal')
    modal.style.display = 'none';
    // DONE: restart game
    onInit()
}
function countFood() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            var currCell = gBoard[i][j]
            // console.log('currCell', currCell)
            if (currCell === FOOD)
                gFoodCounter++

        }
    }
    console.log('foodCounter', gFoodCounter)
    return gFoodCounter
}
function findEmptyCells(board) {
    gEmptyCells = []
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j]
            console.log('currCell', currCell)
            // console.log('currCell,  i: i, j: j', { i: i, j: j }, currCell)
            if (currCell === EMPTY)
                gEmptyCells.push({ i: i, j: j })
        }
    }
    // console.log('emptyCells', gEmptyCells)
    return gEmptyCells
}
function placeCherry() {
    var emptyCells = findEmptyCells(gBoard)
    var randIdx = getRandomIntInclusive(0, emptyCells.length - 1)
    var randPlaceIdx = emptyCells[randIdx]
    console.log('randPlaceIdx', randPlaceIdx)

    // update MODEL:
    gBoard[randPlaceIdx.i][randPlaceIdx.j] = CHERRY

    // update DOM:
    renderCell(randPlaceIdx, CHERRY)
}