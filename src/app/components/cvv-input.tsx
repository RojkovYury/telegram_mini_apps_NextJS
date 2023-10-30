"use client"

import { useState } from 'react';
import LockIcon from '@mui/icons-material/Lock';
import TelegramInput from '@/components/telegram-input';

interface CvvInputProps {
  cvv: string;
  setCvv: any;
}

export default function CvvInput({ cvv, setCvv }: CvvInputProps) {

  const handleCvvChange = (e: any) => {
    const value = e.target.value;
    if (value === "" || /^[0-9\b]+$/.test(value) && value.length <= 3) {
      setCvv(value);
    }
  };

  return(
    <TelegramInput
      id='cvv'
      colorId='cvv-div-border'
      title='CVV'
      placeholder='***'
      value={cvv}
      onChange={handleCvvChange}
      icon={<LockIcon sx={{ color: 'var(--tg-theme-button-color)' }}/>}
      sx={{flexBasis: '0', flexGrow: '1', marginLeft: '12px'}}
    />
  )
}