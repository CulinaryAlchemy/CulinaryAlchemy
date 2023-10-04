export class CustomMessageEventApp {
  private readonly eventName: string

  constructor (eventName: string) {
    this.eventName = 'custom:' + eventName
  }

  public sendMessage (params?: { details?: unknown | null }) {
    const customEvent = new CustomEvent(this.eventName, { detail: params?.details })
    document.dispatchEvent(customEvent)
  }

  public listenEvent (callback: () => unknown) {
    document.addEventListener(this.eventName, callback)
  }
}
