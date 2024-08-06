export const useAccountStore = defineStore('account', () => {
  const { $api, $dayjs } = useNuxtApp()
  const { user } = useAuthStore()

  type Account = {
    id: null,
    title: null,
    sBalance: 0,
    eBalance: 0,
    isActive: true,
    createdAt: null,
    userId: null,
    updatedAt: null
  }
  const accounts = ref<Account[]>([])

  const totalBalance = ref(0)

  const getMyAccounts = (async () => {
    try {
      const { data } = await $api.get('/FinancialAccounts', {
        params: {
          filter: {
            where: {
              userId: user.userId
            }
          }
        }
      })
      accounts.value = data
      return Promise.resolve(true)
    } catch (error) {
      return Promise.reject(error)
    }
  })
  const addMyAccounts = (async (payload: { title: string, sBalance: number }) => {
    try {
      const { data } = await $api.post('/FinancialAccounts', {
        userId: user.userId,
        title: payload.title,
        sBalance: payload.sBalance,
        eBalance: payload.sBalance,
        updatedAt: $dayjs().utc().format('YYYY-MM-DD HH:mm:ss')
      })
      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error)
    }
  })
  const getTotalBalance = (async () => {
    try {
      const { data } = await $api.post('/FinancialAccounts/totalBalance')
      totalBalance.value = data.amount
      return Promise.resolve(true)
    } catch (error) {
      return Promise.reject(error)
    }
  })

  return { getMyAccounts, addMyAccounts, getTotalBalance, accounts, totalBalance }
}, {
  persist: {
    storage: persistedState.localStorage,
    key: 'skpru_account'
  }
})