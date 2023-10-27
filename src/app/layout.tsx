import Header from '@/components/layout/header';
import { ReactNode } from 'react';
import { Metadata } from 'next';
import { getServerLang } from '@/libs/server/lang';
import { getServerTheme } from '@/libs/server/theme';
import { Roboto_Flex } from 'next/font/google';
import { ErrorProvider } from '@/components/error/error-context';
import { LocaleProvider } from '@/locales/locale-context';
import { ThemeProvider } from '@/theme/theme-context';
import GlobalStyles from '@/components/layout/global-styles';
import { getServerTranslation } from '@/locales/get-server-translation';

const font = Roboto_Flex({ subsets: ['latin'], fallback: ['Helvetica Neue'] });

export async function generateMetadata(): Promise<Metadata> {
  const t = await getServerTranslation();

  return {
    viewport: {
      maximumScale: 1,
      initialScale: 1,
      width: 'device-width',
      userScalable: false,
      viewportFit: 'cover',
    },

    themeColor: '#1976d2',
    title: t.meta.title,
    description: t.meta.description,

    openGraph: {
      type: 'website',
      siteName: t.meta.siteName,
      title: t.meta.title,
      description: t.meta.description,
    },
    twitter: {
      title: t.meta.title,
      description: t.meta.description,
      card: 'summary_large_image',
    },
  };
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const theme = await getServerTheme();
  const lang = await getServerLang();

  return (
    <html lang={lang}>
      <body className={font.className}>
        <ThemeProvider themeName={theme}>
          <LocaleProvider lang={lang}>
            <GlobalStyles />
            <ErrorProvider errors={undefined}>
              <Header />
              {children}
            </ErrorProvider>
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
