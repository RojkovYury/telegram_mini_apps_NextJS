"use client"

import { useCallback, useEffect, useState } from 'react';
import { Box, Paper } from '@mui/material';
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
  const handleOpenSnackbar = (message: string, divId: string, disableInfAnim: boolean) => {
    setMessageSnackbar(message);
    setOpenSnackbar(true);
    const div = document.getElementById(divId);
    div?.classList.add("pulsating-border")
    if (disableInfAnim) {
      setTimeout(function() {
        div?.classList.remove("pulsating-border");
      }, 1000);
    }
  };

// MAIN BUTTON CHECK
  useEffect(() => { 

    console.log(window.Telegram.WebApp.MainButton);
    console.log(window.Telegram.WebApp.MainButton.isVisible);
    console.log(window.Telegram.WebApp.MainButton.isProgressVisible);
    console.log(window.Telegram.WebApp.MainButton.isActive);

    if (cardNumber.length === 19 && lunaCheck(cardNumber.replace(/\s/g, "")) && nameOnCard && expiryDate.length === 5 && cvv.length === 3) { 
      window.Telegram.WebApp.MainButton.show()
      console.log('ACTIVATE tg.MainButton.show()'); 
    }
    else { 
      window.Telegram.WebApp.MainButton.hide()
      // console.log('DEactive tg.MainButton.show()');
    }
  }, [cardNumber, nameOnCard, expiryDate, cvv ])

  // SEND DATA to bot
  //// callback
  const onSendData = useCallback(()=>{
    const cardNumberNoSpaces = cardNumber.replace(/\s/g, "")
    const data = { cardNumber: cardNumberNoSpaces, nameOnCard, expiryDate, cvv }
    window.Telegram.WebApp.sendData(JSON.stringify(data))
  }, [cardNumber, nameOnCard, expiryDate, cvv])
  //// send
  useEffect(() => {
    window.Telegram.WebApp.onEvent('mainButtonClicked', onSendData);
    return () => {window.Telegram.WebApp.offEvent('mainButtonClicked', onSendData)}
  }, [onSendData])

  // close modal window CHECK
  useEffect(() => { 
    if (cardNumber || nameOnCard || expiryDate || cvv) { window.Telegram.WebApp.enableClosingConfirmation() }
    else { window.Telegram.WebApp.disableClosingConfirmation() }
  }, [cardNumber, nameOnCard, expiryDate, cvv ])

  return (
    <main>
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
          px: 2, 
          py: 2 
        }}
      >  
        <CardNumberInput
          handleOpenSnackbar={handleOpenSnackbar}
          cardNumber={cardNumber}
          setCardNumber={setCardNumber}
          lunaCheck={lunaCheck}
        />
        <CarHolderInput
          handleOpenSnackbar={handleOpenSnackbar}
          nameOnCard={nameOnCard}
          setNameOnCard={setNameOnCard}
        />
        <Box sx={{ display: 'flex' }}>
          <ExpirationDateInput
            expiryDate={expiryDate}
            setExpiryDate={setExpiryDate}
          />
          <CvvInput
            cvv={cvv}
            setCvv={setCvv}
          />
        </Box>
      </Paper>
    </main>
  )
}
