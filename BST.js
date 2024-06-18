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

}

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

