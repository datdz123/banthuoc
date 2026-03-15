import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import ScreenHeader from '../../components/ScreenHeader';
import AppFooter from '../../components/AppFooter';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

export default function MedicineReminderScreen() {
    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScreenHeader title="Nhắc uống thuốc" />
            <ScrollView className="flex-1 bg-gray-50" showsVerticalScrollIndicator={false}>
                <View className="bg-linear-to-r from-blue-500 to-indigo-500 p-8 mx-4 mt-4 rounded-3xl items-center relative overflow-hidden shadow-lg shadow-blue-500/30">
                    <View className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full" />
                    <MaterialCommunityIcons name="clock-check-outline" size={64} color="white" className="mb-3" />
                    <Text className="text-white font-black text-xl mb-1 text-center">Đừng quên lịch 
 uống thuốc</Text>
                    <Text className="text-white/80 text-xs text-center">Thiết lập để được nhắc nhở đúng giờ mỗi ngày</Text>
                </View>

                <View className="px-4 mt-6">
                    <Text className="text-lg font-bold text-gray-900 mb-4">Lịch dùng thuốc hôm nay</Text>
                    
                    <View className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm items-center py-10">
                        <Feather name="bell-off" size={40} color="#D1D5DB" className="mb-3" />
                        <Text className="text-gray-500 font-medium mb-4">Bạn chưa thiết lập lịch nhắc nào</Text>
                        <TouchableOpacity className="px-6 py-2.5 bg-blue-50 border border-blue-200 rounded-full">
                            <Text className="text-[#1D52F1] font-bold">Thêm nhắc nhở mới</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View className="mx-[-16px] mt-8 mb-[-40px]">
                    <AppFooter />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
