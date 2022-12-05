'use strict'

function renderBoard(mat, selector) {

    var strHTML = '<table border="0"><tbody>'
    for (var i = 0; i < mat.length; i++) {

        strHTML += '<tr>'
        for (var j = 0; j < mat[0].length; j++) {
            const cell = mat[i][j]
            // console.log(mat[i][j])
            var className = `cell cell-${i}-${j}`
            if (cell === FOOD) className = `cell food cell-${i}-${j}`
            strHTML += `<td class="${className}">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'

    const elContainer = document.querySelector(selector)
    elContainer.innerHTML = strHTML
}
// location is an object like this - { i: 2, j: 7 }
function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}
function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}
function getRandomGhostColor() {
    const colors = ['red', 'green', 'blue', 'yellow']
    var randColorIdx = getRandomIntInclusive(0, 3)
    var color = colors[randColorIdx];
    // console.log(color)
    return color;
}