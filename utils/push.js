
const uri = 'https://simple-push-production.up.railway.app/api'
const VAPID_PUBLIC_KEY = "BNi8qKCi_vabffu_Byt76vs-ps6qmUN2iuN6yfWpvPCDfM4uTJisWzUvPfXmmxrFBNwC6zpOXKp0X82wmG08300"

async function subscribeButtonHandler(token) {
  const registration = await navigator?.serviceWorker?.getRegistration()
  const subscribed = await registration?.pushManager?.getSubscription()
  if (subscribed) 
    return
  
  const subscription = await registration?.pushManager?.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
  })
  await fetch(`${uri}/users/add-subscription`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify(subscription)
  })
}

async function unsubscribeButtonHandler() {
  const registration = await navigator.serviceWorker.getRegistration()
  const subscription = await registration.pushManager.getSubscription()
  fetch(`${uri}/remove-subscription`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({endpoint: subscription.endpoint})
  });
  await subscription.unsubscribe()
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/")

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

async function init () {
  try {
    if (Notification.permission === 'default')
      throw new Error('denied')

    if ('serviceWorker' in navigator && 'PushManager' in window) {
      navigator.serviceWorker.register('/sw.js')
    }
  } catch (e) {
    return e.message
  }
}

export {
  subscribeButtonHandler,
  unsubscribeButtonHandler,
  init
}