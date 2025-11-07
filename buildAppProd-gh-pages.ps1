Set-Location $PSScriptRoot
$prod="nmce"
ng build demoapp --configuration=production --output-path="./appdist/$prod/" --base-href=/$prod/
copy-item ./OnBoardingIndex.html -Destination "./appdist/$prod/browser/index.html"
Write-Output "done $(Get-Date)"