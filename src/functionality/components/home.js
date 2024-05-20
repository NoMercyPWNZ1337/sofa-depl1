;(async () => {
  const store = await import('../store/index.js')
  const auth = await import('../methods/auth.js')

  auth.autoLogin()
})()
