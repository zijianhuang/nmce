Set-Location $PSScriptRoot
$commandPath = 'C:/Green/GoogleTranslateXliff/GoogleTranslateXliff.exe'
$apiKeyFile = 'C:/VsProjects/OpenSource/Secrets/GoogleTranslate'

foreach ($lang in 'es', 'ja', 'zh-hans', 'zh-hant') {
    $cmd = '$commandPath /AKF=$apiKeyFile /B /F=messages.$lang.xlf'
    Invoke-Expression $ExecutionContext.InvokeCommand.ExpandString($cmd)
}