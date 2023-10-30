"use client"

import Script from 'next/script';
import Test from './components/test';
import { useEffect } from 'react';

export default function Home() {

  useEffect(() => {
    const tg = window.Telegram.WebApp;
    tg.MainButton.isVisible = true;
    tg.MainButton.text = 'Отправить данные';
  });

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
      <Script
        src="https://telegram.org/js/telegram-web-app.js"
        strategy="beforeInteractive"
      />
      <main>
        <Test/>
        <div style={{ color: 'var(--tg-theme-button-color)', background: 'var(--tg-theme-text-color)' }}>
          test
        </div>
      </main>
    </>
  )
}
/* 


*/