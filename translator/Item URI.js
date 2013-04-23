{
"translatorID":"064ef4ee-61b8-4bb4-ba16-5501d09aed0c",
"translatorType":2,
"label":"Item URI",
"creator":"Sebastian Karcher",
"target":"html",
"minVersion":"2.0",
"maxVersion":"",
"priority":200,
"inRepository":false,
"lastUpdated":"2012-07-17 22:27:00"
}
 
function doExport() {
	var item;
	while(item = Zotero.nextItem()) {Zotero.write(item.uri + "\n");}
}
