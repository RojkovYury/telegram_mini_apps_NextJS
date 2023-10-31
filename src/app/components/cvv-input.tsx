import LockIcon from '@mui/icons-material/Lock';
import TelegramInput from '@/components/telegram-input';

interface CvvInputProps {
  cvv: string;
  setCvv: React.Dispatch<React.SetStateAction<string>>;
  handleOpenSnackbar: (message: string, divId: string, loop: boolean) => void;
}

export default function CvvInput({ cvv, setCvv, handleOpenSnackbar }: CvvInputProps) {
  const handleCvvChange = (e: { target: { value: string; }; }) => {
    const { value } = e.target;
    if ((value === '' || /^[0-9\b]+$/.test(value)) && value.length <= 3) {
      setCvv(value);
      const div = document.getElementById('cvv-div-border');
      div?.classList.remove('pulsate-border');
    } else if (value.length !== 0 && value.length < 4 && !(/^[0-9\b]+$/.test(value))) {
      handleOpenSnackbar('Допустимы только цифры', 'cvv-div-border', false);
    }
  };

  return (
    <TelegramInput
      id="cvv"
      colorId="cvv-div-border"
      title="CVV"
      placeholder="***"
      value={cvv}
      onChange={handleCvvChange}
      icon={<LockIcon sx={{ color: 'var(--tg-theme-button-color)' }} />}
      sx={{ flexBasis: '0', flexGrow: '1', marginLeft: '12px' }}
    />
  );
}
