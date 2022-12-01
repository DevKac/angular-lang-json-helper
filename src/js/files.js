"use strict";
var fs = require('fs');

function filesLoadLangsFromFolder(folderPath) {
  // check if foler path exists
  if (!fs.existsSync(folderPath)) {
  	// todo: make a proper error handling
  	console.log('Error!!! Folder does not exist!');
  } else {
		fs.readdir(folderPath, function (error, files) {
    	//handling error
    	if (error) {
    		// todo: make a proper error handling
        return console.log('Error!!! Unable to scan directory: ' + error);
    	} 
    	//listing all files using forEach
    	files.forEach(function (file) {
        // Do whatever you want to do with the file
        filesLoadLangsFromFile(folderPath, file); 
    	});
		});
  }
}

var filesLangs = [];

function filesLoadLangsFromFile(folderPath, fileName) {
	// todo: use Node.js path to make it more OS friendly
	var filePath = folderPath + '/' + fileName;
	// console.log('File name is ' + fileName.split('.').slice(0, -1).join('.'));
	var fileNameNoExtension = fileName.split('.').slice(0, -1).join('.');
	if (filesLangs.indexOf(fileNameNoExtension) === -1) {
		filesLangs.push(fileNameNoExtension);
	} else {
		// todo: make a proper error handling
    console.log('Error!!! Language repetition detected: ' + fileNameNoExtension);
	}
	// console.log('File content is:');
	// console.log(JSON.parse(fs.readFileSync(filePath, 'utf8')));
	filesLoadLangItemsTable(JSON.parse(fs.readFileSync(filePath, 'utf8')), fileNameNoExtension);
}

class FilesLangItem {
  constructor(tag) {
    this.tag = tag;
    this.values = null;
  }
}
var filesLangItemsTable = [];
function findfilesLangItemByTag(tag) {
	for (var filesLangItem in filesLangItemsTable) {
		if (filesLangItemsTable[filesLangItem].tag === tag) {
			return filesLangItemsTable[filesLangItem]
		}
	}
	return null;
}

function filesLoadLangItemsTable(data, currentLang) {
	// console.log(data);
	var lang;
	for (var property in data) {
    if (data.hasOwnProperty(property)) {
    	// check if object with such tag already exists
    	var filesLangItem = findfilesLangItemByTag(property);
    	if (filesLangItem) {
    		// update filesLangItem values
    		for (lang in filesLangs) {
    			// check if object has value for this lang
    			if (!filesLangItem.values[currentLang]) {
    				// if it doesn't than add it
    				// check if this is current lang
    				if (filesLangs[lang] === currentLang) {
    					// add value if this is current lang
	      			filesLangItem.values[currentLang] = data[property];
	      		} else {
	      			// add empty value if it is not current lang
	      			filesLangItem.values[currentLang] = null;
	      		}
    			}
      	}
    	} else {
    		// add new object
				var newFilesLangItem = new FilesLangItem(property);
      	// todo: make it work for objects within objects
      	newFilesLangItem.values = {};
      	for (lang in filesLangs) {
      		if (filesLangs[lang] === currentLang) {
      			newFilesLangItem.values[currentLang] = data[property];
      		} else {
      			newFilesLangItem.values[currentLang] = null;
      		}
      	}
      	filesLangItemsTable.push(newFilesLangItem);
    	}
    }
	}
	viewRenderLangTags(filesLangs, filesLangItemsTable);
}
function filesSaveData(lang, data) {
	var path = './testFolder';
	fs.writeFile(path + '/' + lang + '.json', JSON.stringify(data), function (error) {
    if (error) {
      // todo: make a proper error handling
    	console.log('Error!!! Could not save file!');
    	console.log(error);
    }
  });
}
