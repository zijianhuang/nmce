Set-Location $PSScriptRoot
ng build --configuration production nmce-json-diff
Set-Location dist/nmce-json-diff
npm publish
Set-Location $PSScriptRoot
