Set-Location $PSScriptRoot
ng build --configuration production nmce
Set-Location dist/nmce
npm publish --access=public
Set-Location $PSScriptRoot
