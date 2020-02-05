function dfs(grid, row, col, solution) {
  if (outOfBounds(grid, row, col) || grid[row][col] === 0) {
    return;
  }

  if (grid[row][col] === 9) {
    solution.numPaths++;
    return;
  }

  // mark as visited
  grid[row][col] = 0;

  dfs(grid, row - 1, col, solution);
  dfs(grid, row, col + 1, solution);
  dfs(grid, row + 1, col, solution);
  dfs(grid, row, col - 1, solution);

  // unmark as visited
  grid[row][col] = 1;
}

function outOfBounds(grid, row, col) {
  return row < 0 || col < 0 || row > grid.length - 1 || col > grid[0].length - 1;
}

let solution = { numPaths: 0 };
let grid1 = [
  [1, 1, 1, 1, 0],
  [0, 0, 0, 1, 1],
  [1, 1, 9, 0, 1],
  [1, 1, 0, 1, 1],
  [1, 1, 1, 1, 1],
];
dfs(grid1, 0, 0, solution);
console.log(solution);

/* Number of Islands

Given a 2d grid map of '1's (land) and '0's (water), count the number of islands. An island 
is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. 
You may assume all four edges of the grid are all surrounded by water.

Example 1:

Input:
11110
11010
11000
00000

Output: 1

Example 2:

Input:
11000
11000
00100
00011

Output: 3

*/
// DEPTH FIRST SEARCH
function numIslands(grid) {
  function dfs(row, col) {
    // out of bounds
    if (row < 0 || col < 0 || row > grid.length - 1 || col > grid[0].length - 1) {
      return;
    }
    // already visited
    if (grid[row][col] === '0') {
      return;
    }

    // set to visited
    grid[row][col] = '0';

    // recurse top, bottom, left, right
    dfs(row - 1, col);
    dfs(row + 1, col);
    dfs(row, col - 1);
    dfs(row, col + 1);
  }

  let total = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === '1') {
        total++;
        dfs(i, j);
      }
    }
  }
  return total;
}

/* Pacific Atlantic Water Flow

Given an m x n matrix of non-negative integers representing the height of each unit cell in a 
continent, the "Pacific ocean" touches the left and top edges of the matrix and the "Atlantic
ocean" touches the right and bottom edges.

Water can only flow in four directions (up, down, left, or right) from a cell to another one
with height equal or lower.

Find the list of grid coordinates where water can flow to both the Pacific and Atlantic ocean.

Note:
The order of returned grid coordinates does not matter.
Both m and n are less than 150.

Example:

Given the following 5x5 matrix:

  Pacific ~   ~   ~   ~   ~ 
       ~  1   2   2   3  (5) *
       ~  3   2   3  (4) (4) *
       ~  2   4  (5)  3   1  *
       ~ (6) (7)  1   4   5  *
       ~ (5)  1   1   2   4  *
          *   *   *   *   * Atlantic

Return:
[[0, 4], [1, 3], [1, 4], [2, 2], [3, 0], [3, 1], [4, 0]]
(positions with parentheses in above matrix).

*/
// DEPTH FIRST SEARCH
function pacificAtlantic(matrix) {
  if (matrix.length === 0) {
    return [];
  }

  function dfs(row, col, prev, ocean) {
    if (row < 0 || col < 0 || row > matrix.length - 1 || col > matrix[0].length - 1) {
      return;
    }
    if (matrix[row][col] < prev) {
      return;
    }
    if (ocean[row][col] === 'x') {
      return;
    }

    ocean[row][col] = 'x';

    dfs(row - 1, col, matrix[row][col], ocean);
    dfs(row + 1, col, matrix[row][col], ocean);
    dfs(row, col - 1, matrix[row][col], ocean);
    dfs(row, col + 1, matrix[row][col], ocean);
  }

  let pacific = Array(matrix.length)
    .fill('o')
    .map((col) => Array(matrix[0].length).fill('o'));
  let atlantic = Array(matrix.length)
    .fill('o')
    .map((col) => Array(matrix[0].length).fill('o'));

  for (let row = 0; row < matrix.length; row++) {
    dfs(row, 0, -1, pacific); // left -> right
    dfs(row, matrix[0].length - 1, -1, atlantic); // right -> left
  }

  for (let col = 0; col < matrix[0].length; col++) {
    dfs(0, col, -1, pacific); // top -> bottom
    dfs(matrix.length - 1, col, -1, atlantic); // bottom -> top
  }

  let results = [];
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (pacific[i][j] === 'x' && atlantic[i][j] === 'x') {
        results.push([i, j]);
      }
    }
  }
  return results;
}
