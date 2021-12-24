# NMCE Projects

The projects are to deliver a set of reusable Angular codes and Angular Material Component Extensions, targeting complex business applications with rich data structures and complex workflows. 

## Projects
* nmce-func: Common functions used in business applications and the components and services in this NMCE project.
* nmce: A few sets of components and services based on [Angular Material Components](https://material.angular.io/components/categories).
* nmce-html-editor: A few dialog services based on [@kolkov/angular-editor](https://github.com/kolkov/angular-editor), present a HTML editor in a dialog.
* Nmce-json-diff: A simple dialog service based on [jsondiffpatch](https://github.com/benjamine/jsondiffpatch).
* nmce-pipes: Common simple Angular pipes used in business applications.
* nmce-directives: Common simple Angular directives used in business applications.
* demoapp: A demo application demostrating features of all above.

## Design Approaches

* The UI design is optimized for desktop PC and tablet devices.
* Components are based on [Angular Material Components](https://material.angular.io/components/categories).
* Layout design is based on [Angular flex-layout](https://github.com/angular/flex-layout).
* Minimum CSS crafting is used.

## Development server

Run `ng serve demoapp` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files in demoapp.

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
