# NMCE Projects

The projects of Angular Material Components Extensions are to deliver a set of reusable Angular codes and [Angular Material](https://material.angular.io/) Extensions, targeting complex business applications with rich data structures, intensive GUI and complex workflows.

[Demo Sites](https://zijianhuang.github.io/nmce/en/) in [various locales](https://zijianhuang.github.io/nmce/).

## Designs

The UI design conforms to Material Design, and the visual components are constructed through composing, bridging and wrapping of existing Angular Material Components.

When considering use cases and making design trade-off, the priority is:
1. Desktop with big monitors, mouse and keyboard
1. Tablet
1. Smartphone

TV is not considered.

## Projects
* nmce-func: Common functions used in business applications and the components and the services in this NMCE project.
* nmce: A few sets of components and services based on [Angular Material Components](https://material.angular.io/components/categories).
* nmce-html-editor: A few dialog services based on [@kolkov/angular-editor](https://github.com/kolkov/angular-editor), present a HTML editor in a dialog.
* Nmce-json-diff: A simple dialog service based on [jsondiffpatch](https://github.com/benjamine/jsondiffpatch).
* nmce-pipes: Common simple Angular pipes used in business applications.
* nmce-directives: Common simple Angular directives used in business applications.
* demoapp: A demo application demonstrating features of all above.

## Design Approaches

* The UI design is optimized for desktop PC and tablet devices.
* Components are based on [Angular Material Components](https://material.angular.io/components/categories).
* Minimum CSS crafting is used.

## Development server

Run `ng serve demoapp` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files in demoapp.

Additionally, you may execute `startAppDev.ps1` or `startAppProd.ps1` to run the app using the build.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build. For examples:

`ng build nmce`

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

`ng test nmce-func`

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Publish

Follow https://jasonwatmore.com/post/2020/06/16/angular-npm-how-to-publish-an-angular-component-to-npm

Particularly, after increasing the version number in each package.json, run:
`ng build myProject --configuration production`

then `cd dist/myProject`, and

`npm publish`

And in the root, a few bp_nmce*.bat files make it easier to publish.

# Alternative or Complementary
There are a few similar open source projects:

* [Angular Material Extensions](https://ng-matero.github.io/extensions/).
* [angular-material-extensions](https://github.com/angular-material-extensions), most repositories are up to date as of 2023.

## I18N

The translations done within the libraries of this project are to verify if i18n is properly done, while the app projects utilizing the libraries will pickup translation units annotated in the lib codes. This is, the translation resource files (XLF) won't be utilized directly in the app projects, since `ng extract-i18n` can scan the i18n annotations in 3rd party libraries. 

After updating i18n tagging in HTML and TS codes, run:

`ng extract-i18n`

This will create or update messages.xlf, and merge with existing translations, since this command had been replaced what mentioned in: https://stackoverflow.com/questions/71775495/update-merge-i18n-translation-files-in-angular, that is `ng add ng-extract-i18n-merge` from https://github.com/daniel-sc/ng-extract-i18n-merge .

Remarks:
* Sometimes I have to run `ng add ng-extract-i18n-merge` first after defining new languages in angular.json, and then run `ng extract-i18n` to generate new xlf files.
* Before running `extract-i18n`, better to run "buildComponents.ps1" to ensure all being built successfully. since `extract-i18n` or what behind could just fail to find updated tran units but without reporting build error.

Run `ProdCreateLangSite.bat` once to create local test sites for each translation.

References:
* https://angular.dev/guide/i18n/merge

### For libraries

As of Angular 19, extra works ave to be done:
1. To ensure `$localize` strings in TS files to be included, in tsconfig.json of the root and project nmce, add `"types": ["@angular/localize"]` to "compilerOptions".
1. To avoid build error, in tsconfig.json of project nmce, add `"types": ["@angular/localize"]` to "compilerOptions".

*Remarks*
* `ng serve` the app could see `$localize is not a function` at runtime.
* Development build of the app could see `$localize is not a function` at runtime. And what suggested on https://github.com/angular/angular-cli/issues/27878 is not working.
* Therefore, test localization only with production build.