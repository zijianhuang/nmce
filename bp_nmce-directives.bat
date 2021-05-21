call ng build --configuration production nmce-directives
set currentDir=%~dp0
cd dist/nmce-directives
call npm publish
cd %currentDir%
