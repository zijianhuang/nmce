Set-Location $PSScriptRoot
$commandPath = 'C:/Green/GoogleTranslateXliff/GoogleTranslateXliff.exe'
$apiKey = 'AIzaSyAmb9tAxFgxuex4WcnHQvbRpwHpE-GoYws'

foreach ($lang in 'es', 'ja', 'zh-hans', 'zh-hant') {
    $cmd = '$commandPath /AK=$apiKey /B /F=messages.$lang.xlf'
    Invoke-Expression $ExecutionContext.InvokeCommand.ExpandString($cmd)
}