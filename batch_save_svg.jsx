var folder = Folder.selectDialog();
var document = app.activeDocument;
var fileName = document.name.split(".")[0];

if (document && folder) {
    saveToSVG();
}
function saveToSVG() {
    var resFolder = new Folder(folder);
    if (!resFolder.exists) { resFolder.create(); }

    // Loop over version layers (e.g.: tagline/notagline)
    for (var i = 0; i < document.layers.length; i++) {
        
        var versionLayer = document.layers[i];
        var versionName = versionLayer.name;

        // Skip locked layers
        if (versionLayer.locked) continue;

        var options = new ExportOptionsSVG();

        // Loop over color layers (e.g.: default/blue/black/white) within a version layer
        for (var j = 0; j < versionLayer.layers.length; j++) {
            var colorLayer = versionLayer.layers[j];

            // Skip locked layers
            if (colorLayer.locked) continue;
            
            // Make sure layer is visible
            colorLayer.visible = true;

            // Generate folder name from selected folder and .ai filename (no extension)
            // E.g.: outputs/data-sharing--logo/notagline
            var logoFolder = new Folder(folder + "/" + fileName + "/" + versionName);
            if (!logoFolder.exists) { logoFolder.create(); }

            var name = fileName + "-";
            var color = colorLayer.name;

            var file = new File(logoFolder + "/" + name + color + ".svg");

            options.fontType = SVGFontType.OUTLINEFONT;
            //options.optimizeForSVGViewer = true;

            document.exportFile(file, ExportType.SVG, options);

            // Hide layer so we can procede to next one
            colorLayer.visible = false;
        }
    }
}