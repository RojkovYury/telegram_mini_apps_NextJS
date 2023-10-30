"use client"
import { useEffect } from 'react';
import { Box } from '@mui/material';

export default function Home() {

  useEffect(() => {
    const tg = window.Telegram.WebApp;
    tg.MainButton.isVisible = true;
    tg.MainButton.text = 'Отправить данные';

  });

  return (
    <>
      <main>
        <Box
          sx={{ height: '300px', color: 'var(--tg-theme-button-color)', background: 'var(--tg-theme-text-color)' }}>
          test
        </Box>
      </main>
    </>
  )
}

{/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
/* 
     <Script src="https://telegram.org/js/telegram-web-app.js"
     strategy="beforeInteractive"
   />

*/