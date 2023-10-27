import { Container, AppBar, Typography } from '@mui/material';
import { getServerTranslation } from '@/locales/get-server-translation';
import { getServerSession } from 'next-auth';
import auth from '@/libs/server/auth';
import User from './user';

export default async function Header() {
  const t = await getServerTranslation();
  const session = await getServerSession(auth);
  return (
    <AppBar position="static" sx={{ mb: 2 }}>
      <Container
        sx={{
          boxSizing: 'border-box',
          pt: 2,
          pb: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 4 }}>
          UPAY
        </Typography>
        {session && (
          <User
            userName={session?.user?.name}
            signOutText={t.button.signOut}
            sx={{ mr: 4 }}
          />
        )}
      </Container>
    </AppBar>
  );
}
