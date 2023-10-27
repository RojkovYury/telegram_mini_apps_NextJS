'use server';

import { ShortBot } from '@/contracts/bot/schema';
import { BotForm, Bot } from '@/contracts/bot/form';
import { serverPost } from '@/libs/server/server-post';

interface BotListParams {
  offset: number;
  size: number;
}

export async function asyncBotList(params: BotListParams) {
  return serverPost<{ list: ShortBot[] }>({
    url: '/bot/list',
    params,
  });
}

export async function asyncBotDetail(params: { id: string }) {
  return serverPost<Bot>({
    url: '/bot/detail',
    params,
  });
}

export async function asyncBotForm(params: { localization: string }) {
  return serverPost<BotForm>({
    url: '/admin/form',
    params,
  });
}
