call ng build --configuration production nmce
set currentDir=%~dp0
cd dist/nmce
call npm publish --access=public
cd %currentDir%
