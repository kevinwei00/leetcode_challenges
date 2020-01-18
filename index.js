/* Two Sum

Given an array of integers, return indices of the two numbers such that they add up to a specific target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

Example:
Given nums = [2, 7, 11, 15], target = 9,

Because nums[0] + nums[1] = 2 + 7 = 9,
return [0, 1].

*/

function twoSum(nums, target) {
  let hashMap = {};
  for (let i = 0; i < nums.length; i++) {
    hashMap[nums[i].toString()] = i;
  }
  for (let i = 0; i < nums.length; i++) {
    let other = target - nums[i];
    if (hashMap.hasOwnProperty(other) && hashMap[other] !== i) {
      return [i, hashMap[other]];
    }
  }
}

/* Contains Duplicate

Given an array of integers, find if the array contains any duplicates.

Your function should return true if any value appears at least twice in the array, and it should return false if every element is distinct.

Example 1:
Input: [1,2,3,1]
Output: true

Example 2:
Input: [1,2,3,4]
Output: false

Example 3:
Input: [1,1,1,3,3,4,3,2,4,2]
Output: true

*/

function containsDuplicate(nums) {
  const hashMap = {};

  for (let i = 0; i < nums.length; i++) {
    if (hashMap.hasOwnProperty(nums[i])) {
      return true;
    } else {
      hashMap[nums[i]] = true;
    }
  }
  return false;
}

/* Best Time to Buy and Sell Stock

Share
Say you have an array for which the ith element is the price of a given stock on day i.

If you were only permitted to complete at most one transaction (i.e., buy one and sell one share of the stock), design an algorithm to find the maximum profit.

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

/* Valid Anagram

Given two strings s and t , write a function to determine if t is an anagram of s.

Example 1:
Input: s = "anagram", t = "nagaram"
Output: true

Example 2:
Input: s = "rat", t = "car"
Output: false

Note:
You may assume the string contains only lowercase alphabets.

Follow up:
What if the inputs contain unicode characters? How would you adapt your solution to such case?

*/

function isAnagram(s, t) {
  const hashMapS = {};
  for (let i = 0; i < s.length; i++) {
    if (!hashMapS.hasOwnProperty(s[i])) {
      hashMapS[s[i]] = 1;
    } else {
      hashMapS[s[i]]++;
    }
  }

  const hashMapT = {};
  for (let i = 0; i < t.length; i++) {
    if (!hashMapT.hasOwnProperty(t[i])) {
      hashMapT[t[i]] = 1;
    } else {
      hashMapT[t[i]]++;
    }
  }

  // first check that lengths match
  if (Object.keys(hashMapS).length !== Object.keys(hashMapT).length) {
    return false;
  }

  for (let key in hashMapS) {
    if (hashMapT.hasOwnProperty(key)) {
      if (hashMapT[key] !== hashMapS[key]) {
        return false;
      }
    } else {
      return false;
    }
  }
  return true;
}

/* Valid Parentheses

Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

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

function validParentheses(s) {
  if (s.length === 0) {
    return true;
  }
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

Given an array nums of n integers where n > 1,  return an array output such that output[i] is equal to the product of all the elements of nums except nums[i].

Example:
Input:  [1,2,3,4]
Output: [24,12,8,6]

Note:
Please solve it without division and in O(n).

Follow up:
Could you solve it with constant space complexity? (The output array does not count as extra space for the purpose of space complexity analysis.)

*/

function productExceptSelf(nums) {
  let resultArr = new Array(nums.length);
  resultArr[0] = 1;
  for (let i = 1; i < nums.length; i++) {
    resultArr[i] = resultArr[i - 1] * nums[i - 1];
  }

  let rightProduct = nums[nums.length - 1];
  for (let i = resultArr.length - 2; i >= 0; i--) {
    resultArr[i] *= rightProduct;
    rightProduct *= nums[i];
  }

  return resultArr;
}

/* Maximum Subarray (kdane)

Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.

Example:
Input: [-2,1,-3,4,-1,2,1,-5,4],
Output: 6
Explanation: [4,-1,2,1] has the largest sum = 6.

Follow up:
If you have figured out the O(n) solution, try coding another solution using the divide and conquer approach, which is more subtle.

*/

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

