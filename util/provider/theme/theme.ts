import { alpha, createTheme } from '@mui/system';

const redBase = '#FF4D4F';
const redMain = alpha(redBase, 1);
const customPrimary = '#2196F3';

export const theme = createTheme({
  palette: {
    red: {
      main: redMain, // red 색상 객체에 main 속성이 필요
      light: alpha(redBase, 0.5),
      dark: alpha(redBase, 0.9),
      contrastText: '#fff',
    },
    primary: {
      main: customPrimary, // primary 색상 객체에 main 속성이 필요
      light: alpha(customPrimary, 0.5),
      dark: alpha(customPrimary, 0.9),
      contrastText: '#fff',
    },
  },
});
