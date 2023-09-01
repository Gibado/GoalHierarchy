// TODO: Remove before merging
var test1 = hModel.addItem("test 1");
var test2 = hModel.addItem("test 2");
var test3 = hModel.addItem("test 3", test1);
for (var i = 0; i < 6; i++) {
    hModel.addItem("test n" + i);
}

hController.updateDisplay();

var deepList = hModel.root.listDeep();
var wideList = hModel.root.listWide();
console.log(deepList);
console.log(wideList);
console.log(deepList.length == wideList.length);