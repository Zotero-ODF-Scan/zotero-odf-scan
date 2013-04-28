Zotero.scannableciteTranslator = {

	init: function () {
		if (!Zotero.Translators.get("248bebf1-46ab-4067-9f93-ec3d2960d0cd")){
			Zotero.debug("Scannable Cite Translator not found. Setting Pref to false");
			Zotero.Prefs.set("odfScan.installedTranslator", false);
		}
		if (!Zotero.Prefs.get("odfScan.installedTranslator")) {
			Zotero.debug("Installing Scannable Cite Translator");

			var metadata = {
				"translatorID": "248bebf1-46ab-4067-9f93-ec3d2960d0cd",
				"label": "Scannable Cite",
				"creator": "Frank Bennett, Sebastian Karcher",
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


			var code = "var LEGAL_TYPES = [\'patent\',\'case\',\'statute\',\'bill\',\'treaty\',\'regulation\',\'gazette\'];\r\nvar Mem = function () {\r\n    var isLegal = false;\r\n\tvar lst = [];\r\n    this.init = function (item) { lst = []; isLegal = (LEGAL_TYPES.indexOf(item.itemType)>-1)};\r\n\tthis.set = function (str, punc, slug) { if (!punc) {punc=\'\'}; if (str) {lst.push((str + punc))} else if (!isLegal) {lst.push(slug)}};\r\n\tthis.setlaw = function (str, punc) { if (!punc) {punc=\'\'}; if (str && isLegal) {lst.push(str + punc)}};\r\n\tthis.get = function () { return lst.join(\' \') };\r\n}\r\nvar mem = new Mem();\r\nvar memdate = new Mem();\r\n\r\nfunction doExport() {\r\n    var item;\r\n    while (item = Zotero.nextItem()) {\r\n        mem.init(item);\r\n        Zotero.write(\'{ |\');\r\n        var library_id = item.LibraryID ? item.LibraryID : 0;\r\n\t\tif (item.creators.length >0){\r\n  \t\t\tmem.set(item.creators[0].lastName,\',\');\r\n        \tif (item.creators.length > 2) mem.set(\'et al.\', \',\');\r\n        \telse if (item.creators.length == 2) mem.set(\'&amp; \' + item.creators[1].lastName, \',\');\r\n\t\t}\r\n        else {\r\n\t\t\tmem.set(false, \',\',\'anon.\');\r\n        }\r\n\t\tmem.set(item.title,\',\',\'(no title)\');\r\n        mem.setlaw(item.authority, \',\');\r\n        mem.setlaw(item.volume);\r\n        mem.setlaw(item.reporter);\r\n        mem.setlaw(item.pages);\r\n        memdate.setlaw(item.court,\',\');\r\n\t    var date = Zotero.Utilities.strToDate(item.date);\r\n        var dateS = (date.year) ? date.year : item.date;\r\n        memdate.set(dateS,\'\',\'no date\');\r\n        Zotero.write(\' \' + mem.get() + \' (\' + memdate.get() + \') | | |\');\r\n        Zotero.write(\'zotero:\/\/select\/items\/\' + library_id + \'_\' + item.key + \'}\');\r\n    }\r\n}"

			Zotero.Translators.save(metadata, code);
			Zotero.Translators.init();
			Zotero.Prefs.set("odfScan.installedTranslator", true);
		}
	}
}

// Initialize the utility
window.addEventListener('load', function (e) {
	Zotero.scannableciteTranslator.init();
}, false);

