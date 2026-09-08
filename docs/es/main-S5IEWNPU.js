import{$a as ft,$b as De,A as f,Aa as p,Ab as Ct,Ac as u,B as _,Ba as Fe,Bb as ve,C as Xe,Ca as fe,Cb as St,Da as ct,Db as xt,E as me,Ea as dt,Eb as ye,F as ce,Fa as J,Fb as wt,G as de,Ga as ee,Gb as ne,H as ue,Ha as te,I as Ze,Ib as It,J as Z,Ja as I,Jb as kt,Jc as Vt,Ka as ut,Kb as z,L as Ke,La as c,Lb as Et,M as B,Ma as pt,Mb as j,N as Qe,Na as _e,Nb as Nt,Ob as Ot,P as qe,Pc as ie,Q as h,Qb as V,Qc as oe,R as Je,Rb as At,Rc as Se,S as pe,Sa as ht,Sb as H,Ta as gt,Tb as Y,Ub as Rt,V as K,W as et,Wb as Pt,X as tt,Xc as xe,Y as b,Yb as M,Yc as Ht,Z as w,Zb as Lt,Zc as Yt,_ as Q,_c as Ut,a as k,aa as nt,ac as Ft,b as X,bc as Bt,c as re,ca as it,cc as zt,da as q,db as be,dc as jt,e as ae,ea as ot,eb as T,ec as Te,fa as O,fc as P,ga as A,h as Re,ha as rt,ia as at,id as we,j as se,ja as he,k as Ye,ka as ge,la as y,m as Ue,ma as s,mb as _t,na as l,nb as bt,o as le,oa as R,p as Pe,pa as Le,pb as Mt,q as We,qa as st,qb as vt,r as $e,tb as yt,u as S,ub as Dt,v as x,va as E,wa as lt,wb as Be,x as a,xb as Me,y as Ge,ya as D,yb as Tt,za as mt,zc as Ce,zd as Wt}from"./chunk-UY4RJLYN.js";var $t={production:!0};var cn=new x("MAT_BADGE_CONFIG"),Gt="mat-badge-content",dn=(()=>{class i{static \u0275fac=function(t){return new(t||i)};static \u0275cmp=b({type:i,selectors:[["ng-component"]],decls:0,vars:0,template:function(t,n){},styles:[`.mat-badge {
  position: relative;
}
.mat-badge.mat-badge {
  overflow: visible;
}

.mat-badge-content {
  position: absolute;
  text-align: center;
  display: inline-block;
  transition: transform 200ms ease-in-out;
  transform: scale(0.6);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  box-sizing: border-box;
  pointer-events: none;
  background-color: var(--%NS%mat-badge-background-color, var(--%NS%mat-sys-error));
  color: var(--%NS%mat-badge-text-color, var(--%NS%mat-sys-on-error));
  font-family: var(--%NS%mat-badge-text-font, var(--%NS%mat-sys-label-small-font));
  font-weight: var(--%NS%mat-badge-text-weight, var(--%NS%mat-sys-label-small-weight));
  border-radius: var(--%NS%mat-badge-container-shape, var(--%NS%mat-sys-corner-full));
}
.mat-badge-above .mat-badge-content {
  bottom: 100%;
}
.mat-badge-below .mat-badge-content {
  top: 100%;
}
.mat-badge-before .mat-badge-content {
  right: 100%;
}
[dir=rtl] .mat-badge-before .mat-badge-content {
  right: auto;
  left: 100%;
}
.mat-badge-after .mat-badge-content {
  left: 100%;
}
[dir=rtl] .mat-badge-after .mat-badge-content {
  left: auto;
  right: 100%;
}
@media (forced-colors: active) {
  .mat-badge-content {
    outline: solid 1px;
    border-radius: 0;
  }
}

.mat-badge-disabled .mat-badge-content {
  background-color: var(--%NS%mat-badge-disabled-state-background-color, color-mix(in srgb, var(--%NS%mat-sys-error) 38%, transparent));
  color: var(--%NS%mat-badge-disabled-state-text-color, var(--%NS%mat-sys-on-error));
}

.mat-badge-hidden .mat-badge-content {
  display: none;
}

.ng-animate-disabled .mat-badge-content,
.mat-badge-content._mat-animation-noopable {
  transition: none;
}

.mat-badge-content.mat-badge-active {
  transform: none;
}

.mat-badge-small .mat-badge-content {
  width: var(--%NS%mat-badge-legacy-small-size-container-size, unset);
  height: var(--%NS%mat-badge-legacy-small-size-container-size, unset);
  min-width: var(--%NS%mat-badge-small-size-container-size, 6px);
  min-height: var(--%NS%mat-badge-small-size-container-size, 6px);
  line-height: var(--%NS%mat-badge-small-size-line-height, 6px);
  padding: var(--%NS%mat-badge-small-size-container-padding, 0);
  font-size: var(--%NS%mat-badge-small-size-text-size, 0);
  margin: var(--%NS%mat-badge-small-size-container-offset, -6px 0);
}
.mat-badge-small.mat-badge-overlap .mat-badge-content {
  margin: var(--%NS%mat-badge-small-size-container-overlap-offset, -6px);
}

.mat-badge-medium .mat-badge-content {
  width: var(--%NS%mat-badge-legacy-container-size, unset);
  height: var(--%NS%mat-badge-legacy-container-size, unset);
  min-width: var(--%NS%mat-badge-container-size, 16px);
  min-height: var(--%NS%mat-badge-container-size, 16px);
  line-height: var(--%NS%mat-badge-line-height, 16px);
  padding: var(--%NS%mat-badge-container-padding, 0 4px);
  font-size: var(--%NS%mat-badge-text-size, var(--%NS%mat-sys-label-small-size));
  margin: var(--%NS%mat-badge-container-offset, -12px 0);
}
.mat-badge-medium.mat-badge-overlap .mat-badge-content {
  margin: var(--%NS%mat-badge-container-overlap-offset, -12px);
}

.mat-badge-large .mat-badge-content {
  width: var(--%NS%mat-badge-legacy-large-size-container-size, unset);
  height: var(--%NS%mat-badge-legacy-large-size-container-size, unset);
  min-width: var(--%NS%mat-badge-large-size-container-size, 16px);
  min-height: var(--%NS%mat-badge-large-size-container-size, 16px);
  line-height: var(--%NS%mat-badge-large-size-line-height, 16px);
  padding: var(--%NS%mat-badge-large-size-container-padding, 0 4px);
  font-size: var(--%NS%mat-badge-large-size-text-size, var(--%NS%mat-sys-label-small-size));
  margin: var(--%NS%mat-badge-large-size-container-offset, -12px 0);
}
.mat-badge-large.mat-badge-overlap .mat-badge-content {
  margin: var(--%NS%mat-badge-large-size-container-overlap-offset, -12px);
}
`],encapsulation:2})}return i})(),Xt=(()=>{class i{_ngZone=a(ue);_elementRef=a(B);_ariaDescriber=a(wt);_renderer=a(pe);_animationsDisabled=ne();_idGenerator=a(ye);get color(){return this._color}set color(e){this._setColor(e),this._color=e}_color;overlap;disabled=!1;position;get content(){return this._content}set content(e){this._updateRenderedContent(e)}_content;get description(){return this._description}set description(e){this._updateDescription(e)}_description;size;hidden=!1;_badgeElement;_inlineBadgeDescription;_isInitialized=!1;_interactivityChecker=a(Ct);_document=a(ce);constructor(){let e=a(cn,{optional:!0}),t=a(Me);t.load(dn),t.load(Tt),this._color=e?.color||"primary",this.overlap=e?.overlap??!0,this.position=e?.position||"above after",this.size=e?.size||"medium"}isAbove(){return this.position.indexOf("below")===-1}isAfter(){return this.position.indexOf("before")===-1}getBadgeElement(){return this._badgeElement}ngOnInit(){this._clearExistingBadges(),this.content&&!this._badgeElement&&(this._badgeElement=this._createBadgeElement(),this._updateRenderedContent(this.content)),this._isInitialized=!0}ngAfterViewInit(){}ngOnDestroy(){this._renderer.destroyNode&&(this._renderer.destroyNode(this._badgeElement),this._inlineBadgeDescription?.remove()),this._ariaDescriber.removeDescription(this._elementRef.nativeElement,this.description)}_isHostInteractive(){return this._interactivityChecker.isFocusable(this._elementRef.nativeElement,{ignoreVisibility:!0})}_createBadgeElement(){let e=this._renderer.createElement("span"),t="mat-badge-active";return e.setAttribute("id",this._idGenerator.getId("mat-badge-content-")),e.setAttribute("aria-hidden","true"),e.classList.add(Gt),this._animationsDisabled&&e.classList.add("_mat-animation-noopable"),this._elementRef.nativeElement.appendChild(e),typeof requestAnimationFrame=="function"&&!this._animationsDisabled?this._ngZone.runOutsideAngular(()=>{requestAnimationFrame(()=>{e.classList.add(t)})}):e.classList.add(t),e}_updateRenderedContent(e){let t=`${e??""}`.trim();this._isInitialized&&t&&!this._badgeElement&&(this._badgeElement=this._createBadgeElement()),this._badgeElement&&(this._badgeElement.textContent=t),this._content=t}_updateDescription(e){this._ariaDescriber.removeDescription(this._elementRef.nativeElement,this.description),(!e||this._isHostInteractive())&&this._removeInlineDescription(),this._description=e,this._isHostInteractive()?this._ariaDescriber.describe(this._elementRef.nativeElement,e):this._updateInlineDescription()}_updateInlineDescription(){this._inlineBadgeDescription||(this._inlineBadgeDescription=this._document.createElement("span"),this._inlineBadgeDescription.classList.add("cdk-visually-hidden")),this._inlineBadgeDescription.textContent=this.description,this._badgeElement?.appendChild(this._inlineBadgeDescription)}_removeInlineDescription(){this._inlineBadgeDescription?.remove(),this._inlineBadgeDescription=void 0}_setColor(e){let t=this._elementRef.nativeElement.classList;t.remove(`mat-badge-${this._color}`),e&&t.add(`mat-badge-${e}`)}_clearExistingBadges(){let e=this._elementRef.nativeElement.querySelectorAll(`:scope > .${Gt}`);for(let t of Array.from(e))t!==this._badgeElement&&t.remove()}static \u0275fac=function(t){return new(t||i)};static \u0275dir=Q({type:i,selectors:[["","matBadge",""]],hostAttrs:[1,"mat-badge"],hostVars:20,hostBindings:function(t,n){t&2&&I("mat-badge-overlap",n.overlap)("mat-badge-above",n.isAbove())("mat-badge-below",!n.isAbove())("mat-badge-before",!n.isAfter())("mat-badge-after",n.isAfter())("mat-badge-small",n.size==="small")("mat-badge-medium",n.size==="medium")("mat-badge-large",n.size==="large")("mat-badge-hidden",n.hidden||!n.content)("mat-badge-disabled",n.disabled)},inputs:{color:[0,"matBadgeColor","color"],overlap:[2,"matBadgeOverlap","overlap",T],disabled:[2,"matBadgeDisabled","disabled",T],position:[0,"matBadgePosition","position"],content:[0,"matBadge","content"],description:[0,"matBadgeDescription","description"],size:[0,"matBadgeSize","size"],hidden:[2,"matBadgeHidden","hidden",T]}})}return i})(),Zt=(()=>{class i{static \u0275fac=function(t){return new(t||i)};static \u0275mod=w({type:i});static \u0275inj=S({imports:[ve,j]})}return i})();var Kt={name:"nmcesource",version:"0.0.1",scripts:{ng:"ng",start:"ng serve",build:"ng build",test:"ng test","test:ci":"ng test --no-watch --browsers=ChromeHeadless",lint:"ng lint",e2e:"ng e2e"},private:!0,dependencies:{"@angular/animations":"^22.1.4","@angular/cdk":"^22.1.5","@angular/common":"^22.1.4","@angular/compiler":"^22.1.4","@angular/core":"^22.1.4","@angular/forms":"^22.1.4","@angular/material":"^22.1.5","@angular/material-luxon-adapter":"^22.1.5","@angular/platform-browser":"^22.1.4","@angular/platform-browser-dynamic":"^22.1.4","@angular/router":"^22.1.4","@kolkov/angular-editor":"^3.1.0",jsondiffpatch:"^0.7.6",luxon:"^3.7.2","ng-animate":"^2.0.1","ng-packagr":"^22.1.1",rxjs:"~7.8.2",tslib:"^2.8.1",uuid:"14.0.2"},devDependencies:{"@angular-devkit/build-angular":"^22.1.7","@angular/build":"^22.1.7","@angular/cli":"^22.1.7","@angular/compiler-cli":"^22.1.4","@angular/localize":"^22.1.4","@types/luxon":"^3.7.5","@types/node":"^26.4.1","@types/uuid":"11.0.0","@vitest/browser":"^4.1.11","@vitest/browser-webdriverio":"^4.1.11",codelyzer:"^6.0.2",depcheck:"^1.4.7",jsdom:"^30.0.1","ng-extract-i18n-merge":"3.4.0",protractor:"~7.0.0","ts-node":"10.9.2",tslint:"6.1.3","tslint-angular":"3.0.3",typescript:"6.0.3","vite-tsconfig-paths":"^6.1.1",vitest:"^4.1.11"}};var d=k({},typeof THEME_CONFIG>"u"?{}:THEME_CONFIG);var v=(()=>{class i{static settings=d.themeLoaderSettings;static get selectedTheme(){return this.settings?localStorage.getItem(this.settings.storageKey):null}static set selectedTheme(e){this.settings&&localStorage.setItem(this.settings.storageKey,e)}static init(){this.loadTheme(this.selectedTheme)}static loadTheme(e){if(!d.themesDic||!this.settings||Object.keys(d.themesDic).length===0){console.error("AppConfigConstants need to have themesDic with at least 1 item, and themeKeys.");return}let t=document.getElementById(this.settings.themeLinkId);if(t){let n=t.href.substring(t.href.lastIndexOf("/")+1);if(e==n)return;let r=d.themesDic[e];if(!r)return;if(t.href=e,this.selectedTheme=e,console.info(`theme altered to ${e}.`),this.settings.appColorsLinkId){let m=document.getElementById(this.settings.appColorsLinkId);if(m)if(r.dark!=null&&this.settings.colorsDarkCss&&this.settings.colorsCss){let C=r.dark?this.settings.colorsDarkCss:this.settings.colorsCss;m.href=(this.settings.appColorsDir??"")+C}else this.settings.colorsCss&&(m.href=(this.settings.appColorsDir??"")+this.settings.colorsCss)}}else{t=document.createElement("link"),t.id=this.settings.themeLinkId,t.rel="stylesheet";let n=e??Object.keys(d.themesDic)[0];if(t.href=n,document.head.appendChild(t),this.selectedTheme=n,console.info(`Initially loaded theme ${n}`),this.settings.appColorsLinkId){let o=document.createElement("link");o.id=this.settings.appColorsLinkId,o.rel="stylesheet";let r=d.themesDic[n];if(r.dark!=null&&this.settings.colorsDarkCss&&this.settings.colorsCss){let m=r.dark?this.settings.colorsDarkCss:this.settings.colorsCss;o.href=(this.settings.appColorsDir??"")+m}else this.settings.colorsCss&&(o.href=(this.settings.appColorsDir??"")+this.settings.colorsCss);o.href?(document.head.appendChild(o),console.info(`appColors ${o} loaded.`)):console.warn("With appColorsLinkId defined, dark&colorsCss&colorDarkCss or colorsCss should be defined.")}}}}return i})();var Mn=[[["mat-icon"],["","matMenuItemIcon",""]],"*"],vn=["mat-icon, [matMenuItemIcon]","*"];function yn(i,g){i&1&&(Xe(),s(0,"svg",2),R(1,"polygon",3),l())}var Dn=["*"];function Tn(i,g){if(i&1){let e=E();Le(0,"div",0),mt("click",function(){f(e);let n=p();return _(n.closed.emit("click"))})("animationstart",function(n){f(e);let o=p();return _(o._onAnimationStart(n.animationName))})("animationend",function(n){f(e);let o=p();return _(o._onAnimationDone(n.animationName))})("animationcancel",function(n){f(e);let o=p();return _(o._onAnimationDone(n.animationName))}),Le(1,"div",1),fe(2),st()()}if(i&2){let e=p();ut(e._classList),I("mat-menu-panel-animations-disabled",e._animationsDisabled)("mat-menu-panel-exit-animation",e._panelAnimationState==="void")("mat-menu-panel-animating",e._isAnimating()),lt("id",e.panelId),q("aria-label",e.ariaLabel||null)("aria-labelledby",e.ariaLabelledby||null)("aria-describedby",e.ariaDescribedby||null)}}var je=new x("MAT_MENU_PANEL"),F=(()=>{class i{_elementRef=a(B);_document=a(ce);_focusMonitor=a(Be);_parentMenu=a(je,{optional:!0});_changeDetectorRef=a(be);role="menuitem";disabled=!1;disableRipple=!1;_hovered=new ae;_focused=new ae;_highlighted=!1;_triggersSubmenu=!1;constructor(){a(Me).load(kt),this._parentMenu?.addItem?.(this)}focus(e,t){this._focusMonitor&&e?this._focusMonitor.focusVia(this._getHostElement(),e,t):this._getHostElement().focus(t),this._focused.next(this)}ngAfterViewInit(){this._focusMonitor&&this._focusMonitor.monitor(this._elementRef,!1)}ngOnDestroy(){this._focusMonitor&&this._focusMonitor.stopMonitoring(this._elementRef),this._parentMenu&&this._parentMenu.removeItem&&this._parentMenu.removeItem(this),this._hovered.complete(),this._focused.complete()}_getTabIndex(){return this.disabled?"-1":"0"}_getHostElement(){return this._elementRef.nativeElement}_checkDisabled(e){this.disabled&&(e.preventDefault(),e.stopPropagation())}_handleMouseEnter(){this._hovered.next(this)}getLabel(){let e=this._elementRef.nativeElement.cloneNode(!0),t=e.querySelectorAll("mat-icon, .material-icons");for(let n=0;n<t.length;n++)t[n].remove();return e.textContent?.trim()||""}_setHighlighted(e){this._highlighted=e,this._changeDetectorRef.markForCheck()}_setTriggersSubmenu(e){this._triggersSubmenu=e,this._changeDetectorRef.markForCheck()}_hasFocus(){return this._document&&this._document.activeElement===this._getHostElement()}static \u0275fac=function(t){return new(t||i)};static \u0275cmp=b({type:i,selectors:[["","mat-menu-item",""]],hostAttrs:[1,"mat-mdc-menu-item","mat-focus-indicator"],hostVars:8,hostBindings:function(t,n){t&1&&D("click",function(r){return n._checkDisabled(r)})("mouseenter",function(){return n._handleMouseEnter()}),t&2&&(q("role",n.role)("tabindex",n._getTabIndex())("aria-disabled",n.disabled)("disabled",n.disabled||null),I("mat-mdc-menu-item-highlighted",n._highlighted)("mat-mdc-menu-item-submenu-trigger",n._triggersSubmenu))},inputs:{role:"role",disabled:[2,"disabled","disabled",T],disableRipple:[2,"disableRipple","disableRipple",T]},exportAs:["matMenuItem"],ngContentSelectors:vn,decls:5,vars:3,consts:[[1,"mat-mdc-menu-item-text"],["matRipple","",1,"mat-mdc-menu-ripple",3,"matRippleDisabled","matRippleTrigger"],["viewBox","0 0 5 10","focusable","false","aria-hidden","true",1,"mat-mdc-menu-submenu-icon"],["points","0,0 5,5 0,10"]],template:function(t,n){t&1&&(Fe(Mn),fe(0),s(1,"span",0),fe(2,1),l(),R(3,"div",1),O(4,yn,2,0,":svg:svg",2)),t&2&&(h(3),y("matRippleDisabled",n.disableRipple||n.disabled)("matRippleTrigger",n._getHostElement()),h(),A(n._triggersSubmenu?4:-1))},dependencies:[It],encapsulation:2})}return i})();var Cn=new x("MatMenuContent");var Sn=new x("mat-menu-default-options",{providedIn:"root",factory:()=>({overlapTrigger:!1,xPosition:"after",yPosition:"below",backdropClass:"cdk-overlay-transparent-backdrop"})}),ze="_mat-menu-enter",Ie="_mat-menu-exit",N=(()=>{class i{_elementRef=a(B);_changeDetectorRef=a(be);_injector=a(me);_keyManager;_xPosition;_yPosition;_firstItemFocusRef;_exitFallbackTimeout;_animationsDisabled=ne();_allItems;_directDescendantItems=new Qe;_classList={};_panelAnimationState="void";_animationDone=new ae;_isAnimating=Z(!1);parentMenu;direction;overlayPanelClass;backdropClass;ariaLabel;ariaLabelledby;ariaDescribedby;get xPosition(){return this._xPosition}set xPosition(e){this._xPosition=e,this.setPositionClasses()}get yPosition(){return this._yPosition}set yPosition(e){this._yPosition=e,this.setPositionClasses()}templateRef;items;lazyContent;overlapTrigger=!1;hasBackdrop;get panelClass(){return this._previousPanelClass}set panelClass(e){let t=this._previousPanelClass,n=k({},this._classList);t&&t.length&&t.split(" ").forEach(o=>{n[o]=!1}),this._previousPanelClass=e,e&&e.length&&(e.split(" ").forEach(o=>{n[o]=!0}),this._elementRef.nativeElement.className=""),this._classList=n}_previousPanelClass="";get classList(){return this.panelClass}set classList(e){this.panelClass=e}closed=new de;close=this.closed;panelId=a(ye).getId("mat-menu-panel-");constructor(){let e=a(Sn);this.overlayPanelClass=e.overlayPanelClass||"",this._xPosition=e.xPosition,this._yPosition=e.yPosition,this.backdropClass=e.backdropClass,this.overlapTrigger=e.overlapTrigger,this.hasBackdrop=e.hasBackdrop}ngOnInit(){this.setPositionClasses()}ngAfterContentInit(){this._updateDirectDescendants(),this._keyManager=new xt(this._directDescendantItems).withWrap().withTypeAhead().withHomeAndEnd(),this._keyManager.tabOut.subscribe(()=>this.closed.emit("tab")),this._directDescendantItems.changes.pipe(le(this._directDescendantItems),Pe(e=>se(...e.map(t=>t._focused)))).subscribe(e=>this._keyManager.updateActiveItem(e)),this._directDescendantItems.changes.subscribe(e=>{let t=this._keyManager;if(this._panelAnimationState==="enter"&&t.activeItem?._hasFocus()){let n=e.toArray(),o=Math.max(0,Math.min(n.length-1,t.activeItemIndex||0));n[o]&&!n[o].disabled?t.setActiveItem(o):t.setNextItemActive()}})}ngOnDestroy(){this._keyManager?.destroy(),this._directDescendantItems.destroy(),this.closed.complete(),this._firstItemFocusRef?.destroy(),clearTimeout(this._exitFallbackTimeout)}_hovered(){return this._directDescendantItems.changes.pipe(le(this._directDescendantItems),Pe(t=>se(...t.map(n=>n._hovered))))}addItem(e){}removeItem(e){}_handleKeydown(e){let t=e.keyCode,n=this._keyManager;switch(t){case 27:St(e)||(e.preventDefault(),this.closed.emit("keydown"));break;case 37:this.parentMenu&&this.direction==="ltr"&&this.closed.emit("keydown");break;case 39:this.parentMenu&&this.direction==="rtl"&&this.closed.emit("keydown");break;default:(t===38||t===40)&&n.setFocusOrigin("keyboard"),n.onKeydown(e);return}}focusFirstItem(e="program"){this._firstItemFocusRef?.destroy(),this._firstItemFocusRef=qe(()=>{let t=this._resolvePanel();if(!t||!t.contains(document.activeElement)){let n=this._keyManager;n.setFocusOrigin(e).setFirstItemActive(),!n.activeItem&&t&&t.focus()}},{injector:this._injector})}resetActiveItem(){this._keyManager.setActiveItem(-1)}setElevation(e){}setPositionClasses(e=this.xPosition,t=this.yPosition){this._classList=X(k({},this._classList),{"mat-menu-before":e==="before","mat-menu-after":e==="after","mat-menu-above":t==="above","mat-menu-below":t==="below"}),this._changeDetectorRef.markForCheck()}_onAnimationDone(e){let t=e===Ie;(t||e===ze)&&(t&&(clearTimeout(this._exitFallbackTimeout),this._exitFallbackTimeout=void 0),this._animationDone.next(t?"void":"enter"),this._isAnimating.set(!1))}_onAnimationStart(e){(e===ze||e===Ie)&&this._isAnimating.set(!0)}_setIsOpen(e){if(this._panelAnimationState=e?"enter":"void",e){if(this._keyManager.activeItemIndex===0){let t=this._resolvePanel();t&&(t.scrollTop=0)}}else this._animationsDisabled||(this._exitFallbackTimeout=setTimeout(()=>this._onAnimationDone(Ie),200));this._animationsDisabled&&setTimeout(()=>{this._onAnimationDone(e?ze:Ie)}),this._changeDetectorRef.markForCheck()}_updateDirectDescendants(){this._allItems.changes.pipe(le(this._allItems)).subscribe(e=>{this._directDescendantItems.reset(e.filter(t=>t._parentMenu===this)),this._directDescendantItems.notifyOnChanges()})}_resolvePanel(){let e=null;return this._directDescendantItems.length&&(e=this._directDescendantItems.first._getHostElement().closest('[role="menu"]')),e}static \u0275fac=function(t){return new(t||i)};static \u0275cmp=b({type:i,selectors:[["mat-menu"]],contentQueries:function(t,n,o){if(t&1&&ct(o,Cn,5)(o,F,5)(o,F,4),t&2){let r;J(r=ee())&&(n.lazyContent=r.first),J(r=ee())&&(n._allItems=r),J(r=ee())&&(n.items=r)}},viewQuery:function(t,n){if(t&1&&dt(Je,5),t&2){let o;J(o=ee())&&(n.templateRef=o.first)}},hostVars:3,hostBindings:function(t,n){t&2&&q("aria-label",null)("aria-labelledby",null)("aria-describedby",null)},inputs:{backdropClass:"backdropClass",ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],ariaDescribedby:[0,"aria-describedby","ariaDescribedby"],xPosition:"xPosition",yPosition:"yPosition",overlapTrigger:[2,"overlapTrigger","overlapTrigger",T],hasBackdrop:[2,"hasBackdrop","hasBackdrop",e=>e==null?null:T(e)],panelClass:[0,"class","panelClass"],classList:"classList"},outputs:{closed:"closed",close:"close"},exportAs:["matMenu"],features:[gt([{provide:je,useExisting:i}])],ngContentSelectors:Dn,decls:1,vars:0,consts:[["tabindex","-1","role","menu",1,"mat-mdc-menu-panel",3,"click","animationstart","animationend","animationcancel","id"],[1,"mat-mdc-menu-content"]],template:function(t,n){t&1&&(Fe(),it(0,Tn,3,12,"ng-template"))},styles:[`mat-menu {
  display: none;
}

.mat-mdc-menu-content {
  margin: 0;
  padding: 8px 0;
  outline: 0;
}
.mat-mdc-menu-content,
.mat-mdc-menu-content .mat-mdc-menu-item .mat-mdc-menu-item-text {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  flex: 1;
  white-space: normal;
  font-family: var(--%NS%mat-menu-item-label-text-font, var(--%NS%mat-sys-label-large-font));
  line-height: var(--%NS%mat-menu-item-label-text-line-height, var(--%NS%mat-sys-label-large-line-height));
  font-size: var(--%NS%mat-menu-item-label-text-size, var(--%NS%mat-sys-label-large-size));
  letter-spacing: var(--%NS%mat-menu-item-label-text-tracking, var(--%NS%mat-sys-label-large-tracking));
  font-weight: var(--%NS%mat-menu-item-label-text-weight, var(--%NS%mat-sys-label-large-weight));
}

@keyframes _mat-menu-enter {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes _mat-menu-exit {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
.mat-mdc-menu-panel {
  min-width: 112px;
  max-width: 280px;
  overflow: auto;
  box-sizing: border-box;
  outline: 0;
  animation: _mat-menu-enter 120ms cubic-bezier(0, 0, 0.2, 1);
  border-radius: var(--%NS%mat-menu-container-shape, var(--%NS%mat-sys-corner-extra-small));
  background-color: var(--%NS%mat-menu-container-color, var(--%NS%mat-sys-surface-container));
  box-shadow: var(--%NS%mat-menu-container-elevation-shadow, 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12));
  will-change: transform, opacity;
}
.mat-mdc-menu-panel.mat-menu-panel-exit-animation {
  animation: _mat-menu-exit 100ms 25ms linear forwards;
}
.mat-mdc-menu-panel.mat-menu-panel-animations-disabled {
  animation: none;
}
.mat-mdc-menu-panel.mat-menu-panel-animating {
  pointer-events: none;
}
.mat-mdc-menu-panel.mat-menu-panel-animating:has(.mat-mdc-menu-content:empty) {
  display: none;
}
@media (forced-colors: active) {
  .mat-mdc-menu-panel {
    outline: solid 1px;
  }
}
.mat-mdc-menu-panel .mat-divider {
  border-top-color: var(--%NS%mat-menu-divider-color, var(--%NS%mat-sys-surface-variant));
  margin-bottom: var(--%NS%mat-menu-divider-bottom-spacing, 8px);
  margin-top: var(--%NS%mat-menu-divider-top-spacing, 8px);
}

.mat-mdc-menu-item {
  display: flex;
  position: relative;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
  padding: 0;
  cursor: pointer;
  width: 100%;
  text-align: left;
  box-sizing: border-box;
  color: inherit;
  font-size: inherit;
  background: none;
  text-decoration: none;
  margin: 0;
  min-height: 48px;
  padding-left: var(--%NS%mat-menu-item-leading-spacing, 12px);
  padding-right: var(--%NS%mat-menu-item-trailing-spacing, 12px);
  -webkit-user-select: none;
  user-select: none;
  cursor: pointer;
  outline: none;
  border: none;
  -webkit-tap-highlight-color: transparent;
}
.mat-mdc-menu-item::-moz-focus-inner {
  border: 0;
}
[dir=rtl] .mat-mdc-menu-item {
  padding-left: var(--%NS%mat-menu-item-trailing-spacing, 12px);
  padding-right: var(--%NS%mat-menu-item-leading-spacing, 12px);
}
.mat-mdc-menu-item:has(.material-icons, mat-icon, [matButtonIcon]) {
  padding-left: var(--%NS%mat-menu-item-with-icon-leading-spacing, 12px);
  padding-right: var(--%NS%mat-menu-item-with-icon-trailing-spacing, 12px);
}
[dir=rtl] .mat-mdc-menu-item:has(.material-icons, mat-icon, [matButtonIcon]) {
  padding-left: var(--%NS%mat-menu-item-with-icon-trailing-spacing, 12px);
  padding-right: var(--%NS%mat-menu-item-with-icon-leading-spacing, 12px);
}
.mat-mdc-menu-item, .mat-mdc-menu-item:visited, .mat-mdc-menu-item:link {
  color: var(--%NS%mat-menu-item-label-text-color, var(--%NS%mat-sys-on-surface));
}
.mat-mdc-menu-item .mat-icon-no-color,
.mat-mdc-menu-item .mat-mdc-menu-submenu-icon {
  color: var(--%NS%mat-menu-item-icon-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-mdc-menu-item[disabled] {
  cursor: default;
  opacity: 0.38;
}
.mat-mdc-menu-item[disabled]::after {
  display: block;
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
.mat-mdc-menu-item:focus {
  outline: 0;
}
.mat-mdc-menu-item .mat-icon {
  flex-shrink: 0;
  margin-right: var(--%NS%mat-menu-item-spacing, 12px);
  height: var(--%NS%mat-menu-item-icon-size, 24px);
  width: var(--%NS%mat-menu-item-icon-size, 24px);
}
[dir=rtl] .mat-mdc-menu-item {
  text-align: right;
}
[dir=rtl] .mat-mdc-menu-item .mat-icon {
  margin-right: 0;
  margin-left: var(--%NS%mat-menu-item-spacing, 12px);
}
.mat-mdc-menu-item:not([disabled]):hover {
  background-color: var(--%NS%mat-menu-item-hover-state-layer-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) calc(var(--%NS%mat-sys-hover-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-menu-item:not([disabled]).cdk-program-focused, .mat-mdc-menu-item:not([disabled]).cdk-keyboard-focused, .mat-mdc-menu-item:not([disabled]).mat-mdc-menu-item-highlighted {
  background-color: var(--%NS%mat-menu-item-focus-state-layer-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) calc(var(--%NS%mat-sys-focus-state-layer-opacity) * 100%), transparent));
}
@media (forced-colors: active) {
  .mat-mdc-menu-item {
    margin-top: 1px;
  }
}

.mat-mdc-menu-submenu-icon {
  width: var(--%NS%mat-menu-item-icon-size, 24px);
  height: 10px;
  fill: currentColor;
  padding-left: var(--%NS%mat-menu-item-spacing, 12px);
}
[dir=rtl] .mat-mdc-menu-submenu-icon {
  padding-right: var(--%NS%mat-menu-item-spacing, 12px);
  padding-left: 0;
}
[dir=rtl] .mat-mdc-menu-submenu-icon polygon {
  transform: scaleX(-1);
  transform-origin: center;
}
@media (forced-colors: active) {
  .mat-mdc-menu-submenu-icon {
    fill: CanvasText;
  }
}

.mat-mdc-menu-item .mat-mdc-menu-ripple {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
}
`],encapsulation:2})}return i})(),xn=new x("mat-menu-scroll-strategy",{providedIn:"root",factory:()=>{let i=a(me);return()=>Ft(i)}});var U=new WeakMap,wn=(()=>{class i{_canHaveBackdrop;_element=a(B);_viewContainerRef=a(tt);_menuItemInstance=a(F,{optional:!0,self:!0});_dir=a(Et,{optional:!0});_focusMonitor=a(Be);_ngZone=a(ue);_injector=a(me);_scrollStrategy=a(xn);_changeDetectorRef=a(be);_animationsDisabled=ne();_portal;_overlayRef=null;_menuOpen=!1;_closingActionsSubscription=re.EMPTY;_menuCloseSubscription=re.EMPTY;_pendingRemoval;_parentMaterialMenu;_parentInnerPadding;_openedBy=void 0;get _menu(){return this._menuInternal}set _menu(e){e!==this._menuInternal&&(this._menuInternal=e,this._menuCloseSubscription.unsubscribe(),e?(this._parentMaterialMenu,this._menuCloseSubscription=e.close.subscribe(t=>{this._destroyMenu(t),(t==="click"||t==="tab")&&this._parentMaterialMenu&&this._parentMaterialMenu.closed.emit(t)})):this._destroyMenu(),this._menuItemInstance?._setTriggersSubmenu(this._triggersSubmenu()))}_menuInternal=null;constructor(e){this._canHaveBackdrop=e;let t=a(je,{optional:!0});this._parentMaterialMenu=t instanceof N?t:void 0}ngOnDestroy(){this._menu&&this._ownsMenu(this._menu)&&U.delete(this._menu),this._pendingRemoval?.unsubscribe(),this._menuCloseSubscription.unsubscribe(),this._closingActionsSubscription.unsubscribe(),this._overlayRef&&(this._overlayRef.dispose(),this._overlayRef=null)}get menuOpen(){return this._menuOpen}get dir(){return this._dir&&this._dir.value==="rtl"?"rtl":"ltr"}_triggersSubmenu(){return!!(this._menuItemInstance&&this._parentMaterialMenu&&this._menu)}_closeMenu(){this._menu?.close.emit()}_openMenu(e){if(this._triggerIsAriaDisabled())return;let t=this._menu;if(this._menuOpen||!t)return;this._pendingRemoval?.unsubscribe();let n=U.get(t);U.set(t,this),n&&n!==this&&n._closeMenu();let o=this._createOverlay(t),r=o.getConfig(),m=r.positionStrategy;this._setPosition(t,m),this._canHaveBackdrop?r.hasBackdrop=t.hasBackdrop==null?!this._triggersSubmenu():t.hasBackdrop:r.hasBackdrop=t.hasBackdrop??!1,o.hasAttached()||(o.attach(this._getPortal(t)),t.lazyContent?.attach(this.menuData)),this._closingActionsSubscription=this._menuClosingActions().subscribe(()=>this._closeMenu()),t.parentMenu=this._triggersSubmenu()?this._parentMaterialMenu:void 0,t.direction=this.dir,e&&t.focusFirstItem(this._openedBy||"program"),this._setIsMenuOpen(!0),t instanceof N&&(t._setIsOpen(!0),t._directDescendantItems.changes.pipe(We(t.close)).subscribe(()=>{m.withLockedPosition(!1).reapplyLastPosition(),m.withLockedPosition(!0)}))}focus(e,t){this._focusMonitor&&e?this._focusMonitor.focusVia(this._element,e,t):this._element.nativeElement.focus(t)}_destroyMenu(e){let t=this._overlayRef,n=this._menu;!t||!this.menuOpen||(this._closingActionsSubscription.unsubscribe(),this._pendingRemoval?.unsubscribe(),n instanceof N&&this._ownsMenu(n)?(this._pendingRemoval=n._animationDone.pipe(Ue(1)).subscribe(()=>{t.detach(),U.has(n)||n.lazyContent?.detach()}),n._setIsOpen(!1)):(t.detach(),n?.lazyContent?.detach()),n&&this._ownsMenu(n)&&U.delete(n),this.restoreFocus&&(e==="keydown"||!this._openedBy||!this._triggersSubmenu())&&this.focus(this._openedBy),this._openedBy=void 0,this._setIsMenuOpen(!1))}_setIsMenuOpen(e){e!==this._menuOpen&&(this._menuOpen=e,this._menuOpen?this.menuOpened.emit():this.menuClosed.emit(),this._triggersSubmenu()&&this._menuItemInstance._setHighlighted(e),this._changeDetectorRef.markForCheck())}_createOverlay(e){if(!this._overlayRef){let t=this._getOverlayConfig(e);this._subscribeToPositions(e,t.positionStrategy),this._overlayRef=jt(this._injector,t),this._overlayRef.keydownEvents().subscribe(n=>{this._menu instanceof N&&this._menu._handleKeydown(n)})}return this._overlayRef}_getOverlayConfig(e){return new Bt({positionStrategy:zt(this._injector,this._getOverlayOrigin()).withLockedPosition().withGrowAfterOpen().withTransformOriginOn(".mat-menu-panel, .mat-mdc-menu-panel"),backdropClass:e.backdropClass||"cdk-overlay-transparent-backdrop",panelClass:e.overlayPanelClass,scrollStrategy:this._scrollStrategy(),direction:this._dir||"ltr",disableAnimations:this._animationsDisabled})}_subscribeToPositions(e,t){e.setPositionClasses&&t.positionChanges.subscribe(n=>{this._ngZone.run(()=>{let o=n.connectionPair.overlayX==="start"?"after":"before",r=n.connectionPair.overlayY==="top"?"below":"above";e.setPositionClasses(o,r)})})}_setPosition(e,t){let[n,o]=e.xPosition==="before"?["end","start"]:["start","end"],[r,m]=e.yPosition==="above"?["bottom","top"]:["top","bottom"],[C,Ne]=[r,m],[Oe,Ae]=[n,o],G=0;if(this._triggersSubmenu()){if(Ae=n=e.xPosition==="before"?"start":"end",o=Oe=n==="end"?"start":"end",this._parentMaterialMenu){if(this._parentInnerPadding==null){let He=this._parentMaterialMenu.items.first;this._parentInnerPadding=He?He._getHostElement().offsetTop:0}G=r==="bottom"?this._parentInnerPadding:-this._parentInnerPadding}}else e.overlapTrigger||(C=r==="top"?"bottom":"top",Ne=m==="top"?"bottom":"top");t.withPositions([{originX:n,originY:C,overlayX:Oe,overlayY:r,offsetY:G},{originX:o,originY:C,overlayX:Ae,overlayY:r,offsetY:G},{originX:n,originY:Ne,overlayX:Oe,overlayY:m,offsetY:-G},{originX:o,originY:Ne,overlayX:Ae,overlayY:m,offsetY:-G}])}_menuClosingActions(){let e=this._getOutsideClickStream(this._overlayRef),t=this._overlayRef.detachments(),n=this._parentMaterialMenu?this._parentMaterialMenu.closed:Re(),o=this._parentMaterialMenu?this._parentMaterialMenu._hovered().pipe(Ye(r=>this._menuOpen&&r!==this._menuItemInstance)):Re();return se(e,n,o,t)}_getPortal(e){return(!this._portal||this._portal.templateRef!==e.templateRef)&&(this._portal=new Lt(e.templateRef,this._viewContainerRef)),this._portal}_ownsMenu(e){return U.get(e)===this}_triggerIsAriaDisabled(){return T(this._element.nativeElement.getAttribute("aria-disabled"))}static \u0275fac=function(t){et()};static \u0275dir=Q({type:i})}return i})(),ke=(()=>{class i extends wn{_cleanupTouchstart;_hoverSubscription=re.EMPTY;get _deprecatedMatMenuTriggerFor(){return this.menu}set _deprecatedMatMenuTriggerFor(e){this.menu=e}get menu(){return this._menu}set menu(e){this._menu=e}menuData;restoreFocus=!0;menuOpened=new de;onMenuOpen=this.menuOpened;menuClosed=new de;onMenuClose=this.menuClosed;constructor(){super(!0);let e=a(pe);this._cleanupTouchstart=e.listen(this._element.nativeElement,"touchstart",t=>{Dt(t)||(this._openedBy="touch")},{passive:!0})}triggersSubmenu(){return super._triggersSubmenu()}toggleMenu(){return this.menuOpen?this.closeMenu():this.openMenu()}openMenu(){this._openMenu(!0)}closeMenu(){this._closeMenu()}updatePosition(){this._overlayRef?.updatePosition()}ngAfterContentInit(){this._handleHover()}ngOnDestroy(){super.ngOnDestroy(),this._cleanupTouchstart(),this._hoverSubscription.unsubscribe()}_getOverlayOrigin(){return this._element}_getOutsideClickStream(e){return e.backdropClick()}_handleMousedown(e){yt(e)||(this._openedBy=e.button===0?"mouse":void 0,this.triggersSubmenu()&&e.preventDefault())}_handleKeydown(e){let t=e.keyCode;(t===13||t===32)&&(this._openedBy="keyboard"),this.triggersSubmenu()&&(t===39&&this.dir==="ltr"||t===37&&this.dir==="rtl")&&(this._openedBy="keyboard",this.openMenu())}_handleClick(e){this.triggersSubmenu()?(e.stopPropagation(),this.openMenu()):this.toggleMenu()}_handleHover(){this.triggersSubmenu()&&this._parentMaterialMenu&&(this._hoverSubscription=this._parentMaterialMenu._hovered().subscribe(e=>{e===this._menuItemInstance&&!e.disabled&&this._parentMaterialMenu?._panelAnimationState!=="void"&&(this._openedBy="mouse",this._openMenu(!1))}))}static \u0275fac=function(t){return new(t||i)};static \u0275dir=Q({type:i,selectors:[["","mat-menu-trigger-for",""],["","matMenuTriggerFor",""]],hostAttrs:[1,"mat-mdc-menu-trigger"],hostVars:3,hostBindings:function(t,n){t&1&&D("click",function(r){return n._handleClick(r)})("mousedown",function(r){return n._handleMousedown(r)})("keydown",function(r){return n._handleKeydown(r)}),t&2&&q("aria-haspopup",n.menu?"menu":null)("aria-expanded",n.menuOpen)("aria-controls",n.menuOpen?n.menu?.panelId:null)},inputs:{_deprecatedMatMenuTriggerFor:[0,"mat-menu-trigger-for","_deprecatedMatMenuTriggerFor"],menu:[0,"matMenuTriggerFor","menu"],menuData:[0,"matMenuTriggerData","menuData"],restoreFocus:[0,"matMenuTriggerRestoreFocus","restoreFocus"]},outputs:{menuOpened:"menuOpened",onMenuOpen:"onMenuOpen",menuClosed:"menuClosed",onMenuClose:"onMenuClose"},exportAs:["matMenuTrigger"],features:[nt]})}return i})();var W=(()=>{class i{static \u0275fac=function(t){return new(t||i)};static \u0275mod=w({type:i});static \u0275inj=S({imports:[Nt,Te,j,De]})}return i})();var $=(()=>{class i{static \u0275fac=function(t){return new(t||i)};static \u0275mod=w({type:i});static \u0275inj=S({imports:[ve,Te,j,De]})}return i})();function In(i,g){if(i&1){let e=E();s(0,"button",4),D("click",function(){let n=f(e).$implicit,o=p();return _(o.selectTheme(n.filePath))}),s(1,"mat-icon",5),c(2),l(),s(3,"span"),c(4),l()()}if(i&2){let e=g.$implicit,t=p();h(),I("docs-theme-selected-icon",t.currentTheme===e.filePath),y("color",t.currentTheme===e.filePath?"accent":void 0),h(),_e(" ",t.currentTheme===e.filePath?"radio_button_checked":"radio_button_unchecked"," "),h(2),pt(e.display)}}var nn=(()=>{class i{themes;get currentTheme(){return v.selectedTheme}constructor(){this.themes=d.themesDic?Object.keys(d.themesDic).map(e=>{let t=d.themesDic[e];return{display:t.display,filePath:e,dark:t.dark}}):void 0}selectTheme(e){v.loadTheme(e)}static \u0275fac=function(t){return new(t||i)};static \u0275cmp=b({type:i,selectors:[["theme-nm-menu"]],decls:7,vars:1,consts:[["themeMenu","matMenu"],["mat-icon-button","","aria-label","Select a theme","matTooltip","Select a theme",1,"docs-theme-picker-trigger",3,"mat-menu-trigger-for"],["xPosition","before",1,"docs-theme-picker-menu"],["mat-menu-item",""],["mat-menu-item","",3,"click"],[3,"color"]],template:function(t,n){if(t&1&&(s(0,"button",1)(1,"mat-icon"),c(2,"format_color_fill"),l()(),s(3,"mat-menu",2,0),he(5,In,5,5,"button",3,at),l()),t&2){let o=te(4);y("mat-menu-trigger-for",o),h(5),ge(n.themes)}},dependencies:[Y,H,V,z,M,$,P,W,N,F,ke],encapsulation:2})}return i})();function kn(i,g){if(i&1&&(s(0,"button",1)(1,"mat-icon"),c(2,"format_color_fill"),l()()),i&2){p();let e=te(3);y("matMenuTriggerFor",e)}}function En(i,g){if(i&1&&(s(0,"button",2),c(1,"Themes"),l()),i&2){p();let e=te(3);y("matMenuTriggerFor",e)}}function Nn(i,g){i&1&&(s(0,"span"),c(1,"\u2713"),l())}function On(i,g){if(i&1){let e=E();s(0,"button",4),D("click",function(){let n=f(e).$implicit,o=p();return _(o.selectTheme(n.filePath))}),s(1,"span"),c(2),l(),O(3,Nn,2,0,"span"),l()}if(i&2){let e=g.$implicit,t=p();h(2),_e("",e.display," "),h(),A(e.filePath==t.currentTheme?3:-1)}}var on=(()=>{class i{themes;get currentTheme(){return v.selectedTheme}menuTriggerElement="Button";constructor(){this.themes=d.themesDic?Object.keys(d.themesDic).map(e=>{let t=d.themesDic[e];return{display:t.display,filePath:e,dark:t.dark}}):void 0}selectTheme(e){v.loadTheme(e)}static \u0275fac=function(t){return new(t||i)};static \u0275cmp=b({type:i,selectors:[["theme-menu"]],inputs:{menuTriggerElement:"menuTriggerElement"},decls:6,vars:1,consts:[["themesMenu","matMenu"],["mat-icon-button","","aria-label","Select a theme","matTooltip","Select a theme",1,"docs-theme-picker-trigger",3,"matMenuTriggerFor"],["mat-menu-item","",3,"matMenuTriggerFor"],["mat-menu-item","","type","button"],["mat-menu-item","","type","button",3,"click"]],template:function(t,n){t&1&&(O(0,kn,3,1,"button",1)(1,En,2,1,"button",2),s(2,"mat-menu",null,0),he(4,On,4,2,"button",3,rt),l()),t&2&&(A(n.menuTriggerElement==="Button"?0:n.menuTriggerElement==="Menu"?1:-1),h(4),ge(n.themes))},dependencies:[Y,H,V,z,M,$,P,W,N,F,ke],encapsulation:2})}return i})();function An(i,g){if(i&1){let e=E();s(0,"div",6)(1,"div",7)(2,"button",8),ot("bounce-in-down"),D("click",function(){f(e);let n=p();return _(n.showNotifications())}),s(3,"mat-icon",9),c(4,"notifications"),l()()()()}if(i&2){let e=p();h(2),I("flash",e.flashActive()),h(),y("matBadge",ht(e.notificationsCount()))}}var rn=(()=>{class i{alertService;notificationsService;actionSheetItemSubjectService;title="demoapp";flashActive=Z(!1);notificationsCount=Z(0);triggerFlash(){this.flashActive.set(!1),queueMicrotask(()=>{this.flashActive.set(!0),setTimeout(()=>this.flashActive.set(!1),800)})}themes;get currentTheme(){return v.selectedTheme}constructor(e,t,n,o){this.alertService=e,this.notificationsService=t,this.actionSheetItemSubjectService=n,o.setDefaultFontSetClass("material-symbols-outlined"),this.themes=d.themesDic?Object.keys(d.themesDic).map(r=>{let m=d.themesDic[r];return{display:m.display,filePath:r,dark:m.dark}}):void 0,this.alertService.initOnce(),this.actionSheetItemSubjectService.getMessage().subscribe(r=>{this.syncNotificationsCount(),this.triggerFlash(),this.showNotifications()})}ngOnInit(){}syncNotificationsCount(){this.notificationsCount.set(this.notificationsService.items.length)}showNotifications(){this.notificationsService.open("Notifications").subscribe(e=>{e&&(e.actionType==="test"&&(e.actionLabel?this.alertService.notify(e.message,e.actionLabel):this.alertService.notify(e.message)),this.notificationsService.remove(e),this.syncNotificationsCount())})}ngOnDestroy(){}showAbout(){let e=Kt.dependencies["@angular/material"].replace("^","");this.alertService.info(`Angular: ${$e.full}; Angular Material: ${e}`,!1)}static \u0275fac=function(t){return new(t||i)(K(Ut),K(we),K(xe),K(At))};static \u0275cmp=b({type:i,selectors:[["app-root"]],decls:26,vars:1,consts:[[1,"fx-column-gap-1"],["routerLink","/demo","value","demo","mat-raised-button",""],["mat-raised-button","","onclick","window.open('https://zijianhuang.github.io/nmce/documentation/', '_blank')"],["mat-raised-button","","onclick","window.open('https://github.com/zijianhuang/nmce', '_blank')"],["mat-raised-button","",3,"click"],[1,"container-fluid","app-container","data-area"],[1,"fixed-bottom"],[1,"fx-column-gap-half","fx-align-end-end"],["type","button","mat-icon-button","","matTooltip","Show notifications",3,"click"],["matBadgeColor","warn",3,"matBadge"]],template:function(t,n){t&1&&(s(0,"div",0)(1,"button",1)(2,"span"),c(3,"Demo"),l(),s(4,"mat-icon"),c(5,"playground"),l()(),s(6,"button",2)(7,"span"),c(8,"Documentation"),l(),s(9,"mat-icon"),c(10,"book_2"),l()(),s(11,"button",3)(12,"span"),c(13,"Repository"),l(),s(14,"mat-icon"),c(15,"star"),l()(),R(16,"theme-menu"),s(17,"button",4),D("click",function(){return n.showAbout()}),s(18,"span"),c(19,"About"),l(),s(20,"mat-icon"),c(21,"info"),l()(),R(22,"theme-nm-menu"),l(),s(23,"div",5),R(24,"router-outlet"),l(),O(25,An,5,4,"div",6)),t&2&&(h(25),A(n.notificationsCount()?25:-1))},dependencies:[Y,H,V,Ot,z,Zt,Xt,M,Rt,Pt,$,P,W,on,nn],styles:["@keyframes _ngcontent-%COMP%_bounceInDown{0%,60%,75%,90%,to{animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;transform:translate3d(0,-300px,0)}60%{opacity:1;transform:translate3d(0,25px,0)}75%{transform:translate3d(0,-10px,0)}90%{transform:translate3d(0,5px,0)}to{transform:translateZ(0)}}.bounce-in-down[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_bounceInDown 1s both}@keyframes _ngcontent-%COMP%_flash{0%,50%,to{opacity:1}25%,75%{opacity:.25}}.flash[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_flash .8s}"],changeDetection:1})}return i})();var Rn=[{path:"demo",loadChildren:()=>import("./chunk-5NE4KM3W.js").then(i=>i.DemoModule)}],an=(()=>{class i{static \u0275fac=function(t){return new(t||i)};static \u0275mod=w({type:i});static \u0275inj=S({imports:[M.forRoot(Rn),M]})}return i})();var Ee=new x("MAT_LUXON_DATE_ADAPTER_OPTIONS",{providedIn:"root",factory:()=>({useUtc:!1,defaultOutputCalendar:"gregory"})});function Pn(i,g){let e=Array(i);for(let t=0;t<i;t++)e[t]=g(t);return e}var sn=(()=>{class i extends oe{_useUTC;_firstDayOfWeek;_defaultOutputCalendar;constructor(){super();let e=a(ie,{optional:!0}),t=a(Ee,{optional:!0});this._useUTC=!!t?.useUtc,this._firstDayOfWeek=t?.firstDayOfWeek,this._defaultOutputCalendar=t?.defaultOutputCalendar||"gregory",this.setLocale(e||u.local().locale)}getYear(e){return e.year}getMonth(e){return e.month-1}getDate(e){return e.day}getDayOfWeek(e){return e.weekday}getMonthNames(e){return Ce.months(e,{locale:this.locale,outputCalendar:this._defaultOutputCalendar})}getDateNames(){let e=new Intl.DateTimeFormat(this.locale,{day:"numeric",timeZone:"utc"});return Pn(31,t=>e.format(u.utc(2017,1,t+1).toJSDate()))}getDayOfWeekNames(e){let t=Ce.weekdays(e,{locale:this.locale});return t.unshift(t.pop()),t}getYearName(e){return e.toFormat("yyyy",this._getOptions())}getFirstDayOfWeek(){return this._firstDayOfWeek??Ce.getStartOfWeek({locale:this.locale})}getNumDaysInMonth(e){return e.daysInMonth}clone(e){return u.fromObject(e.toObject(),X(k({},this._getOptions()),{zone:e.zone}))}createDate(e,t,n){let o=this._getOptions();if(t<0||t>11)throw Error(`Invalid month index "${t}". Month index has to be between 0 and 11.`);if(n<1)throw Error(`Invalid date "${n}". Date has to be greater than 0.`);let r=this._useUTC?u.utc(e,t+1,n,o):u.local(e,t+1,n,o);if(!this.isValid(r))throw Error(`Invalid date "${n}". Reason: "${r.invalidReason}".`);return r}today(){let e=this._getOptions();return this._useUTC?u.utc(e):u.local(e)}parse(e,t){let n=this._getOptions();if(typeof e=="string"&&e.length>0){let o=u.fromISO(e,n);if(this.isValid(o))return o;let r=Array.isArray(t)?t:[t];if(!t.length)throw Error("Formats array must not be empty.");for(let m of r){let C=u.fromFormat(e,m,n);if(this.isValid(C))return C}return this.invalid()}else{if(typeof e=="number")return u.fromMillis(e,n);if(e instanceof Date)return u.fromJSDate(e,n);if(e instanceof u)return u.fromMillis(e.toMillis(),n)}return null}format(e,t){if(!this.isValid(e))throw Error("LuxonDateAdapter: Cannot format invalid date.");return this._useUTC?e.setLocale(this.locale).setZone("utc").toFormat(t):e.setLocale(this.locale).toFormat(t)}addCalendarYears(e,t){return e.reconfigure(this._getOptions()).plus({years:t})}addCalendarMonths(e,t){return e.reconfigure(this._getOptions()).plus({months:t})}addCalendarDays(e,t){return e.reconfigure(this._getOptions()).plus({days:t})}toIso8601(e){return e.toISO()}deserialize(e){let t=this._getOptions(),n;if(e instanceof Date&&(n=u.fromJSDate(e,t)),typeof e=="string"){if(!e)return null;n=u.fromISO(e,t)}return n&&this.isValid(n)?n:super.deserialize(e)}isDateInstance(e){return e instanceof u}isValid(e){return e.isValid}invalid(){return u.invalid("Invalid Luxon DateTime object.")}setTime(e,t,n,o){return this.clone(e).set({hour:t,minute:n,second:o,millisecond:0})}getHours(e){return e.hour}getMinutes(e){return e.minute}getSeconds(e){return e.second}parseTime(e,t){let n=this.parse(e,t);return(!n||!this.isValid(n))&&typeof e=="string"&&this.parse(e.replace(/[^0-9:(AM|PM)]/gi,""),t)||n}addSeconds(e,t){return e.reconfigure(this._getOptions()).plus({seconds:t})}_getOptions(){return{zone:this._useUTC?"utc":void 0,locale:this.locale,outputCalendar:this._defaultOutputCalendar}}static \u0275fac=function(t){return new(t||i)};static \u0275prov=Ke({token:i,factory:i.\u0275fac,autoProvided:!1})}return i})(),ln={parse:{dateInput:"D",timeInput:"t"},display:{dateInput:"D",timeInput:"t",monthYearLabel:"LLL yyyy",dateA11yLabel:"DD",monthYearA11yLabel:"LLLL yyyy",timeOptionLabel:"t"}};var mn={providers:[Ze(),ft(),Ge(bt,an,M,Wt),{provide:Yt,useFactory:()=>({useIcon:!0,useTitle:!0})},Mt(vt()),{provide:"print.cssUrl",useValue:"print190826.css"},{provide:Ht,useValue:"center"},{provide:Vt,useValue:{appearance:"outline"}},we,xe,{provide:oe,useClass:sn,deps:[ie,Ee]},{provide:Se,useValue:ln},{provide:Ee,useValue:{useUtc:!0}}]};$t.production&&void 0;console.debug(`Main Startup selectedTheme: ${v.selectedTheme}`);v.init();_t(rn,mn).catch(i=>console.error(i));
/**i18n:787ddd91308a8d98b6c965fbe09c702a4c456437fcf951dfed202e17fd0e14f8*/
