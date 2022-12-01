"use strict";

var currentlyEditedValue;

function viewRenderLangTags(langs, langTagsTable) {
	var langItemsTable = document.getElementById('langItemsTable');
	// clear container before new render
	while (langItemsTable.firstChild) {
    langItemsTable.removeChild(langItemsTable.firstChild);
	}
	// render new content
	// create table's head
	var langItemsThead = document.createElement('thead');
	var langItemsTr = document.createElement('tr');
	langItemsTr.id = 'langItemsTableHeadRow';
	var langItemsTh = document.createElement('th');
	langItemsTh.innerHTML = 'Tags';
	langItemsTr.appendChild(langItemsTh);
	for (var lang in langs) {
		langItemsTh = document.createElement('th');
		langItemsTh.innerHTML = langs[lang];
		langItemsTr.appendChild(langItemsTh);
	}
	langItemsThead.appendChild(langItemsTr);
	langItemsTable.appendChild(langItemsThead);
	// end of create table's head
	// create table's body
	var langItemsTbody = document.createElement('tbody');
	for (var langTag in langTagsTable) {
		// create row for each element
		langItemsTr = document.createElement('tr');
		// create first cell with tag
		var langItemsTd = document.createElement('td');
		langItemsTd.innerHTML = langTagsTable[langTag].tag;
		langItemsTr.appendChild(langItemsTd);
		// ctrate cells with values
		for (var lang in langs) {
			langItemsTd = document.createElement('td');
			// langItemsTd.innerHTML = '<input type="text" class="form-control" placeholder="Value" value="' + langTagsTable[langTag].values[langs[lang]] + '">'; //langTagsTable[langTag].values[langs[lang]];
			langItemsTd.innerHTML = '<div class="clickable" onclick="switchToEdit(this)"><span>' + langTagsTable[langTag].values[langs[lang]] + '</span></div>';
			langItemsTr.appendChild(langItemsTd);
		}
		// add row to table's body
		langItemsTbody.appendChild(langItemsTr);
	}
	// add body to the table
	langItemsTable.appendChild(langItemsTbody);
	// end of create table's body
}
function switchToEdit(element) {
	if (currentlyEditedValue && currentlyEditedValue.children) {
		if (currentlyEditedValue != element) {
			currentlyEditedValue.innerHTML = '<span>' + currentlyEditedValue.children[0].value + '</span>';
		}
	}
	if (element && element.children) {
		if (currentlyEditedValue != element) {
			element.innerHTML = '<input type="text" class="form-control" placeholder="Value" value="' + element.children[0].innerHTML + '">';
			currentlyEditedValue = element;
		}
	} else {
		console.log('Error!!! Somethig is wrong with the element');
	}
}
function viewSave() {
	// todo: move it to another function?
	if (currentlyEditedValue && currentlyEditedValue.children) {
		currentlyEditedValue.innerHTML = '<span>' + currentlyEditedValue.children[0].value + '</span>';
	}
	var langItemsTable = document.getElementById('langItemsTable');
	var langs = [];
	var translations = [{}];
	for (var i = 0, row; row = langItemsTable.rows[i]; i++) {
	  //iterate through rows
	  //rows would be accessed using the "row" variable assigned in the for loop
	  for (var j = 1, col; col = row.cells[j]; j++) {
	    //iterate through columns
	    //columns would be accessed using the "col" variable assigned in the for loop
	    // filling langs
	    if (i == 0) {
	    	langs.push(col.innerHTML);
	    } else {
	     	var langInput = col.children[0]; // todo: przemyśl to
	     	var langTag = langItemsTable.rows[i].cells[0].innerHTML;
		    var langValue = langInput.children[0].innerHTML;
		    if (!translations[j]) {
		     	translations.push({});
		    }
		    translations[j][langTag] = langValue;
		  }
		}  
	}
	for (var k = 0, lang; lang = langs[k]; k++) {
		filesSaveData(lang, translations[k+1]);
	}
	// todo: add some error/success messages
	console.log('Saving');
}