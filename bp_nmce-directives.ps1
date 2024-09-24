Set-Location $PSScriptRoot
ng build --configuration production nmce-directives
Set-Location dist/nmce-directives
npm publish
Set-Location $PSScriptRoot
