import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { replaceDynamicValues } from "../common";
import http from "./http";

type ApiQueryType = {
  base: {
    url: {
      baseUrl: "/auth/profile";
      urlParams: {
        section: string;
        userId: string;
        boardId: string;
      };
      queryParams: {
        param1: string;
        param2: string;
      };
    };
    response: any;
  };
};

export const useAppQuery = <T extends keyof ApiQueryType>({
  url,
  options,
  onSucess,
}: Omit<ApiQueryType[T], "response"> & { key: T } & {
  options?: Omit<
    UseQueryOptions<ApiQueryType[T]["response"]>,
    "queryFn" | "queryKey"
  > & { queryKey?: string[] | string };
  onSucess?: (data: ApiQueryType[T]["response"]) => void;
}) => {
  const queryParams = new URLSearchParams((url as any)?.queryParams).toString();

  const urlApi = `${replaceDynamicValues(
    url.baseUrl,
    (url as any)?.urlParams || {}
  )}`;
  const requestKey = `${urlApi}${queryParams ? `?${queryParams}` : ""}`;

  const data = useQuery({
    ...options,
    queryKey: [requestKey, options?.queryKey],
    queryFn: async (): Promise<ApiQueryType[T]["response"]> => {
      const response = await http.get(urlApi, {
        params: (url as any)?.queryParams,
      });
      onSucess && onSucess(response.data);
      return response.data;
    },
  });

  return data;
};

export const appGetFn = async <T extends keyof ApiQueryType>({
  url,
  onSucess,
}: Omit<ApiQueryType[T], "response"> & {
  key: T;
  onSucess?: (data: ApiQueryType[T]["response"]) => void;
}): Promise<ApiQueryType[T]["response"]> => {
  const urlApi = `${replaceDynamicValues(
    url.baseUrl,
    (url as any)?.urlParams || {}
  )}`;

  try {
    const response = await http.get(urlApi, {
      params: (url as any)?.queryParams,
    });
    onSucess && onSucess(response.data);
    return response.data;
  } catch (error) {
    console.error("Error making API request:", error);
    throw error;
  }
};
