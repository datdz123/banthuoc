import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import ScreenHeader from '../../components/ScreenHeader';
import AppFooter from '../../components/AppFooter';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

export default function HealthCheckScreen() {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScreenHeader title="Kiểm tra sức khỏe" />
            <ScrollView className="flex-1 bg-gray-50" showsVerticalScrollIndicator={false}>
                <View className="px-4 mt-4">
                    {/* BMI Tool */}
                    <View className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-6 relative overflow-hidden">
                        <View className="absolute top-0 right-0 w-32 h-32 bg-rose-50 rounded-bl-[100px] -z-10" />
                        <View className="flex-row items-center gap-3 mb-4">
                            <View className="w-12 h-12 bg-rose-100 rounded-2xl items-center justify-center">
                                <MaterialCommunityIcons name="scale-bathroom" size={26} color="#E11D48" />
                            </View>
                            <Text className="text-xl font-black text-gray-900">Tính chỉ số BMI</Text>
                        </View>
                        <Text className="text-sm text-gray-500 mb-6">Chỉ số khối lượng cơ thể giúp đánh giá tình trạng thừa cân hoặc thiếu cân</Text>

                        <View className="flex-row gap-4 mb-4">
                            <View className="flex-1">
                                <Text className="text-xs font-bold text-gray-700 mb-1.5 ml-1">Chiều cao (cm)</Text>
                                <TextInput 
                                    className="h-11 border border-gray-200 rounded-xl px-4 text-sm bg-gray-50"
                                    placeholder="Ví dụ: 170"
                                    keyboardType="numeric"
                                    value={height}
                                    onChangeText={setHeight}
                                />
                            </View>
                            <View className="flex-1">
                                <Text className="text-xs font-bold text-gray-700 mb-1.5 ml-1">Cân nặng (kg)</Text>
                                <TextInput 
                                    className="h-11 border border-gray-200 rounded-xl px-4 text-sm bg-gray-50"
                                    placeholder="Ví dụ: 65"
                                    keyboardType="numeric"
                                    value={weight}
                                    onChangeText={setWeight}
                                />
                            </View>
                        </View>
                        <TouchableOpacity className="w-full bg-[#E11D48] rounded-xl py-3.5 items-center mt-2 shadow-md shadow-rose-500/20 active:opacity-80">
                            <Text className="text-white font-bold">Tính kết quả</Text>
                        </TouchableOpacity>
                    </View>

                    <Text className="text-lg font-black text-gray-900 mb-4 px-1">Các tiện ích khác</Text>
                    <View className="flex-row gap-4 mb-6">
                        <TouchableOpacity className="flex-1 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm items-center">
                            <MaterialCommunityIcons name="heart-pulse" size={36} color="#F43F5E" className="mb-2" />
                            <Text className="font-bold text-gray-900 text-sm mb-1">Mạch & Tim</Text>
                            <Text className="text-[10px] text-gray-500 text-center">Nhanh chóng</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="flex-1 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm items-center">
                            <MaterialCommunityIcons name="water-percent" size={36} color="#3B82F6" className="mb-2" />
                            <Text className="font-bold text-gray-900 text-sm mb-1">Đường huyết</Text>
                            <Text className="text-[10px] text-gray-500 text-center">Sổ theo dõi</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="mx-[-16px] mt-2 mb-[-40px]">
                    <AppFooter />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
