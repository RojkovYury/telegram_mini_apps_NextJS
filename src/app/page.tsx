import Script from 'next/script';
import Test from './components/test';

if (typeof window !== 'undefined') {
  const tg = window.Telegram.WebApp;
  tg.MainButton.isVisible = true;
  tg.MainButton.text = 'Отправить данные';
  // tg.headerColor = 'secondary_bg_color';
}

export default function Home() {
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
