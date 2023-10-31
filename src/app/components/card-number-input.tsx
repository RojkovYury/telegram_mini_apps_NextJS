'use client';

import { useEffect } from 'react';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import TelegramInput from '@/components/telegram-input';

interface CardNumberInputProps {
  handleOpenSnackbar: (message: string, divId: string, loop: boolean) => void;
  cardNumber: string;
  setCardNumber: React.Dispatch<React.SetStateAction<string>>;
  lunaCheck: (cardNumber: string) => boolean;
  setOpenSnackbar: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CardNumberInput({ lunaCheck, handleOpenSnackbar, setOpenSnackbar, cardNumber, setCardNumber }: CardNumberInputProps) {
  const handleCardNumberChange = (e: { target: { value: string; }; }) => {
    const value = e.target.value.replace(/\s/g, '');
    if ((value === '' || /^[0-9\b]+$/.test(value)) && value.length <= 16) {
      setOpenSnackbar(false);
      setCardNumber(value.replace(/(.{4})(?!$)/g, '$1 '));
    } else if (value.length !== 0 && value.length < 17 && !(/^[0-9\b]+$/.test(value))) {
      handleOpenSnackbar('Допустимы только цифры', 'card-number-div-border', false);
    }
  };

  useEffect(() => {
    if (cardNumber.length === 19 && !lunaCheck(cardNumber.replace(/\s/g, ''))) {
      handleOpenSnackbar('Введен неверный номер', 'card-number-div-border', true);
    } else {
      const div = document.getElementById('card-number-div-border');
      div?.classList.remove('pulsate-border');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardNumber]);

  return (
    <TelegramInput
      id="card-number"
      colorId="card-number-div-border"
      title="Card Number"
      placeholder="**** **** **** ****"
      value={cardNumber}
      onChange={handleCardNumberChange}
      icon={<CreditCardIcon sx={{ color: 'var(--tg-theme-button-color)' }} />}
    />
  );
}
