import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function PromoBanners() {
    return (
        <View className="mt-6 mb-10">
            {/* Promo Banner 1 */}
            <View className="w-full h-[180px] rounded-xl overflow-hidden bg-[#2167F5]">
                <View className="p-4 items-center">
                    <View className="border border-white rounded-full px-4 py-1 mb-2">
                        <Text className="text-white font-bold text-xs">durex</Text>
                    </View>
                    <Text className="text-[#FFD700] text-lg font-bold text-center">Năm mới bắn như pháo</Text>
                    <Text className="text-white text-2xl font-black text-center uppercase">Gieo duyên{"\n"}nhớ đeo bao</Text>

                    <TouchableOpacity className="bg-[#00E5FF] rounded-full px-6 py-2 mt-4 flex-row items-center">
                        <MaterialCommunityIcons name="cart-outline" size={16} color="#1A1A1A" />
                        <Text className="text-[#1A1A1A] font-bold text-xs ml-1">Mua ngay</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Promo Banner 2 */}
            <View className="w-full h-[120px] rounded-xl overflow-hidden mt-4 bg-[#FF4081]">
                <View className="p-4 justify-center items-center h-full">
                    <Text className="text-white text-3xl font-black italic shadow-sm">Siêu deal đón Tết</Text>
                    <TouchableOpacity className="bg-[#FFD700] rounded-full px-6 py-1.5 mt-2">
                        <Text className="text-[#D82E29] font-bold text-sm">XEM NGAY</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
