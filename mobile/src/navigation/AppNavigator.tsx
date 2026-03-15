import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../features/auth/LoginScreen';
import RegisterScreen from '../features/auth/RegisterScreen';
import SplashScreen from '../features/splash/SplashScreen';
import MainTabs from './MainTabs';

import CategoryArchiveScreen from '../features/product/CategoryArchiveScreen';
import ProductDetailScreen from '../features/product/ProductDetailScreen';
import ConsultationScreen from '../features/product/ConsultationScreen';
import StoreLocatorScreen from '../features/product/StoreLocatorScreen';
import MomAndBabyScreen from '../features/product/MomAndBabyScreen';
import MyPrescriptionsScreen from '../features/product/MyPrescriptionsScreen';
import MedicineReminderScreen from '../features/product/MedicineReminderScreen';
import HealthCheckScreen from '../features/product/HealthCheckScreen';
import ARCameraScreen from '../features/product/ARCameraScreen';
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
                <Stack.Screen name="CategoryArchive" component={CategoryArchiveScreen} />
                <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
                <Stack.Screen name="Consultation" component={ConsultationScreen} />
                <Stack.Screen name="StoreLocator" component={StoreLocatorScreen} />
                <Stack.Screen name="MomAndBaby" component={MomAndBabyScreen} />
                <Stack.Screen name="MyPrescriptions" component={MyPrescriptionsScreen} />
                <Stack.Screen name="MedicineReminder" component={MedicineReminderScreen} />
                <Stack.Screen name="HealthCheck" component={HealthCheckScreen} />
                <Stack.Screen name="ARCamera" component={ARCameraScreen} />
                <Stack.Screen name="Checkout" component={CheckoutScreen} />
            </Stack.Navigator>

            <LoginModal
                visible={isLoginModalVisible}
                onClose={hideLoginModal}
            />
        </NavigationContainer>
    );
}
