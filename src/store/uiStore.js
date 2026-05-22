import { create } from 'zustand';

export const useUIStore = create((set) => ({
    globalSearch: '',
    setGlobalSearch: (term) => set({ globalSearch: term }),
    sidebarOpen: false,
    setSidebarOpen: (open) => set({ sidebarOpen: open }),
}));
