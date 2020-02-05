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
