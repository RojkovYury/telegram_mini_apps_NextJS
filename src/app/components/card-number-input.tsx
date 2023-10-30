"use client"

import { useEffect } from 'react';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import TelegramInput from '@/components/telegram-input';

interface CardNumberInputProps {
    handleOpenSnackbar: any;
    cardNumber: string;
    setCardNumber: any;
    lunaCheck: any;
  }

export default function CardNumberInput({ lunaCheck, handleOpenSnackbar, cardNumber, setCardNumber }: CardNumberInputProps) {

  const handleCardNumberChange = (e: any) => {
    const value = e.target.value.replace(/\s/g, "");
    if ((value === "" || /^[0-9\b]+$/.test(value)) && value.length <= 16) {
      setCardNumber(value.replace(/(.{4})(?!$)/g, "$1 "));
    }
  };

  useEffect(() => {
    if (cardNumber.length === 19 && !lunaCheck(cardNumber.replace(/\s/g, ""))) {
      handleOpenSnackbar('Введен неверный номер', 'card-number-div-border', false)
    }
    else {
      const div = document.getElementById('card-number-div-border');
      div?.classList.remove("pulsating-border");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardNumber])

  return(
    <TelegramInput
      id='card-number'
      colorId='card-number-div-border'
      title='Card Number'
      placeholder='**** **** **** ****'
      value={cardNumber}
      onChange={handleCardNumberChange}
      icon={<CreditCardIcon sx={{ color: 'var(--tg-theme-button-color)' }}/>}
    />
  )
}