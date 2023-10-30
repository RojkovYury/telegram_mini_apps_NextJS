"use client"

import { useState, useEffect } from 'react';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import TelegramInput from '@/components/telegram-input';

interface CardNumberInputProps {
    handleOpenSnackbar: any;
  }

export default function CardNumberInput(props: CardNumberInputProps) {
  const [cardNumber, setCardNumber] = useState<string>('');

  const handleCardNumberChange = (e: any) => {
    const value = e.target.value.replace(/\s/g, "");
    if ((value === "" || /^[0-9\b]+$/.test(value)) && value.length <= 16) {
      setCardNumber(value.replace(/(.{4})(?!$)/g, "$1 "));
    }
  };

  const lunaCheck = (cardNumber: any) => {
    let cardArray = cardNumber.toString().split('').map(Number)
    for (let i = cardArray.length - 2; i >= 0; i -= 2) {
      let doubledDigit = cardArray[i] * 2;
      if (doubledDigit > 9) {doubledDigit -= 9}
      cardArray[i] = doubledDigit;
    }
    let sum = cardArray.reduce((acc: any, curr: any) => acc + curr, 0);
    if (sum % 10 === 0) {return true}
    else {return false}
  }

  useEffect(() => {
    if (cardNumber.length === 19 && !lunaCheck(cardNumber.replace(/\s/g, ""))) {
      props.handleOpenSnackbar('Введен неверный номер', 'card-number-div-border', false)
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