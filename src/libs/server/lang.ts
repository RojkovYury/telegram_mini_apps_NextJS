import { Lang } from '@/locales/enum';
import { cookies } from 'next/headers';

export async function getServerLang() {
  'use server';

  const cookieStore = cookies();
  const lang = cookieStore.get('lang')?.value as Lang;
  return lang || Lang.ru;
}
