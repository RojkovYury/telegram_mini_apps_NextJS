import { Alert, Snackbar } from '@mui/material';

interface MessageProps {
  open: boolean;
  setOpen?: (isOpen: boolean) => void;
  severity: 'success' | 'info' | 'warning' | 'error';
  message: string;
}

export default function Message(props: MessageProps) {
  return (
    <Snackbar
      open={props.open}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      autoHideDuration={5000}
      onClose={() => props.setOpen?.(false)}
    >
      <Alert
        onClose={props.setOpen ? () => props.setOpen?.(false) : undefined}
        severity={props.severity}
        sx={{ width: '100%' }}
      >
        {props.message}
      </Alert>
    </Snackbar>
  );
}
