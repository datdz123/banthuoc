import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../features/auth/LoginScreen';
import RegisterScreen from '../features/auth/RegisterScreen';
import SplashScreen from '../features/splash/SplashScreen';
import MainTabs from './MainTabs';

import ProductDetailScreen from '../features/product/ProductDetailScreen';
import CheckoutScreen from '../features/cart/CheckoutScreen';
import LoginModal from '../components/LoginModal';
import { useUIStore } from '../store/useUIStore';
import { navigationRef } from './navigationRef';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    const { isLoginModalVisible, hideLoginModal } = useUIStore();

    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
                <Stack.Screen name="Splash" component={SplashScreen} />
                <Stack.Screen name="MainTabs" component={MainTabs} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
                <Stack.Screen name="Checkout" component={CheckoutScreen} />
            </Stack.Navigator>

            <LoginModal
                visible={isLoginModalVisible}
                onClose={hideLoginModal}
            />
        </NavigationContainer>
    );
}
