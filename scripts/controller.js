var HierarchyController = function(model) {
    var self = {};
    self.model = model;

    self.UpdateDisplay = function() {
        var display = document.getElementById("display");
        // Clear existing
        while(display.children.length > 0) {
            display.children[0].remove();
        }

        var rootDisplay = self.createDisplay(self.model.root);
        display.append(rootDisplay);
        
    }

    self.createDisplay = function(node) {
        var div = document.createElement("div");
        div.className = "action-item"
        var title = document.createElement("p");
        title.textContent = node.Title;
        div.append(title);

        if (node.NodeList.length > 0) {
            div.className = "goal"
            var list = document.createElement("ol");
            self.model.root.NodeList.forEach(function(childNode) {
                var item = document.createElement('li');
                item.append(self.createDisplay(childNode));
                list.append(item);
            })
            div.append(list);
        }

        return div;
    }

    return self;
}

var hModel = HierarchyModel();
var hController = HierarchyController(hModel);

hController.UpdateDisplay();