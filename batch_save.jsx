var folder = Folder.selectDialog();
var document = app.activeDocument;
var fileName = document.name.split(".")[0];

// Log function
// $.writeIn()

if (document && folder) {
    // Scale by heights
    var heights = [32, 64, 128, 256];
    for (var i = 0; i < heights.length; i++) {
        saveToRes(heights[i], i + 1)
    }
}

function saveToRes(scaleTo, index) {

    scaleTo = scaleTo / document.height * 100.0;

    var resFolder = new Folder(folder);
    if (!resFolder.exists) { resFolder.create(); }


    for (var i = 0; i < document.layers.length; i++) {
        // Current version layer
        var versionLayer = document.layers[i];
        var versionName = versionLayer.name;

        // Skip locked layers
        if (versionLayer.locked) continue;

        for (var j = 0; j < versionLayer.layers.length; j++) {
            var colorLayer = versionLayer.layers[j];

            // Make sure layer is visible
            colorLayer.visible = true;

            // Generate folder name from selected folder and .ai filename (no extension)
            // E.g.: outputs/data-sharing--logo-notagline
            var logoFolder = new Folder(folder + "/" + fileName + "/" + versionName);
            if (!logoFolder.exists) { logoFolder.create(); }

            var name = fileName + "-";
            var color = colorLayer.name + "-";
            var size = "@" + index + "X";

            var file = new File(logoFolder + "/" + name + color + size + ".png");

            var options = new ExportOptionsPNG24();
            //options.antiAliasing = true;
            options.transparency = true;
            //options.artBoardClipping = true;
            options.verticalScale = scaleTo;
            options.horizontalScale = scaleTo;

            document.exportFile(file, ExportType.PNG24, options);

            // Hide layer so we can procede to next one
            colorLayer.visible = false;
        }
    }
}