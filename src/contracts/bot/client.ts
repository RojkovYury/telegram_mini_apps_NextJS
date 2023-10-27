'use client';

import { ShortBot } from '@/contracts/bot/schema';
import { Bot } from '@/contracts/bot/form';
import useMutation from '@/hooks/useMutation';
import useQuery from '@/hooks/useQuery';

interface BotListRequest {
  pageNumber: number;
  size: number;
}

interface BotListResponse {
  list?: ShortBot[];
}

interface SaveResponse {
  code: string;
  id: string;
  message: 'OK';
}

export function useBotList(params: BotListRequest, initState?: BotListResponse) {
  return useQuery<BotListResponse>({
    url: '/api/bot/list',
    params,
    initState,
  });
}

export function useSave() {
  return useMutation<Bot, SaveResponse>({
    url: '/api/bot/save',
  });
}
