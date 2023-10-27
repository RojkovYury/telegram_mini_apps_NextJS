import { Box, Paper } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TelegramInput from '@/components/telegram-input';

import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <Paper elevation={3} sx={{ borderRadius: '25px', backgroundColor: 'var(--tg-theme-bg-color)', display: 'flex', flexDirection: 'column', mx: 3, my: 8, px: 2, py: 2 }}>
        <TelegramInput
          id='card-number'
          colorId='card-number-div-border'
          title='Card Number'
          placeholder='**** **** **** ****'
          // value={cardNumber}
          // onChange={handleCardNumberChange}
          icon={<CreditCardIcon sx={{ color: 'var(--tg-theme-button-color)' }}/>}
        />
        <TelegramInput
          id='card-holder'
          colorId='card-holder-div-border'
          title='Name on Card'
          placeholder='NAME SURNAME'
          // value={nameOnCard}
          // onChange={handleNameOnCardChange}
          icon={<PersonIcon sx={{ color: 'var(--tg-theme-button-color)' }}/>}
        />
        <Box sx={{ display: 'flex' }}>
          <TelegramInput
            id='expiration-date'
            colorId='expiration-date-div-border'
            title='Expiry Date'
            placeholder='**/**'
            // value={expiryDate}
            // onChange={handleExpiryDateChange}
            icon={<CalendarMonthIcon sx={{ color: 'var(--tg-theme-button-color)' }}/>}
            sx={{flexBasis: '0', flexGrow: '1', }}
          />
          <TelegramInput
            id='cvv'
            colorId='cvv-div-border'
            title='CVV'
            placeholder='***'
            // value={cvv}
            // onChange={handleCvvChange}
            icon={<LockIcon sx={{ color: 'var(--tg-theme-button-color)' }}/>}
            sx={{flexBasis: '0', flexGrow: '1', marginLeft: '12px'}}
          />
        </Box>
      </Paper>
    </main>
  )
}
