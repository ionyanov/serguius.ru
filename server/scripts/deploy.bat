@echo off
echo %TIME% SET VARIABLE
set gitRepo=https://github.com/ionyanov/serguius.ru.git
set workDir=C:\Users\USER1\WebstormProjects\serguius.ru
set destDir=C:\Users\USER1\WebstormProjects\serguius.ru\tmp
set srcDir=C:\Users\USER1\WebstormProjects\serguius.ru\src
set imgDir=C:\Users\USER1\WebstormProjects\serguius.ru\client\public\images


echo %TIME% CREATE TEMP DIR
for /f "tokens=2 delims==" %%a in ('wmic OS Get localdatetime /value') do set "dt=%%a"
set "YY=%dt:~2,2%" & set "YYYY=%dt:~0,4%" & set "MM=%dt:~4,2%" & set "DD=%dt:~6,2%"
set "HH=%dt:~8,2%" & set "Min=%dt:~10,2%" & set "Sec=%dt:~12,2%"
set "dir=%workDir%%YYYY%%MM%%DD%%HH%%Min%%Sec%"

echo Dir=%dir%
if not exist %dir% mkdir %dir%

echo %TIME% GIT PULL
git clone %gitRepo% %dir%
cd %dir%\frontend

echo %TIME% copy .env
xcopy /e %srcDir% %dir%\frontend

echo %TIME% npm INSTALL
npm i

echo %TIME% npm BUILD
npm run build

echo %TIME% copy build
xcopy /s %dir%\frontend\build %destDir% 

echo %TIME% copy Image
xcopy /s %imgDir% %destDir%\images 

echo %TIME% Delete dir
cd %workDir%
rmdir /S /Q %dir%

echo %TIME% Job done