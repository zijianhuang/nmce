call ng build --configuration production nmce-pipes
set currentDir=%~dp0
cd dist/nmce-pipes
call npm publish
cd %currentDir%
