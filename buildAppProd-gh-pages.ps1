$dest = "nmce-ghpages"
./buildAppParams.ps1 "production" "nmce" "./appdist/$dest/"
copy-item ./OnBoardingIndex.html -Destination "./appdist/$dest/browser/index.html"
copy-item "./appdist/$dest/browser/en/index.html" "./appdist/$dest/browser/en/404.html"
