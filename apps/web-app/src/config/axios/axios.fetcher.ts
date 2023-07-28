import axios from 'axios'

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
export const axiosFetcher = (url: string) => axios.get(url).then((res) => res.data)
