import { create } from 'zustand';

interface UIState {
    isLoginModalVisible: boolean;
    showLoginModal: () => void;
    hideLoginModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
    isLoginModalVisible: false,
    showLoginModal: () => set({ isLoginModalVisible: true }),
    hideLoginModal: () => set({ isLoginModalVisible: false }),
}));
