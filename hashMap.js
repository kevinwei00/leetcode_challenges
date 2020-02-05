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
