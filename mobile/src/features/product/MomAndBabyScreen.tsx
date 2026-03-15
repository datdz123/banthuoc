import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';
import ScreenHeader from '../../components/ScreenHeader';
import AppFooter from '../../components/AppFooter';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

const CATEGORIES = [
    { name: 'Sữa bột', icon: 'baby-bottle-outline', color: '#F0712E', bg: '#FFF1E6' },
    { name: 'Tã bỉm', icon: 'human-baby-board-cradle', color: '#3B82F6', bg: '#EFF6FF' },
    { name: 'Vitamin', icon: 'pill', color: '#10B981', bg: '#ECFDF5' },
    { name: 'Chăm sóc da', icon: 'water-outline', color: '#8B5CF6', bg: '#F5F3FF' },
];

export default function MomAndBabyScreen() {
    const navigation = useNavigation<any>();

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScreenHeader title="Mẹ và Bé" />
            <ScrollView className="flex-1 bg-gray-50" showsVerticalScrollIndicator={false}>
                {/* Banner */}
                <View className="bg-[#FFF1E6] p-6 mx-4 mt-4 rounded-3xl relative overflow-hidden shadow-sm">
                    <View className="w-2/3 relative z-10">
                        <Text className="text-[#F0712E] font-black text-2xl mb-2">Mẹ khỏe nhỏ xinh</Text>
                        <Text className="text-gray-600 text-[13px] leading-5 mb-4">
                            Đồng hành cùng sự phát triển toàn diện của bé yêu với vô vàn ưu đãi
                        </Text>
                        <TouchableOpacity className="bg-[#F0712E] py-2 px-4 rounded-full self-start shadow-sm shadow-orange-500/30">
                            <Text className="text-white font-bold text-xs">Khám phá ngay</Text>
                        </TouchableOpacity>
                    </View>
                    <MaterialCommunityIcons 
                        name="mother-heart" 
                        size={120} 
                        color="#F0712E" 
                        style={{ position: 'absolute', right: -20, bottom: -20, opacity: 0.2 }} 
                    />
                </View>

                {/* Categories */}
                <View className="flex-row flex-wrap justify-between px-4 mt-6">
                    {CATEGORIES.map((cat, index) => (
                        <TouchableOpacity key={index} className="w-[23%] items-center mb-4">
                            <View 
                                style={{ backgroundColor: cat.bg }} 
                                className="w-14 h-14 rounded-2xl items-center justify-center mb-2 shadow-sm"
                            >
                                <MaterialCommunityIcons name={cat.icon as any} size={28} color={cat.color} />
                            </View>
                            <Text className="text-xs font-bold text-center text-gray-700" numberOfLines={2}>
                                {cat.name}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Hot Products (Mock) */}
                <View className="px-4 mt-4">
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-lg font-black text-gray-900">Sản phẩm nổi bật</Text>
                        <TouchableOpacity>
                            <Text className="text-[#F0712E] text-sm font-bold">Xem tất cả</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mx-[-16px] px-4">
                        {[1, 2, 3].map((item) => (
                            <View key={item} className="w-[160px] bg-white p-3 rounded-2xl mr-4 border border-gray-100 shadow-sm mb-4">
                                <View className="w-full h-[120px] bg-gray-50 rounded-xl mb-3 items-center justify-center">
                                    <MaterialCommunityIcons name="baby-bottle-outline" size={40} color="#D1D5DB" />
                                </View>
                                <Text className="font-bold text-gray-900 text-sm mb-1" numberOfLines={2}>
                                    Sữa non ColosBaby IQ Gold {item}
                                </Text>
                                <Text className="text-[#F0712E] font-black">450.000đ</Text>
                                <TouchableOpacity className="w-full bg-[#FFF1E6] py-2 rounded-lg mt-3 items-center border border-[#F0712E]/20">
                                    <Text className="text-[#F0712E] font-bold text-xs">Thêm vào giỏ</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </ScrollView>
                </View>

                <View className="mx-[-16px] mt-8 mb-[-40px]">
                    <AppFooter />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
