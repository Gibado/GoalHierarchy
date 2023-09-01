class HierarchyController {
    constructor(model) {
        this.model = model;
    }
    updateDisplay() {
        var display = document.getElementById("display-list");
        // Clear existing
        while (display.children.length > 0) {
            display.children[0].remove();
        }

        var rootDisplay = this.createDisplay(this.model.root);
        display.append(rootDisplay);
        this.updateSelect();
    }
    createDisplay(node) {
        var li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-start';
        li.id = node.data.id;
        var type = node.type();
        li.className += ' ' + type;

        var info = document.createElement('div');
        info.className = 'ms-2 me-auto';
        li.append(info);
        var title = document.createElement('div');
        title.className = 'fw-bold';
        title.textContent = node.data.title;
        info.append(title);

        if (TypeEnum.GOAL == type) {
            var ol = document.createElement('ol');
            ol.className = 'list-group list-group-numbered';
            var self = this;
            node.children.forEach(function(childNode) {
                ol.append(self.createDisplay(childNode));
            });
            info.append(ol);
        }

        var priority = document.createElement('span');
        priority.className = 'badge bg-primary rounded-pill';
        var pillValue = node.data.priority;
        if (pillValue == undefined) {
            pillValue = '-';
        }
        priority.textContent = pillValue.toString();
        li.append('\xa0');
        li.append(priority);

        return li;
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
        this.updateDisplay();
    }
    deleteItem(itemId) {
        hModel.deleteItem(itemId);
        this.updateDisplay();
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
}
var deleteButton = document.getElementById('delete-button');
deleteButton.onclick = function() {
    var itemId = parseFloat(document.getElementById('goal-select').selectedOptions[0].value);
    var success = hController.deleteItem(itemId);
    if (!success) {
        var item = hModel.findItemById(itemId);
        console.error("Couldn't delete item: " + item.toString())
    }
}

hController.updateDisplay();