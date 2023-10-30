/*
import { forwardRef } from 'react';
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';



export default function TelegramSnackbar(props) {

  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <Snackbar
      open={props.open}
      autoHideDuration={1500}
      onClose={props.onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={props.onClose} severity="error" sx={{ width: '100%' }}>
        {props.message}
      </Alert>
    </Snackbar>
  )
}
*/
