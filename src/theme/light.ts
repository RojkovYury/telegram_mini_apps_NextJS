import { createTheme } from '@mui/material';

const light = createTheme({});

// тут переопределяем цвета
light.palette.background.default = '#f1f1f1';

export default light;
