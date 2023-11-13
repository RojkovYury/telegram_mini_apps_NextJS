'use client';

import { useCallback, useEffect, useState } from 'react';
import { Box, Paper, Button } from '@mui/material';
import TelegramSnackbar from '@/components/telegram-snackbar';
import CardNumberInput from './components/card-number-input';
import CarHolderInput from './components/card-holder-input';
import ExpirationDateInput from './components/expiration-date-input';
import CvvInput from './components/cvv-input';
import lunaCheck from './components/luna-check';

export default function Home() {
  useEffect(() => {
    const tg = window.Telegram.WebApp;
    tg.MainButton.isVisible = true;
    tg.MainButton.hide();
    tg.MainButton.text = 'Отправить данные';
    tg.headerColor = 'secondary_bg_color';
    tg.backgroundColor = '#fa0505';
    tg.ready();
  });

  const [cardNumber, setCardNumber] = useState<string>('');
  const [nameOnCard, setNameOnCard] = useState<string>('');
  const [expiryDate, setExpiryDate] = useState<string>('');
  const [cvv, setCvv] = useState<string>('');

  // Snackbar
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [messageSnackbar, setMessageSnackbar] = useState('');
  const handleCloseSnackbar = () => { setOpenSnackbar(false); };
  const handleOpenSnackbar = (message: string, divId: string, loop: boolean) => {
    setMessageSnackbar(message);
    setOpenSnackbar(true);
    const div = document.getElementById(divId);
    div?.classList.add('pulsate-border');
    if (!loop) {
      setTimeout(() => {
        div?.classList.remove('pulsate-border');
        setOpenSnackbar(false);
      }, 1000);
    }
  };

  // MAIN BUTTON CHECK
  useEffect(() => {
    if (
      cardNumber.length === 19
      && lunaCheck(cardNumber.replace(/\s/g, ''))
      && nameOnCard && expiryDate.length === 5
      && cvv.length === 3
    ) {
      window.Telegram.WebApp.MainButton.show();
    } else {
      window.Telegram.WebApp.MainButton.hide();
    }
  }, [cardNumber, nameOnCard, expiryDate, cvv]);

  // SEND DATA to bot
  /// callback
  const onSendData = useCallback(() => {
    const cardNumberNoSpaces = cardNumber.replace(/\s/g, '');
    const data = { cardNumber: cardNumberNoSpaces, nameOnCard, expiryDate, cvv };
    window.Telegram.WebApp.sendData(JSON.stringify(data));
  }, [cardNumber, nameOnCard, expiryDate, cvv]);
  /// send
  useEffect(() => {
    window.Telegram.WebApp.onEvent('mainButtonClicked', onSendData);
    return () => { window.Telegram.WebApp.offEvent('mainButtonClicked', onSendData); };
  }, [onSendData]);

  // close modal window CHECK
  useEffect(() => {
    if (cardNumber || nameOnCard || expiryDate || cvv) {
      window.Telegram.WebApp.enableClosingConfirmation();
    } else { window.Telegram.WebApp.disableClosingConfirmation(); }
  }, [cardNumber, nameOnCard, expiryDate, cvv]);

  const handleClick = () => {
    // window.Telegram.WebApp.backgroundColor = 'white';
    window.location.href = ('https://mig.sbctech.ru');
  };

  return (
    <main>

      <Paper sx={{ margin: '10px', height: '140px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <a style={{ marginTop: '10px' }} href="https://mig.sbctech.ru">https://mig.sbctech.ru/</a>
        <Button variant="contained" sx={{ maxHeight: '30px', marginTop: '10px' }} onClick={handleClick}>
          https://gate.sbctech.ru/paynet
        </Button>
      </Paper>

      <TelegramSnackbar
        open={openSnackbar}
        onClose={handleCloseSnackbar}
        message={messageSnackbar}
      />
      <Paper
        elevation={3}
        sx={{
          borderRadius: '25px',
          backgroundColor: 'var(--tg-theme-bg-color)',
          display: 'flex',
          flexDirection: 'column',
          mx: 3,
          my: 8,
          p: 2,
        }}
      >
        <CardNumberInput
          setOpenSnackbar={setOpenSnackbar}
          cardNumber={cardNumber}
          setCardNumber={setCardNumber}
          lunaCheck={lunaCheck}
          handleOpenSnackbar={handleOpenSnackbar}
        />
        <CarHolderInput
          nameOnCard={nameOnCard}
          setNameOnCard={setNameOnCard}
          handleOpenSnackbar={handleOpenSnackbar}
        />
        <Box sx={{ display: 'flex' }}>
          <ExpirationDateInput
            expiryDate={expiryDate}
            setExpiryDate={setExpiryDate}
            handleOpenSnackbar={handleOpenSnackbar}
          />
          <CvvInput
            cvv={cvv}
            setCvv={setCvv}
            handleOpenSnackbar={handleOpenSnackbar}
          />
        </Box>
      </Paper>
    </main>
  );
}
