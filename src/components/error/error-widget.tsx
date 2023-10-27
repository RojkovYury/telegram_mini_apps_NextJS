'use client';

import { Alert, AlertTitle, Box, Snackbar } from '@mui/material';
import Error from './interface';

interface ErrorMessageProps {
  error: Error;
  onClose: () => void;
  index: number;
}

export default function ErrorWidget(props: ErrorMessageProps) {
  const { error, onClose, index } = props;

  return (
    <Snackbar
      open
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      onClose={onClose}
    >
      <Alert
        onClose={onClose}
        severity="error"
        sx={{
          position: 'fixed',
          boxSizing: 'border-box',
          bottom: `${index * 265 + 16}px`,
          width: '400px',
          maxWidth: '90vw',
          minHeight: '250px',
          p: 2,
        }}
      >
        <AlertTitle>Error</AlertTitle>
        {Object.keys(error).map((fieldName) => (
          <Box
            key={fieldName}
            data-field={fieldName}
            sx={{ mb: 1, whiteSpace: 'pre-wrap' }}
          >
            <strong>{fieldName}:</strong> <span>{JSON.stringify(error[fieldName as keyof typeof error])}</span>
          </Box>
        ))}
      </Alert>
    </Snackbar>
  );
}
