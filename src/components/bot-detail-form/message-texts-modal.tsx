import { Typography, TextField, Divider, Button, Chip, Box } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { t } from 'i18next';
import ModalExtended from '../modal-extended';

interface MessageTextsModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  texts: string[];
  setTexts: (prevState: any) => void;
  rows: { name: string, label: string, isLink?: boolean, linkLabel?: string }[];
  chips?: { description: string, value: string }[];
  setValue: any;
}

export default function MessageTextsModal({ open, setOpen, texts, setTexts, title, rows, chips, setValue }: MessageTextsModalProps) {
  const disabled = texts.some((elem) => elem?.trim() === '');

  return (
    <ModalExtended
      open={open}
      onClose={() => setOpen(false)}
    >

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', ml: 3, mr: 3, mt: 3, mb: 2 }}>
        <Box>
          <Typography
            variant="h6"
            color="text.primary"
            sx={{ fontWeight: 600 }}
          >
            {t`edit.editingMessage`}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
          >
            {title}
          </Typography>
        </Box>
        <Box>
          <Button
            size="small"
            type="button"
            onClick={() => setOpen(false)}
            sx={{ minWidth: '45px', minHeight: '45px' }}
          >
            <ClearIcon fontSize="small" />
          </Button>
        </Box>
      </Box>

      <Divider />

      <Box sx={{ ml: 3, mr: 3, mt: 2 }}>
        {texts && texts.map((_, index) => (
          <Box key={index}>
            <Typography variant="caption" color="text.secondary">
              {rows[index].label}
            </Typography>
            <TextField
              value={texts[index]}
              error={texts[index] === ''}
              helperText={texts[index] === '' ? t`validation.required` : ' '}
              onChange={(e) => {
                setTexts((prevState: string[]) => {
                  const copyTexts = [...prevState];
                  copyTexts[index] = (e.target.value);
                  return copyTexts;
                });
              }}
              multiline
              hiddenLabel
              variant="filled"
              autoComplete="off"
              autoFocus={index === 0}
              InputProps={{ sx: { width: '100%' } }}
              sx={{ display: 'block', width: '100%' }}
            />
          </Box>
        ))}
      </Box>

      {(chips && (
        <Box sx={{ ml: 3, mr: 3, mb: 3 }}>
          <Box>
            <Typography
              variant="subtitle1"
              color="text.secondary"
            >
              {t`edit.addVariables`}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
            {chips.map((chip, index) => (
              <Box key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mr: 2, mt: 1 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  {chip.description}
                </Typography>
                <Chip
                  label={chip.value}
                  variant="outlined"
                  onClick={() => {
                    setTexts((prevState: string[]) => {
                      const copyTexts = [...prevState];
                      copyTexts[0] = (`${copyTexts[0]} {${chip.value}}`);
                      return copyTexts;
                    });
                  }}
                  sx={{ minWidth: 120 }}
                />
              </Box>
            ))}
          </Box>
        </Box>
      ))}

      <Divider />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', m: 3 }}>
        <Button
          type="button"
          variant="outlined"
          size="small"
          onClick={() => setOpen(false)}
          sx={{ minWidth: 100, mr: 1 }}
        >
          {t`button.cancel`}
        </Button>
        <Box>
          <Button
            disabled={disabled}
            type="button"
            variant="contained"
            size="small"
            onClick={() => {
              rows.map((__, index) => {
                setValue(rows[index].name, texts[index]);
              });
              setOpen(false);
            }}
            sx={{ minWidth: 100 }}
          >
            {t`button.save`}
          </Button>
        </Box>
      </Box>
    </ModalExtended>
  );
}
