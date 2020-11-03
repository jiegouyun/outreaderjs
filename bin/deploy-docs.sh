#!/usr/bin/env bash

# make sure throw error
set -e

# build static files
yarn run build:docs

# build files folder
cd docs/.vuepress/dist

# add customized domain
# echo 'outreader.com' > CNAME


if [[ ${GIHUB_TOKEN} ]]; then
  # for Github actions
  remote_repo="https://${GITHUB_ACTOR}:${GIHUB_TOKEN}@github.com/an-lee/outreader.com.git" && \
  git init && \
  git config user.name "${GITHUB_ACTOR}" && \
  git config user.email "${GITHUB_ACTOR}@users.noreply.github.com" && \
  git add . && \
  git commit -m "vuepress build from Action ${GITHUB_SHA}" && \
  git show-ref && \
  git push --force $remote_repo master:master
else
  # for local deploy
  git init
  git add -A
  git commit -m 'vuepress build from local'
  git push -f git@github.com:an-lee/outreader.com.git master:master
fi

rm -fr .git
cd -
