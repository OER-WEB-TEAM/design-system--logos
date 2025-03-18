var folder = Folder.selectDialog();
var document = app.activeDocument;
var fileName = document.name.split(".")[0];

if (document && folder) {
    saveToSVG();
}

function saveToSVG() {
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
            var color = colorLayer.name;

            var file = new File(logoFolder + "/" + name + color + ".svg");

            var options = new ExportOptionsSVG();
            options.compressed = true;
            options.embedRasterImages = false;
            options.fontType = SVGFontType.OUTLINEFONT;
            options.saveMultipleArtboards = false;

            document.exportFile(file, ExportType.SVG, options);

            // Hide layer so we can procede to next one
            colorLayer.visible = false;
        }
    }
}