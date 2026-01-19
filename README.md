# NMCE Projects

The projects of Angular Material Components Extensions are to deliver a set of reusable Angular codes and Extensions of [Angular Material UI Component Library](https://material.angular.io/), targeting complex business applications with rich data structures, intensive GUI and complex workflows.

## Demo
[Demo Sites](https://zijianhuang.github.io/nmce/en/) in [various locales](https://zijianhuang.github.io/nmce/).

## Projects
* [nmce-func](https://www.npmjs.com/package/nmce-func): Common functions used in business applications, as well as the components and the services in this NMCE libraries.
* [nmce](https://www.npmjs.com/package/nmce): A few sets of components and services based on [Angular Material Components](https://material.angular.io/components/categories).
* [nmce-html-editor](https://www.npmjs.com/package/nmce-html-editor): A few dialog services based on [@kolkov/angular-editor](https://github.com/kolkov/angular-editor), present a HTML editor in a dialog.
* [nmce-json-diff](https://www.npmjs.com/package/nmce-json-diff): A simple dialog service based on [jsondiffpatch](https://github.com/benjamine/jsondiffpatch).
* [nmce-pipes](https://www.npmjs.com/package/nmce-pipes): Common simple Angular pipes.
* [nmce-directives](https://www.npmjs.com/package/nmce-directives): Common simple Angular directives.
* demoapp: A demo application demonstrating features of all above.

# Designs

The UI design conforms to Material Design, and the visual components are constructed through composing, bridging and wrapping of existing Angular Material Components and CDK.

When considering use cases and making design trade-off, the priority is:
1. Desktop with big monitors, mouse and keyboard
1. Tablet
1. Smartphone

TV screen is not considered.

Remarks:
* This repository began with a rich collection of functions, pipes, directives, and components dating back to 2017. However, over time, as Angular and the Angular Material UI Component Library have become more mature and comprehensive, many of these utilities have been deprecated then removed in favor of the built-in features provided by the frameworks and libraries which include the following:
    * MomentJS then luxon for date time handling.
    * dinerojs for monetary calculations.

## Design Approaches

* The UI design is optimized for desktop PC and tablet devices.
* Components are based on [Angular Material Components](https://material.angular.io/components/categories).
* Minimum CSS crafting is used.
* Extensions to already comprehensive frameworks and libraries.
* Once respective frameworks and libraries evolve overlapping or surpassing what offered in this repository, the respective codes of this repository will then be deprecated and removed later.

# Maintenance

## Development server

Run `ng serve demoapp` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files in demoapp.

Additionally, you may execute `startAppDev.ps1` for the build of `buildAppDev.ps1` or `startAppProd.ps1` for the build of `buildAppProd.ps1`.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build. For examples:

`ng build nmce`

However, do not run `ng build demoapp`, otherwise, the builds for libraries will be deleted, and the build for the app may fail. Instead, using `buildAppDev.ps1` or `buildAppProd.ps1`.

## Publish

Follow https://jasonwatmore.com/post/2020/06/16/angular-npm-how-to-publish-an-angular-component-to-npm

Particularly, after increasing the version number in each package.json, run:
`ng build myProject --configuration production`

then `cd dist/myProject`, and

`npm publish`

And in the root, a few bp_nmce*.ps1 files make it easier to publish.

Hints:
* Since December 2025, npmjs has changed the security models as described on https://github.blog/changelog/2025-12-09-npm-classic-tokens-revoked-session-based-auth-and-cli-token-management-now-available/.
* For publishing packages from a dev machine, "granular access token with bypass 2FA" is used.
    1. Generate an access token in the account, which will expires in 90 days.
    2. Update what in %users%myAccount/.npmrc with the token.

## I18N

The translations done within the libraries of this project are to verify if i18n is properly done, while the app projects utilizing the libraries will pickup translation units annotated in the lib codes. This is, the translation resource files (XLF) won't be utilized directly in the app projects, since `ng extract-i18n` can scan the i18n annotations in 3rd party libraries. 

After updating i18n tagging in HTML and TS codes, run:

`ng extract-i18n`

This will create or update messages.xlf, and merge with existing translations, since this command had been replaced what mentioned in: https://stackoverflow.com/questions/71775495/update-merge-i18n-translation-files-in-angular, that is `ng add ng-extract-i18n-merge` from https://github.com/daniel-sc/ng-extract-i18n-merge .

Remarks:
* Sometimes I have to run `ng add ng-extract-i18n-merge` first after defining new languages in angular.json, and then run `ng extract-i18n` to generate new xlf files.
* Before running `extract-i18n`, better to run "buildComponents.ps1" to ensure all being built successfully. since `extract-i18n` or what behind could just fail to find updated tran units but without reporting build error.

References:
* https://angular.dev/guide/i18n/merge

Then run locales/`Translate.ps1` to translate new or updated items.


### For libraries

As of Angular 19, extra works are to be done:
1. To ensure `$localize` strings in TS files to be included, in tsconfig.json of the root and project nmce, add `"types": ["@angular/localize"]` to "compilerOptions".
1. To avoid build error, in tsconfig.json of project nmce, add `"types": ["@angular/localize"]` to "compilerOptions".

## Documentation

### Install Compodoc
```bash
npm install -g @compodoc/compodoc
# or for local use
npm install --save-dev @compodoc/compodoc
```

### tsconfig.doc.json

Compodoc may use this to scan sub projects for doc comments.

### Generate or Serve
```bash
npx compodoc -p tsconfig.doc.json
# or serve
npx compodoc -p tsconfig.doc.json -s
```

# Alternative or Complementary
There are a few similar open source projects:

## Based on [Angular Material Design Components](https://material.angular.dev/)

Just like NMCE, these component suites are relevant when you have already been using Angular Material Design Components.
* [Angular Material Extensions](https://ng-matero.github.io/extensions/).
* [angular-material-extensions](https://github.com/angular-material-extensions), most repositories are up to date as of 2023.

## Based on [Angular](https://angular.dev/)
* [primeng](https://primeng.org/)
* [NG Bootstrap](https://ng-bootstrap.github.io/#/home)
* [Nebular](https://akveo.github.io/nebular/)
* [Angular implementation of the Carbon Design System for IBM](https://github.com/carbon-design-system/carbon-components-angular)
* [Ant Design of Angular](https://ng.ant.design/docs/introduce/en)
* [Angular Aria](https://angular.dev/guide/aria)