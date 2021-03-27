export default ({ app, store }) => {
  app.router.beforeEach((to, from, next) => {
    next()
    if (to.name === 'index') {
      if (from.name === 'signin') {
        next()
      } else {
        next('/signin')
      }
    } else {
      next()
    }
  })
}
