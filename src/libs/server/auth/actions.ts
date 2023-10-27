import auth from '@/libs/server/auth';
import { getServerSession } from 'next-auth';

// при добавлении новых экшенов здесь, пока вручную нужно добавить их в sso
export default {
  ACTION_DASHBOARD: 'ACTION_DASHBOARD',
  ACTION_BOT_LIST_VIEW: 'ACTION_BOT_LIST_VIEW',
  ACTION_BOT_LIST_EDIT: 'ACTION_BOT_LIST_EDIT',
};

export async function getServerActions(action: string) {
  const session = await getServerSession(auth);
  const actions = session?.profile?.actions || [];

  return actions
    .map((s) => s.toLowerCase())
    .indexOf(action.toLowerCase()) > -1;
}
