if (typeof window !== 'undefined') {
  const tg = window.Telegram.WebApp;
  tg.MainButton.text = 'Отправить данные111';
  // ваш код, который зависит от объекта window
} else {
  // обработка варианта, когда код запускается вне браузера (например, Node.js)
}


export default function Home() {
  return (
    <main>
      <div style={{ color: 'var(--tg-theme-button-color)' }}>
        test
      </div>
    </main>
  )
}
