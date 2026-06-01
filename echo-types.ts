declare module 'laravel-echo' {
  interface Connector {
    socket: any
  }

  interface Channel {
    listen(event: string, callback: (data: any) => void): Channel
    stopListening(event: string, callback?: (data: any) => void): Channel
    subscribed(callback: () => void): Channel
    error(callback: (error: any) => void): Channel
  }

  interface PresenceChannel extends Channel {
    here(callback: (users: any[]) => void): PresenceChannel
    joining(callback: (user: any) => void): PresenceChannel
    leaving(callback: (user: any) => void): PresenceChannel
  }

  interface EchoOptions {
    broadcaster: string
    host: string
    client: any
    transports: string[]
    auth?: {
      headers?: {
        Authorization?: string
      }
    }
  }

  export default class Echo {
    constructor(options: EchoOptions)
    connector: Connector
    channel(name: string): Channel
    privateChannel(name: string): Channel
    presenceChannel(name: string): PresenceChannel
    leave(name: string): void
    leaveChannel(name: string): void
    socketId(): string
    disconnect(): void
  }
}