import BotDetailForm from '@/components/bot-detail-form';
import { getServerLang } from '@/libs/server/lang';
import { asyncBotForm } from '@/contracts/bot/server';

export default async function BotCreatePage() {
  const localization = await getServerLang();
  const form = await asyncBotForm({ localization });
  return (
    <BotDetailForm
      form={form.data}
    />
  );
}
