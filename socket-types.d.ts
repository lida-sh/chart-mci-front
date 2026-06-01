export interface OcrResult {
  file_name: string
  process_name: string
  found_in_text: number[]
  found_in_images: number[]
  keyword?: string
}

export interface SocketMessage {
  message: string
  data?: OcrResult[] | any
  timestamp: string
  user_id?: number
}

export interface ConnectionStatus {
  status: 'connected' | 'connecting' | 'disconnected' | 'error'
  message: string
}