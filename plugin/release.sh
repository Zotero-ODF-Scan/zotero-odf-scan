#!/bin/bash

set -e

# Go through the release steps for rtf-odf-scan-for-zotero

### Define a cleanup function and lay a trap
function cleanup () {
  trap "" ERR
  trap "" EXIT
  trap "" SIGINT
  reset -I
  rm -f update.rdf
  rm -f about.xul

  #hg revert chrome/content/about.xul
  exit 0
}
trap cleanup SIGINT
trap cleanup ERR
### Allow for non-destructive exit
function finish () {
  trap "" ERR
  trap "" EXIT
  trap "" SIGINT
  reset -I
  rm -f update.rdf
  rm -f about.xul
  exit 0
}
trap finish EXIT

### Define a function to ask if ok to proceed
function askifok () {
  if [ "$1" == "" ]; then
    echo "Okay to proceed? "
  else
    echo "$1"
  fi
  ans="continue"
  while [ "$ans" == "continue" ]; do
    read -n 1 -s ans
    case $ans in
    y|Y) 
      ans="break"
    ;;
    n|N)
	  echo "Okay. Aborting."
      exit 0
    ;;
    *)
      ans="continue"
    ;;
    esac
  done
}


### Define a function to use vars with line endings
function showlines () {
  OLDIFS=${IFS}
  IFS=" "
  $1
  IFS=${OLDIFS}
}

### Visit the release directory
cd $(dirname $0)
### Check for changes not yet checked in
set +e
trap "" ERR
CHANGE_COUNT=$(git status | grep -c 'Changes not staged for commit')
trap cleanup ERR
set -e
if [ "${CHANGE_COUNT}" != "0" ]; then
	echo "Warning: Found some UNCOMMITTED changes."
else
    ALL_CHECKED_IN="1"
fi

### Copy the template files into place
cp install.tmpl install.rdf
cp update.tmpl update.rdf
cp updateInfo.tmpl updateInfo.xhtml
cp about.tmpl about.xul

### Edit the description

### Get the current revision number
REVISION=$(cat version_count.txt)

if [ "${ALL_CHECKED_IN}" == "1" ]; then
  ## Get a formatted list of changes since the last update
  RAWCOMMENTS=$(git log "@{1 week ago}..HEAD")
  OLDIFS=$IFS
  IFS=" "
  
  COMMENTS=$(echo ${RAWCOMMENTS} | sed -e '/^[^ D]/d;/^D/s/\(.*\)/\\<\/li\\>\\<li\\>\\<b\\>\1\\<\/b\\>\\<\/br\\>/' | sed -e '1,1s/^.......//' | sed -e 's/[[:space:]]/\\ /g' | sed -e 's/$/\\/')
  IFS=$OLDIFS

  ## Show the changes
  showlines "echo ${RAWCOMMENTS}"
fi

askifok


### Write formatted comments into updateInfo file
OLDIFS=$IFS
IFS=" "
sed -si "/##CHANGES##/{i $COMMENTS

;d;}" updateInfo.xhtml
IFS=$OLDIFS

### Write release number into install, update, and updateInfo
sed -si "s/##REVISION##/$REVISION/g" install.rdf
sed -si "s/##REVISION##/$REVISION/g" update.rdf
sed -si "s/##REVISION##/$REVISION/g" updateInfo.xhtml
sed -si "s/##REVISION##/$REVISION/g" about.xul
mv about.xul chrome/content/about.xul

### Build the xpi
echo -n "Building rtf-odf-scan-for-zotero.xpi ... "
. ./build.sh
echo done

if [ "${ALL_CHECKED_IN}" == "1" ]; then
  ### Pause to avoid screwing up on the SHA1
  sleep 1
  ### Get the SHA1 hash of the xpi
  SHA1=$(openssl sha1 rtf-odf-scan-for-zotero.xpi | sed -e 's/.*=[[:space:]]*\([^ ]\+\).*/\1/')
  echo "SHA1 checksum: ${SHA1}"

  ### Write the hash value into update
  sed -si "s/##SHA1HASH##/${SHA1}/g" update.rdf

  ### Run McCoy to set the key in install and sign the update
  /home/bennett/src/mccoy/mccoy /home/bennett/src/rtf-odf-scan-for-zotero/

  askifok "Upload newly built xpi?"
else
  echo "Some changes were not checked in, not uploading finished xpi"
  exit 0
fi

### Send the new xpi to the distro site
cp update.rdf rtf-odf-scan-for-zotero.rdf
cp updateInfo.xhtml rtf-odf-scan-for-zotero.xhtml
zip rtf-odf-scan-for-zotero.zip rtf-odf-scan-for-zotero.*
mv rtf-odf-scan-for-zotero.zip ..
rm -f rtf-odf-scan-for-zotero.*
rm -f install.bak  update.bak  updateInfo.xhtml  update.rdf
rm -f rtf-odf-scan-for-zotero.zip
git commit -m "Pre-release update" -a
cd ..
git push
git checkout gh-pages
unzip rtf-odf-scan-for-zotero.zip
git commit -m "Install release files in gh-pages" -a
git push

$(REVISION++)

echo $REVISION > version_count.txt

echo Done
