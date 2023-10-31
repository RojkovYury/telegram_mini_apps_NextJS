import PersonIcon from '@mui/icons-material/CreditCard';
import TelegramInput from '@/components/telegram-input';

interface CarHolderInputProps {
  handleOpenSnackbar: (message: string, divId: string, loop: boolean) => void;
  nameOnCard: string;
  setNameOnCard: React.Dispatch<React.SetStateAction<string>>;
}

export default function CarHolderInput({ handleOpenSnackbar, nameOnCard, setNameOnCard }: CarHolderInputProps) {
  const handleNameOnCardChange = (e: { target: { value: string; }; }) => {
    const { value } = e.target;
    if (value === '' || /^[a-zA-Z\s]+$/.test(value)) {
      setNameOnCard(value.toUpperCase());
    } else {
      handleOpenSnackbar('Только латинские буквы', 'card-holder-div-border', false);
    }
  };

  return (
    <TelegramInput
      id="card-holder"
      colorId="card-holder-div-border"
      title="Name on Card"
      placeholder="NAME SURNAME"
      value={nameOnCard}
      onChange={handleNameOnCardChange}
      icon={<PersonIcon sx={{ color: 'var(--tg-theme-button-color)' }} />}
    />
  );
}
