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
// create hashmaps for both strings then check if char frequencys are the same
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
// MULTIPLE POINTERS - moving inwards
// time complexity is limited by the sorting -- most JS is O(nlogn)
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
// use a hashmap with (k, v) = (sorted string, anagram)
// time complexity is limited by the sorting -- most JS is O(nlogn)
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
// best to draw a picture
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
// MULTIPLE POINTERS - fast/slow
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
// MULTIPLE POINTERS - moving inwards
// area is limited by the height of the shortest line, so move its index inward for the
// possibility of a taller line which would increase area (moving the other index inward
// would only lessen the area)
function maxArea(height) {
  let max = 0;
  let left = 0;
  let right = height.length - 1;

  while (left < right) {
    let area = (right - left) * Math.min(height[left], height[right]);
    if (max < area) {
      max = area;
    }

    // move the shorter index inwards
    if (height[left] > height[right]) {
      right--;
    } else {
      left++;
    }
  }
  return max;
}

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

/* Longest Repeating Character Replacement

Given a string s that consists of only uppercase English letters, you can perform at most
k operations on that string.

In one operation, you can choose any character of the string and change it to any other
uppercase English character.

Find the length of the longest sub-string containing all repeating letters you can get after
performing the above operations.

Note:
Both the string's length and k will not exceed 104.

Example 1:

Input:
s = "ABAB", k = 2

Output:
4

Explanation:
Replace the two 'A's with two 'B's or vice versa.

Example 2:

Input:
s = "AABABBA", k = 1

Output:
4

Explanation:
Replace the one 'A' in the middle with 'B' and form "AABBBBA".
The substring "BBBB" has the longest repeating letters, which is 4.

*/
// SLIDING WINDOW
function characterReplacement(s, k) {
  let hashMap = {};
  let windowStart = 0;
  let numRepeatingChars = 0;
  let maxWindowSize = 0;

  for (let windowEnd = 0; windowEnd < s.length; windowEnd++) {
    if (hashMap.hasOwnProperty(s[windowEnd])) {
      hashMap[s[windowEnd]]++;
    } else {
      hashMap[s[windowEnd]] = 1;
    }

    numRepeatingChars = Math.max(numRepeatingChars, hashMap[s[windowEnd]]);

    let windowLength = windowEnd - windowStart + 1; // base 0 needs + 1
    if (windowLength - numRepeatingChars > k) {
      // shorten the window
      // decrease char frequency in hashmap
      hashMap[s[windowStart]]--;
      // move pointer to the right
      windowStart++;
    }

    windowLength = windowEnd - windowStart + 1; // base 0 needs + 1
    maxWindowSize = Math.max(maxWindowSize, windowLength);
  }

  return maxWindowSize;
}

/*
https://leetcode.com/problems/find-all-anagrams-in-a-string/discuss/92007/sliding-window-algorithm-template-to-solve-all-the-leetcode-substring-search-problem

https://leetcode.com/problems/minimum-window-substring/
https://leetcode.com/problems/longest-substring-without-repeating-characters/
https://leetcode.com/problems/substring-with-concatenation-of-all-words/
https://leetcode.com/problems/longest-substring-with-at-most-two-distinct-characters/
https://leetcode.com/problems/find-all-anagrams-in-a-string/
https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters
https://leetcode.com/problems/longest-repeating-character-replacement
*/

function slidingWindow(s1, s2) {
  let result = [];
  if (s1.length < s2.length || !s1 || !s2) {
    return result;
  }

  let map = {};
  for (let i = 0; i < s2.length; i++) {
    if (map.hasOwnProperty(s2[i])) {
      map[s2[i]]++;
    } else {
      map[s2[i]] = 1;
    }
  }

  let counter = Object.keys(map).length;
  let start = 0;
  let end = 0;

  while (end < s1.length) {
    if (map.hasOwnProperty(s1[end])) {
      map[s1[end]]--;
      if (map[s1[end]] === 0) {
        counter--;
      }
    }
    end++;

    while (counter === 0) {
      if (map.hasOwnProperty(s1[start])) {
        map.set(tempc, map.get(tempc) + 1);
        map[s1[start]]++;
        if (map[s1[start]] > 0) {
          counter++;
        }
      }

      if (end - start === s2.length) {
        result.push(start);
      }
      start++;
    }
  }
  return result;
}

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
// recursive depth first search
function numIslands(grid) {
  function dfs(row, col) {
    if (grid[row][col] === '1') {
      grid[row][col] = '0';

      // top
      if (row > 0) {
        dfs(row - 1, col);
      }
      // left
      if (col > 0) {
        dfs(row, col - 1);
      }
      // bottom
      if (row < grid.length - 1) {
        dfs(row + 1, col);
      }
      // right
      if (col < grid[row].length - 1) {
        dfs(row, col + 1);
      }
    }
  }

  let total = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === '1') {
        total++;
        dfs(i, j);
      }
    }
  }
  return total;
}

/* Remove Nth Node From End of List

Given a linked list, remove the n-th node from the end of list and return its head.

Example:
Given linked list: 1->2->3->4->5, and n = 2.
After removing the second node from the end, the linked list becomes 1->2->3->5.

Note:
Given n will always be valid.

Follow up:
Could you do this in one pass?

*/
// MULTIPLE POINTERS - fast/slow
function removeNthFromEnd(head, n) {
  let slow = head;
  let fast = head;

  // start fast pointer n-spaces ahead of slow pointer
  for (let i = 0; i < n; i++) {
    fast = fast.next;
  }

  // need to handle linked lists that have n-length
  if (!fast) {
    return slow.next;
  }

  // as soon as fast can't move forward, exit loop
  while (fast.next) {
    fast = fast.next;
    slow = slow.next;
  }

  // slow.next.next is safe because slow.next is guaranteed non-null
  slow.next = slow.next.next;
  return head;
}

/* Palindromic Substrings

Given a string, your task is to count how many palindromic substrings in this string.

The substrings with different start indexes or end indexes are counted as different
substrings even they consist of same characters.

Example 1:
Input: "abc"
Output: 3
Explanation: Three palindromic strings: "a", "b", "c".

Example 2:
Input: "aaa"
Output: 6
Explanation: Six palindromic strings: "a", "a", "a", "aa", "aa", "aaa".
 
Note:
The input string length won't exceed 1000.

*/

function countSubstrings(s) {
  let count = 0;
  for (let i = 0; i < s.length; i++) {
    helper(i, i);
    helper(i, i + 1);
  }
  return count;

  function helper(left, right) {
    while (left >= 0 && right <= s.length && s[left] === s[right]) {
      count++;
      left--;
      right++;
    }
  }
}
