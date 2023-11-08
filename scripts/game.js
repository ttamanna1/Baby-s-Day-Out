// ! Variables ! //

const livesDisplay = document.getElementById('lives-count')
const startButton = document.querySelector('#start-button')
const cells = document.querySelectorAll('.grid div')
const carsLeft = document.querySelectorAll('.car-left')
const cyclistsRight = document.querySelectorAll('.cyclist-right')
const vansLeft = document.querySelectorAll('.van-left')
const carsRight = document.querySelectorAll('.car-right')
const babyWhine = document.querySelector('#lose-life')
const loseLifePopup = document.getElementById('life-lost-popup')
const gameOver = document.querySelector('#game-over')
const gameOverPopup = document.getElementById('game-over-popup')
const winGame = document.getElementById('win')
const winGamePopup = document.getElementById('game-win-popup')
const resetButton = document.querySelector('#reset-button')
const bgAudio = document.querySelector('#theme')

const babyStartPosition = 45
let currentPosition = babyStartPosition
const width = 7
let currentLives = 3
let timer
let checkTimer
let isGameOver = false
let isWinGame = false

// ! Functions ! //

function addBaby() {
  cells[currentPosition].classList.add('baby')
}

function removeBaby(){
  cells[currentPosition].classList.remove('baby')
}

function showResetButton() {
  resetButton.style.display = 'block'
}

function hideResetButton() {
  resetButton.style.display = 'none';
}

function moveBaby(evt) {
  const key = evt.code

  removeBaby()

  if (key === 'ArrowUp' && currentPosition >= width) {
    currentPosition -= width
  } else if (key === 'ArrowDown' && currentPosition + width < cells.length - width) {
    currentPosition += width
  } else if (key === 'ArrowLeft' && currentPosition % width !== 0) {
    currentPosition -= 1
  } else if (key === 'ArrowRight' && currentPosition % width !== width - 1) {
    currentPosition += 1
  }

  addBaby()

}

function loseLifePopupDisplay() {
  bgAudio.pause()
  babyWhine.play()
  loseLifePopup.style.display = 'block'
  document.removeEventListener('keydown', moveBaby)
  setTimeout(function() {
    loseLifePopup.style.display = 'none'
    bgAudio.play()
    document.addEventListener('keydown', moveBaby)
  }, 2000)
}

function gameOverPopupDisplay() {
  if (!isGameOver) {
    isGameOver = true
    bgAudio.pause()
    gameOver.play()
    document.removeEventListener('keydown', moveBaby)
    gameOverPopup.style.display = 'block'
    showResetButton()
  }
}

function winGameDisplay() {
  if (!isWinGame) {
    isWinGame = true
    document.removeEventListener('keydown', moveBaby)
    const winHome = cells[currentPosition]
    winHome.classList.add('heart')
    winGame.play()
    winGamePopup.style.display = 'block'
    showResetButton()
  }
}

function endGame() {
  removeBaby()
  currentPosition = babyStartPosition
  currentLives = 3
  livesDisplay.innerText = currentLives
  clearInterval(timer)
  addBaby()
}

function check () {
  collision()
  win()
}

// * Functions to move obstacles * //

function moveObstacle() {
  carsLeft.forEach(carLeft => moveCarLeft(carLeft))
  cyclistsRight.forEach(cyclistRight => moveCyclistRight(cyclistRight))
  vansLeft.forEach(vanLeft => moveVanLeft(vanLeft))
  carsRight.forEach(carRight => moveCarRight(carRight))
}

function moveCarLeft(carLeft) {
  if (carLeft.classList.contains('ob1')) {
    carLeft.classList.remove('ob1')
    carLeft.classList.add('ob2')
  } else if (carLeft.classList.contains('ob2')) {
    carLeft.classList.remove('ob2')
    carLeft.classList.add('ob3')
  } else if (carLeft.classList.contains('ob3')) {
    carLeft.classList.remove('ob3')
    carLeft.classList.add('ob4')
  } else if (carLeft.classList.contains('ob4')) {
    carLeft.classList.remove('ob4')
    carLeft.classList.add('ob1')
  }
}

function moveCyclistRight(cyclistRight) {
  if (cyclistRight.classList.contains('ob5')) {
    cyclistRight.classList.remove('ob5')
    cyclistRight.classList.add('ob8')
  } else if (cyclistRight.classList.contains('ob8')) {
    cyclistRight.classList.remove('ob8')
    cyclistRight.classList.add('ob7')
  } else if (cyclistRight.classList.contains('ob7')) {
    cyclistRight.classList.remove('ob7')
    cyclistRight.classList.add('ob6')
  } else if (cyclistRight.classList.contains('ob6')) {
    cyclistRight.classList.remove('ob6')
    cyclistRight.classList.add('ob5')
  }
}

