import BotList from '@/components/bot-list';
import { asyncBotList } from '@/contracts/bot/server';
import { getServerTranslation } from '@/locales/get-server-translation';
import NextLink from 'next/link';
import { Box, Button, Container, Divider, Paper, Typography } from '@mui/material';

export default async function Page() {
  const t = await getServerTranslation();
  const { data } = await asyncBotList({ offset: 0, size: 10 });

  return (
    <Container>
      <Paper
        sx={{
          p: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            ml: 2,
            mr: 2,
          }}
        >
          <Typography
            variant="h4"
          >
            {t.table.title}
          </Typography>
          <Button
            type="submit"
            variant="contained"
            component={NextLink}
            href="/bot/create"
          >
            {t.button.create}
          </Button>
        </Box>
        <Divider variant="fullWidth" sx={{ mt: 2, mb: 3 }} />

        <BotList list={data?.list} />
      </Paper>
    </Container>
  );
}
