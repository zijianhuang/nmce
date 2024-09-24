Set-Location $PSScriptRoot
ng build --configuration production nmce-pipes
Set-Location dist/nmce-pipes
npm publish
Set-Location $PSScriptRoot
