"""
A high-level reStructuredText publisher for use with Zotero ODF Scan documents
"""

import sys,re,os
try:
    import locale
    locale.setlocale(locale.LC_ALL, '')
except:
    pass

from docutils.core import default_description, Publisher, default_usage
from docutils import io
from tempfile import NamedTemporaryFile

description = ('Generates OpenDocument/OpenOffice/ODF documents from '
               'standalone reStructuredText sources (Zoter ODF Scan support).  ' + default_description)

def zotero_odf_scan_publish_cmdline_to_binary(reader=None, reader_name='standalone',
                    parser=None, parser_name='restructuredtext',
                    writer=None, writer_name='pseudoxml',
                    settings=None, settings_spec=None,
                    settings_overrides=None, config_section=None,
                    enable_exit_status=True, argv=None,
                    usage=default_usage, description=description,
                    destination=None, destination_class=io.BinaryFileOutput
                    ):
    # Tried to get internal conversion working, but using the big hammer is so much simpler.
    ofh = NamedTemporaryFile(mode='w+', delete=False)
    if len(sys.argv) > 1:
        txt = open(sys.argv[1]).read()
        oldtxt = txt
        txt = re.sub("{([^|}]*)\|([^|}]*)\|([^|}]*)\|([^|}]*)\|([^|}]*)}", "{\\1\\|\\2\\|\\3\\|\\4\\|\\5}", txt,re.S|re.M)
        ofh.write(txt)
        sys.argv[1] = ofh.name
        ofh.close()
    
    pub = Publisher(reader=reader, parser=parser, writer=writer, settings=settings,
                    destination_class=destination_class)
    output = pub.publish(
        argv, usage, description, settings_spec, settings_overrides,
        config_section=config_section, enable_exit_status=enable_exit_status)
    # See above.
    os.unlink(ofh.name)

