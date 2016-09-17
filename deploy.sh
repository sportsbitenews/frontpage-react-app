#!/bin/bash

# remove references to PostUpvoter from PostList
sed -i '' /PostUpvoter/d src/PostList.js
sed -i '' s/operation/query/ package.json
npm run build
(cd build;
aws s3 sync . s3://dev.apollodata.com/frontpage-react-app-query --acl public-read)

# clean up
git reset --hard
sed -i '' s/operation/mutation/ package.json
npm run build
(cd build;
aws s3 sync . s3://dev.apollodata.com/frontpage-react-app-mutation --acl public-read)

git reset --hard
