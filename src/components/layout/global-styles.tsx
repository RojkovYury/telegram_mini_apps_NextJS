'use client';

import MuiGlobalStyles from '@mui/material/GlobalStyles';

export default function GlobalStyles() {
  return (
    <MuiGlobalStyles
      styles={(theme) => ({
        html: { height: '100%' },
        body: {
          margin: 0,
          padding: 0,
          height: '100%',
          fontSmooth: 'antialiased',
          backgroundColor: theme.palette.background.default,
        },
      })}
    />
  );
}
