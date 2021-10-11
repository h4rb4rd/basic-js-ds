const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
module.exports = class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    const node = new Node(data);
    let currentNode = this.rootNode;

    if (!this.rootNode) {
      this.rootNode = node;
      return;
    }

    while (currentNode) {
      if (node.data < currentNode.data) {
        if (!currentNode.left) {
          currentNode.left = node;
          return;
        }
        currentNode = currentNode.left;
      } else {
        if (!currentNode.right) {
          currentNode.right = node;
          return;
        }
        currentNode = currentNode.right;
      }
    }
  }

  has(data) {
    if (!this.find(data)) {
      return false;
    } else {
      return true;
    }
  }

  find(data) {
    let currentNode = this.rootNode;

    while (currentNode) {
      if (data < currentNode.data) {
        currentNode = currentNode.left;
      } else if (data > currentNode.data) {
        currentNode = currentNode.right;
      } else {
        return currentNode;
      }
    }
    return null;
  }

  remove(data) {
    this.root = this.removeNode(this.rootNode, data);
  }

  removeNode(node, data) {
    if (!node) {
      return null;
    }
    if (data < node.data) {
      node.left = this.removeNode(node.left, data);
      return node;
    } else if (node.data < data) {
      node.right = this.removeNode(node.right, data);
      return node;
    } else {
      if (!node.left && !node.right) {
        return null;
      }
      if (!node.left) {
        node = node.right;
        return node;
      }
      if (!node.right) {
        node = node.left;
        return node;
      }
      let minNode = node.right;
      while (minNode.left) {
        minNode = minNode.left;
      }
      node.data = minNode.data;
      node.right = this.removeNode(node.right, minNode.data);
      return node;
    }
  }

  min() {
    let currentNode = this.rootNode;
    while (currentNode.left) {
      currentNode = currentNode.left;
    }
    return currentNode.data;
  }

  max() {
    let currentNode = this.rootNode;
    while (currentNode.right) {
      currentNode = currentNode.right;
    }
    return currentNode.data;
  }
};
