import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../features/product/HomeScreen';
import CategoryScreen from '../features/product/CategoryScreen';
import CartScreen from '../features/cart/CartScreen';
import OrderScreen from '../features/order/OrderScreen';
import ProfileScreen from '../features/profile/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Category" component={CategoryScreen} />
            <Tab.Screen name="Cart" component={CartScreen} />
            <Tab.Screen name="Order" component={OrderScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
}
