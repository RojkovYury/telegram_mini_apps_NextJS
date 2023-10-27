import { Dispatch, SetStateAction, useContext, useState } from 'react';
import Error from '@/components/error/interface';
import { ErrorContext } from '@/components/error/error-context';
import { clientPost, PostResponse } from '@/libs/client/client-post';

interface MutateProps<Params, Response> {
  url: string;
  params?: Params;
  onSuccess: Dispatch<SetStateAction<Response | null>>;
  onError: (error: Error | null) => void;
  setLoading: (loading: boolean) => void;
  infiniteLoading?: boolean;
}

function mutate<Params, Response>(props: MutateProps<Params, Response>): Promise<PostResponse<Response>> {
  props.setLoading(true);
  return clientPost<Response>(props.url, props.params)
    .then((res) => {
      if (res.error) {
        props.onError(res.error);
      } else {
        props.onSuccess(res.data || null);
        props.onError(null);
      }
      return res;
    })
    .catch((res) => {
      props.onError(res.error);
      return res;
    })
    .finally(() => !props.infiniteLoading && props.setLoading(false));
}

export interface UseMutation<Params, Response> {
  loading: boolean;
  data?: Response | null;
  error?: Error | null;
  mutate: (params?: Params) => Promise<PostResponse<Response>>;
}

export default function useMutation<Params, Response>(props: { url: string; infiniteLoading?: boolean; }): UseMutation<Params, Response> {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Response | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const { setErrors } = useContext(ErrorContext);

  return {
    loading,
    data,
    error,

    mutate: (params?: Params) => mutate<Params, Response>({
      url: props.url,
      params,
      onSuccess: setData,
      onError: (errorData: Error | null) => {
        if (errorData) {
          setErrors((prevState) => [...prevState, errorData]);
          if (props.infiniteLoading) {
            setLoading(false);
          }
        }
        setError(errorData);
      },
      infiniteLoading: props.infiniteLoading,
      setLoading,
    }),
  };
}
