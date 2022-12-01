"use strict";

window.onload = function() {
	// all necessary onload triggers
	// var path = './testFolder';
	// filesLoadLangsFromFolder(path);
	document.getElementById("inputSelectPath").addEventListener("change", loadFilesFromFolder);
	changeDisplay(false);

	function loadFilesFromFolder() {
    var fileInput = document.getElementById("inputSelectPath");
    var chosenFolder = fileInput.files[0];
    filesLoadLangsFromFolder(chosenFolder.path);
    changeDisplay(true);
	}

	function changeDisplay(showTable) {
		var tableHolder = document.getElementById("langItemsTableHolder");
		var buttonsHolder = document.getElementById("langButtonsHolder");
		if (showTable) {
      tableHolder.style.display = "block";
      buttonsHolder.style.display = "block";
    } else {
    	tableHolder.style.display = "none";
      buttonsHolder.style.display = "none";
    }
	}
}
