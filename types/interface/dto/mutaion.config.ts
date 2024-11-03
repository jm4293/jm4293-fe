import { AxiosError, AxiosResponse } from 'axios';
import { ErrorConfig, ResponseConfig } from '@/types/interface';

export interface MutationResponse<T> extends AxiosResponse<ResponseConfig<T>> {}
export interface MutationError extends AxiosError<ErrorConfig> {}
