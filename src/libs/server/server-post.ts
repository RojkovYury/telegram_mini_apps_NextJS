'use server';

import getEnv from '@/libs/server/env';
import axios, { AxiosError, AxiosResponse, CancelToken } from 'axios';
import createError from '@/components/error/create-error';
import Error from '@/components/error/interface';

export interface PostResponse<T> {
  data?: T | undefined;
  status?: number;
  error?: Error | null;
}

function createResponse<T>(response: AxiosResponse): { data: T, status: number, error: null } {
  return {
    data: response?.data,
    status: response?.status,
    error: null,
  };
}

interface Options {
  headers?: Record<string, string>;
  cancelToken?: CancelToken;
}

interface PostProps {
  url: string;
  baseUrl?: string;
  params?: any;
  options?: Options;
}

export async function serverPost<T>(props: PostProps): Promise<PostResponse<T>> {
  const { url, params } = props;
  const baseUrl = props.baseUrl || getEnv().API_BASE_URL;

  const options: Options = {
    ...(props.options || {}),
    headers: {
      ...(props.options?.headers || {}),
    },
  };

  return axios
    .post<T>(baseUrl + url, params || {}, options)
    .then((response: AxiosResponse<T>) => createResponse<T>(response))
    .catch((error: AxiosError<Error>) => {
      if (error.response?.data?.type === 'ERR_CANCELED' || error.code === 'ERR_CANCELED') {
        return { error: null };
      }
      return { error: createError(error), data: undefined };
    });
}
