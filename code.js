function fillBoard() {

  const board = document.getElementById("board");

  for (let i = 0; i < 9; i++) {

    const sqaure = document.createElement('div');
    sqaure.className = "square";

    sqaure.onclick = touchMe;

    board.appendChild(sqaure);
  }


}

function touchMe(e) {
  console.log("you clicked a button");

  e.target.style.backgroundColor = "green";

}

fillBoard();