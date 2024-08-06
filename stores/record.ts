export const useRecordStore = defineStore('record', () => {
  const { $api } = useNuxtApp()
  const { user } = useAuthStore()
  const transactionLog = ref([])

  const addRecord = (async (payload: {
    title: string, tCode: string, amount: number,
    fromFinancialAccountId: number, toFinancialAccountId: number,
    tDate: string, monthlyBudgetId: number | undefined
  }) => {
    try {
      await $api.post('/FinancialRecords', {
        title: payload.title,
        amountIn: payload.tCode === 'C' ? payload.amount : 0,
        amountOut: payload.tCode === 'D' ? payload.amount : 0,
        tCode: payload.tCode,
        tDate: payload.tDate,
        financialAccountId: payload.tCode === 'C' ? payload.toFinancialAccountId : payload.fromFinancialAccountId,
        userId: user.userId,
        monthlyBudgetId: payload.monthlyBudgetId
      })
      return Promise.resolve(true)
    } catch (error) {
      return Promise.reject(error)
    }
  })

  const getRecordInBetween = (async (payload: { startDate: string, endDate: string }) => {
    try {
      const { data } = await $api.get('/FinancialRecords', {
        params: {
          filter: {
            where: {
              isActive: 1,
              tDate: {
                between: [payload.startDate, payload.endDate]
              },
              userId: user.userId
            }
          }
        }
      })
      transactionLog.value = data
      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error)
    }
  })

  return { addRecord, getRecordInBetween, transactionLog }
}, {
  persist: {
    storage: persistedState.localStorage,
    key: 'skpru_record'
  }
})