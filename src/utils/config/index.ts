import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import CacheManager from "../CacheManager";

interface CallAPIProps extends AxiosRequestConfig {
  token?: boolean;
  serverToken?: string;
}

export default async function callApi({
  url, method, data, token, serverToken, params, headers
}: CallAPIProps) {
  if (serverToken) {
    headers = {
      ...headers,
      Authorization: `Bearer ${serverToken}`,
    }
  } else if (token) {
    const jwtToken = CacheManager.getToken()
    if (jwtToken) {
      headers = {
        ...headers,
        Authorization: `Bearer ${jwtToken}`,
      }
    }
  }

  try {
    const response: AxiosResponse<any, any> = await axios({
      url,
      method,
      data,
      headers,
      params: params
    })
    return response.data;
  } catch (error: any) {
    const errorData = error.response.data;
    throw errorData;
  }
}