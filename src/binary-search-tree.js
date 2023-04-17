const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.treeRoot = null;
  }
  root() {
    return this.treeRoot;
  }

  add(data) {
    this.treeRoot = addElement(this.treeRoot, data);

    function addElement(node, data) {
      if(!node) {
        node = new Node(data);
        return node;
      }

      if(node.data === data) {
        return node;
      }

      if(node.data < data) {
        node.rigth = addElement(node.rigth, data);
      } else {
        node.left = addElement(node.left, data);
      }

      return node;
    }
  }

  has(data) {
    return checkElementExistence(this.treeRoot, data);
    
    function checkElementExistence(node, data) {
      if (!node) {
        return false;
      }

      if(node.data === data) {
        return true;
      }

      if(node.data > data) {
        return checkElementExistence(node.left, data);
      } else {
        return checkElementExistence(node.rigth, data);
      }
    }
  }

  find(data) {
    return findNode(this.treeRoot, data);
    function findNode(node, data) {
      if (!node) {
        return null;
      }
      if(node.data === data) {
        return node;
      }
      if (node.data > data) {
        return findNode(node.left, data);
      } else {
        return findNode(node.rigth, data);
      }
    }
  }

  remove(data) {
    this.treeRoot = removeElement(this.treeRoot, data);
    function removeElement(node, data) {
      if(!node) {
        return null;
      }
      if (data > node.data) {
        node.rigth = removeElement(node.rigth, data);
        return node;
      } else if (data < node.data) {
        node.left = removeElement(node.left, data);
        return node;
      } else {
        if (!node.left && !node.rigth) {
          return null;
        }

        if(!node.rigth) {
          node = node.left;
          return node;
        }

        if(!node.left) {
          node = node.rigth;
          return node;
        }

        let maxFromLeft = node.left;
        while(maxFromLeft.rigth) {
          maxFromLeft = maxFromLeft.rigth;
        }
        node.data = maxFromLeft.data;
        node.left = removeElement(node.left, maxFromLeft.data);

        return node;
      }
    }
  }

  min() {
    if(!this.treeRoot) {
      return null;
    }

    let node = this.treeRoot;
    while (node.left) {
      node = node.left;
    }
    return node.data;
  }

  max() {
    if(!this.treeRoot) {
      return null;
    }

    let node = this.treeRoot;
    while (node.rigth) {
      node = node.rigth;
    }
    return node.data;
  }
}

module.exports = {
  BinarySearchTree
};