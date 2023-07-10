#!/bin/bash

pwd

if [[ ${Environment} == prod2 ]]; then
    x=$(awk -F'[ .]' '/"version"/ {print $7*1}' projects/instnt-angular-sdk/package.json)
    sed -i "s/-beta.${x}//g" projects/instnt-angular-sdk/package.json
fi

a=$(grep @instnt/instnt-angular-sdk package.json)
echo ${a}
b=$(echo ${a} | awk '{print $1 }')
echo ${b}
c=$(awk '/"version"/ {print $2}'  projects/instnt-angular-sdk/package.json)
echo ${c}

sed -i "s+${a}+    ${b} ${c}+" package.json

cat package.json

npm run build
echo "Build completed on `date`"
pwd

cat projects/instnt-angular-sdk/src/lib/version.ts

cp .npmrc dist/instnt-angular-sdk

cd dist/instnt-angular-sdk

ls

if [[ ${Environment} == dev2 ]]; then
    echo "Publishing to NPM with beta tag"
    npm publish --tag beta
    echo "successfully published"
fi

if [[ ${Environment} == prod2 ]]; then
    echo "Publishing to NPM"
    npm publish
    echo "successfully published"
fi



