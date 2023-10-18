@echo off
echo $(date +"%T") SET VARIABLE
gitRepo=https://github.com/ionyanov/serguius.ru.git
workDir=$1
destDir=$2\tmp
srcDir=$1\src
imgDir=$2

echo $(date +"%T") CREATE TEMP DIR
dir=$workDir$(date +%Y%m%d%H%M%S) 

echo Dir=$dir
mkdir -p $dir

echo $(date +"%T") GIT PULL
git clone $gitRepo $dir
cd $dir\frontend

echo $(date +"%T") copy .env
cp $srcDir/.env* $dir/frontend

echo $(date +"%T") npm INSTALL
npm i

echo $(date +"%T") npm BUILD
npm run build

echo $(date +"%T") copy build
cp -R $dir/frontend/build $destDir/frontend

echo $(date +"%T") copy Image
cp -R $imgDir $destDir/frontend

echo $(date +"%T") Delete TEMP DIR
cd $workDir
rm -rf $dir

echo $(date +"%T") restart Passanger 
mkdir dist/tmp
touch dist/tmp/restart.txt

echo $(date +"%T") Job done