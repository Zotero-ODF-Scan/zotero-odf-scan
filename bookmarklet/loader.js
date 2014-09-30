/*
  Loads and executes javascript from a given URL. The javascript, on load, must
  create a global object indicated as a string argument to BookmarkletLoader.run
  The object must contain a `run` method that is executed when the bookmarklet
  is clicked.

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

if (typeof BookmarkletLoader == 'undefined') {
	BookmarkletLoader = new function() {
		this.loading = {};
		
		this.run = function(bookmarklet, url) {
			if (this.loading[bookmarklet]) {
				// Still loading, will run when ready
				return;
			}
			
			if (window[bookmarklet]) {
				// Loaded, run it
				window[bookmarklet].run();
				return;
			}
			
			var self = this;
			var script = document.createElement('script');
			script.src = url;
			script.addEventListener('load', function() {
				delete self.loading[bookmarklet];
				window[bookmarklet].run();
			});
			this.loading[bookmarklet] = true;
			document.body.appendChild(script);
		};
	}
}

BookmarkletLoader.run(
	'ZoteroRtfOdfScan',
	// Use protocol-relative URL
	'//zotero-odf-scan.github.io/zotero-odf-scan/bookmarklet/bookmarklet.js'
);