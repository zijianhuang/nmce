#Run prod build with dotnet hosting
Set-Location $PSScriptRoot
dotnet-serve -d appdist/dev/browser -p 7200
