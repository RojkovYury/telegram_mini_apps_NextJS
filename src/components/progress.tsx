import { Box, CircularProgress } from '@mui/material';

export default function Progress() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      <CircularProgress />
    </Box>
  );
}
