;(async () => {
  const store = await import('../store/index.js')

  console.log(store.state)
})()
