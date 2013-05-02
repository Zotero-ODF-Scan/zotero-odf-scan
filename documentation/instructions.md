#RTF/ODF-Scan for Zotero#

##Purpose##
RTF/ODF-Scan for Zoter is an add-on for the Zotero reference manager software that allows users to insert citations markers into any document saved as .odt (e.g. by software such as google docs or Scrivener) and then convert those into active Zotero citations. It requires LibreOffice and the Zotero LibreOffice plugin.

##Install##

**RTF/ODF-Scan for Zotero is currently only available for Firefox, not for Zotero Standalone**

Install the software from [here](rtf-odf-scan-for-zotero.xpi). Click "Allow" and then "Install" when prompted. Installation will add a "Scannable Cite" export translator to Zotero and change the "RTF Scan" option to "RTF/ODF Scan".

##Inserting Citations##
First, set the "Default Output Format" to "Scannable Cite" in the Export tab of the [Zotero Preferences](http://www.zotero.org/support/preferences). You can now insert citations by either draging&dropping items or by using ctrl+alt+c (cmd+shift+c on Mac) to copy them to your clipboard and the paste them using ctrl/cmd+v or the right-click context menu.
A citation will look like this

{ | Smith, The Wealth of Nations, (2012) | | |zotero://select/items/0_WQVBH98K}

It is separated into five sections by vertical lines. The first section can contain a prefix of the citation. The second section contains author, title, and year of the cited item. The third section can contain a locator such as a page number, the fourth section can contain a suffix for the citation, and the fifth section contains a unique identifier of the item via a zotero://select link (if you paste that link into Firefox's URL bar and hit return, Zotero will open with the item selected). 
Let's look at this with an example. This marker 

{ See | Smith, The Wealth of Nations, (2012) | p. 45 | for an example |zotero://select/items/0_WQVBH98K}

would turn into

(See Smith, 2012, p. 45 for an example) when APA is selected as a citation style (see below).

###Affix Mark-up###
Text in prefixes and suffixes can be formatted in italics or bold using simple mark-up language: To print something in *italics* put a single asterisk (\*) on either side (e.g. \*Weltanschauung\*), to print something bold use two asterisks (e.g. \*\*strongly\*\*)

###Suppress Author###
To suppress the author &emdash; most typically in the case of a parenthetical citation that is preceded by the author name in the text &emdash; put a minus sign (-) in front of the author as in:  

{ | -Smith, The Wealth of Nations, (2012) | | |zotero://select/items/0_WQVBH98K}

###Locators###
This is a list of locators and the labels RTF/ODF-scan will recognize for them. Note that a space is *required* between locator label and number, i.e. "ch. 6" **not** "ch.6". The actual labels printed in your citations depend on your citation style and locale in Zotero.

article: "art."\
chapter: "ch." or "Ch."\
subchapter: "subch."\
column: "col."\
figure: "fig."\
line: "l."\
note: "n."\
issue: "no."\
opus: "op."\
page: "p." or "pp."\
paragraph: "para."\
subparagraph: "subpara."\
part: "pt."\
rule: "r."\
section: "sec."\
subsection: "subsec."\
Section: "Sec."\
sub verbo: "sv."\
schedule: "sch."\
title: "tit."\
verse: "vrs."\
volume: "vol."\


##Saving and Converting your Document##

Once you are done writing and inserting citations, save your document as .odt (Open Document Format-ODF). This is an option in Google Docs and Scrivener among others. If your word processing software does not support .odt, you can save the document as .doc or .rtf, open it in LibreOffice and save it as .odt, though this may lead to some losses in formatting.
Then, in Zotero, click on RTF/ODF Scan in the gears/action menu. Select "ODF (to citations)" as file type and select your saved file as the input and your desired output file.
Click "Next" and the plugin will convert your document.

##Setting a Citation Style##
Now open the converted document &emdash; by default it will have (citation) in its file name &emdash; in LibreOffice. You will need the [Zotero LibreOffice plugin](http://www.zotero.org/support/word_processor_plugin_installation#libreoffice_openofficeorg_neooffice) installed. In Zotero's LibreOffice plugin toolbar, click on "Set Document Preferences" and choose the citation style. Click OK and Zotero will format all references in your document. If you want a bibliography, move the cursor to the location where it should be inserted and click "Insert Bibliography." The citations in the Libre Office document are "live" &emdash; they will update to changes in your Zotero database and, if you want to, you can change citation styles or add items to your document as if it had been authored using the LibreOffice plugin all along.

##Reverse Conversion##
RTF/ODF Scan can also take an existing ODF document with Zotero citations inserted by the LibreOffice plugin and convert citations to markers. This could be useful if you started writing in LibreOffice but want to switch to a word processor without a dedicated Zotero plugin. For this option, select ODF (to markers) as File type in the conversion dialog. **Note that this feature is currently experimental and still has some known bugs**



