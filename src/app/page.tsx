import Script from 'next/script';

if (typeof window !== 'undefined') {
  const tg = window.Telegram.WebApp;
  tg.MainButton.text = 'Отправить данные111';
  // ваш код, который зависит от объекта window
} else {
  // обработка варианта, когда код запускается вне браузера (например, Node.js)
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
        <div style={{ color: 'var(--tg-theme-button-color)', background: 'var(--tg-theme-text-color)' }}>
          test
        </div>
      </main>
    </>
  )
}
