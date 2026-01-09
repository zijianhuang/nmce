# [Nmce-Html-Editor](https://www.npmjs.com/package/nmce-html-editor)

Based on [@kolkov/angular-editor](https://www.npmjs.com/package/@kolkov/angular-editor), LocalDocHtmlEditorDialogComponent and EmailConfirmComponent are exported.

Since version 3 of @kolkov/angular-editor, you need to include some settings for icons in angular.json for your application and your app needs to import @kolkov/angular-editor explicitly in package.json. And:
1. Under `architect/build/options/assets`, add:
```json
    {
        "glob": "**/*",
        "input": "node_modules/@kolkov/angular-editor/assets/icons",
        "output": "assets/ae-icons/"
    }
```
2. Under `architect/build/options/styles`, add:
```json
    "node_modules/@kolkov/angular-editor/themes/default.scss"
```

## Code scaffolding

Run `ng generate component component-name --project nmce-html-editor` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project nmce-html-editor`.
> Note: Don't forget to add `--project nmce-html-editor` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `ng build nmce-html-editor` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build nmce-html-editor`, go to the dist folder `cd dist/nmce-html-editor` and run `npm publish`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
