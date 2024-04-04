export const replaceDynamicValues = (
  template: string,
  dynamicValues: { [key: string]: string | number }
) => {
  const dynamicKeys = Object.keys(dynamicValues)
  let replacedUrl = template

  dynamicKeys.forEach(key => {
    // Use a regex pattern that matches colons and the key
    const pattern = new RegExp(`:${key}`, 'g')
    replacedUrl = replacedUrl.replace(pattern, dynamicValues[key]?.toString())
  })

  return replacedUrl
}

export const LocalStorageEventTarget = new EventTarget()
export const lsActions = {
  getToken: () => localStorage.getItem('token') || '',

  setToken: (token: string) => localStorage.setItem('token', token),

  dispatchClearEvent: () => {},

  clearLS: (dispatchEvent?: boolean) => {
    localStorage.removeItem('token')

    if (dispatchEvent) {
      const clearLSEvent = new Event('clearLS')
      LocalStorageEventTarget.dispatchEvent(clearLSEvent)
    }
  }
}
