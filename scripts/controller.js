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
        var li = document.getElementById('itemTemplate').cloneNode(true);
        li.id = node.data.id;
        var type = node.type();
        li.className += ' ' + type;

        var title = li.getElementsByClassName('title')[0];
        title.textContent = node.data.title;
        title.id = node.data.id;

        if (TypeEnum.GOAL == type) {
            var ol = li.getElementsByClassName('item-list')[0];
            var self = this;
            node.children.forEach(function(childNode) {
                ol.append(self.createDisplay(childNode));
            });
        }

        var priority = li.getElementsByClassName('priority')[0];

        var pillValue = node.data.priority;
        if (pillValue == undefined) {
            pillValue = 0;
        }
        priority.textContent = pillValue.toString();

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
    changeParent(itemId, newParentId) {
        hModel.moveItem(itemId, newParentId);
    }
    dropEvent(ev) {
        ev.preventDefault();
        var targetId = ev.dataTransfer.getData("targetId");
        var landingId = ev.target.id;
        console.debug('Dropping: ' + targetId + ' on: ' + landingId);
        this.changeParent(targetId, landingId);
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