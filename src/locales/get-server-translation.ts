'use server';

import { getServerLang } from '@/libs/server/lang';
import { Lang } from '@/locales/enum';
import ru from './translations/ru';
import en from './translations/en';

export async function getServerTranslation() {
  const lang = await getServerLang();

  if (lang === Lang.en) {
    return en;
  }

  return ru;
}
