Set-Location $PSScriptRoot
ng build --configuration production theme-loader-api
Set-Location dist/theme-loader-api
npm publish
Set-Location $PSScriptRoot
