'use strict'

const PACMAN = '😷'
var gPacman

function createPacman(board) {
    // DONE: initialize gPacman...
    gPacman = {
        location: {
            i: 2,
            j: 2
        },
        isSuper: false
    }
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN
}
function movePacman(ev) {
    if (!gGame.isOn) return
    // DONE: use getNextLocation(), nextCell
    const nextLocation = getNextLocation(ev.key)
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    // DONE: return if cannot move
    if (nextCell === WALL) return

    if (nextCell === POWERFOOD) {
        if (gPacman.isSuper) return
        gPacman.isSuper = true
        gFoodCounter--
        console.log('gFoodCounter', gFoodCounter)
        console.log('gPacman.isSuper = true')
        setTimeout(cancelIsSuper, 5000)
    }

    // DONE: hitting a ghost? call gameOver
    if (nextCell === GHOST) {
        if (!gPacman.isSuper) {
            gameOver()
            return
        }
        console.log('Super and hitting ghost')
        var deadGhost = gGhosts.pop()
        gDeadGhosts.push(deadGhost)
        console.log('gDeadGhosts', gDeadGhosts)
        setTimeout(bringBackGhosts, 5000)
    }

    if (nextCell === FOOD || nextCell === CHERRY) {
        if (nextCell === CHERRY) updateScore(5)
        updateScore(1)
        gFoodCounter--
        if (gFoodCounter === 0) gameOver()
        console.log('gFoodCounter', gFoodCounter)
        // console.log('nextCell', nextCell)
    }
    // DONE: moving from current location:

    // DONE: update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY

    // DONE: update the DOM
    renderCell(gPacman.location, EMPTY)

    // DONE: Move the pacman to new location:
    // DONE: update the model
    gBoard[nextLocation.i][nextLocation.j] = PACMAN
    gPacman.location = nextLocation
    // DONE: update the DOM
    renderCell(nextLocation, PACMAN)
}
function getNextLocation(eventKeyboard) {
    // console.log(eventKeyboard)
    const nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    // DONE: figure out nextLocation
    switch (eventKeyboard) {
        case 'ArrowUp':
            nextLocation.i--
            break;
        case 'ArrowRight':
            nextLocation.j++
            break;
        case 'ArrowDown':
            nextLocation.i++
            break;
        case 'ArrowLeft':
            nextLocation.j--
            break;
    }
    return nextLocation
}
function cancelIsSuper() {
    gPacman.isSuper = false
    console.log('gPacman.isSuper = false')
}
function bringBackGhosts() {
    // renderCell(gDeadGhosts[0].location, getGhostHTML(GHOST))
    gGhosts = gDeadGhosts
}