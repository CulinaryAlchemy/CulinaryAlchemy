type TModes = Record<string, 'light' | 'dark' | 'system'>

export const CThemesModes: TModes = {
  dark: 'dark',
  light: 'light',
  system: 'system'
} as const
