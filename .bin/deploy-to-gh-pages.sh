#!/bin/bash

# ------------------------------

readonly COLOR_RED=31
readonly COLOR_GREEN=32
readonly COLOR_YELLOW=33
readonly COLOR_BLUE=34

function cecho {
    color=$1

    shift
    echo -e "\033[${color}m$@\033[m"
}

function start_message {
    message=$1

    cecho $COLOR_YELLOW "start ${message}"
}

function success_message {
    message=$1

    cecho $COLOR_GREEN "success ${message}"
}

# ------------------------------

function init {
    repo=$1
    target_dir=$2
    message='init'

    start_message "${message}"

    # build directory doesn't exist?
    if [ ! -d "$target_dir" ]; then
        mkdir $target_dir
    fi

    if [ ! -d $target_dir/.git ]; then
        rm -rf $target_dir
        git clone --quiet $repo $target_dir
    fi

    success_message "${message}"
}

function sync {
    target_branch=$1
    message="sync remote repository"

    start_message "${message}"

    git checkout --orphan $target_branch
    git fetch origin
    git reset --hard origin/$target_branch

    success_message "${message}"
}

function clean {
    target_dir=$1
    message="clean ${target_dir}"

    start_message "${message}"

    rm -rf $target_dir/*.*

    success_message "${message}"
}

function build {
    base_dir=$1
    output_dir=$2
    message="build project"

    start_message "${message}"

    npm run release
    cp -r $base_dir/dist/* $output_dir

    success_message "${message}"
}

function pushToBranch {
    repo=$1
    branch=$2
    message="push to ${branch} in ${repo}"

    start_message "${message}"

    sha1=`git rev-parse $(git log --oneline -n 1 . | awk '{{print $1}}')`
    git add -A
    git commit -m "[ci skip] Update with ${sha1}"
    git push --quiet $repo $branch

    success_message "${message}"
}

# ------------------------------

readonly PROJECT_ROOT=`git rev-parse --show-toplevel`
readonly REMOTE_REPOSITORY=`git config --get remote.origin.url`
readonly BUILD_DIR=$PROJECT_ROOT/build
readonly PUBLISH_BRANCH='gh-pages'

repo=`echo $REMOTE_REPOSITORY | sed -e 's/ssh:\/\/git@github\.com\(.*\)/https:\/\/$GH_TOKEN@github\.com\1\.git/'`

cd $PROJECT_ROOT
init $repo $BUILD_DIR
cd $BUILD_DIR
sync $PUBLISH_BRANCH
clean $BUILD_DIR
build $PROJECT_ROOT $BUILD_DIR
pushToBranch $repo $PUBLISH_BRANCH
