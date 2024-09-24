Set-Location $PSScriptRoot
ng build --configuration production nmce-func
Set-Location dist/nmce-func
npm publish
Set-Location $PSScriptRoot
