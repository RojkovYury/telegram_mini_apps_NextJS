import PersonIcon from '@mui/icons-material/CreditCard';
import TelegramInput from '@/components/telegram-input';

interface CarHolderInputProps {
  handleOpenSnackbar: any;
  nameOnCard: string;
  setNameOnCard: any;
}

export default function CarHolderInput({ handleOpenSnackbar, nameOnCard, setNameOnCard }: CarHolderInputProps) {

  const handleNameOnCardChange = (e: any) => {
    const value = e.target.value;
    if (value === "" || /^[a-zA-Z\s]+$/.test(value)) {
      setNameOnCard(value.toUpperCase());
    }
    else {
      handleOpenSnackbar('Только латинские буквы', 'card-holder-div-border', true)
    }
  };

  return(
    <TelegramInput
      id='card-holder'
      colorId='card-holder-div-border'
      title='Name on Card'
      placeholder='NAME SURNAME'
      value={nameOnCard}
      onChange={handleNameOnCardChange}
      icon={<PersonIcon sx={{ color: 'var(--tg-theme-button-color)' }}/>}
    />
  )
}