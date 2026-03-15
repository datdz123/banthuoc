import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, SafeAreaView, Platform, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';
import ScreenHeader from '../../components/ScreenHeader';
import AppFooter from '../../components/AppFooter';
import { Feather, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

const STORE_DATA = [
    {
        id: '1',
        city: 'TP. Hồ Chí Minh',
        name: 'Nhà thuốc Dược Nam Việt - Chi nhánh Q7',
        address: '123 Đường số 7, Tân Kiểng, Quận 7, TP. HCM',
        phone: '1800 6928',
        image: 'https://images.unsplash.com/photo-1586024486164-ce9b3d87e0d3?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: '2',
        city: 'TP. Hồ Chí Minh',
        name: 'Nhà thuốc Dược Nam Việt - Chi nhánh Q1',
        address: '45 Lê Lợi, Bến Nghé, Quận 1, TP. HCM',
        phone: '1800 6928',
        image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: '3',
        city: 'TP. Hồ Chí Minh',
        name: 'Nhà thuốc Dược Nam Việt - Chi nhánh Thủ Đức',
        address: '68 Võ Văn Ngân, Bình Thọ, Thủ Đức, TP. HCM',
        phone: '1800 6928',
        image: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: '4',
        city: 'Hà Nội',
        name: 'Nhà thuốc Dược Nam Việt - Chi nhánh Hà Nội',
        address: '15 Tố Hữu, Nam Từ Liêm, Hà Nội',
        phone: '1800 6928',
        image: 'https://images.unsplash.com/photo-1664575196412-ed801e8333a1?auto=format&fit=crop&q=80&w=800'
    }
];

const FILTERS = ['Tất cả', 'TP. Hồ Chí Minh', 'Hà Nội', 'Đà Nẵng'];

export default function StoreLocatorScreen() {
    const navigation = useNavigation<any>();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('Tất cả');

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScreenHeader title="Hệ thống nhà thuốc" />
            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <ScrollView className="flex-1 bg-gray-50" showsVerticalScrollIndicator={false}>
                    {/* Header Banner */}
                    <View className="bg-[#1D52F1] py-10 px-4 items-center rounded-b-3xl">
                        <Text className="text-3xl font-black text-white mb-2 text-center tracking-tight">Hệ Thống Nhà Thuốc</Text>
                        <Text className="text-white/80 text-[15px] font-medium text-center px-4 leading-6">
                            Phủ khắp 63 tỉnh thành, luôn sẵn sàng phục vụ quý khách với tâm tâm và chuyên nghiệp.
                        </Text>
                    </View>

                    <View className="p-4 bg-gray-50">
                        {/* Search Bar */}
                        <View className="mt-2 mb-4">
                            <View className="flex-row items-center bg-white border border-gray-200 rounded-xl px-4 h-[46px] shadow-sm">
                                <Feather name="search" size={20} color="#9CA3AF" />
                                <TextInput
                                    className="flex-1 ml-2 text-sm text-gray-900"
                                    placeholder="Tìm theo tên đường, quận huyện..."
                                    value={searchQuery}
                                    onChangeText={setSearchQuery}
                                    placeholderTextColor="#9CA3AF"
                                />
                            </View>
                        </View>

                        {/* Filter Tags */}
                        <View className="mb-6">
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
                                {FILTERS.map((filter, index) => (
                                    <TouchableOpacity 
                                        key={index}
                                        onPress={() => setSelectedFilter(filter)}
                                        className={`px-4 py-2 rounded-full mr-2 border ${
                                            selectedFilter === filter 
                                                ? 'bg-[#1D52F1] border-[#1D52F1]' 
                                                : 'bg-white border-gray-200'
                                        }`}
                                    >
                                        <Text className={`text-sm font-bold ${
                                            selectedFilter === filter ? 'text-white' : 'text-gray-600'
                                        }`}>
                                            {filter}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>

                        {/* Store List */}
                        <View className="space-y-4">
                            {STORE_DATA.map((store) => (
                                <View key={store.id} className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-xl shadow-black/5 mb-4">
                                    <View className="w-full h-48 relative">
                                        <Image source={{ uri: store.image }} className="w-full h-full" contentFit="cover" />
                                        <View className="absolute top-4 left-4">
                                            <View className="px-3 py-1 bg-[#1D52F1] rounded-full shadow-sm">
                                                <Text className="text-white text-[10px] font-bold uppercase">{store.city}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View className="p-5">
                                        <Text className="text-[17px] font-black text-gray-900 mb-3" numberOfLines={2}>
                                            {store.name}
                                        </Text>
                                        <View className="space-y-2.5 mb-5">
                                            <View className="flex-row items-start pr-4">
                                                <Feather name="map-pin" size={18} color="#F43F5E" className="mt-0.5 shrink-0" />
                                                <Text className="text-[13px] text-gray-600 font-medium leading-5 ml-2">
                                                    {store.address}
                                                </Text>
                                            </View>
                                            <View className="flex-row items-center">
                                                <Feather name="phone-call" size={18} color="#10B981" className="shrink-0" />
                                                <Text className="text-[14px] text-gray-700 font-bold ml-2">
                                                    {store.phone}
                                                </Text>
                                            </View>
                                        </View>
                                        <View className="flex-row gap-3">
                                            <TouchableOpacity className="flex-1 flex-row items-center justify-center gap-2 bg-[#1D52F1] py-3 rounded-2xl shadow-sm shadow-blue-500/20 active:opacity-80">
                                                <Feather name="navigation" size={16} color="white" />
                                                <Text className="text-white font-black text-[13px]">Chỉ đường</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity className="p-3 border border-gray-200 rounded-2xl items-center justify-center active:bg-gray-50">
                                                <Feather name="info" size={20} color="#9CA3AF" />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            ))}
                        </View>

                        {/* Statistic Banner */}
                        <View className="mt-8 mb-6 bg-[#1D52F1] w-full rounded-[30px] p-8 overflow-hidden relative shadow-lg shadow-blue-500/20">
                            <View className="absolute -top-16 -right-16 w-40 h-40 bg-white/10 rounded-full" />
                            <View className="absolute -bottom-16 -left-16 w-40 h-40 bg-white/5 rounded-full" />
                            
                            <View className="relative z-10 flex-row flex-wrap justify-between items-center gap-y-6">
                                <View className="items-center w-1/2">
                                    <Text className="text-3xl font-black text-white mb-1">500+</Text>
                                    <Text className="text-white/70 font-bold uppercase tracking-widest text-[10px] text-center">Nhà thuốc toàn quốc</Text>
                                </View>
                                <View className="items-center w-1/2">
                                    <Text className="text-3xl font-black text-white mb-1">63</Text>
                                    <Text className="text-white/70 font-bold uppercase tracking-widest text-[10px] text-center">Tỉnh thành bao phủ</Text>
                                </View>
                                <View className="items-center w-full mt-2">
                                    <Text className="text-3xl font-black text-white mb-1">24/7</Text>
                                    <Text className="text-white/70 font-bold uppercase tracking-widest text-[10px] text-center">Dược sĩ tư vấn</Text>
                                </View>
                            </View>
                        </View>

                        {/* Footer */}
                        <View className="mx-[-16px] mb-[-40px]">
                            <AppFooter />
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
