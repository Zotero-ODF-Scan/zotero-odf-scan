# Zotero ODF Scan support for reStructuredText

The scannable citation forms used with the Zotero ODF Scan plugin use
vertical bar ("pipe") characters. These will ordinarily be interpreted
as substitution markup by the reStructuredText parser. The
`zoteroODFScan.py` module escapes these characters inside scannable
citations, so that they will process without error when generating
an ODF document.

There is no installer for this code at present. To use it, place
the `zoteroODFScan.py` module and the `rst2odfScan.py` script
in the same directory (such as `~/bin`), and use the script for
conversion, instead of `rst2odf.py`.

Frank Bennett
