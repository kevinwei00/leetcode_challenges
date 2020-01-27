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
