export const useBudgetingStore = defineStore('budgeting', () => {
  const { $api, $dayjs } = useNuxtApp()
  const { user } = useAuthStore()

  type Budget = {
    id: null,
    title: null,
    thePeriod: null,
    amount: 0,
    amountUsed: 0,
    amountLeft: 0,
    isActive: true,
    createdAt: null,
    updatedAt: null,
    userId: null
  }

  const availableMonths = ref([])
  const budgets = ref<Budget[]>([])

  const getAvailableMonth = (async () => {
    try {
      const { data } = await $api.post('/MonthlyBudgets/availableMonth')
      availableMonths.value = data
      return Promise.resolve(true)
    } catch (error) {
      return Promise.reject(error)
    }
  })
  const addMyBudget = (async (payload: { title: string, thePeriod: string, amount: number }) => {
    try {
      const { data } = await $api.post('/MonthlyBudgets', {
        userId: user.userId,
        title: payload.title,
        amount: payload.amount,
        amountLeft: payload.amount,
        thePeriod: payload.thePeriod
      })
      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error)
    }
  })
  const getBudgetInPeriod = (async (thePeriod: string) => {
    try {
      const { data } = await $api.get('/MonthlyBudgets', {
        params: {
          filter: {
            where: { thePeriod: thePeriod },
            include: 'financialRecords'
          }
        }
      })
      budgets.value = data
      return Promise.resolve(true)
    } catch (error) {
      return Promise.reject(error)
    }
  })
  const payBudget = (async (payload: {
    title: String, tCode: String, amount: Number, tDate: String,
    fromFinancialAccountId: Number, monthlyBudgetId: Number
  }) => {
    try {
      await $api.post('/MonthlyBudgets/payment', {
        title: payload.title,
        tCode: payload.tCode,
        amountOut: payload.amount,
        tDate: payload.tDate,
        financialAccountId: payload.fromFinancialAccountId,
        userId: user.userId,
        monthlyBudgetId: payload.monthlyBudgetId
      })
      return Promise.resolve(true)
    } catch (error) {
      return Promise.reject(error)
    }
  })

  return { getAvailableMonth, addMyBudget, getBudgetInPeriod, payBudget, availableMonths, budgets }
}, {
  persist: {
    storage: persistedState.localStorage,
    key: 'skpru_budgeting'
  }
})