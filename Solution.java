
public class Solution {

    private static final int GUARD = 1;
    private static final int WALL = 2;
    private static final int GUARDED_CELL = 10;
    private static final int UNGUARDED_CELL = 0;
    private static final int[][] moves = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};
    private int rows;
    private int columns;

    public int countUnguarded(int rows, int columns, int[][] guards, int[][] walls) {
        if (rows == 0 || columns == 0) {
            return 0;
        }
        this.rows = rows;
        this.columns = columns;
        int[][] matrix = new int[rows][columns];

        populateMatrix(matrix, guards, GUARD);
        populateMatrix(matrix, walls, WALL);
        markAllGuardedCells(matrix);
        return countAllUnguardedCells(matrix);
    }

    private void populateMatrix(int[][] matrix, int[][] locationsToPopulate, int typeOfCell) {
        for (int[] location : locationsToPopulate) {
            matrix[location[0]][location[1]] = typeOfCell;
        }
    }

    private int countAllUnguardedCells(int[][] matrix) {
        int countUnguardedCells = 0;
        for (int r = 0; r < rows; ++r) {
            for (int c = 0; c < columns; ++c) {
                if (matrix[r][c] == UNGUARDED_CELL) {
                    countUnguardedCells++;
                }
            }
        }
        return countUnguardedCells;
    }

    private void markAllGuardedCells(int[][] matrix) {
        for (int r = 0; r < rows; ++r) {
            for (int c = 0; c < columns; ++c) {
                if (matrix[r][c] == GUARD) {
                    markGuardedCellsFromCurrentPosition(matrix, r, c);
                }
            }
        }
    }

    private void markGuardedCellsFromCurrentPosition(int[][] matrix, int row, int column) {
        for (int[] move : moves) {
            int nextRow = row + move[0];
            int nextColumn = column + move[1];

            while (isInMatrix(nextRow, nextColumn) && notBlockedCell(matrix[nextRow][nextColumn])) {
                matrix[nextRow][nextColumn] = GUARDED_CELL;
                nextRow += move[0];
                nextColumn += move[1];
            }
        }
    }

    private boolean notBlockedCell(int typeOfCell) {
        return typeOfCell != GUARD && typeOfCell != WALL;
    }

    private boolean isInMatrix(int row, int column) {
        return row >= 0 && row < rows && column >= 0 && column < columns;
    }
}
