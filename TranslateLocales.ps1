Set-Location $PSScriptRoot
$commandPath = 'C:/VsProjects/OpenSource/Translation/Release/All_Win/GoogleTranslateXliff.exe'
$oauth2KeyFile = "C:/VsProjects/OpenSource/Secrets/GoogleTranslate/client_secret_appdev.json" # https://console.cloud.google.com/auth/clients/46366595334-rvkiv6gn928r928chfe0u84q1bsuo0h2.apps.googleusercontent.com?project=termatracdev

$locales = & "$PSScriptRoot/locales.auto.ps1"
foreach ($lang in $locales) {
	if ($lang -ne 'en') {
		# for UI, default nmt is overall better.
		$cmd = "$commandPath /AV=v3 /CSF=$oauth2KeyFile /B /F=locales/messages.$lang.xlf"
		Invoke-Expression $ExecutionContext.InvokeCommand.ExpandString($cmd)
	}
}