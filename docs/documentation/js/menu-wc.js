'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">amcesource documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                                <li class="link">
                                    <a href="overview.html" data-type="chapter-link">
                                        <span class="icon ion-ios-keypad"></span>Overview
                                    </a>
                                </li>

                            <li class="link">
                                <a href="index.html" data-type="chapter-link">
                                    <span class="icon ion-ios-paper"></span>
                                        README
                                </a>
                            </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>

                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/Nmce_UI_Lazy_ServicesModule.html" data-type="entity-link" >Nmce_UI_Lazy_ServicesModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/Nmce_UI_ServicesModule.html" data-type="entity-link" >Nmce_UI_ServicesModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/NmceComponentsModule.html" data-type="entity-link" >NmceComponentsModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/NmceDirectivesModule.html" data-type="entity-link" >NmceDirectivesModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#directives-links-module-NmceDirectivesModule-e141a1a9928a13a7c59eac5229e44db9fa74d9de9b4c5a2b151eee34b0866f203ceaec762dbe00c2929b216404eb36dbf8be3d6ce0e6e4eee32fb4ebc2f8415d"' : 'data-bs-target="#xs-directives-links-module-NmceDirectivesModule-e141a1a9928a13a7c59eac5229e44db9fa74d9de9b4c5a2b151eee34b0866f203ceaec762dbe00c2929b216404eb36dbf8be3d6ce0e6e4eee32fb4ebc2f8415d"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-NmceDirectivesModule-e141a1a9928a13a7c59eac5229e44db9fa74d9de9b4c5a2b151eee34b0866f203ceaec762dbe00c2929b216404eb36dbf8be3d6ce0e6e4eee32fb4ebc2f8415d"' :
                                        'id="xs-directives-links-module-NmceDirectivesModule-e141a1a9928a13a7c59eac5229e44db9fa74d9de9b4c5a2b151eee34b0866f203ceaec762dbe00c2929b216404eb36dbf8be3d6ce0e6e4eee32fb4ebc2f8415d"' }>
                                        <li class="link">
                                            <a href="directives/AutofocusDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AutofocusDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/ScrollIntoDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ScrollIntoDirective</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/NmceHtmlEditorModule.html" data-type="entity-link" >NmceHtmlEditorModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/NmceJsonDiffModule.html" data-type="entity-link" >NmceJsonDiffModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/NmcePipesModule.html" data-type="entity-link" >NmcePipesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#pipes-links-module-NmcePipesModule-3a78aca350c754d40e92a79eb844fc3e7ba97384d07134cf6ac3e02bf7af9f4823566241ae8418e86e8e39c3240c68671e13db1450176bba3569bf9edffa5fb1"' : 'data-bs-target="#xs-pipes-links-module-NmcePipesModule-3a78aca350c754d40e92a79eb844fc3e7ba97384d07134cf6ac3e02bf7af9f4823566241ae8418e86e8e39c3240c68671e13db1450176bba3569bf9edffa5fb1"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-NmcePipesModule-3a78aca350c754d40e92a79eb844fc3e7ba97384d07134cf6ac3e02bf7af9f4823566241ae8418e86e8e39c3240c68671e13db1450176bba3569bf9edffa5fb1"' :
                                            'id="xs-pipes-links-module-NmcePipesModule-3a78aca350c754d40e92a79eb844fc3e7ba97384d07134cf6ac3e02bf7af9f4823566241ae8418e86e8e39c3240c68671e13db1450176bba3569bf9edffa5fb1"' }>
                                            <li class="link">
                                                <a href="pipes/BankerRoundPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BankerRoundPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/LiteralDatePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LiteralDatePipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/PadPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PadPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#components-links"' :
                            'data-bs-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/AlertComponent.html" data-type="entity-link" >AlertComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ConfirmComponent.html" data-type="entity-link" >ConfirmComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DataComponentDialog.html" data-type="entity-link" >DataComponentDialog</a>
                            </li>
                            <li class="link">
                                <a href="components/DataComponentPrintDialog.html" data-type="entity-link" >DataComponentPrintDialog</a>
                            </li>
                            <li class="link">
                                <a href="components/DateHourRangePickerComponent.html" data-type="entity-link" >DateHourRangePickerComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DateRangePickerComponent.html" data-type="entity-link" >DateRangePickerComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EmailConfirmComponent.html" data-type="entity-link" >EmailConfirmComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HtmlDialogComponent.html" data-type="entity-link" >HtmlDialogComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HtmlFrameDialogComponent.html" data-type="entity-link" >HtmlFrameDialogComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HtmlFramePrintDialogComponent.html" data-type="entity-link" >HtmlFramePrintDialogComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HtmlHRefDialogComponent.html" data-type="entity-link" >HtmlHRefDialogComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HtmlHRefFrameDialogComponent.html" data-type="entity-link" >HtmlHRefFrameDialogComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HtmlHRefFramePrintDialogComponent.html" data-type="entity-link" >HtmlHRefFramePrintDialogComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HtmlHRefPrintDialogComponent.html" data-type="entity-link" >HtmlHRefPrintDialogComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HtmlImgDialogComponent.html" data-type="entity-link" >HtmlImgDialogComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HtmlImgPrintDialogComponent.html" data-type="entity-link" >HtmlImgPrintDialogComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HtmlPrintDialogComponent.html" data-type="entity-link" >HtmlPrintDialogComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ItemListDialogComponent.html" data-type="entity-link" >ItemListDialogComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/JsonDiffComponent.html" data-type="entity-link" >JsonDiffComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LocalDocHtmlEditorDialogComponent.html" data-type="entity-link" >LocalDocHtmlEditorDialogComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LocalTextEditorDialogComponent.html" data-type="entity-link" >LocalTextEditorDialogComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LogDialogComponent.html" data-type="entity-link" >LogDialogComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LogSnackComponent.html" data-type="entity-link" >LogSnackComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MonthYearExpiryComponent.html" data-type="entity-link" >MonthYearExpiryComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NotFoundComponent.html" data-type="entity-link" >NotFoundComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NotificationsComponent.html" data-type="entity-link" >NotificationsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/OptionsComponent.html" data-type="entity-link" >OptionsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PasswordsInputComponent.html" data-type="entity-link" >PasswordsInputComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PrintComponent.html" data-type="entity-link" >PrintComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ProgressComponent.html" data-type="entity-link" >ProgressComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TextDialogComponent.html" data-type="entity-link" >TextDialogComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TextHRefDialogComponent.html" data-type="entity-link" >TextHRefDialogComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TextInputComponent.html" data-type="entity-link" >TextInputComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TimePickerComponent.html" data-type="entity-link" >TimePickerComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/WaitComponent.html" data-type="entity-link" >WaitComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/WaitProgressComponent.html" data-type="entity-link" >WaitProgressComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/WIPComponent.html" data-type="entity-link" >WIPComponent</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#directives-links"' :
                                'data-bs-target="#xs-directives-links"' }>
                                <span class="icon ion-md-code-working"></span>
                                <span>Directives</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="directives-links"' : 'id="xs-directives-links"' }>
                                <li class="link">
                                    <a href="directives/AutofocusDirective.html" data-type="entity-link" >AutofocusDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/DataComponentDirective.html" data-type="entity-link" >DataComponentDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/HtmlDocEditorDialogBaseComponent.html" data-type="entity-link" >HtmlDocEditorDialogBaseComponent</a>
                                </li>
                                <li class="link">
                                    <a href="directives/ScrollIntoDirective.html" data-type="entity-link" >ScrollIntoDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/TextEditorDialogComponentBase.html" data-type="entity-link" >TextEditorDialogComponentBase</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AddressFunc.html" data-type="entity-link" >AddressFunc</a>
                            </li>
                            <li class="link">
                                <a href="classes/AnySubjectService.html" data-type="entity-link" >AnySubjectService</a>
                            </li>
                            <li class="link">
                                <a href="classes/CurrencyFunc.html" data-type="entity-link" >CurrencyFunc</a>
                            </li>
                            <li class="link">
                                <a href="classes/DateFunc.html" data-type="entity-link" >DateFunc</a>
                            </li>
                            <li class="link">
                                <a href="classes/GlobalSubjectService.html" data-type="entity-link" >GlobalSubjectService</a>
                            </li>
                            <li class="link">
                                <a href="classes/HtmlBaseDialogService.html" data-type="entity-link" >HtmlBaseDialogService</a>
                            </li>
                            <li class="link">
                                <a href="classes/HtmlPrintFunc.html" data-type="entity-link" >HtmlPrintFunc</a>
                            </li>
                            <li class="link">
                                <a href="classes/ItemListDialogServiceBase.html" data-type="entity-link" >ItemListDialogServiceBase</a>
                            </li>
                            <li class="link">
                                <a href="classes/JavaScriptFunc.html" data-type="entity-link" >JavaScriptFunc</a>
                            </li>
                            <li class="link">
                                <a href="classes/JsonFunc.html" data-type="entity-link" >JsonFunc</a>
                            </li>
                            <li class="link">
                                <a href="classes/LocalWaitService.html" data-type="entity-link" >LocalWaitService</a>
                            </li>
                            <li class="link">
                                <a href="classes/NotificationsCache.html" data-type="entity-link" >NotificationsCache</a>
                            </li>
                            <li class="link">
                                <a href="classes/RootInjectorGuard.html" data-type="entity-link" >RootInjectorGuard</a>
                            </li>
                            <li class="link">
                                <a href="classes/StringAusFunc.html" data-type="entity-link" >StringAusFunc</a>
                            </li>
                            <li class="link">
                                <a href="classes/StringFunc.html" data-type="entity-link" >StringFunc</a>
                            </li>
                            <li class="link">
                                <a href="classes/UuidFunc.html" data-type="entity-link" >UuidFunc</a>
                            </li>
                            <li class="link">
                                <a href="classes/WaitServiceBase.html" data-type="entity-link" >WaitServiceBase</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/ActionSheetItemSubjectService.html" data-type="entity-link" >ActionSheetItemSubjectService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AlertService.html" data-type="entity-link" >AlertService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ConfirmService.html" data-type="entity-link" >ConfirmService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DataComponentDialogService.html" data-type="entity-link" >DataComponentDialogService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DataComponentPrintDialogService.html" data-type="entity-link" >DataComponentPrintDialogService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DateHourRangePickerService.html" data-type="entity-link" >DateHourRangePickerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DateRangePickerService.html" data-type="entity-link" >DateRangePickerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EmailConfirmService.html" data-type="entity-link" >EmailConfirmService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HtmlDialogService.html" data-type="entity-link" >HtmlDialogService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HtmlFrameDialogService.html" data-type="entity-link" >HtmlFrameDialogService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HtmlFramePrintDialogService.html" data-type="entity-link" >HtmlFramePrintDialogService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HtmlHRefDialogService.html" data-type="entity-link" >HtmlHRefDialogService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HtmlHRefFrameDialogService.html" data-type="entity-link" >HtmlHRefFrameDialogService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HtmlHRefFramePrintDialogService.html" data-type="entity-link" >HtmlHRefFramePrintDialogService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HtmlHRefPrintDialogService.html" data-type="entity-link" >HtmlHRefPrintDialogService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HtmlImgDialogService.html" data-type="entity-link" >HtmlImgDialogService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HtmlImgPrintDialogService.html" data-type="entity-link" >HtmlImgPrintDialogService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HtmlPrintDialogService.html" data-type="entity-link" >HtmlPrintDialogService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JsonDiffDialogService.html" data-type="entity-link" >JsonDiffDialogService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LazyComponentDialogService.html" data-type="entity-link" >LazyComponentDialogService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LazyComponentPrintDialogService.html" data-type="entity-link" >LazyComponentPrintDialogService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalAlertService.html" data-type="entity-link" >LocalAlertService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalDocEditorDialogService.html" data-type="entity-link" >LocalDocEditorDialogService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalTextEditorDialogService.html" data-type="entity-link" >LocalTextEditorDialogService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NotificationsService.html" data-type="entity-link" >NotificationsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OptionListDialogService.html" data-type="entity-link" >OptionListDialogService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OptionsService.html" data-type="entity-link" >OptionsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PasswordsInputService.html" data-type="entity-link" >PasswordsInputService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProgressDialogService.html" data-type="entity-link" >ProgressDialogService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TextDialogService.html" data-type="entity-link" >TextDialogService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TextHReflDialogService.html" data-type="entity-link" >TextHReflDialogService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TextInputService.html" data-type="entity-link" >TextInputService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TimeService.html" data-type="entity-link" >TimeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/WaitProgressService.html" data-type="entity-link" >WaitProgressService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/WaitService.html" data-type="entity-link" >WaitService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/ActionSheetItem.html" data-type="entity-link" >ActionSheetItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AlertSubjectMessage.html" data-type="entity-link" >AlertSubjectMessage</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DataComponent.html" data-type="entity-link" >DataComponent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EmailListDialog.html" data-type="entity-link" >EmailListDialog</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EmailMessage.html" data-type="entity-link" >EmailMessage</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MessageDialogOptions.html" data-type="entity-link" >MessageDialogOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PrintDataComponent.html" data-type="entity-link" >PrintDataComponent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TransmitProgress.html" data-type="entity-link" >TransmitProgress</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/WaitMessage.html" data-type="entity-link" >WaitMessage</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#pipes-links"' :
                                'data-bs-target="#xs-pipes-links"' }>
                                <span class="icon ion-md-add"></span>
                                <span>Pipes</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="pipes-links"' : 'id="xs-pipes-links"' }>
                                <li class="link">
                                    <a href="pipes/BankerRoundPipe.html" data-type="entity-link" >BankerRoundPipe</a>
                                </li>
                                <li class="link">
                                    <a href="pipes/LiteralDatePipe.html" data-type="entity-link" >LiteralDatePipe</a>
                                </li>
                                <li class="link">
                                    <a href="pipes/PadPipe.html" data-type="entity-link" >PadPipe</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});