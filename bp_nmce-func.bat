call ng build --configuration production nmce-func
set currentDir=%~dp0
cd dist/nmce-func
call npm publish
cd %currentDir%
