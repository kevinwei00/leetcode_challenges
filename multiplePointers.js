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
  let next;

  while (curr) {
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
// MULTIPLE POINTERS - moving outwards
function countSubstrings(s) {
  let count = 0;
  for (let i = 0; i < s.length; i++) {
    helper(i, i);
    helper(i, i + 1);
  }
  return count;

  function helper(left, right) {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      count++;
      left--;
      right++;
    }
  }
}

/* 
1. center = space between each char OR each char
2. can it expand to both its left and right?

    *   *   *   *
    l   r
        l   r
    x           x
            l   r
    lr
        lr
    x       x
            lr
        x       x
                lr

    *   *   * 
    l   r
        l   r
    lr
        lr
    x       x
            lr
*/
