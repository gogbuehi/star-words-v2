import {useState} from "react";

export type Theme = "MATHS" | "WORDS" | "NAV";
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
  color: string;
  borderColor: string;
  buttonBgColor: string;
  buttonColor: string;
}

const COLOUR_LIGHT_BLUE = "#61dafb";
const COLOUR_LIGHT_YELLOW = "#dafb61";
const COLOUR_LIGHT_GRAY = "#dadada";
const COLOUR_DARK_GRAY = "#303030";
const COLOUR_DARK_GREEN = "#405030";
const COLOUR_DARK_PURPLE = "#503040";
export const THEME_MATHS: ThemeProps = {
  color: COLOUR_LIGHT_BLUE,
  borderColor: COLOUR_LIGHT_BLUE,
  buttonBgColor: COLOUR_LIGHT_BLUE,
  buttonColor: COLOUR_DARK_GRAY
}
export const THEME_WORDS: ThemeProps = {
  color: COLOUR_LIGHT_YELLOW,
  borderColor: COLOUR_LIGHT_YELLOW,
  buttonBgColor: COLOUR_LIGHT_YELLOW,
  buttonColor: COLOUR_DARK_GREEN
}
export const THEME_NAV: ThemeProps = {
  color: COLOUR_LIGHT_GRAY,
  borderColor: COLOUR_LIGHT_GRAY,
  buttonBgColor: COLOUR_LIGHT_GRAY,
  buttonColor: COLOUR_DARK_PURPLE
}

export const THEMES: Map<Theme, ThemeProps> = new Map([
  ["MATHS", THEME_MATHS],
  ["WORDS", THEME_WORDS],
  ["NAV", THEME_NAV]
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

export const getColor = ({theme}: ThemeProp): string => {
  const {color}:ThemeProps = getTheme(theme);
  return color;
}
