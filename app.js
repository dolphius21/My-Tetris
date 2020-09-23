document.addEventListener("DOMContentLoaded", () => {
  // get the grid
  const grid = document.querySelector(".grid");
  // draw grid
  drawSquares();
  // get the squares on the grid
  let squares = Array.from(document.querySelectorAll(".grid div"));
  const scoreDisplay = document.querySelector("#score");
  const startBtn = document.querySelector("#start-button");
  const width = 10;

  // The Tetrominoes
  const lTetromino = [
    [1, width + 1, width * 2 + 1, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2, width * 2 + 1],
    [width, width * 2, width * 2 + 1, width * 2 + 2],
  ];

  const zTetromino = [
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
  ];

  const tTetromino = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1],
  ];

  const oTetromino = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
  ];

  const iTetromino = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
  ];

  const theTetrominoes = [
    lTetromino,
    zTetromino,
    tTetromino,
    oTetromino,
    iTetromino,
  ];

  // Function => draw the square on the grid.
  function drawSquares() {
    let divs = "";
    for (let i = 0; i < 200; i++) {
      divs += `<div></div>`;
    }
    for (let i = 0; i < 10; i++) {
      divs += `<div class="bottom"></div>`;
    }
    grid.innerHTML = divs;
  }

  // Set the default current position and default rotation
  let currentPosition = 3;
  let defaultRotation = 0;

  // randomly select a Tetromino
  let random = Math.floor(Math.random() * theTetrominoes.length);
  let current = theTetrominoes[random][defaultRotation];

  // Function => draw the Tetromino
  function draw() {
    current.forEach((index) => {
      squares[currentPosition + index].classList.add("tetromino");
    });
  }

  // Function => undraw the Tetromino
  function undraw() {
    current.forEach((index) => {
      squares[currentPosition + index].classList.remove("tetromino");
    });
  }

  // so that the tetromino start froms the top row
  draw();
  // make the tetromino move down every second
  timerId = setInterval(moveDown, 1000);

  // assign functions to keyCodes
  function control(e) {
    if (e.keyCode === 37) {
      moveLeft();
    } else if (e.keyCode === 38) {
      // rotate();
    } else if (e.keyCode === 39) {
      moveRight();
    } else if (e.keyCode === 40) {
      //moveDown();
    }
  }

  document.addEventListener("keydown", control);

  // Function => moves down the tetromino
  function moveDown() {
    undraw();
    currentPosition += width;
    draw();
    freeze();
  }

  // Function => freezes the Tetromino
  function freeze() {
    const isAtBottom = current.some((index) =>
      squares[currentPosition + index + width].classList.contains("bottom")
    );
    const isTaken = current.some((index) =>
      squares[currentPosition + index + width].classList.contains("taken")
    );
    if (isTaken || isAtBottom) {
      current.forEach((index) =>
        squares[currentPosition + index].classList.add("taken")
      );
      // start a new tetromino falling
      random = Math.floor(Math.random() * theTetrominoes.length);
      current = theTetrominoes[random][defaultRotation];
      currentPosition = 3;
      draw();
    }
  }

  // Function => move the tetromino left, unless is at the edge
  function moveLeft() {
    const isAtLeftEdge = current.some(
      (index) => (currentPosition + index) % width === 0
    );
    const isTaken = current.some((index) =>
      squares[currentPosition + index + width].classList.contains("taken")
    );
    undraw();
    if (!isAtLeftEdge) currentPosition -= 1;
    if (isTaken) currentPosition += 1;
    draw();
  }

  // Function => move the tetromino right, unless is at the edge
  function moveRight() {
    const isAtRightEdge = current.some(
      (index) => (currentPosition + index) % width === width - 1
    );
    const isTaken = current.some((index) =>
      squares[currentPosition + index + width].classList.contains("taken")
    );
    undraw();
    if (!isAtRightEdge) currentPosition += 1;
    if (isTaken) currentPosition -= 1;
    draw();
  }
});
