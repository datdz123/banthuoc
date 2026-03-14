import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCartStore } from '../store/useCartStore';

interface ScreenHeaderProps {
    title?: string;
    showShare?: boolean;
    transparent?: boolean;
}

export default function ScreenHeader({ title, showShare = true, transparent = false }: ScreenHeaderProps) {
    const navigation = useNavigation<any>();
    const insets = useSafeAreaInsets();
    const totalItems = useCartStore(state => state.getBadgeCount());

    return (
        <View 
            className={`flex-row items-center justify-between px-4 pb-3 ${transparent ? 'bg-transparent absolute top-0 left-0 right-0 z-10' : 'bg-white z-10'}`}
            style={{ paddingTop: insets.top > 0 ? insets.top : 20 }}
        >
            <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2">
                <Ionicons name="chevron-back" size={28} color="black" />
            </TouchableOpacity>

            {title && (
                <Text className="text-[18px] font-bold text-[#1A1A1A] flex-1 text-center" numberOfLines={1}>
                    {title}
                </Text>
            )}

            <View className="flex-row items-center space-x-4">
                {showShare && (
                    <TouchableOpacity className="p-2">
                        <Feather name="share" size={24} color="black" />
                    </TouchableOpacity>
                )}
                <TouchableOpacity 
                    className="p-2 mr-[-8px] relative"
                    onPress={() => navigation.navigate('MainTabs', { screen: 'Cart' })}
                >
                    <MaterialCommunityIcons name="cart-outline" size={26} color="#1D52F1" />
                    {totalItems > 0 && (
                        <View className="absolute top-1 right-1 bg-red-500 rounded-full min-w-[16px] h-4 items-center justify-center px-1 border border-white">
                            <Text className="text-white text-[9px] font-bold leading-none">{totalItems > 99 ? '99+' : totalItems}</Text>
                        </View>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
}
