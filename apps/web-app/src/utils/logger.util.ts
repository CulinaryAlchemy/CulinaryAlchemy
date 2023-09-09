export class Logger {
  private readonly isDevMode: boolean

  constructor (isDevMode: boolean) {
    this.isDevMode = isDevMode
  }

  public log (file: string, message: unknown) {
    if (!this.isDevMode) return

    console.groupCollapsed(file)
    console.log(message)
    console.groupEnd()
  }

  public err (file: string, message: unknown) {
    if (!this.isDevMode) return

    console.groupCollapsed(`%cError: ${file}`, 'color: red')
    console.error(message)
    console.groupEnd()
  }
}