function moveVanLeft(vanLeft) {
  if (vanLeft.classList.contains('ob9')) {
    vanLeft.classList.remove('ob9')
    vanLeft.classList.add('ob10')
  } else if (vanLeft.classList.contains('ob10')) {
    vanLeft.classList.remove('ob10')
    vanLeft.classList.add('ob11')
  } else if (vanLeft.classList.contains('ob11')) {
    vanLeft.classList.remove('ob11')
    vanLeft.classList.add('ob12')
  } else if (vanLeft.classList.contains('ob12')) {
    vanLeft.classList.remove('ob12')
    vanLeft.classList.add('ob9')
  }
}

function moveCarRight(carRight) {
  if (carRight.classList.contains('ob13')) {
    carRight.classList.remove('ob13')
    carRight.classList.add('ob16')
  } else if (carRight.classList.contains('ob16')) {
    carRight.classList.remove('ob16')
    carRight.classList.add('ob15')
  } else if (carRight.classList.contains('ob15')) {
    carRight.classList.remove('ob15')
    carRight.classList.add('ob14')
  } else if (carRight.classList.contains('ob14')) {
    carRight.classList.remove('ob14')
    carRight.classList.add('ob13')
  }
}

// * Functions for win/lose condition * //

function collision() {
  if (
      cells[currentPosition].classList.contains('ob1') ||
      cells[currentPosition].classList.contains('ob2') ||
      cells[currentPosition].classList.contains('ob7') ||
      cells[currentPosition].classList.contains('ob8') ||
      cells[currentPosition].classList.contains('ob9') ||
      cells[currentPosition].classList.contains('ob10') ||
      cells[currentPosition].classList.contains('ob15') ||
      cells[currentPosition].classList.contains('ob16') 
  ) {
    removeBaby()
    currentLives --

    if (currentLives > 0) {
    livesDisplay.innerText = currentLives 
    loseLifePopupDisplay()
    removeBaby()
    currentPosition = babyStartPosition
    addBaby()
    } else {
      bgAudio.pause()
      clearInterval(timer)
      clearInterval(checkTimer)
      gameOverPopupDisplay()
    } 
  }
}

function win() {
  if (cells[currentPosition].classList.contains('home')) {
    winGameDisplay()
    clearInterval(timer)
  }
}

// ! Events ! //

startButton.addEventListener('click', () => {
  bgAudio.currentTime = 0
  bgAudio.volume = 0.07
  bgAudio.play()
  startButton.style.display = 'none'
  showResetButton()
  timer = setInterval(moveObstacle, 1000)
  checkTimer = setInterval(check, 500)
  document.addEventListener('keydown', moveBaby)
})

resetButton.addEventListener('click', () => {
  bgAudio.pause()
  document.removeEventListener('keydown', moveBaby)
  isGameOver = false
  isWinGame = false
  const winHome = cells[currentPosition]
  winHome.classList.remove('heart')
  endGame()
  gameOverPopup.style.display = 'none'
  winGamePopup.style.display = 'none'
  loseLifePopup.style.display = 'none'
  hideResetButton()
  startButton.style.display = 'block'
})

// ! VARIABLES

// set lives to 3
// set starting position of frog as const
// set initial position of each obstacle

// ! EXECUTIONS

// * main game loop (setInterval) when lives are greater than 0- use keypress event using user input
  // up arrow key pressed- move frog up by one cell except if frog is home
  // down arrow key pressed move frog down by one cell if not in starting position
  // left/right key pressed- move frog left/right by one cell if not at end of grid
// function to move obstacles- need timers
// * check if frog collides with obstacles (function to check collisions)- restart frog in starting position and lose one life 
  // game loop continues/ game is not reset
// check if frog reaches home 
// check if frog runs out of lives
// end game loop if frog runs out of lives or if frog reaches home and display appropriate message
// reset game and load welcome page


// ! EVENTS

// click start button function
// keypress event function

// ! PAGE LOAD

// * Welcome Page
  // display welcome page with instructions on how to play the game
// * Start Button
  // pressing start button removes welcome page, creates grid and starts game loop
  // start button is disabled when game loop starts and enabled when game loop ends and is reset
// * Features
  // music, sound effects, transitions.



