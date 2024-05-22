;(async () => {
  const { autoLoginService } = await import('../services/auth.js')

  autoLoginService()
})()
