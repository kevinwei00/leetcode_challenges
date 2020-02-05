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

/* Find Minimum in Rotated Sorted Array

Suppose an array sorted in ascending order is rotated at some pivot unknown to you beforehand.
(i.e.,  [0,1,2,4,5,6,7] might become  [4,5,6,7,0,1,2]).
Find the minimum element. You may assume no duplicate exists in the array.

Example 1:
Input: [3,4,5,1,2] 
Output: 1

Example 2:
Input: [4,5,6,7,0,1,2]
Output: 0

*/
// O(n)
function findMin_linear(nums) {
  for (let i = 0; i < nums.length; i++) {
    if (nums[i + 1] < nums[i]) {
      return nums[i + 1];
    }
  }
  return nums[0];
}
// possibility of O(logn)
function findMin_binary(nums) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] > nums[right]) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return nums[left];
}
