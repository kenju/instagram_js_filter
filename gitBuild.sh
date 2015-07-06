#!/bin/sh
git add -A
read -p "Commit Message: " commitMessage
git commit -m "$commitMessage"
git push
git checkout gh-pages
git rebase master
git push origin gh-pages
git checkout master