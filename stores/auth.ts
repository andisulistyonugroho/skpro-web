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
    groupId: 0,
    userPtnrId: 0,
    enId: 0
  })
  const dark = ref('')
  const { rLogin } = rpcAuth()

  const login = (async (payload: { username: string, password: string }) => {
    const response = await rLogin(payload.username, payload.password)
    if (!response) {
      return Promise.reject()
    }

    setUser({
      token: response.token, userId: response.userid, enId: response.enid,
      groupId: response.groupid, userPtnrId: response.userptnrid,
    })
    setProfile({ userName: response.username, userPidgin: response.userpidgin })
    return Promise.resolve(true)
  })

  function setUser(obj: {
    token: string,
    userId: number,
    enId: number,
    groupId: number,
    userPtnrId: number
  }) {
    user.token = obj.token
    user.userId = obj.userId
    user.groupId = obj.groupId
    user.userPtnrId = obj.userPtnrId
    user.enId = obj.enId
  }
  function setProfile(value: object) {
    user.profile = value
  }

  async function logout() {
    user.token = ''
    user.userId = 0
    user.profile = {}
    user.groupId = 0
    user.userPtnrId = 0
    user.enId = 0
  }
  const changingTheme = (value: boolean) => {
    dark.value = value ? 'light' : 'dark'
  }

  return { login, setUser, setProfile, logout, changingTheme, user, dark }
},
  {
    persist: {
      storage: persistedState.localStorage,
      key: 'skpru_auth'
    }
  }
)