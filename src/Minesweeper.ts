export type Cell = {
    hasMine: boolean;
    adjacentMines: number;
  };
  
  export class MinesweeperBoard {
    readonly rows: number;
    readonly cols: number;
    readonly numMines: number;
    private board: Cell[][];
  
    constructor(rows: number, cols: number, numMines: number) {
      if (numMines >= rows * cols) {
        throw new Error("Too many mines for the given board size");
      }
      this.rows = rows;
      this.cols = cols;
      this.numMines = numMines;
      // initialize an empty board
      this.board = Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => ({
          hasMine: false,
          adjacentMines: 0,
        }))
      );
    }
  
    /**
     * Place mines randomly, excluding the first click cell.
     * Then compute adjacent-mine counts for every cell.
     */
    init(firstClickRow: number, firstClickCol: number): void {
      this.clearBoard();
      const positions: [number, number][] = [];
      for (let r = 0; r < this.rows; r++) {
        for (let c = 0; c < this.cols; c++) {
          // exclude the first-click cell itself
          if (r === firstClickRow && c === firstClickCol) continue;
          positions.push([r, c]);
        }
      }
  
      // shuffle positions array
      for (let i = positions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [positions[i], positions[j]] = [positions[j], positions[i]];
      }
  
      // take first numMines positions
      for (let i = 0; i < this.numMines; i++) {
        const [r, c] = positions[i];
        this.board[r][c].hasMine = true;
      }
  
      // compute adjacent counts
      for (let r = 0; r < this.rows; r++) {
        for (let c = 0; c < this.cols; c++) {
          if (this.board[r][c].hasMine) continue;
          this.board[r][c].adjacentMines = this.countAdjacent(r, c);
        }
      }
    }
  
    private clearBoard() {
      for (const row of this.board) {
        for (const cell of row) {
          cell.hasMine = false;
          cell.adjacentMines = 0;
        }
      }
    }
  
    private countAdjacent(r: number, c: number): number {
      let count = 0;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          const nr = r + dr, nc = c + dc;
          if (
            nr >= 0 &&
            nr < this.rows &&
            nc >= 0 &&
            nc < this.cols &&
            this.board[nr][nc].hasMine
          ) {
            count++;
          }
        }
      }
      return count;
    }
  
    /** Expose the current board state */
    getBoard(): Cell[][] {
      return this.board.map(row => row.map(cell => ({ ...cell })));
    }
  }
  