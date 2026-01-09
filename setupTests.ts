// Prevent Angular i18n from crashing tests
(globalThis as any).$localize = (strs: TemplateStringsArray, ...args: any[]) =>
  String.raw(strs, ...args);

import 'zone.js'; 
import 'zone.js/testing';
import { TestBed } from '@angular/core/testing';
import {
  BrowserTestingModule,
  platformBrowserTesting,
} from '@angular/platform-browser/testing';

TestBed.initTestEnvironment(
  BrowserTestingModule,
  platformBrowserTesting()
);
