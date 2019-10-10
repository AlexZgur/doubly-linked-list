const Node = require('./node');

class LinkedList {
    constructor() {
        this._head = null;
        this._tail = null;
        this.length = 0;
    }

    append(data) {
        let newNode = new Node(data, this._tail);
        if (this.length == 0) {
            this._head = newNode;
            this._tail = this._head;
        } else {
            this._tail.next = newNode;
            this._tail = newNode;
        }
        this.length += 1;
        return this;
    }

    head() {
        return this._head ? this._head.data : null;
    }

    tail() {
        return this._head ? this._tail.data : null;
    }

    at(index) {
        let searchNode = this._head;
        for (let i = 0; i < index && searchNode.next; i++) {
            searchNode = searchNode.next;
        }
        return searchNode.data;
    }

    insertAt(index, data) {
        if (this.length > 0) {
            let searchNode = this._head;
            for (let i = 0; i < index && searchNode.next; i++) {
                searchNode = searchNode.next;
            }
            let newNode = new Node(data, searchNode.prev, searchNode);
            searchNode.prev = newNode;
            if (newNode.prev) {
                newNode.prev.next = newNode;
            } else {
                this._head = newNode;
            }
            this.length += 1;
        } else {
            this.append(data);
        }
        return this;
    }

    isEmpty() {
        return this.length > 0 ? false : true;
    }

    clear() {
        this._head = null;
        this._tail = null;
        this.length = 0;
        return this;
    }

    deleteAt(index) {
        if (this.length > 0) {
            let searchNode = this._head;
            for (let i = 0; i < index && searchNode.next; i++) {
                searchNode = searchNode.next;
            }
            if (searchNode.prev) {
                searchNode.prev.next = searchNode.next;
            } else {
                this._head = searchNode.next;
            }
            if (searchNode.next) {
                searchNode.next.prev = searchNode.prev;
            } else {
                this._tail = searchNode.prev;
            }
            this.length -= 1;
        }
        return this;
    }

    reverse() {
        let currentNode = this._head;
        while (currentNode) {
            let buf = currentNode.next;
            currentNode.next = currentNode.prev;
            currentNode.prev = buf;
            currentNode = buf;
        }
        currentNode = this._head;
        this._head = this._tail;
        this._tail = currentNode;
        return this;
    }

    indexOf(data) {
        let currentNode = this._head;
        let pos = 0;
        while (currentNode && currentNode.data != data) {
            pos++;
            currentNode = currentNode.next;
        }
        return (currentNode && currentNode.data == data) ? pos : -1;
    }
}

module.exports = LinkedList;
