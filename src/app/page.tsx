"use client"

import { useEffect, useState } from 'react';
import { Paper } from '@mui/material';
import TelegramSnackbar from '@/components/telegram-snackbar';
import CardNumberInput from './components/card-number-input';

export default function Home() {

  useEffect(() => {
    const tg = window.Telegram.WebApp;
    tg.MainButton.isVisible = true;
    tg.MainButton.text = 'Отправить данные';
    tg.headerColor = 'secondary_bg_color';
    tg.ready();
  });

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
        <CardNumberInput handleOpenSnackbar={handleOpenSnackbar}/>
      </Paper>
    </main>
  )
}
