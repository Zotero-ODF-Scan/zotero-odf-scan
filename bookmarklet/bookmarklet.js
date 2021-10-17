/*
  This bookmarklet is intended for use on zotero.org personal and group library
  pages. It will create an RTF/ODF citation markers for selected or currently
  visible items. Use a bookmarklet loader to load the script.

  ***** BEGIN LICENSE BLOCK *****
  
  Copyright © 2014 Aurimas Vinckevicius
  
  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program.  If not, see <http://www.gnu.org/licenses/>.
  
  ***** END LICENSE BLOCK *****
*/

// This will become a global object
var ZoteroRtfOdfScan = new function() {
	this.alert = function(msg) {
		// TODO: use Zotero UI
		window.alert(msg);
	};
	
	this.produceODFMarker = function(items) {
		var str = '';
		for (var i=0; i<items.length; i++) {
			str += '{ |' + this.generateCitation(this.lib[items[i]]) + '| | |z'
				+ this.libPrefix + ':' + this.libraryID + ':' + items[i] + '}';
		}
		
		// TODO: use Zotero UI
		window.prompt("Copy to clipboard\n", str);
	};
		
	this.generateCitation = function(item) {
		if (!item) return '';
		
		var str = item.creatorSummary;
		if (!str && item.title) {
			var title = item.title;
			// Trim off last incomplete word up to 50 chars
			var maxLength = 30;
			if (title.length > maxLength){
				title = title.substr(0, maxLength + 1); // to include a space
				if (title.lastIndexOf(' ') != -1) {
					title = title.substr(0, title.lastIndexOf(' '));
				}
				title += '...';
			}
			str = '"' + title + '"';
		}
		
		if (!str) {
			return '';
		}
		
		if (item.year) {
			str += ', ' + item.year;
		}
		
		return str;
	};
	
	this.run = function() {
		// Make sure we're on a supported page
		try {
			var lib = Zotero.ui.getAssociatedLibrary();
		} catch (e) {
			this.alert("This bookmarklet only works on library pages on zotero.org");
			return;
		}
		
		// From here on out it should be safe to use Zotero's web library API 
		
		this.libraryID = lib.libraryID;
		this.libPrefix = lib.libraryType == 'group' ? 'g' : 'u';
		this.lib = lib.items.itemObjects;
		
		var selectedItems = Zotero.ui.getSelectedItemKeys();
		if (!selectedItems.length) {
			this.alert("First select some items.");
			return;
		}
		
		this.produceODFMarker(selectedItems);
	};
};
