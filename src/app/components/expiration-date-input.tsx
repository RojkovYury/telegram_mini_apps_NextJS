import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TelegramInput from '@/components/telegram-input';

interface ExpirationDateInputProps {
  expiryDate: string;
  setExpiryDate: any;
}

export default function ExpirationDateInput({ expiryDate, setExpiryDate }: ExpirationDateInputProps) {
  const handleExpiryDateChange = (e: any) => {
    let value = e.target.value.replace('/', '');
    if (value.length >= 2 && Number(value.substring(0, 2)) > 12) {
      value = '12' + value.slice(2) 
    };
    if (value.length >= 2 && Number(value.substring(0, 2)) === 0) {
      value = '01' + value.slice(2) 
    };
    if (value.length === 4 && Number(value.slice(-2)) < 23) {
      value = value.slice(0, value.length - 2) + '23'
    }
    if (value === "" || /^[0-9\b]+$/.test(value) && value.length <= 4) {
      (value.length > 2) 
        ? setExpiryDate(value.slice(0, 2) + "/" + value.slice(2))
        : setExpiryDate(value)
    }
  };

  return(
    <TelegramInput
      id='expiration-date'
      colorId='expiration-date-div-border'
      title='Expiry Date'
      placeholder='**/**'
      value={expiryDate}
      onChange={handleExpiryDateChange}
      icon={<CalendarMonthIcon sx={{ color: 'var(--tg-theme-button-color)' }}/>}
      sx={{flexBasis: '0', flexGrow: '1', }}
    />
  )
}