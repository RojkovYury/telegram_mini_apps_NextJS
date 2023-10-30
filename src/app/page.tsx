"use client"

import Script from 'next/script';
import { useEffect } from 'react';

export default function Home() {

  useEffect(() => {
    const tg = window.Telegram.WebApp;
    tg.MainButton.isVisible = true;
    tg.MainButton.text = 'Отправить данные';
    tg.headerColor = 'secondary_bg_color';
    tg.ready();
  });

  return (
    <>
      <Script src="https://telegram.org/js/telegram-web-app.js" />
      <main>
        <div
          style={{ height: '300px', color: 'var(--tg-theme-button-color)', background: 'var(--tg-theme-text-color)' }}>
          test
        </div>
      </main>
    </>
  )
}
