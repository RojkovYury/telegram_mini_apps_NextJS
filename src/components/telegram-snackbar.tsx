import { forwardRef } from 'react';
import { Snackbar } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

interface TelegramSnackbarProps {
  open: boolean;
  onClose: () => void;
  message: string;
}

export default function TelegramSnackbar(props: TelegramSnackbarProps) {
  const { open, onClose, message } = props;

  const Alert = forwardRef(function Alert(
    props: AlertProps,
    ref: React.ForwardedRef<HTMLDivElement>
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <Snackbar
      open={open}
      autoHideDuration={1500}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert
        onClose={onClose}
        severity="error"
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}