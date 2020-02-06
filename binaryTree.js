/* Validate Binary Search Tree

Given a binary tree, determine if it is a valid binary search tree (BST).

Assume a BST is defined as follows:

The left subtree of a node contains only nodes with keys less than the node's key.
The right subtree of a node contains only nodes with keys greater than the node's key.
Both the left and right subtrees must also be binary search trees.

Example 1:

    2
   / \
  1   3

Input: [2,1,3]
Output: true

Example 2:

    5
   / \
  1   4
     / \
    3   6

Input: [5,1,4,null,null,3,6]
Output: false
Explanation: The root node's value is 5 but its right child's value is 4.

*/

function isValidBST(node, max = Infinity, min = -Infinity) {
  if (!node) {
    return true;
  }

  if (node.val >= max || node.val <= min) {
    return false;
  }

  return isValidBST(node.left, node.val, min) && isValidBST(node.right, max, node.val);
}

/* Invert Binary Tree

Example:

Input:

     4
   /   \
  2     7
 / \   / \
1   3 6   9

Output:

     4
   /   \
  7     2
 / \   / \
9   6 3   1

*/

function invertTree(node) {
  if (!node) {
    return null;
  }

  let temp = node.left;
  node.left = node.right;
  node.right = temp;

  invertTree(node.left);
  invertTree(node.right);

  return node;
}
