;(async () => {
  const { AuthService } = await import('../../services/auth.js')

  await AuthService.checkAuth()
  await AuthService.checkAccess()
})()
