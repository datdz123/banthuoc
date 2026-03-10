import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, MaterialCommunityIcons, AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../features/product/HomeScreen';
import CategoryScreen from '../features/product/CategoryScreen';
import CartScreen from '../features/cart/CartScreen';
import OrderScreen from '../features/order/OrderScreen';
import ProfileScreen from '../features/profile/ProfileScreen';
import PersonalDetailScreen from '../features/profile/PersonalDetailScreen';
import UpdateProfileScreen from '../features/profile/UpdateProfileScreen';

const Tab = createBottomTabNavigator();
const ProfileStack = createNativeStackNavigator();

function ProfileStackScreen() {
    return (
        <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
            <ProfileStack.Screen name="ProfileMain" component={ProfileScreen} />
            <ProfileStack.Screen name="PersonalDetail" component={PersonalDetailScreen} />
            <ProfileStack.Screen name="UpdateProfile" component={UpdateProfileScreen} />
        </ProfileStack.Navigator>
    );
}

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
                    tabBarLabel: ({ focused }) => (
                        <Text style={{
                            color: 'white',
                            fontSize: 10,
                            fontWeight: '600',
                            marginBottom: Platform.OS === 'ios' ? 0 : 2
                        }}>
                            Tư vấn
                        </Text>
                    ),
                    tabBarIcon: () => (
                        <MaterialCommunityIcons name="headset" size={24} color="white" />
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
                component={ProfileStackScreen}
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
        top: -12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    floatingButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        ...Platform.select({
            web: {
                boxShadow: '0px 4px 10px rgba(0,0,0,0.2)',
            },
            default: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 5 },
                shadowOpacity: 0.3,
                shadowRadius: 6,
                elevation: 10,
            }
        })
    },
    floatingButtonInner: {
        width: 52,
        height: 52,
        borderRadius: 26,
        backgroundColor: '#1D52F1',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 2,
    },
});
