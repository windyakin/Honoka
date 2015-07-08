#!/bin/bash

readonly REPOSITORY=`git config --get remote.origin.url`
readonly PROJECT_ROOT=`git rev-parse --show-toplevel`
readonly BUILD_DIR=$PROJECT_ROOT/build
readonly PUBLISH_BRANCH='gh-pages'

init() {
    # build directory doesn't exist?
    if [ ! -d "$BUILD_DIR" ]; then
        mkdir $BUILD_DIR
    fi

    cd $PROJECT_ROOT

    if [ ! -d $BUILD_DIR/.git ]; then
        rm -rf $BUILD_DIR
        git clone --quiet $1 $BUILD_DIR
    fi

    cd $BUILD_DIR
    git checkout --orphan $2
    git fetch origin
    git reset --hard origin/$PUBLISH_BRANCH
}

clean() {
    rm -rf $BUILD_DIR/*.*
    rm -rf $BUILD_DIR/external
}

build() {
    npm run release
    cp $PROJECT_ROOT/src/*.* $BUILD_DIR
    cp -r $PROJECT_ROOT/dist/* $BUILD_DIR
}

pushToBranch() {
    cd $PROJECT_ROOT
    sha1=`git rev-parse $(git log --oneline -n 1 . | awk '{{print $1}}')`
    cd $BUILD_DIR
    git add -A
    git commit -m "[ci skip] Update with ${sha1}"
    git push --quiet $REPOSITORY $PUBLISH_BRANCH
}

init $REPOSITORY $PUBLISH_BRANCH
clean
build
pushToBranch $PUBLISH_BRANCH
