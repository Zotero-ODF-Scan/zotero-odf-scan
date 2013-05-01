#!/bin/bash

find . -name '*~' -exec rm {} \;

find . -name '*.sh' -prune -o \
       -name '*.tmpl' -prune -o \
       -name 'rtf-odf-scan-for-zotero.*' -prune -o \
       -name '*~' -prune -o \
       -wholename './about.xul' -prune -o \
       -print0 | xargs -0 zip rtf-odf-scan-for-zotero.xpi
