import Node from './node.js'

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

    find(value) {
        let current = this.root;
        while (current !== null) {
            if (value < current.data) {
                current = current.left;
            } else if (value > current.data) {
                current = current.right;
            } else {
                return current;
            }
        }
        return null;
    }

    levelOrder(callback) {
        if (this.root === null) return;

        const queue = [this.root];
        const result = [];
        while (queue.length > 0) {
            const currentNode = queue.shift();
            if (callback) {
                callback(currentNode);
            } else {
                result.push(currentNode.data);
            }
            if (currentNode.left) queue.push(currentNode.left);
            if (currentNode.right) queue.push(currentNode.right);
        }
        if (callback) return undefined;
        else return result;
    }

    inOrder(callback, node = this.root, result = []) {
        if (node === null) return;

        this.inOrder(callback, node.left, result);
        if (callback) {
            callback(node);
        } else {
            result.push(node.data);
        }
        this.inOrder(callback, node.right, result);

        if (callback) return undefined;
        else return result;
    }

    preOrder(callback, node = this.root, result = []) {
        if (node === null) return;

        if (callback) {
            callback(node);
        } else {
            result.push(node.data);
        }
        this.preOrder(callback, node.left, result);
        this.preOrder(callback, node.right, result);

        if (callback) return undefined;
        else return result;
    }

    postOrder(callback, node = this.root, result = []) {
        if (node === null) return;

        this.postOrder(callback, node.left, result);
        this.postOrder(callback, node.right, result);
        if (callback) {
            callback(node);
        } else {
            result.push(node.data);
        }

        if (callback) return undefined;
        else return result;
    }

    height(node) {
        if (node === null) return -1;

        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);
        return Math.max(leftHeight, rightHeight) + 1;
    }

    depth(node) {
        let current = this.root;
        let depth = 0;

        while (current !== null) {
            if (node.data < current.data) {
                current = current.left;
                depth++;
            } else if (node.data > current.data) {
                current = current.right;
                depth++;
            } else {
                return depth;
            }
        }
        return null;
    }

    isBalanced(node = this.root) {
        if (node === null) return true;

        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);
        const heightDiff = Math.abs(leftHeight - rightHeight);

        if (heightDiff > 1) {
            return false;
        } else {
            return this.isBalanced(node.left) && this.isBalanced(node.right);
        }
    }

    rebalance() {
        if (this.root === null) return;

        const array = this.inOrder();
        const sortedArray = [...new Set(array)].sort((a, b) => a - b);
        this.root = this.buildTree(sortedArray);
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

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 74, 95];
const tree = new Tree(array);

tree.insert(2);
tree.insert(50);
tree.insert(52);

console.log('Is the tree balanced?', tree.isBalanced());
console.log(tree.levelOrder());
console.log(tree.inOrder());
console.log(tree.preOrder());
console.log('Post Order:', tree.postOrder());

console.log('Height of root:', tree.height(tree.root));
console.log('Depth of root:', tree.depth(tree.root));

tree.insert(102);
tree.insert(150);
tree.insert(252);

console.log('Is the tree balanced?', tree.isBalanced());
tree.rebalance();
console.log('Is the tree balanced?', tree.isBalanced());

prettyPrint(tree.root);
