import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function WelcomeSection() {
    return (
        <View className="flex-row justify-between items-center mt-5 px-4">
            <View>
                <Text className="text-[#8A92A6] text-xs">Chào mừng bạn đến với</Text>
                <Text className="text-[#1A1A1A] text-sm font-bold mt-1">Nhà thuốc Long Châu</Text>
            </View>
            <TouchableOpacity className="flex-row items-center bg-white border border-[#EFEFEF] rounded-full px-3 py-1.5 shadow-sm">
                <MaterialCommunityIcons name="clipboard-text-outline" size={16} color="#1D52F1" />
                <Text className="text-[#1A1A1A] text-xs font-bold ml-2">Đơn của tôi</Text>
            </TouchableOpacity>
        </View>
    );
}
