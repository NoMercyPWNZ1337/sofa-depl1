;(async () => {
  const { checkAuthService } = await import('../services/auth.js')

  checkAuthService()
})()
