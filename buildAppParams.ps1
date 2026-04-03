
<#
.SYNOPSIS
    Default build script for development. And this can be used for the other build profiles with parameters, and different deployment targets.

.DESCRIPTION
    Build according to angular.json, adjust config and copy non-assets files.

.PARAMETER buildConfig
    Build configuration, default to "development". This will be passed to ng build --configuration.

.PARAMETER baseHref
	Base href for the Angular app. Default to "/".

.PARAMETER outputPath
	Output path for the build output. Default to "../appdist/dev".

#>
param(
    [string]$buildConfig = "development",
    [string]$baseHref="/",
	[string]$outputPath="./appdist/dev" # under dir browser
)

# For Local app /app/ to serve frontend
Set-Location $PSScriptRoot
$baseHrefText = ($baseHref -eq "/" ? "/" : "/$baseHref/")
Write-Output "Ready to output to $outputPath with base-href $baseHrefText ..."
ng build demoapp --configuration=$buildConfig --output-path=$outputPath --base-href=$baseHrefText

Write-Output "done $(Get-Date)"