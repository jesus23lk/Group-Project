function fillBoard() {

  const board = document.getElementById("board");

  for (let i = 0; i < 9; i++) {

    const sqaure = document.createElement('div');
    sqaure.className = "square";
    board.appendChild(sqaure);
  }


}

fillBoard();