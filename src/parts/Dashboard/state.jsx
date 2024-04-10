import { create } from 'zustand'

const useStore = create((set) => ({
  count: " ",
  inc: (num) => set(() => ({ count: num })),
}))

export default useStore;