import { forwardRef } from 'react';
import { Snackbar } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

interface TelegramSnackbarProps {
  open: boolean;
  onClose: () => void;
  message: string;
}

const Alert = forwardRef((
  props: AlertProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

export default function TelegramSnackbar(props: TelegramSnackbarProps) {
  const { open, onClose, message } = props;

  return (
    <Snackbar
      open={open}
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
