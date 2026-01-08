// Prevent Angular i18n from crashing tests
(globalThis as any).$localize = (strs: TemplateStringsArray, ...args: any[]) =>
  String.raw(strs, ...args);