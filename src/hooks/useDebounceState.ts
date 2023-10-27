'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';

const useDebounceState = <T>(defaultValue: T | undefined, onUpdate?: () => void): [T | undefined, Dispatch<SetStateAction<T | undefined>>, Dispatch<SetStateAction<boolean>>] => {
  const [value, setValue] = useState<T | undefined>(defaultValue);
  const [clear, setClear] = useState(true);
  const [sleepAfterTyping, setSleepAfterTyping] = useState<number>(0);
  const [runCounter, setRunCounter] = useState<boolean>(false);
  let interval: NodeJS.Timer;

  useEffect(() => {
    setValue(defaultValue);
    setClear(true);
    clearInterval(interval);
    setSleepAfterTyping(0);
    setRunCounter(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue]);

  useEffect(() => {
    if (value !== defaultValue && clear) {
      setClear(false);
    }
    if (!clear) {
      setRunCounter(true);
      setSleepAfterTyping(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, clear]);

  useEffect(() => {
    if (!onUpdate || clear) {
      return;
    }
    if (runCounter) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      interval = setInterval(() => {
        setSleepAfterTyping(sleepAfterTyping + 1);
      }, 1000);
      if (sleepAfterTyping > 2) {
        onUpdate?.();
        setRunCounter(false);
        setSleepAfterTyping(0);
      }
    } else {
      clearInterval(interval);
    }

    // eslint-disable-next-line consistent-return
    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sleepAfterTyping, runCounter, onUpdate]);

  return [value, setValue, setRunCounter];
};

export default useDebounceState;
