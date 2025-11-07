Set-Location $PSScriptRoot
ng build demoapp --configuration=production
copy-item ./OnBoardingIndex.html -Destination './appdist/prod/browser/index.html'
Write-Output "done $(Get-Date)"