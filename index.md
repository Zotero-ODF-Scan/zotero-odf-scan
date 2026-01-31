## Overview

*ODF/DOCX Scan for Zotero* is an add-on for the [Zotero](https://www.zotero.org/) reference manager that lets you insert plain-text citation markers into any document and then convert them into active Zotero citations. This provides Zotero citation support for word processors without a dedicated Zotero plugin, such as [Scrivener](https://www.literatureandlatte.com/scrivener/overview).

The add-on supports two citation marker formats:

- **Scannable Cite** — drag-and-drop markers from the Zotero client
- **Pandoc citations** — `[@citekey]` syntax using Zotero's [Citation Key](https://www.zotero.org/support/kb/citation_keys) field

Both ODF (.odt) and DOCX (.docx) files are supported. ODF conversion requires [LibreOffice](https://www.libreoffice.org/) and the Zotero LibreOffice plugin, DOCX conversion requires Microsoft Word the Zotero Word plugin.

## Installation

[Download the latest release](https://github.com/Juris-M/zotero-odf-scan-plugin/releases/latest) (.xpi file). In Zotero, go to Tools &rarr; Plugins, click the gear icon, and select "Install Plugin From File...".

The add-on installs the *Scannable Cite* export translator and adds an *ODF Scan* option under Zotero's Tools menu.

## Scannable Cite markers

### Inserting markers

Set the "Default Output Format" to "Scannable Cite" in the Export tab of the [Zotero Preferences](https://www.zotero.org/support/preferences). You can then insert markers by:

- Dragging items from your Zotero library onto your document
- Selecting items and pressing Ctrl+Alt+C (Cmd+Shift+C on macOS) to copy, then pasting

### Marker format

A marker has five pipe-separated fields:

```
{See | Smith, (2012) |p. 45 | for an example |zu:2433:WQVBH98K}
```

| Field | Content |
|-------|---------|
| 1 | Prefix (e.g. "See") |
| 2 | Readable cite (author, year) — for display only |
| 3 | Locator (e.g. "p. 45", "ch. 3") |
| 4 | Suffix (e.g. "for an example") |
| 5 | Item URI — **do not modify** |

With APA style, the above would render as: *(See Smith, 2012, p. 45 for an example)*

### Formatting prefixes and suffixes

Use `*asterisks*` for *italics* and `**double asterisks**` for **bold**.

### Suppress author

Put a minus sign before the author in the second field to suppress the author name in the rendered citation:

```
{ |-Smith, (2012) | | |zu:2433:WQVBH98K}
```

This lets you write "Smith (2012)" where "Smith" is typed by hand and "(2012)" is the Zotero citation.

### Locators

A space is required between the label and number (e.g. "ch. 6" not "ch.6"). Recognized labels:

| Locator | Label(s) |
|---------|----------|
| page | "p." or "pp." |
| chapter | "ch." or "Ch." |
| section | "sec." |
| volume | "vol." |
| figure | "fig." |
| article | "art." |
| column | "col." |
| line | "l." |
| note | "n." |
| issue | "no." |
| opus | "op." |
| paragraph | "para." |
| part | "pt." |
| rule | "r." |
| verse | "vrs." |

### Multiple item citations

Adjacent markers are merged into a single Zotero citation (e.g. "(Smith 1776, 1791)"). Zotero automatically produces adjacent markers when you create markers from multiple items at once.

## Pandoc citations

The add-on can also convert [pandoc-style citations](https://pandoc.org/chunkedhtml-demo/8.20-citation-syntax.html) to and from Zotero citations. Pandoc citations use the `[@citekey]` syntax, where the citekey corresponds to the item's [Citation Key](https://www.zotero.org/support/kb/citation_keys) field in Zotero.

To use pandoc citations, select one of the pandoc conversion directions in the plugin dialog.

## Converting your document

1. Save your document as .odt (OpenDocument) or .docx (Word)
2. In Zotero, open Tools &rarr; ODF Scan
3. Select the conversion direction
4. Choose your input file and output destination
5. Click "Process Document"

For ODF files, open the converted document in LibreOffice, click "Set Document Preferences" in the Zotero toolbar, choose a citation style, and Zotero will format all citations. Use "Insert Bibliography" to add a bibliography.

### Reverse conversion

The add-on can also convert active Zotero citations back to markers or pandoc syntax. This is useful if you want to switch from LibreOffice or Word to a different editor.

## Support

Report issues on the [GitHub issue tracker](https://github.com/Juris-M/zotero-odf-scan-plugin/issues) or ask questions in the [Zotero forums](https://forums.zotero.org/).
