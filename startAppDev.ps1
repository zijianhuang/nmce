#Run prod build with dotnet hosting
Set-Location $PSScriptRoot
dotnet-serve -d appdist/development/browser -p 7200
