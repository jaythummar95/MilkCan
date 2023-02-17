import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import {getHttpClient} from './HttpClient';
import {resolver} from './Utisl';
import {Result} from './Result';

let httpClient: AxiosInstance;
export const initHttpClient = (apiBaseUrl: string): void => {
  httpClient = getHttpClient(apiBaseUrl);
};

type Request = <T extends unknown>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
) => Promise<Result<T>>;

export class Http {
  get: Request = async (url, config) => {
    const [value, error] = await resolver(
      httpClient.get<any, AxiosResponse>(url, config),
    );
    // console.log('VALUE', value);
    // value is AxiosResponse
    if (axios.isAxiosError(value)) {
      // Log, ToDo
      return Result.fail('Axios Error');
    }
    if (error) {
      // stock errors
      if (axios.isAxiosError(error)) {
        // catch & log, ToDo
      } else {
        // log other error, ToDo
      }
      return Result.fail('Error');
    }
    return Result.ok(value?.data);
  };
  post: Request = async (url, data, config) => {
    const [value, error] = await resolver(
      httpClient.post<any, AxiosResponse>(url, data, config),
    );
    // console.log(JSON.stringify(config, '', 4));
    console.log(JSON.stringify(value, '', 4));
    // value is AxiosResponse
    if (axios.isAxiosError(JSON.stringify(value,"",4))) {
      // Log, ToDo
      return Result.fail('Axios Error');
    }
    if (error) {
      // stock errors
      if (axios.isAxiosError(error)) {
        // catch & log, ToDo
      } else {
        // log other error, ToDo
      }
      return Result.fail('Error');
    }
    return Result.ok(value?.data);
  };
}

export const http = new Http();
