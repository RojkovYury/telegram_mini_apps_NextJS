import ThemeEnum from '@/theme/theme-enum';
import { cookies } from 'next/headers';

export async function getServerTheme() {
  'use server';

  const cookieStore = cookies();
  const theme = cookieStore.get('theme')?.value as ThemeEnum;
  return theme || ThemeEnum.light;
}
