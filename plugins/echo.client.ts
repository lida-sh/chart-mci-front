import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

declare global {
  interface Window {
    Pusher: typeof Pusher
  }
}
// چون از Reverb استفاده می‌کنی، ما به صورت WebSocket خالص وصل می‌شیم
window.Pusher = Pusher

export default defineNuxtPlugin(() => {
  const echo = new Echo({
  broadcaster: 'reverb',
  key: 'wpgovmelfd4vkojtfnas',
  wsHost: '127.0.0.1',
  wsPort:  8080,
  forceTLS: false,
  enabledTransports: ['ws', 'wss'],
})
  // const client = new Pusher('reverb', {
  //   wsHost: '127.0.0.1', // همون آدرس Reverb
  //   wsPort: 8080,        // پورتی که Reverb ران شده
  //   forceTLS: false,
  //   cluster: 'mt1',      // فقط برای تایپ اسکریپت
  //   enabledTransports: ['ws', 'wss'],
  // })
  //  const echo = new Echo({
  //   broadcaster: 'pusher',
  //   key: 'wpgovmelfd4vkojtfnas', 
  //   client,
  //   encrypted: false,
  //   disableStats: true,
  //   cluster: 'mt1', 
    
  // });
  // console.log('🟢 Echo instance:', echo)
  return {
    provide: {
      echo,
    },
  }
})
