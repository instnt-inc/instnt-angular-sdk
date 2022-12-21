#!/bin/bash

pwd

if [[ ${Environment} == prod2 ]]; then
    x=$(awk -F'[ .]' '/"version"/ {print $7*1}' projects/instnt-angular-sdk/package.json)
    sed -i "s/-beta.${x}//g" projects/instnt-angular-sdk/package.json
fi

npm run build
echo "Build completed on `date`"
pwd

cat projects/instnt-angular-sdk/src/lib/version.ts

cp .npmrc dist/instnt-angular-sdk

cd dist/instnt-angular-sdk

ls

if [[ ${Environment} == dev2 ]]; then
    echo "Publishing to NPM with beta tag"
    npm publish --tag pipeline
    echo "successfully published"
fi

if [[ ${Environment} == prod2 ]]; then
    echo "Publishing to NPM"
    npm publish
    echo "successfully published"
fi


#a=$(awk 'NR==8 {print  }'  examples/forms/package.json)
#echo ${a}
#b=$(awk 'NR==8 {print $1 }'  examples/forms/package.json)
#echo ${b}
#c=$(awk 'NR==3 {print $NF}'  components/package.json)
#echo ${c}

#sed -i "s+${a}+    ${b} ${c}+" examples/forms/package.json

#cat examples/forms/package.json
