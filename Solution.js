
/**
 * @param {number} rows
 * @param {number} columns
 * @param {number[][]} guards
 * @param {number[][]} walls
 * @return {number}
 */
var countUnguarded = function (rows, columns, guards, walls) {
    if (rows === 0 || columns === 0) {
        return 0;
    }

    this.GUARD = 1;
    this.WALL = 2;
    this.GUARDED_CELL = 10;
    this.UNGUARDED_CELL = 0;
    this.moves = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    this.rows = rows;
    this.columns = columns;
    const matrix = Array.from(new Array(rows), () => new Array(columns).fill(0));

    populateMatrix(matrix, guards, this.GUARD);
    populateMatrix(matrix, walls, this.WALL);
    markAllGuardedCells(matrix);
    return countAllUnguardedCells(matrix);
};

/**
 * @param {number[][]} matrix
 * @param {number[][]} locationsToPopulate
 * @param {number} typeOfCell
 * @return {void}
 */
function populateMatrix(matrix, locationsToPopulate, typeOfCell) {
    for (let location of locationsToPopulate) {
        matrix[location[0]][location[1]] = typeOfCell;
    }
}

/**
 * @param {number[][]} matrix
 * @return {void}
 */
function countAllUnguardedCells(matrix) {
    let countUnguardedCells = 0;
    for (let r = 0; r < this.rows; ++r) {
        for (let c = 0; c < this.columns; ++c) {
            if (matrix[r][c] === this.UNGUARDED_CELL) {
                countUnguardedCells++;
            }
        }
    }
    return countUnguardedCells;
}

/**
 * @param {number[][]} matrix
 * @return {void}
 */
function markAllGuardedCells(matrix) {
    for (let r = 0; r < this.rows; ++r) {
        for (let c = 0; c < this.columns; ++c) {
            if (matrix[r][c] === this.GUARD) {
                markGuardedCellsFromCurrentPosition(matrix, r, c);
            }
        }
    }
}

/**
 * @param {number[][]} matrix
 * @param {number} row
 * @param {number} column
 * @return {void}
 */
function markGuardedCellsFromCurrentPosition(matrix, row, column) {
    for (let move of this.moves) {
        let nextRow = row + move[0];
        let nextColumn = column + move[1];

        while (isInMatrix(nextRow, nextColumn) && notBlockedCell(matrix[nextRow][nextColumn])) {
            matrix[nextRow][nextColumn] = this.GUARDED_CELL;
            nextRow += move[0];
            nextColumn += move[1];
        }
    }
}

/**
 * @param {number} typeOfCell
 * @return {boolean}
 */
function notBlockedCell(typeOfCell) {
    return typeOfCell !== this.GUARD && typeOfCell !== this.WALL;
}

/**
 * @param {number} row
 * @param {number} column
 * @return {boolean}
 */
function isInMatrix(row, column) {
    return row >= 0 && row < this.rows && column >= 0 && column < this.columns;
}
