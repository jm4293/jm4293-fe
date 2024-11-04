import { AxiosResponse } from 'axios';
import { ErrorConfig, ResponseConfig } from '@/types/interface';

export interface QueryResponse<T> extends AxiosResponse<ResponseConfig<T>> {}
export interface QueryError extends AxiosResponse<ErrorConfig> {}
