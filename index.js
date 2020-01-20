/* Two Sum

Given an array of integers, return indices of the two numbers such that they add up to a
specific target.

You may assume that each input would have exactly one solution, and you may not use the same
element twice.

Example:
Given nums = [2, 7, 11, 15], target = 9,

Because nums[0] + nums[1] = 2 + 7 = 9,
return [0, 1].

*/
// use a hashmap for constant lookup of the answer's indices
function twoSum(nums, target) {
  let hashMap = {};
  for (let i = 0; i < nums.length; i++) {
    // key: value at index, value: index { '2': 0, '7': 1 }
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

Your function should return true if any value appears at least twice in the array, and it
should return false if every element is distinct.

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
// use a hashmap to add an entry if one doesn't already exist; otherwise, there's a dupe
function containsDuplicate(nums) {
  const hashMap = {};

  for (let i = 0; i < nums.length; i++) {
    if (hashMap.hasOwnProperty(nums[i])) {
      return true;
    } else {
      // { '1': true, '2': true }
      hashMap[nums[i]] = true;
    }
  }
  return false;
}

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

/* Three Sum

Given an array nums of n integers, are there elements a, b, c in nums such that a + b + c = 0?
Find all unique triplets in the array which gives the sum of zero.

Note:
The solution set must not contain duplicate triplets.

Example:
Given array nums = [-1, 0, 1, 2, -1, -4],

A solution set is:
[
  [-1, 0, 1],
  [-1, -1, 2]
]

*/

function threeSum(nums) {
  const results = [];

  if (nums.length < 3) {
    return results;
  }

  nums = nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue;
    }
    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      let sum = nums[i] + nums[left] + nums[right];
      if (sum === 0) {
        results.push([nums[i], nums[left], nums[right]]);

        while (nums[left] === nums[left + 1]) left++;
        while (nums[right] === nums[right - 1]) right--;

        left++;
        right--;
      } else if (sum < 0) {
        left++;
      } else if (sum > 0) {
        right--;
      }
    }
  }

  return results;
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
      results[results.length - 1] = [previous[0], Math.max(current[1], previous[1])];
    } else {
      results.push(current);
    }
  }

  return results;
}

/* Group Anagrams

Given an array of strings, group anagrams together.

Example:
Input: ["eat", "tea", "tan", "ate", "nat", "bat"],
Output:
[
  ["ate","eat","tea"],
  ["nat","tan"],
  ["bat"]
]

Note:
All inputs will be in lowercase.
The order of your output does not matter.

*/

function groupAnagrams(strs) {
  let results = new Map();

  for (let i = 0; i < strs.length; i++) {
    let str = strs[i];
    let key = str
      .split('')
      .sort()
      .join(''); // 'aet'
    let value = results.get(key);

    if (value) {
      results.set(key, [...value, str]);
    } else {
      results.set(key, [str]);
    }
  }

  let arr = [];
  results.forEach((v) => {
    arr.push(v);
  });

  return arr;
}

/* Reverse a Linked List

Reverse a singly linked list.

Example:
Input: 1->2->3->4->5->NULL
Output: 5->4->3->2->1->NULL

Follow up:
A linked list can be reversed either iteratively or recursively. Could you implement both?

*/

function reverseList(head) {
  let curr = head;
  let prev = null;
  let next = curr ? curr.next : null;
  while (next !== null) {
    next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  if (prev) {
    head = prev;
  }
  return head;
}

/* Linked List Cycle

Given a linked list, determine if it has a cycle in it.

To represent a cycle in the given linked list, we use an integer pos which represents the
position (0-indexed) in the linked list where tail connects to. If pos is -1, then there is
no cycle in the linked list.

Example 1:
Input: head = [3,2,0,-4], pos = 1
Output: true
Explanation: There is a cycle in the linked list, where tail connects to the second node.

Example 2:
Input: head = [1,2], pos = 0
Output: true
Explanation: There is a cycle in the linked list, where tail connects to the first node.

Example 3:
Input: head = [1], pos = -1
Output: false
Explanation: There is no cycle in the linked list.

Follow up:
Can you solve it using O(1) (i.e. constant) memory?

*/

function hasCycle(head) {
  if (!head) {
    return false;
  }

  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {
      return true;
    }
  }
  return false;
}

/* Container With Most Water

Given n non-negative integers a1, a2, ..., an , where each represents a point at coordinate
(i, ai). n vertical lines are drawn such that the two endpoints of line i is at (i, ai) and
(i, 0). Find two lines, which together with x-axis forms a container, such that the container
contains the most water.

Note: You may not slant the container and n is at least 2.

Example:
Input: [1,8,6,2,5,4,8,3,7]
Output: 49

*/

function maxArea(height) {
  let max = 0;
  let idx1 = 0;
  let idx2 = height.length - 1;

  while (idx1 < idx2) {
    let area = (idx2 - idx1) * Math.min(height[idx1], height[idx2]);
    if (max < area) {
      max = area;
    }

    // move the shorter idx inwards
    if (height[idx1] > height[idx2]) {
      idx2--;
    } else {
      idx1++;
    }
  }
  return max;
}
