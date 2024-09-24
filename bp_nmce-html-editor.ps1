Set-Location $PSScriptRoot
ng build --configuration production nmce-html-editor
Set-Location dist/nmce-html-editor
npm publish
Set-Location $PSScriptRoot
