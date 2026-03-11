import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

interface AuthUser {
    phoneNumber: string;
    name?: string;
    avatar?: string;
}

interface AuthState {
    isLoggedIn: boolean;
    user: AuthUser | null;
    token: string | null;
    login: (phoneNumber?: string, password?: string) => Promise<void>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
    updateUser: (data: Partial<AuthUser>) => Promise<void>;
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
    token: null,
    login: async (phoneNumber = "admin", password = "123456") => {
        try {
            // Gọi API thật để lấy token
            const response = await fetch('https://api.duocnamviet.site/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: phoneNumber, password })
            });
            const resData = await response.json();
            
            if (resData?.success && resData?.data?.access_token) {
                const token = resData.data.access_token;
                const user = { phoneNumber, name: 'Quản trị viên' };
                await safeSetItem('auth_token', token);
                await safeSetItem('auth_user', JSON.stringify(user));
                set({ isLoggedIn: true, user, token });
            } else {
                console.error("Login failed:", resData);
            }
        } catch (e) {
            console.error("Login Error", e);
        }
    },
    logout: async () => {
        await safeDeleteItem('auth_user');
        await safeDeleteItem('auth_token');
        set({ isLoggedIn: false, user: null, token: null });
    },
    checkAuth: async () => {
        try {
            const token = await safeGetItem('auth_token');
            const data = await safeGetItem('auth_user');
            if (data && token) {
                set({ isLoggedIn: true, user: JSON.parse(data), token });
            } else {
                // Tự động đăng nhập mẫu để có token call API Products
                useAuthStore.getState().login();
            }
        } catch (e) {
            set({ isLoggedIn: false, user: null, token: null });
        }
    },
    updateUser: async (data) => {
        set((state) => {
            const newUser = state.user ? { ...state.user, ...data } : null;
            if (newUser) {
                safeSetItem('auth_user', JSON.stringify(newUser));
            }
            return { user: newUser };
        });
    }
}));
