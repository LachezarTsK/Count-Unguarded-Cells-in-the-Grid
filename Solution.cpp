
#include <array>
#include <vector>
using namespace std;

class Solution {
    
    inline static const int GUARD = 1;
    inline static const int WALL = 2;
    inline static const int GUARDED_CELL = 10;
    inline static const int UNGUARDED_CELL = 0;
    inline static const array<array<int, 2>, 4> moves { {{-1, 0}, {1, 0}, {0, -1}, {0, 1}} };
    size_t rows;
    size_t columns;

public:
    int countUnguarded(int rows, int columns, const vector<vector<int>>& guards, const vector<vector<int>>& walls) {
        if (rows == 0 || columns == 0) {
            return 0;
        }
        this->rows = rows;
        this->columns = columns;
        vector<vector<int>> matrix(rows, vector<int>(columns));

        populateMatrix(matrix, guards, GUARD);
        populateMatrix(matrix, walls, WALL);
        markAllGuardedCells(matrix);
        return countAllUnguardedCells(matrix);
    }

private:
    void populateMatrix(vector<vector<int>>& matrix, const vector<vector<int>>& locationsToPopulate, int typeOfCell) {
        for (const auto& location : locationsToPopulate) {
            matrix[location[0]][location[1]] = typeOfCell;
        }
    }

    int countAllUnguardedCells(const vector<vector<int>>& matrix) {
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

    void markAllGuardedCells(vector<vector<int>>& matrix) {
        for (int r = 0; r < rows; ++r) {
            for (int c = 0; c < columns; ++c) {
                if (matrix[r][c] == GUARD) {
                    markGuardedCellsFromCurrentPosition(matrix, r, c);
                }
            }
        }
    }

    void markGuardedCellsFromCurrentPosition(vector<vector<int>>& matrix, int row, int column) {
        for (const auto& move : moves) {
            int nextRow = row + move[0];
            int nextColumn = column + move[1];

            while (isInMatrix(nextRow, nextColumn) && notBlockedCell(matrix[nextRow][nextColumn])) {
                matrix[nextRow][nextColumn] = GUARDED_CELL;
                nextRow += move[0];
                nextColumn += move[1];
            }
        }
    }

    bool notBlockedCell(int typeOfCell) {
        return typeOfCell != GUARD && typeOfCell != WALL;
    }

    bool isInMatrix(int row, int column) {
        return row >= 0 && row < rows && column >= 0 && column < columns;
    }
};
