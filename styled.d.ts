import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      black: string;
      grey: string;
      white: string;
      danger: string;
      success: string;
      warning: string;
      info: string;
    };
    breakpoints: {
      sm: string;
      md: string;
    };
  }
}
