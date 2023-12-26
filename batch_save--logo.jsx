var folder = Folder.selectDialog();
var document = app.activeDocument;

// Log function
// $.writeIn()

if (document && folder) {
    // Scale by heights
    var heights = [32, 64, 128];
    for (var i = 0; i < heights.length; i++) {
        saveToRes(heights[i], i + 1)
    }
}

function saveToRes(scaleTo, index) {

    scaleTo = scaleTo / document.height * 100.0;

    var i,
        layer,
        file,
        options,
        resFolder;

            $.writeln ("hola");
            $.writeln (folder);
    resFolder = new Folder(folder);
    if (!resFolder.exists) { resFolder.create(); }

    for (i = document.layers.length - 1; i >= 0; i--) {
        layer = document.layers[i];
        if (!layer.locked && layer.name.indexOf("!") === -1) {
            hideAllLayers();
            layer.visible = true;
            
            var parentFolder = new Folder(folder +"/" + document.activeLayer.parent.name);
            if (!parentFolder.exists) { parentFolder.create(); }

            var fileName = document.activeLayer.name;

            file = new File(parentFolder.fsName + "/" + fileName + "--@" + index + "X.png");

            options = new ExportOptionsPNG24();
            options.antiAliasing = true;
            options.transparency = true;
            options.artBoardClipping = true;
            options.verticalScale = scaleTo;
            options.horizontalScale = scaleTo;

            document.exportFile(file, ExportType.PNG24, options);
        }
    }
}

function hideAllLayers() {
    var i, layer;

    for (i = document.layers.length - 1; i >= 0; i--) {
        layer = document.layers[i];
        if (!layer.locked && layer.name.indexOf("!") === -1) {
            layer.visible = false;
        }
    }
}