import BotDetailForm from '@/components/bot-detail-form';
import { getServerLang } from '@/libs/server/lang';
import { asyncBotDetail, asyncBotForm } from '@/contracts/bot/server';

interface BotDetailProps {
  params: {
    id: string;
  }
}

export default async function BotDetailPage({ params }: BotDetailProps) {
  const localization = await getServerLang();

  const formPromise = asyncBotForm({ localization });
  const botPromise = asyncBotDetail({ id: params.id });

  const form = await formPromise;
  const bot = await botPromise;

  return (
    <BotDetailForm
      bot={bot.data}
      form={form.data}
    />
  );
}
