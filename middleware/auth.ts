export default defineNuxtRouteMiddleware((to, from) => {
  const { user } = useAuthStore()
  if (to.path !== '/logreg') {
    if (!user.token) {
      return navigateTo('/logreg')
    }
  } else if (to.path === '/logreg' && user.token) {
    return navigateTo('/')
  }

})