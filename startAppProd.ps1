#Run prod build with dotnet hosting
Set-Location $PSScriptRoot
dotnet-serve -d appdist/prod/browser/ -p 7202
