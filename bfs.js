function bfs(grid, sr, sc, tr, tc) {
  let queue = [];
  queue.push([sr, sc, 0]); // [row, col, depth]
  let seen = new Set();
  seen.add([sr, sc].toString());

  while (queue.length > 0) {
    let [row, col, depth] = queue.shift();

    if (row === tr && col === tc) {
      return depth;
    }

    visitCell(grid, queue, seen, depth, row - 1, col);
    visitCell(grid, queue, seen, depth, row + 1, col);
    visitCell(grid, queue, seen, depth, row, col - 1);
    visitCell(grid, queue, seen, depth, row, col + 1);
  }

  return -1;
}

function visitCell(grid, queue, seen, depth, row, col) {
  if (
    !outOfBounds(grid, row, col) &&
    grid[row][col] === 1 &&
    !seen.has([row, col].toString())
  ) {
    queue.push([row, col, depth + 1]);
    seen.add([row, col].toString());
  }
}

function outOfBounds(grid, row, col) {
  return row < 0 || col < 0 || row > grid.length - 1 || col > grid[0].length - 1;
}

let grid1 = [
  [1, 1, 1, 1],
  [0, 0, 0, 1],
  [1, 1, 1, 1],
];
console.log(bfs(grid1, 0, 0, 2, 0));
