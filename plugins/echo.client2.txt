import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

export default defineNuxtPlugin(() => {
  // Pusher را به صورت محلی در window تعریف کن
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).Pusher = Pusher
    }

  const echo = new Echo({
    broadcaster: 'pusher',
    key: 'local-key',
    wsHost: '127.0.0.1', // همونی که Soketi روش ران میشه
    wsPort: 6001,
    forceTLS: false,
    disableStats: true,
  })

  echo.channel('test-channel')
    .listen('.test.event', (data: any) => {
      console.log('✅ Event دریافت شد:', data)
      alert('📢 پیام از لاراول: ' + data.message)
    })

  return {
    provide: { echo }
  }
})