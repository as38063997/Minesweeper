import { MinesweeperBoard } from "./Minesweeper";

// example parameters
const ROWS = 8;
const COLS = 8;
const MINES = 10;
const FIRST_CLICK = { r: 3, c: 4 };

const game = new MinesweeperBoard(ROWS, COLS, MINES);
game.init(FIRST_CLICK.r, FIRST_CLICK.c);

console.log(`First-click at (${FIRST_CLICK.r},${FIRST_CLICK.c}) guaranteed safe.\n`);
console.log("Board layout (M = mine, numbers = adjacent-mine counts):");
const board = game.getBoard();
for (let r = 0; r < ROWS; r++) {
  const line = board[r]
    .map(cell => (cell.hasMine ? "M" : cell.adjacentMines.toString()))
    .join(" ");
  console.log(line);
}
