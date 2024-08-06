// In Setup Stores:
// ref()s become state properties
// computed()s become getters
// function()s become actions

export const useAuthStore = defineStore('auth', () => {
  type ProfileType = {
    [key: string]: any
  }
  const profile: ProfileType = {}
  const user = reactive({
    token: '',
    userId: 0,
    profile: profile,
    role: ''
  })
  const dark = ref('')

  function setUser(obj: { token: string, userId: number }) {
    user.token = obj.token
    user.userId = obj.userId
  }
  function setProfile(value: object) {
    user.profile = value
  }
  function setRole(value: string) {
    user.role = value
  }
  async function logout() {
    user.token = ''
    user.userId = 0
    user.profile = {}
    user.role = ''
  }
  const changingTheme = (value: boolean) => {
    dark.value = value ? 'light' : 'dark'
  }

  return { setUser, setProfile, setRole, logout, changingTheme, user, dark }
},
  {
    persist: {
      storage: persistedState.localStorage,
      key: 'skpru_auth'
    }
  }
)