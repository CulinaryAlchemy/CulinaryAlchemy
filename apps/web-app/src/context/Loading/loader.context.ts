import { createContext, useContext } from 'react'

interface ILoadingContext {
  isVisibleLoading: boolean
  toggleLoadingVisibility: () => void
}

const initialLoadingContextValue: ILoadingContext = {
  isVisibleLoading: false,
  toggleLoadingVisibility: () => {}
}

export const loadingContext = createContext<ILoadingContext>(initialLoadingContextValue)

export const useLoadingContext = () => useContext(loadingContext)
