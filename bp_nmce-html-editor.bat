call ng build --configuration production nmce-html-editor
set currentDir=%~dp0
cd dist/nmce-html-editor
call npm publish
cd %currentDir%
