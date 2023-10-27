import { styled, Box, CircularProgress } from '@mui/material';

const Layer = styled('div')`
  position: absolute;
  width: 100%;
  height: 100%;
  background: ${(p) => p.theme.palette.background.paper};
  opacity: 0.5;
  z-index: ${(p) => p.theme.zIndex.mobileStepper};
`;

export default function TableLoading({ loading }: { loading?: boolean; }) {
  if (!loading) {
    return null;
  }

  return (
    <Box
      sx={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Layer />
      <CircularProgress sx={{ position: 'relative', zIndex: 1001 }} />
    </Box>
  );
}
