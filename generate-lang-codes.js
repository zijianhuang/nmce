// generate language codes declared in angular.json
// run `node generate-lang-codes.js` to update src/app/locales.auto.ts, src/app/locales.auto.html and locales.auto.ps1
const fs = require('fs');

const angularJson = JSON.parse(
  fs.readFileSync('angular.json', 'utf8')
);

const locales = [
  angularJson.projects['demoapp'].i18n.sourceLocale.code,
  ...Object.keys(
    angularJson.projects['demoapp'].i18n.locales
  )
];

// Generate locales.auto.ts
fs.writeFileSync(
  'projects/demoapp/src/app/locales.auto.ts',
  `export const SUPPORTED_LOCALES : string[] = ${JSON.stringify(locales, null, 2)} as const;`
);

// --- write the HTML link list ---
function getLanguageDisplayObject(code) {
  const dn = new Intl.DisplayNames(['en'], { type: 'language' });
  const dnLocalized = new Intl.DisplayNames([code], { type: 'language' });
  return {
    code,
    display: dn.of(code),
    localizedDisplay: dnLocalized.of(code),
  };
}

// Generate locales.auto.ps1
const csvText = locales.map((code) => `"${code}"`).join(', ');
const ps1 = `$names = @(${csvText})\nreturn $names`;
fs.writeFileSync('locales.auto.ps1', ps1);

// Generate locales.auto.html which will be used in the onboarding page
const listItems = locales
  .map((code) => {
    const { display, localizedDisplay } = getLanguageDisplayObject(code);
    const label =
      display === localizedDisplay
        ? display
        : `${display} ~ ${localizedDisplay}`;
    return `\t\t<li><a href="${code}/">${label}</a></li>`;
  })
  .join('\n');
 
const html = `\t<ul>\n${listItems}\n\t</ul>\n`;
fs.writeFileSync('projects/demoapp/src/app/locales.auto.html', html);

console.log(locales);