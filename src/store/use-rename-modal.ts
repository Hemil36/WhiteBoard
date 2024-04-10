import { create } from "zustand"

const defaultValues={id:" ",title :""}


export const useRenameModal = create((set) => ({
    isOpen: false,
    onOpen: (id: string, title: string) => set({ isOpen: true, initialValues: { id, title } }),
    onClose: () => set({ isOpen: false ,initialValues:defaultValues }),
    initialValues:defaultValues

}))