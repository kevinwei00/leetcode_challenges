/* Best Time to Buy and Sell Stock

Share
Say you have an array for which the ith element is the price of a given stock on day i.

If you were only permitted to complete at most one transaction (i.e., buy one and sell one
share of the stock), design an algorithm to find the maximum profit.

Note that you cannot sell a stock before you buy one.

Example 1:
Input: [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
             Not 7-1 = 6, as selling price needs to be larger than buying price.

Example 2:
Input: [7,6,4,3,1]
Output: 0
Explanation: In this case, no transaction is done, i.e. max profit = 0.

*/
// O(n) to set both minPrice and max profit (currPrice - minPrice)
function maxProfit(prices) {
  let minPrice = prices[0];
  let max = 0;

  for (let i = 1; i < prices.length; i++) {
    if (prices[i] < minPrice) {
      minPrice = prices[i];
    }

    if (prices[i] - minPrice > max) {
      max = prices[i] - minPrice;
    }
  }

  return max;
}

/* Valid Parentheses

Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if
the input string is valid.

An input string is valid if:
  1. Open brackets must be closed by the same type of brackets.
  2. Open brackets must be closed in the correct order.

Note that an empty string is also considered valid.

Example 1:
Input: "()"
Output: true

Example 2:
Input: "()[]{}"
Output: true

Example 3:
Input: "(]"
Output: false

Example 4:
Input: "([)]"
Output: false

Example 5:
Input: "{[]}"
Output: true

*/
// use a stack to add open braces, and pop when encountering matching closing braces.
// at the end of the loop, if stack is empty, it's valid
function validParentheses(s) {
  if (s.length === 0) {
    return true;
  }
  // odd number of braces is always false (means that there's a lone brace)
  if (s.length % 2 > 0) {
    return false;
  }

  let open = [];

  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(' || s[i] === '{' || s[i] === '[') {
      open.push(s[i]);
    } else if (s[i] === ')') {
      if (open[open.length - 1] === '(') {
        open.pop();
      }
    } else if (s[i] === '}') {
      if (open[open.length - 1] === '{') {
        open.pop();
      }
    } else if (s[i] === ']') {
      if (open[open.length - 1] === '[') {
        open.pop();
      }
    }
  }

  return open.length === 0;
}

/* Product of Array Except Self

Given an array nums of n integers where n > 1,  return an array output such that output[i]
is equal to the product of all the elements of nums except nums[i].

Example:
Input:  [1,2,3,4]
Output: [24,12,8,6]

Note:
Please solve it without division and in O(n).

Follow up:
Could you solve it with constant space complexity? (The output array does not count as extra
space for the purpose of space complexity analysis.)

*/
// https://leetcode.com/problems/product-of-array-except-self/solution/
// construct 2 arrays: left->right, right->left
function productExceptSelf(nums) {
  let left = [];
  let right = [];
  let result = [];

  left[0] = 1;
  for (let i = 1; i < nums.length; i++) {
    left[i] = left[i - 1] * nums[i - 1];
  }

  right[nums.length - 1] = 1;
  for (let i = nums.length - 2; i >= 0; i--) {
    right[i] = right[i + 1] * nums[i + 1];
  }

  for (let i = 0; i < nums.length; i++) {
    result.push(left[i] * right[i]);
  }

  return result;
}

/* Maximum Subarray

Given an integer array nums, find the contiguous subarray (containing at least one number)
which has the largest sum and return its sum.

Example:
Input: [-2,1,-3,4,-1,2,1,-5,4],
Output: 6
Explanation: [4,-1,2,1] has the largest sum = 6.

Follow up:
If you have figured out the O(n) solution, try coding another solution using the divide and
conquer approach, which is more subtle.

*/
// Either Kadane or Sliding Window
function maxSubArray(nums) {
  let max = -Infinity;
  let currentMax = 0;

  for (let i = 0; i < nums.length; i++) {
    currentMax = Math.max(nums[i], currentMax + nums[i]);
    if (currentMax > max) {
      max = currentMax;
    }
  }

  return max;
}

/* Merge Intervals

Given a collection of intervals, merge all overlapping intervals.

Example 1:
Input: [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
Explanation: Since intervals [1,3] and [2,6] overlaps, merge them into [1,6].

Example 2:
Input: [[1,4],[4,5]]
Output: [[1,5]]
Explanation: Intervals [1,4] and [4,5] are considered overlapping.

*/
// time complexity is limited by the sorting -- most JS is O(nlogn)
function merge(intervals) {
  if (intervals.length < 2) {
    return intervals;
  }

  intervals = intervals.sort((a, b) => a[0] - b[0]);

  let results = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    let current = intervals[i];
    let previous = results[results.length - 1];

    if (current[0] <= previous[1]) {
      //need Math.max because [[1,4],[2,3]] = [[1,4]]
      // if there is a merge, replace the last interval in results arr
      results[results.length - 1] = [previous[0], Math.max(current[1], previous[1])];
    } else {
      // if there is no merge, just add the interval to the results arr
      results.push(current);
    }
  }

  return results;
}
