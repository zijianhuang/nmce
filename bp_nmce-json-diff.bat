call ng build --configuration production nmce-json-diff
set currentDir=%~dp0
cd dist/nmce-json-diff
call npm publish
cd %currentDir%
