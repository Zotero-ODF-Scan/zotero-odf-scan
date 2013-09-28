#!/usr/bin/python

# $Id: rst2odt.py 5839 2009-01-07 19:09:28Z dkuhlman $
# Author: Dave Kuhlman <dkuhlman@rexx.com>
# Copyright: This module has been placed in the public domain.

"""
A front end to the Docutils Publisher, producing OpenOffice documents.
"""

try:
    import locale
    locale.setlocale(locale.LC_ALL, '')
except:
    pass

from docutils.core import default_description, default_usage
from docutils.writers.odf_odt import Writer, Reader, ODFTranslator, SubElement
from docutils.parsers.rst import Parser
from zoteroODFScan import zotero_odf_scan_publish_cmdline_to_binary

writer = Writer()
reader = Reader()
parser = Parser()

zotero_odf_scan_publish_cmdline_to_binary(reader=reader, parser=parser, writer=writer)
