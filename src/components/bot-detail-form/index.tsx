'use client';

import { t } from 'i18next';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSave } from '@/contracts/bot/client';
import { Box, Container, Divider, Paper, Typography, Button } from '@mui/material';
import { Bot, BotForm, BlockBotForm, CurrentTexts } from '@/contracts/bot/form';
import Message from '@/components/message';
import Balloon from './balloon';
import BotModal from './bot-modal';
import textToMd from './text-to-md';

interface BotDetailFormProps {
  form: BotForm | undefined;
  bot?: Bot | undefined;
}

export default function BotDetailForm(props: BotDetailFormProps) {
  const botForm = props.form;
  const defaultBotValues: Bot = { fields: {} };
  botForm?.categories?.map((category) => {
    category.blocks.map((block) => {
      block.fields.map((field) => {
        defaultBotValues.fields[field.code] = (field.defaultValue ? field.defaultValue : '');
      });
    });
  });
  const bot = props.bot || defaultBotValues;
  const [editBlock, setEditBlock] = useState<BlockBotForm>();
  const [open, setOpen] = useState<boolean>(false);
  const [currentTexts, setCurrentTexts] = useState<CurrentTexts[]>([]);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const router = useRouter();
  const { mutate, loading } = useSave();
  const { setValue, getValues, handleSubmit } = useForm<Bot>({ defaultValues: bot });

  useEffect(() => {
    if (!props.bot) {
      setEditBlock(botForm?.categories[0].blocks[0]);
      setOpen(true);
    }
  }, [botForm, props.bot, editBlock]);

  const onSuccess = async (formData: Bot) => {
    const { data } = await mutate(formData);
    router.refresh();
    if (data?.message === 'OK') {
      setShowMessage(true);
      setOpen(false);
    }
    if (data?.code === '201') {
      router.push(`/bot/${data.id}`);
    }
  };

  const handleModalClose = () => {
    if (props.bot) { setOpen(false); }
    if (!props.bot) { router.push('/'); }
  };

  return (
    <Container>
      <Message
        open={showMessage}
        setOpen={setShowMessage}
        severity="success"
        message={t`message.update`}
      />
      <Paper
        component="form"
        onSubmit={handleSubmit(onSuccess)}
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
          <Typography variant="h4">
            {bot.id ? t`edit.title.editing` : t`edit.title.adding`}
          </Typography>
          <Button
            component={NextLink}
            href="/"
            variant="outlined"
          >
            {t`link.bot.list`}
          </Button>
        </Box>
        <Divider variant="fullWidth" sx={{ mt: 2, mb: 3 }} />

        {botForm?.categories?.map((category, categoryIndex) => (
          <Box
            key={`${category.label} ${categoryIndex}`}
            sx={{
              position: 'relative',
              width: '100%',
              display: ['block', 'block', 'grid'],
              gridTemplateColumns: '0.4fr 1fr 0.4fr',
            }}
          >
            <Box sx={{ ml: 2, mb: 2 }}>
              <Typography variant="h5">{category.label}</Typography>
              <Typography variant="caption">{category.description}</Typography>
            </Box>

            <Container maxWidth="sm">
              {category.blocks.map((block, blockIndex) => (
                <Box key={`${block.title} ${blockIndex}`}>
                  <Typography variant="h6" sx={{ mb: 2 }}>{block.title}</Typography>
                  <>
                    {block.fields.map((field, fieldIndex) => (
                      <Box key={`${field.label} ${fieldIndex}`} sx={{ mb: 2 }}>
                        <Typography variant="caption" color="text.secondary">{field.label}</Typography>

                        {!(field.showBalloon) && (
                          <Typography variant="inherit" sx={{ whiteSpace: 'break-spaces' }}>
                            {getValues(`fields.${field.code}`)}
                            {getValues(`fields.${field.code}`) === '' && '-'}
                          </Typography>
                        )}

                        {(field.showBalloon) && (field.type != 'MARKDOWN') && (
                          <Balloon>
                            <Typography sx={{ whiteSpace: 'break-spaces' }}>
                              {getValues(`fields.${field.code}`)}
                            </Typography>
                          </Balloon>
                        )}
                        {(field.showBalloon) && (field.type === 'MARKDOWN') && (
                          <Balloon sx={{ mt: 1 }}>
                            <Box sx={{ display: 'block', whiteSpace: 'pre-wrap' }}>
                              {textToMd(getValues(`fields.${field.code}`))}
                            </Box>
                          </Balloon>
                        )}

                      </Box>
                    ))}
                  </>
                  <Button
                    variant="outlined"
                    disabled={loading}
                    size="small"
                    onClick={() => {
                      setEditBlock(block);
                      setOpen(true);
                    }}
                    sx={{ minWidth: 100, mb: 2 }}
                  >
                    {t`button.change`}
                  </Button>

                  <Divider
                    sx={{ mb: 2, mt: 1 }}
                  />
                </Box>
              ))}
            </Container>

            <BotModal
              open={open}
              onClose={handleModalClose}
              isBotAdding={!props.bot}
              currentTexts={currentTexts}
              setCurrentTexts={setCurrentTexts}
              block={editBlock}
              setValue={setValue}
              getValues={getValues}
              editTitle={botForm?.addVariableTitle}
            />
          </Box>
        ))}

        <Box
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          <Button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            {t`button.up`}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
