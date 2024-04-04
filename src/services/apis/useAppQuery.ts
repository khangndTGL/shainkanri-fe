import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { replaceDynamicValues } from '../common'
import http from './http'
// http://133.167.66.141:8008/bushims?bscd=I3&teamcd=&shaincd=&shainnm1=&shainnm2=&acct=
type ApiQueryType = {
  bscdCbbItem: {
    url: {
      baseUrl: '/bscd-cbb-item'
    }
    response: {
      bscd_cbb: {
        bscd: string
        bsnm: string
      }[]
      teamcdcm_cbb: {
        blkcd: string
        bscd: string
        bsnm: string
        bsnmryaku: string
        teamcd: string
        teamnm: string
      }[]
      yakucdm_cbb: any[]
    }
  }
  bushims: {
    url: {
      baseUrl: '/bushims'
      queryParams: {
        bscd?: string
        teamcd?: string
        shaincd?: string
        shainnm1?: string
        shainnm2?: string
        acct?: string
      }
    }
    response: {
      acct: string
      blkcd: string
      bscd: string
      bsnm: string
      inpdt: string
      kihyocd: string
      mail: string
      pwd: string
      seibetsu: string
      shaincd: string
      shainnM1: string
      shainnM2: string
      teamcd: string
      typecd: string
      updt: string
      yakucd: string
      yakunm: string
    }[]
  }
}

export const useAppQuery = <T extends keyof ApiQueryType>({
  url,
  options,
  onSucess
}: Omit<ApiQueryType[T], 'response'> & { key: T } & {
  options?: Omit<
    UseQueryOptions<ApiQueryType[T]['response']>,
    'queryFn' | 'queryKey'
  > & { queryKey?: string[] | string }
  onSucess?: (data: ApiQueryType[T]['response']) => void
}) => {
  const queryParams = new URLSearchParams((url as any)?.queryParams).toString()

  const urlApi = `${replaceDynamicValues(
    url.baseUrl,
    (url as any)?.urlParams || {}
  )}`
  const requestKey = `${urlApi}${queryParams ? `?${queryParams}` : ''}`

  const data = useQuery({
    ...options,
    queryKey: [requestKey, options?.queryKey],
    queryFn: async (): Promise<ApiQueryType[T]['response']> => {
      const response = await http.get(urlApi, {
        params: (url as any)?.queryParams
      })
      onSucess && onSucess(response.data)
      return response.data
    }
  })

  return data
}

export const appGetFn = async <T extends keyof ApiQueryType>({
  url,
  onSucess
}: Omit<ApiQueryType[T], 'response'> & {
  key: T
  onSucess?: (data: ApiQueryType[T]['response']) => void
}): Promise<ApiQueryType[T]['response']> => {
  const urlApi = `${replaceDynamicValues(
    url.baseUrl,
    (url as any)?.urlParams || {}
  )}`

  try {
    const response = await http.get(urlApi, {
      params: (url as any)?.queryParams
    })
    onSucess && onSucess(response.data)
    return response.data
  } catch (error) {
    console.error('Error making API request:', error)
    throw error
  }
}
