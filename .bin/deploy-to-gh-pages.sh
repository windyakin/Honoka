#!/bin/bash

readonly REPOSITORY="https://$GH_TOKEN@github.com/kubosho/Nico.git"
readonly PROJECT_ROOT=`git rev-parse --show-toplevel`
readonly BUILD_DIR=$PROJECT_ROOT/build
readonly PUBLISH_BRANCH='gh-pages'

function init {
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

function clean {
    rm -rf $BUILD_DIR/*.*
}

function build {
    npm run release
    cp -r $PROJECT_ROOT/dist/* $BUILD_DIR
}

function push_to_branch {
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
push_to_branch $PUBLISH_BRANCH
