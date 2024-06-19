import {Node} from 'node.js';


class Tree {
  constructor(array) {
      array = [...new Set(array)].sort((a, b) => a - b);
      this.root = this.buildTree(array);
  }

  buildTree(array) {
      if (array.length === 0) {
          return null;
      }

      const mid = Math.floor(array.length / 2);
      const root = new Node(array[mid]);
      root.left = this.buildTree(array.slice(0, mid));
      root.right = this.buildTree(array.slice(mid + 1));

      return root;
  }

  insert(value) {
    const newNode = new Node(value);
    if (this.root === null) {
        this.root = newNode;
        return;
    }

    let current = this.root;
    while (true) {
        if (value < current.data) {
            if (current.left === null) {
                current.left = newNode;
                return;
            } else {
                current = current.left;
            }
        } else if (value > current.data) {
            if (current.right === null) {
                current.right = newNode;
                return;
            } else {
                current = current.right;
            }
        } else {
            return 'already exists';
        }
    }
}

deleteItem(value, root = this.root) {
  if (root === null) return root;

  if (value < root.data) {
      root.left = this.deleteItem(value, root.left);
  } else if (value > root.data) {
      root.right = this.deleteItem(value, root.right);
  } else {
      if (root.left === null) {
          return root.right;
      } else if (root.right === null) {
          return root.left;
      }

      root.data = this.minValue(root.right);
      root.right = this.deleteItem(root.data, root.right);
  }

  return root;
}

minValue(root) {
  while (root.left !== null) {
      root = root.left;
  }
  return root.data;
}


};

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
      return;
  }
  if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(array);

prettyPrint(tree.root);

