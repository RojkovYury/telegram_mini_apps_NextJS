'use client';

import { Dispatch, SetStateAction, useState, createContext } from 'react';
import ErrorWidget from './error-widget';
import Error from './interface';

interface ErrorContextResponse {
  errors: Error[];
  setErrors: Dispatch<SetStateAction<Error[]>>;
}

export const ErrorContext = createContext<ErrorContextResponse>({
  errors: [],
  setErrors: () => null,
});

export function ErrorProvider(props: { children: any, errors?: Error[] }) {
  const [errors, setErrors] = useState<Error[]>(props.errors || []);

  const closeError = (errorId?: string): void => {
    setErrors((prevState) => prevState.filter((err) => err.errorId !== errorId));
  };

  return (
  // eslint-disable-next-line react/jsx-no-constructed-context-values
    <ErrorContext.Provider value={{ errors, setErrors }}>
      {errors?.map((error, index) => (
        <ErrorWidget
          key={`${error?.errorId}-${index}`}
          error={error}
          onClose={() => closeError(error?.errorId)}
          index={index}
        />
      ))}

      {props.children}
    </ErrorContext.Provider>
  );
}
