class HierarchyController {
    constructor(model) {
        this.model = model;
    }
    updateDisplay() {
        var display = document.getElementById("display");
        // Clear existing
        while (display.children.length > 0) {
            display.children[0].remove();
        }

        var rootDisplay = this.createDisplay(this.model.root);
        display.append(rootDisplay);
        this.updateSelect();
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
    updateSelect() {
        var select = document.getElementById('goal-select');
        while (select.children.length > 0) {
            select.children[0].remove();
        }
        var list = hModel.getItemList();
        list.forEach(function(item) {
            var option = document.createElement('option');
            option.value = item.data.id;
            option.text = item.data.title;
            select.append(option);
        })
    }
    createItem(title, parentId) {
        var parent = hModel.findItemById(parentId);
        hModel.addItem(title, parent);
    }
}

var hModel = new HierarchyModel();
var hController = new HierarchyController(hModel);

// Connect to UI
var createButton = document.getElementById('create-button');
createButton.onclick = function() {
    var title = document.getElementById('item-text').value;
    var parentId = parseFloat(document.getElementById('goal-select').selectedOptions[0].value);
    hController.createItem(title, parentId);
    hController.updateDisplay();
}

hController.updateDisplay();