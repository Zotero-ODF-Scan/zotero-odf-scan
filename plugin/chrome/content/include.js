if (!Zotero.scannableciteTranslator) {
const loader = Components.classes["@mozilla.org/moz/jssubscript-loader;1"]
.getService(Components.interfaces.mozIJSSubScriptLoader);
Zotero.debug("testinclude")
loader.loadSubScript("chrome://rtf-odf-scan-for-zotero/content/scannableciteTranslator.js");
}


var Zotero = Components.classes["@zotero.org/Zotero;1"]
				// Currently uses only nsISupports
				//.getService(Components.interfaces.chnmIZoteroService).
				.getService(Components.interfaces.nsISupports)
				.wrappedJSObject;
