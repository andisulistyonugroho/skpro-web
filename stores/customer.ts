import type { CustomerType } from "~/protob-gen/customer"

export const useCustomerStore = defineStore('customer', () => {

  const customers = ref<CustomerType[]>([])

  const { rGetCustomerOfEntity } = rpcCustomer()

  const getCustomerOfEntity = (async (enId: number) => {
    const response = await rGetCustomerOfEntity(enId)
    if (!response) return Promise.reject()

    customers.value = response
  })


  return { customers, getCustomerOfEntity }
})