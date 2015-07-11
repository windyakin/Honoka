#!/bin/bash

function init {
    repo=$1
    target_dir=$2

    # build directory doesn't exist?
    if [ ! -d "$target_dir" ]; then
        mkdir $target_dir
    fi

    if [ ! -d $target_dir/.git ]; then
        rm -rf $target_dir
        git clone --quiet $repo $target_dir
    fi
}

function sync {
    target_branch=$1

    git checkout --orphan $target_branch
    git fetch origin
    git reset --hard origin/$target_branch
}

function clean {
    target_dir=$1

    rm -rf $target_dir/*.*
}

function build {
    base_dir=$1
    output_dir=$2

    npm run release
    cp -r $base_dir/dist/* $output_dir
}

function commit {
    base_dir=$1
    output_dir=$2

    cd $base_dir

    sha1=`git rev-parse $(git log --oneline -n 1 . | awk '{{print $1}}')`

    cd $output_dir

    git add -A
    git commit -m "[ci skip] Update with ${sha1}"
}

function push_to_ghpages {
    repo=$1
    branch=$2

    git push --quiet $repo $branch
}

# ------------------------------

readonly PROJECT_ROOT=`git rev-parse --show-toplevel`
readonly REMOTE_REPOSITORY=`git config --get remote.origin.url`
readonly BUILD_DIR=$PROJECT_ROOT/build
readonly PUBLISH_BRANCH='gh-pages'

base_repo=`echo $REMOTE_REPOSITORY | sed -e 's/ssh:\/\/git@github\.com\(.*\)/https:\/\/$GH_TOKEN@github\.com\1\.git/'`

if [ `echo $GH_TOKEN` -e '']; then
    repo=$REMOTE_REPOSITORY
else
    repo=$base_repo
fi

cd $PROJECT_ROOT
init $repo $BUILD_DIR
cd $BUILD_DIR
sync $PUBLISH_BRANCH
clean $BUILD_DIR
build $PROJECT_ROOT $BUILD_DIR
commit $PROJECT_ROOT $BUILD_DIR
push_to_ghpages $repo $PUBLISH_BRANCH
