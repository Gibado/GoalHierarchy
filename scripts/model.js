var HierarchyModel = function() {
    var self = {};
    self.root = Node().NewNode("Root", null)
    self.AddNode = function(title, parent) {
        var newNode;
        if (parent == null) {
            newNode = self.root.AddChild(title);
        }
        else {
            newNode = parent.AddChild(title);
        }
        return newNode;
    }

    return self;
};

// Data structures
var TypeEnum = {
    GOAL: 1,
    ACTION_ITEM: 2
}
var Node = function() {
    var self = {};
    self.Title = "Title";
    self.Parent = null;
    self.NodeList = [];

    self.Type = function() {
        if (self.NodeList.length == 0) {
            return TypeEnum.ACTION_ITEM;
        } else {
            return TypeEnum.GOAL;
        }
    }
    self.NewNode = function(title, parent) {
        var node = Node();
        node.Title = title;
        node.Parent = parent;
        return node;
    }

    self.AddChild = function(title) {
        var child = self.NewNode(title, self)
        self.NodeList.push(child);
        return child;
    }
    return self;
}