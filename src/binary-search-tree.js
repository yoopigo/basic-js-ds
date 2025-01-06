const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  getRoot() {
    return this.root;
  }

  add(data) {
    let newNode = new Node(data);

    const searchTree = (node) => {
      if (data < node.data) {
        if (!node.left) {
          node.left = newNode;
        } else {
          searchTree(node.left);
        }
      }
      else if (data > node.data) {
        if (!node.right) {
          node.right = newNode;
        } else {
          searchTree(node.right);
        }
      }
    };

    if (!this.root) {
      this.root = newNode;
    } else {
      searchTree(this.root);
    }
  }

  has(data) {
    const searchTree = (node) => {
      if (!node) return false;
      if (data === node.data) return true;
      if (data < node.data) return searchTree(node.left);
      else return searchTree(node.right);
    };
    return searchTree(this.root);
  }

  find(data) {
    const searchTree = (node) => {
      if (!node) return null;
      if (data === node.data) return node;
      if (data < node.data) return searchTree(node.left);
      else return searchTree(node.right);
    };
    return searchTree(this.root);
  }

  remove(data) {
    const removeNode = (node, data) => {
      if (!node) return null;

      if (data === node.data) {
        if (!node.left && !node.right) {
          return null;
        }
        if (!node.left) {
          return node.right;
        }
        if (!node.right) {
          return node.left;
        }
        let tempNode = this.findMinNode(node.right);
        node.data = tempNode.data;
        node.right = removeNode(node.right, tempNode.data);
        return node;
      } else if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else {
        node.right = removeNode(node.right, data);
        return node;
      }
    };
    this.root = removeNode(this.root, data);
  }

  min() {
    if (!this.root) return null;
    let currentNode = this.root;
    while (currentNode.left) {
      currentNode = currentNode.left;
    }
    return currentNode.data;
  }

  max() {
    if (!this.root) return null;
    let currentNode = this.root;
    while (currentNode.right) {
      currentNode = currentNode.right;
    }
    return currentNode.data;
  }

  findMinNode(node) {
    while (node && node.left !== null) {
      node = node.left;
    }
    return node;
  }
}




module.exports = {
  BinarySearchTree
};