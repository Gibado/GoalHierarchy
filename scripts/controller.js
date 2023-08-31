class HierarchyController {
    constructor(model) {
        this.model = model;
    }
    UpdateDisplay() {
        var display = document.getElementById("display");
        // Clear existing
        while (display.children.length > 0) {
            display.children[0].remove();
        }

        var rootDisplay = this.createDisplay(this.model.root);
        display.append(rootDisplay);
    }
    createDisplay(node) {
        var div = document.createElement("div");
        div.className = "action-item"
        var title = document.createElement("p");
        title.textContent = node.data.toString();
        div.append(title);

        var self = this;
        if (node.children.length > 0) {
            div.className = "goal"
            var list = document.createElement("ol");
            node.children.forEach(function(childNode) {
                var item = document.createElement('li');
                item.append(self.createDisplay(childNode));
                list.append(item);
            })
            div.append(list);
        }

        return div;
    }
}

var hModel = new HierarchyModel();
var hController = new HierarchyController(hModel);

hController.UpdateDisplay();