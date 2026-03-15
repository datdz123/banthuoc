import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenHeader from '../../components/ScreenHeader';
import AppFooter from '../../components/AppFooter';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

export default function MyPrescriptionsScreen() {
    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScreenHeader title="Đơn thuốc của tôi" />
            <ScrollView className="flex-1 bg-gray-50" showsVerticalScrollIndicator={false}>
                <View className="p-4">
                    <TouchableOpacity className="w-full bg-[#1D52F1] rounded-2xl p-4 flex-row items-center justify-center gap-2 shadow-md shadow-blue-500/20 active:opacity-80">
                        <Feather name="plus-circle" size={20} color="white" />
                        <Text className="text-white font-bold text-base">Tạo đơn thuốc mới</Text>
                    </TouchableOpacity>

                    <View className="mt-8 items-center justify-center p-10">
                        <View className="w-24 h-24 bg-blue-50 rounded-full items-center justify-center mb-4">
                            <MaterialCommunityIcons name="clipboard-text-outline" size={48} color="#1D52F1" />
                        </View>
                        <Text className="text-lg font-bold text-gray-900 text-center mb-2">Chưa có đơn thuốc nào</Text>
                        <Text className="text-sm text-gray-500 text-center leading-5 px-4">
                            Bạn có thể tải lên hình ảnh đơn thuốc để dược sĩ dễ dàng tư vấn và chuẩn bị thuốc cho bạn.
                        </Text>
                    </View>
                </View>
                <View className="mx-[-16px] mt-8 mb-[-40px]">
                    <AppFooter />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
