{
	"translatorID": "248bebf1-46ab-4067-9f93-ec3d2960d0cd",
	"label": "Scannable Cite",
	"creator": "Scott Campbell, Avram Lyon, Nathan Schneider, Sebastian Karcher",
	"target": "html",
	"minVersion": "3.0",
	"maxVersion": "",
	"priority": 100,
	"displayOptions": {
		"exportCharset": "UTF-8"
	},
	"inRepository": true,
	"translatorType": 2,
	"browserSupport": "",
	"lastUpdated": "2013-04-16 11:10:08"
}

function doExport() {
    var item;
    while (item = Zotero.nextItem()) {
    	var isLegalType = legalTypeItem(item);
        Zotero.write("{ |");
        var library_id = item.LibraryID ? item.LibraryID : 0;
	// Ignore empty title on legal types
	var titleS = (item.title) ? item.title : "(no title)";
	// Ignore empty creator on legal types
	if (item.creators.length >0){
  		var creatorsS = item.creators[0].lastName;
        	if (item.creators.length > 2) creatorsS += " et al.";
        	else if (item.creators.length == 2) creatorsS += " &amp; " + item.creators[1].lastName;
	}
	else if (!isLegalType) {
		var creatorsS = "anon."
	}
	// Include authority on legal types
	if (isLegalType) {
		var authorityS
	}
	// Include volume, reporter and page on legal types
	
        var date = Zotero.Utilities.strToDate(item.date);
        var dateS = (date.year) ? date.year : item.date;
        Zotero.write(creatorsS + ", " + titleS + ", " + dateS + "| | |");
        Zotero.write("zotero://select/items/" + library_id + "_" + item.key + "}");
    }
}

function legalTypeItem (item) {
	var legal_types = ["legislation","legal_case","patent","bill","treaty","regulation"];
	return (legal_types.indexOf(item.type) > -1);
}
