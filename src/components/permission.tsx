import { getServerActions } from '@/libs/server/auth/actions';

interface PermissionProps {
  children: any;
  action: string;
}

export async function Permission(props: PermissionProps) {
  const authorized = await getServerActions(props.action);
  return (authorized ? props.children : <div />);
}
