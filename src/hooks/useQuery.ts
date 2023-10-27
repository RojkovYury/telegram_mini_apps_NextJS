import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ErrorContext } from '@/components/error/error-context';
import Error from '@/components/error/interface';
import { clientPost } from '@/libs/client/client-post';

interface UseQueryProps<T> {
  url: string;
  params?: any;
  initState?: T;
}

export type UseQuery<T> = [T | undefined, Dispatch<SetStateAction<T | undefined>>, boolean];

export default function useQuery<T>(props: UseQueryProps<T>): UseQuery<T> {
  const cancelToken = axios.CancelToken;
  const source = cancelToken.source();
  const { setErrors } = useContext(ErrorContext);
  const [clear, setClear] = useState<boolean>(!!props.initState);
  const [loading, setLoading] = useState<boolean>(!props.initState);
  const [state, setState] = useState<T | undefined>(props.initState as T);
  const paramsKey = JSON.stringify(props.params || {});

  const send = () => {
    // Отменяем первый запрос, если есть initState
    if (clear) {
      setClear(false);
      return;
    }

    if (!loading) {
      setLoading(true);
    }

    clientPost<T>(props.url, props.params, { cancelToken: source.token })
      .then((response) => {
        setState(response.data || undefined);

        if (response.error) {
          setErrors((prevState) => [...prevState, response.error as Error]);
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    send();
    return () => {
      source.cancel(`Request ${props.url} canceled in unmount`);
    };
    // eslint-disable-next-line
  }, [paramsKey]);

  return [state, setState, loading];
}
