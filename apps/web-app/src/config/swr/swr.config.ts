import { axiosFetcher } from '@/config'
import { type SWRConfiguration } from 'swr'

export const CSWRConfig: SWRConfiguration = {
  fetcher: axiosFetcher,
  revalidateOnMount: true, // Revalida cuando se monta el componente
  revalidateOnFocus: false, // Deshabilita la revalidación cuando la ventana obtiene el foco
  shouldRetryOnError: false // Deshabilita la revalidación cuando obtiene un error
}
