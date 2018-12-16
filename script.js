const message = document.querySelector(".display > span");
const container = document.querySelector(".container");
const cells = document.querySelectorAll('[data-num]');
const clear = document.querySelector(".clear-button");
const winCombo = [
  ['1','2','3'], ['1','4','7'], ['1','5','9'], ['2','5','8'],
	['3','5','7'], ['3','6','9'], ['4','5','6'], ['7','8','9']
];
const color = ['#ff325b', '#196af6'];
let progressX = '';
let progress0 = '';
let count = 0;
let player = 'X';

container.addEventListener('click', move);
clear.addEventListener('click', reset);

function move(event) {
  const target = event.target;
  const num = target.getAttribute('data-num');
  if (num) {
    if (player === 'X') {
      progressX += num;
      target.style.backgroundColor = color[0];
    } else {
      progress0 += num;
      target.style.backgroundColor = color[1];
    }
    target.textContent = player;
    target.removeAttribute('data-num');
    count++;
    if (progressX.length > 2) {
      checkWin(player);
    }
    changePlayer();
  }
}

function checkWin(player) {
  const combo = (player === 'X') ? progressX : progress0;
  for (let i = 0; i < winCombo.length; i++) {
    let count = 0;
    for (let j = 0; j < winCombo[i].length; j++) {
      if (combo.indexOf(winCombo[i][j]) !== -1) {
        count++;
      }
      if (count === 3) {
        message.textContent = 'Player ' + player + ' win!';
        container.removeEventListener('click', move);
        return true;
      }
    }
  }
  if (count === 9) {
    message.textContent = 'It\'s a draw!';
  }
}

function changePlayer() {
  player = player === 'X' ? 'O' : 'X';
}

function reset() {
  message.textContent = 'Tic-Tac-Toe';
  console.log(cells.length);
  for (let i = 0; i < cells.length; i++) {
    const num = i + 1 + '';
    cells[i].setAttribute('data-num', num);
    cells[i].style.backgroundColor = '';
    cells[i].textContent = '';
  }
  container.addEventListener('click', move);
  progressX = '';
  progress0 = '';
  player = 'X';
}
