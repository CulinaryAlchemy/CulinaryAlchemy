export class CustomMessageEventApp {
  private readonly eventName: string
  private callback: () => unknown

  constructor (eventName: string) {
    this.eventName = 'custom:' + eventName
    this.callback = () => {}
  }

  public sendMessage (params?: { details?: unknown | null }) {
    const customEvent = new CustomEvent(this.eventName, { detail: params?.details })
    document.dispatchEvent(customEvent)
  }

  public listenEvent (callback: () => unknown) {
    this.callback = callback
    document.addEventListener(this.eventName, callback)
  }

  public removeEvent () {
    document.removeEventListener(this.eventName, this.callback)
  }
}
