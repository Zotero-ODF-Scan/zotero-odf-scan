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
	this.produceODFMarker = function(items) {
		var str = '';
		for (var i=0; i<items.length; i++) {
			str += '{|' + this.generateCitation(this.lib[items[i]]) + '|||'
				+ this.libPrefix + ':' + this.libraryID + ':' + items[i] + '}';
		}
		window.prompt("Copy to clipboard: Ctrl/Cmd+C, Enter", str);
	};
		
	this.generateCitation = function(item) {
		if (!item) return '';
		
		var str = '', creators = { authors: [], editors: [] };
		for (var i=0; i<item.creators.length; i++) {
			if (item.creators[i].creatorType == 'author') {
				creators.authors.push(item.creators[i].lastName);
			} else if (item.creators[i].creatorType == 'editor') {
				creators.editors.push(item.creators[i].lastName);
			}
		}
		
		if (creators.authors.length) creators = creators.authors;
		else creators = creators.editors;
		
		if (creators.length) {
			str += creators[0];
			if (creators.length > 2) {
				str += ' et al.';
			} else if (creators.length == 2) {
				str += ' & ' + creators[1]
			}
		} else if (item.title) {
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
			str += '"' + title + '"';
		} else {
			return '';
		}
		
		if (item.year) {
			str += ', ' + item.year;
		}
		
		return str;
	};
	
	this.run = function() {
		var itemsDiv = document.getElementById('library-items-div');
		var config;
		if (!itemsDiv || !(config = itemsDiv.getAttribute('data-loadconfig'))) {
			window.alert("This bookmarklet only works on library pages on zotero.org");
			return;
		}
		
		try { config = JSON.parse(config); }
		catch(e) { window.alert("Could not parse library configuration"); return; }
		
		this.libraryID = config.libraryID;
		this.libPrefix = config.libraryType == "group" ? 'zg' : 'zu';
		
		try {
			this.lib = Zotero.libraries[this.libPrefix.substr(1) + this.libraryID].items.itemObjects;
		} catch(e) {
			this.lib = {};
		}
		
		var itemDetails = document.getElementById('item-details-div');
		if (itemDetails && itemDetails.offsetParent) {
			// Single visible item
			try { var id = itemDetails.getElementsByTagName('table')[0].getAttribute('data-itemkey') }
			catch(e) { window.alert("Error getting item key"); return }
		
			this.produceODFMarker([id]);
		} else {
			// Get selected items
			var items = document.evaluate('//tr[@data-itemkey]', document, null, XPathResult.ANY_TYPE, null);
			var item, selectedItems = [];
			while (item = items.iterateNext()) {
				if (item.getElementsByClassName('itemKey-checkbox')[0].checked) {
					selectedItems.push(item.getAttribute('data-itemkey'));
				}
			}
			
			if (selectedItems.length) {
				this.produceODFMarker(selectedItems);
			} else {
				window.alert("First select some items");
			}
		}
	};
};
