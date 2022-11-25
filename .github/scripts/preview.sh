#! /usr/bin/env bash
set -e

# run this script to SYMLINK dir/docs/foo into ../developer-documentation-vitepress/demo/foo
# example: sh ../developer-documentation-vitepress/.github/scripts/preview.sh apps/docs/src frontends
# this only works for DEV preview

# prepare variables
SRC=$PWD"/"$1
DST=$PWD"/demo/"$2
DST=$PWD"/../developer-documentation-vitepress/demo/"$2
DST="../developer-documentation-vitepress/demo/"$2

# delete existent symlink
if [ -L $DST ]; then
  echo "Deleting symlink $DST"
  rm $DST
else
  echo "Symlink $DST does not exist"
fi

#sleep 3

# create a new symlink
echo "Mounting $SRC to $DST"
ln -s ${SRC} ${DST}

# bugfix?
BUG=$DST"/src"
if [ -L $BUG ]; then
  echo "Deleting bugged symlink"
  rm $BUG
fi

# run dev preview
echo "Building parent"
npm run dev --prefix ../developer-documentation-vitepress
