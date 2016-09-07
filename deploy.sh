#!/bin/bash

# remove references to PostUpvoter from PostList
sed -i '' /PostUpvoter/d src/PostList.js
sed -i '' s/stepX/step1/ package.json
npm run build
cd build;
aws s3 sync . s3://dev.apollodata.com/frontpage-react-app-step1 --acl public-read

# clean up
git reset --hard
sed -i '' s/stepX/step2/ package.json
npm run build
aws s3 sync . s3://dev.apollodata.com/frontpage-react-app-step2 --acl public-read

git reset --hard
