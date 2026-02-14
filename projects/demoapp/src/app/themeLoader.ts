import { AppConfigConstants } from "../environments/environment.common";

/**
 * Helper class to load default theme or selected theme among themes stored together with the app's deployment, rather than external links.
 * index.html should not have the theme css link during design time.
 * In addition to the main theme which could be one the prebuilt themes like one of those of Angular Material, the app may has its own app css file for colors.
 * And the dark one should be `colors-dark.css` and the light one should be `colors.css`.
 */
export class ThemeLoader {
  private static readonly key = 'app.theme'; //the key for storing selected theme filename. Generally no need to change
  private static readonly themeLinkId = 'theme';
  private static readonly appColorsLinkId = 'app-colors';
  private static readonly colorsCss = 'colors.css';
  private static readonly colorsDarkCss = 'colors-dark.css'; // if your app use light only or dark only, just make colorsCss and colorsDarkCss the same filename.

  /**
   * selected theme file name saved in localStorage.
   */
  static get selectedTheme(): string | null {
    return localStorage.getItem(this.key);
  };
  static set selectedTheme(v: string) {
    localStorage.setItem(this.key, v);
  };

  /**
   * 
   * @param picked one of the prebuilt themes, typically used with the app's theme picker.
   * or null for the first one in themesDic, typically used before calling `bootstrapApplication()`.
   * @param appColorsDir if the app is using prebuilt theme only for all color styling, this parameter could be ignore. 
   * Otherwise, null means that colors.css or colors-dark.css is in the root, 
   * or a value like 'conf/' is for the directory under root,
   * or undefined means the app uses theme only for color.
   */
  static loadTheme(picked: string | null, appColorsDir?: string | null) {
    if (!AppConfigConstants.themesDic || Object.keys(AppConfigConstants.themesDic).length === 0) {
      console.error('Need AppConfigConstants.themesDic with at least 1 item');
      return;
    }

    let themeLink = document.getElementById(this.themeLinkId) as HTMLLinkElement;
    if (themeLink) { // app has been loaded in the browser page/tab.
      const currentTheme = themeLink.href.substring(themeLink.href.lastIndexOf('/') + 1);
      const notToLoad = picked == currentTheme;
      if (notToLoad) {
        return;
      }

      const r = AppConfigConstants.themesDic[picked!];
      if (!r) {
        return;
      }

      themeLink.href = picked!;
      this.selectedTheme = picked!;
      console.info(`theme altered to ${picked}.`);

      if (appColorsDir === undefined) {
        return;
      }

      let appColorsLink = document.getElementById(this.appColorsLinkId) as HTMLLinkElement;
      if (appColorsLink) {
        const customFile = r.dark ? this.colorsDarkCss : this.colorsCss;
        appColorsLink.href = (appColorsDir === null) ? customFile : appColorsDir + customFile;
      }

    } else { // app loaded for the first time, then create 
      themeLink = document.createElement('link');
      themeLink.id = this.themeLinkId;
      themeLink.rel = 'stylesheet';
      const firstTheme = picked ?? Object.keys(AppConfigConstants.themesDic!)[0];
      themeLink.href = firstTheme;
      document.head.appendChild(themeLink);
      this.selectedTheme = firstTheme;
      console.info(`Initially loaded theme ${firstTheme}`);

      if (appColorsDir === undefined) {
        return;
      }

      const appColorsLink = document.createElement('link');
      appColorsLink.id = this.appColorsLinkId;
      appColorsLink.rel = 'stylesheet';
      const customFile = AppConfigConstants.themesDic[firstTheme].dark ? this.colorsDarkCss : this.colorsCss;
      appColorsLink.href = (appColorsDir === null) ? customFile : appColorsDir + customFile;
      document.head.appendChild(appColorsLink);
    }
  }
}
