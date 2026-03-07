import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

interface AuthUser {
    phoneNumber: string;
    name?: string;
}

interface AuthState {
    isLoggedIn: boolean;
    user: AuthUser | null;
    login: (phoneNumber: string) => Promise<void>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
}

const safeSetItem = async (key: string, value: string) => {
    if (Platform.OS === 'web') {
        try { localStorage.setItem(key, value); } catch (e) {}
    } else {
        await SecureStore.setItemAsync(key, value);
    }
};

const safeGetItem = async (key: string) => {
    if (Platform.OS === 'web') {
        try { return localStorage.getItem(key); } catch (e) { return null; }
    } else {
        return await SecureStore.getItemAsync(key);
    }
};

const safeDeleteItem = async (key: string) => {
    if (Platform.OS === 'web') {
        try { localStorage.removeItem(key); } catch (e) {}
    } else {
        await SecureStore.deleteItemAsync(key);
    }
};

export const useAuthStore = create<AuthState>((set) => ({
    isLoggedIn: false,
    user: null,
    login: async (phoneNumber) => {
        const user = { phoneNumber, name: 'Khách hàng' };
        await safeSetItem('auth_user', JSON.stringify(user));
        set({ isLoggedIn: true, user });
    },
    logout: async () => {
        await safeDeleteItem('auth_user');
        set({ isLoggedIn: false, user: null });
    },
    checkAuth: async () => {
        try {
            const data = await safeGetItem('auth_user');
            if (data) {
                set({ isLoggedIn: true, user: JSON.parse(data) });
            }
        } catch (e) {
            set({ isLoggedIn: false, user: null });
        }
    }
}));
