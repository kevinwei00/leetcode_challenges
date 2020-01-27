function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    let mid = Math.floor((left + right) / 2);
    if (target < arr[mid]) {
      right = mid;
    } else if (target > arr[mid]) {
      left = mid + 1;
    } else if (target === arr[mid]) {
      return `'${target}' found at index ${mid}`;
    }

    if (arr[left] === target) {
      return `'${target}' found at index ${left}`;
    }
  }
  return `'${target}' not found`;
}

console.log(binarySearch([0, 1, 2], 0));
