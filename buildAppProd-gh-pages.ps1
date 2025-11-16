Set-Location $PSScriptRoot
$prod="nmce"
ng build demoapp --configuration=production --output-path="./appdist/$prod/" --base-href=/$prod/
copy-item ./OnBoardingIndex.html -Destination "./appdist/$prod/browser/index.html"
# GitHub Pages 404 handling
copy-item "../appdist/$prod/browser/en/index.html" "../ngdist/$prod/browser/en/404.html"
Write-Output "done $(Get-Date)"