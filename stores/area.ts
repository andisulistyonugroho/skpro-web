import type { AreaType } from "~/protob-gen/area"

export const useAreaStore = defineStore('area', () => {

  const areas = ref<AreaType[]>([])

  const { rGetArea } = rpcArea()

  const getArea = (async () => {
    const response = await rGetArea()
    if (!response) return Promise.reject()

    areas.value = response
  })


  return { areas, getArea }
})