import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, MaterialCommunityIcons, AntDesign, FontAwesome5 } from '@expo/vector-icons';

import HomeScreen from '../features/product/HomeScreen';
import CategoryScreen from '../features/product/CategoryScreen';
import CartScreen from '../features/cart/CartScreen';
import OrderScreen from '../features/order/OrderScreen';
import ProfileScreen from '../features/profile/ProfileScreen';

const Tab = createBottomTabNavigator();

const FloatingCenterButton = (props: any) => (
    <TouchableOpacity
        {...props}
        style={[props.style, styles.floatingButtonContainer]}
        activeOpacity={0.8}
    >
        <View style={styles.floatingButton}>
            <View style={styles.floatingButtonInner}>
                {props.children}
            </View>
        </View>
    </TouchableOpacity>
);

export default function MainTabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#1D52F1',
                tabBarInactiveTintColor: '#8A92A6',
                tabBarStyle: {
                    height: Platform.OS === 'ios' ? 85 : (Platform.OS === 'web' ? 70 : 65),
                    paddingBottom: Platform.OS === 'ios' ? 25 : (Platform.OS === 'web' ? 15 : 10),
                    paddingTop: 5,
                    borderTopWidth: 1,
                    borderTopColor: '#EFEFEF',
                    backgroundColor: '#FFFFFF',
                    ...Platform.select({
                        web: {
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            zIndex: 1000,
                            boxShadow: '0px -2px 10px rgba(0,0,0,0.05)',
                        },
                        default: {
                            elevation: 8,
                        }
                    })
                },
                tabBarLabelStyle: {
                    fontSize: 10,
                    fontWeight: '600',
                    marginTop: 2,
                },
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Trang chủ',
                    tabBarIcon: ({ color, size }) => (
                        <Entypo name="home" size={24} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Reward"
                component={CategoryScreen} // Temporary placeholder
                options={{
                    tabBarLabel: 'Điểm thưởng',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="medal-outline" size={24} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Consult"
                component={HomeScreen} // Temporary placeholder
                options={{
                    tabBarLabel: 'Tư vấn',
                    tabBarIcon: () => (
                        <MaterialCommunityIcons name="headset" size={20} color="white" />
                    ),
                    tabBarButton: (props) => <FloatingCenterButton {...props} />,
                }}
            />
            <Tab.Screen
                name="Cart"
                component={CartScreen}
                options={{
                    tabBarLabel: 'Giỏ hàng',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="cart-outline" size={24} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarLabel: 'Tài khoản',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="smile" size={22} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    floatingButtonContainer: {
        top: -15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    floatingButton: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        ...Platform.select({
            web: {
                boxShadow: '0px 4px 6px rgba(0,0,0,0.1)',
            },
            default: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.15,
                shadowRadius: 5.46,
                elevation: 9,
            }
        })
    },
    floatingButtonInner: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#1D52F1',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
