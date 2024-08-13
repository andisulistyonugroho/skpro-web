export default defineNuxtRouteMiddleware((to, from) => {
  const { user } = useAuthStore()
  if (to.path !== '/login') {
    if (!user.token) {
      return navigateTo('/login')
    }
  } else if (to.path === '/login' && user.token) {
    return navigateTo('/')
  }

})