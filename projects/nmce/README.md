# [NMCE package](https://www.npmjs.com/package/nmce)

Please check [Angular Material Components Extensions](https://github.com/zijianhuang/nmce) for details.

## Dialog styles for containing large content

After installation, if you want to use some of the dialogs that are designed to contain large contents and you would fully utilize the space of the MatDialog, you should do either of the following:

In `angular.json`:
```json
"styles": [
  "node_modules/nmce/styles/nmce-dialog.css"
]
```

**Remarks:**

Library CSS is always component‑scoped unless explicitly made global. However, `mat-dialog-content` lives outside library's dialog component’s host element, inside Angular Material’s overlay container. Therefore, the styles related has to be global.