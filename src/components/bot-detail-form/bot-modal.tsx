import { useEffect } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { Typography, TextField, Divider, Button, Chip, Box } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { t } from 'i18next';
import { BlockBotForm, CurrentTexts, Bot } from '@/contracts/bot/form';
import ModalExtended from '../modal-extended';
import Balloon from './balloon';
import textToMd from './text-to-md';

interface BotModalProps {
  open: boolean;
  onClose: () => void;
  isBotAdding: boolean;
  currentTexts: CurrentTexts[];
  setCurrentTexts: React.Dispatch<React.SetStateAction<CurrentTexts[]>>;
  block?: BlockBotForm | undefined;
  getValues: (code: string) => string;
  setValue: UseFormSetValue<Bot>;
  editTitle: string;
}

export default function BotModal(props: BotModalProps) {
  const disabled = !!props.currentTexts.some((elem) => elem?.value.trim() === '');
  useEffect(() => {
    if (props.block) {
      props.setCurrentTexts([]);
      props.block.fields.map((field) => {
        const obj = {
          code: field.code,
          value: props.getValues(`fields.${field.code}`),
        };
        props.setCurrentTexts((prevState) => [...prevState, obj]);
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.block, props.open]);

  return (
    <ModalExtended
      open={props.open}
      onClose={props.onClose}
    >

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', ml: 3, mr: 3, mt: 3, mb: 2 }}>
        <Box>
          <Typography
            variant="h6"
            color="text.primary"
            sx={{ fontWeight: 600 }}
          >
            {props.isBotAdding ? (t`edit.title.adding`).toUpperCase() : props.block?.editTitle}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
          >
            {props.block?.title}
          </Typography>
        </Box>
        <Box>
          <Button
            size="small"
            type="button"
            onClick={props.onClose}
            sx={{ minWidth: '45px', minHeight: '45px' }}
          >
            <ClearIcon fontSize="small" />
          </Button>
        </Box>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {props.block?.fields?.map((field, fieldIndex) => (
        <Box key={fieldIndex} sx={{ ml: 3, mr: 3 }}>

          {field.type === 'MARKDOWN' && (
            <Box sx={{ mb: 3 }}>
              <Box sx={{ mb: 1 }}>
                <Typography variant="subtitle1" color="text.secondary">
                  {t`edit.preview`}
                </Typography>
              </Box>
              <Balloon>
                <Box sx={{ display: 'block', whiteSpace: 'pre-wrap' }}>
                  {textToMd(props.currentTexts?.find((obj) => obj.code === field.code)?.value)}
                </Box>
              </Balloon>
              <Divider light variant="middle" sx={{ mt: 3 }} />
            </Box>
          )}

          <TextField
            name={field.code}
            value={props.currentTexts?.find((obj) => obj.code === field.code)?.value}
            error={props.currentTexts?.find((obj) => obj.code === field.code)?.value === ''}
            helperText={props.currentTexts?.find((obj) => obj.code === field.code)?.value === ''
              ? t`validation.required`
              : field.comment
                ? field.comment
                : ' '}
            onChange={(e) => {
              props.setCurrentTexts((prevState) => prevState.map((obj) => {
                if (obj.code === field.code) {
                  return { ...obj, value: e.target.value };
                }
                return obj;
              }));
            }}
            multiline={field.multiline}
            maxRows={8}
            label={field.label}
            variant="outlined"
            autoComplete="off"
            InputProps={{ sx: { width: '100%' } }}
            InputLabelProps={{ shrink: true }}
            sx={{ display: 'block', width: '100%', mt: 1, mb: 1 }}
          />

          {(field.variables) && (field.variables?.length !== 0) && (
            <Box sx={{ mb: 3 }}>
              <Box>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                >
                  {props.editTitle}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
                {field.variables?.map((chip, chipIndex) => (
                  <Box key={chipIndex} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mt: 1, mr: 4 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      {chip.label}
                    </Typography>
                    <Chip
                      label={chip.value}
                      variant="outlined"
                      onClick={() => {
                        props.setCurrentTexts((prevState) => prevState.map((obj) => {
                          if (obj.code === field.code) {
                            const newValue = (`${obj.value} {${chip.value}}`);
                            return { ...obj, value: newValue };
                          }
                          return obj;
                        }));
                      }}
                      sx={{ minWidth: 120 }}
                    />
                  </Box>
                ))}
              </Box>

            </Box>
          )}
          {(props.block?.fields.length !== (fieldIndex + 1)) && (
            <Divider light variant="middle" sx={{ mb: 2 }} />
          )}
        </Box>
      ))}

      <Divider />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', m: 3 }}>
        <Button
          type="button"
          variant="outlined"
          size="small"
          onClick={props.onClose}
          sx={{ minWidth: 100, mr: 1 }}
        >
          {props.isBotAdding ? t`link.bot.list` : t`button.cancel`}
        </Button>
        <Box component="form">
          <Button
            onClick={() => {
              props.currentTexts.forEach((obj) => {
                props.setValue(`fields.${obj.code}`, obj.value);
              });
            }}
            disabled={disabled}
            type="submit"
            variant="contained"
            size="small"
            sx={{ minWidth: 100 }}
          >
            {t`button.save`}
          </Button>
        </Box>
      </Box>
    </ModalExtended>
  );
}
