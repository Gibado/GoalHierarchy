class HierarchyModel {
    constructor() {
        this.root = new GoalLinkedNode("Root");
    }
    addItem(title, parent) {
        var pNode = parent;
        if (pNode == undefined || pNode == null) {
            pNode = this.root;
        }
        return pNode.addItem(title);
    }
}

// Data structures
const TypeEnum = {
    GOAL: 1,
    ACTION_ITEM: 2
}
class GoalItem {
    constructor(title, priority) {
        this.title = title;
        this.priority = priority;
    }
    toString() {
        var result = this.title;
        if (this.priority != undefined && this.priority != null) {
            result += " (" + this.priority + ")";;
        }
        return result;
    }
}
class LinkedNode {
    constructor(data, parentNode) {
        this.data = data;
        this.children = [];
        if (parentNode != undefined && parentNode != null) {
            this.parent = parentNode;
            this.parent.addChild(this);
        }
    }
    addChild(node) {
        this.children.push(node);
    }
}
class GoalLinkedNode extends LinkedNode {
    constructor(title, parentNode) {
        super(new GoalItem(title), parentNode);
    }
    type() {
        if (this.children.length == 0) {
            return TypeEnum.ACTION_ITEM;
        } else {
            return TypeEnum.GOAL;
        }
    }
    addItem(title) {
        return new GoalLinkedNode(new GoalItem(title), this);
    }
}