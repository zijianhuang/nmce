# Better build the app outside the default dist. Otherwise, the build of the app will clean all sub folders of dist.
Set-Location $PSScriptRoot
ng build demoapp --configuration=development
Write-Output "done $(Get-Date)"