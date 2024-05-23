;(async () => {
  const { autoLoginService, autoCheckAccess } = await import(
    '../services/auth.js'
  )

  autoLoginService()
  autoCheckAccess()
})()
