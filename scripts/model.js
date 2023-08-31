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
    getItemList() {
        return this.root.listWide();
    }
    findItemById(id) {
        for (const item of this.getItemList()) {
            if (id == item.data.id) {
                return item;
            }
        }
        return null;
    }
}

// Data structures
const TypeEnum = {
    GOAL: 1,
    ACTION_ITEM: 2
}
class GoalItem {
    constructor(title, priority) {
        this.id = Math.random();
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
    equals(that) {
        if (this.id === that.id) {
            return true;
        }
        return false;
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
    listDeep() {
        if (this.children.length == 0) {
            return [this];
        }
        var list = [this];
        this.children.forEach(function(childNode) {
            list = list.concat(childNode.listDeep());
        });
        return list;
    }
    listWide() {
        if (this.children.length == 0) {
            return [this];
        }
        var list = [];
        var searchList = [this];
        while (searchList.length > 0) {
            var node = searchList.shift();
            list.push(node);
            node.children.forEach(function(childNode) {
                searchList.push(childNode);
            });
        }
        return list;
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
        return new GoalLinkedNode(title, this);
    }
}