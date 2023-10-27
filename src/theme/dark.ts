import { createTheme } from '@mui/material';

const dark = createTheme({
  palette: { mode: 'dark' },
});

// тут переопределяем цвета
dark.palette.background.paper = '#212323';

export default dark;
