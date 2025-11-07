Set-Location $PSScriptRoot
ng build demoapp --configuration=development
Write-Output "done $(Get-Date)"