import {useState} from "react";

export type Theme = "MATHS" | "WORDS";
export const useTheme = () => {
  const defaultTheme: Theme = "MATHS" as Theme;
  const [theme, setTheme] = useState(defaultTheme);

  const setThemeFn = (theme: string) => {
    setTheme(theme as Theme);
  }

  return {
    theme,
    themeStyle: THEME_MATHS,
    setTheme: setThemeFn
  };
};
export type ThemeProp = {
  theme: Theme;
}
export type ThemeProps = {
  borderColor: string;
  buttonBgColor: string;
  buttonColor: string;
}
export const THEME_MATHS: ThemeProps = {
  borderColor: "#61dafb",
  buttonBgColor: "#61dafb",
  buttonColor: "#303030"
}
export const THEME_WORDS: ThemeProps = {
  borderColor: "#dafb61",
  buttonBgColor: "#dafb61",
  buttonColor: "#405030"
}

export const THEMES: Map<Theme, ThemeProps> = new Map([
  ["MATHS", THEME_MATHS],
  ["WORDS", THEME_WORDS]
]);

export const getTheme = (theme: Theme): ThemeProps => {
  return THEMES.get(theme) || THEME_MATHS;
}
// ({borderColor}: ThemeProps) => borderColor
export const getBorderColor = ({theme}: ThemeProp): string => {
  const {borderColor}:ThemeProps = getTheme(theme);
  return borderColor;
}
export const getButtonBgColor = ({theme}: ThemeProp): string => {
  const {buttonBgColor}:ThemeProps = getTheme(theme);
  return buttonBgColor;
}
export const getButtonColor = ({theme}: ThemeProp): string => {
  const {buttonColor}:ThemeProps = getTheme(theme);
  return buttonColor;
}
