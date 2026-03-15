import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, SafeAreaView, Platform, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'expo-image';
import ScreenHeader from '../../components/ScreenHeader';
import AppFooter from '../../components/AppFooter';
import { MaterialCommunityIcons, Feather, Ionicons } from '@expo/vector-icons';

export default function ConsultationScreen() {
    const navigation = useNavigation<any>();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [note, setNote] = useState('');
    const [images, setImages] = useState<string[]>([]);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            quality: 1,
        });

        if (!result.canceled) {
            const newImages = result.assets.map(asset => asset.uri);
            setImages(prev => [...prev, ...newImages]);
        }
    };

    const removeImage = (indexToRemove: number) => {
        setImages(prev => prev.filter((_, index) => index !== indexToRemove));
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScreenHeader title="Cần mua thuốc" />
            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <ScrollView className="flex-1 bg-gray-50" showsVerticalScrollIndicator={false}>
                    <View className="p-4 bg-white mb-2 pb-10">
                        <Text className="text-3xl font-black text-gray-900 mb-2 mt-2">Cần mua thuốc</Text>
                        <Text className="text-gray-500 text-sm leading-5 mb-6">
                            Vui lòng để lại thông tin để dược sĩ có thể tư vấn cho bạn nhanh chóng nhất
                        </Text>

                        {/* Form Container */}
                        <View className="bg-white rounded-3xl border border-gray-100 p-4 shadow-sm">
                            {/* Personal Info Header */}
                            <View className="flex-row items-center gap-3 mb-6">
                                <View className="w-10 h-10 bg-blue-50 rounded-xl items-center justify-center">
                                    <Feather name="check-circle" size={20} color="#1D52F1" />
                                </View>
                                <Text className="text-[17px] font-bold text-gray-900">Thông tin cá nhân</Text>
                            </View>

                            {/* Form Fields */}
                            <View className="space-y-4 mb-6">
                                <View>
                                    <Text className="text-[13px] font-bold text-gray-700 ml-1 mb-1.5">Họ và tên *</Text>
                                    <TextInput 
                                        className="w-full h-[42px] bg-white border border-gray-200 rounded-xl px-4 text-sm"
                                        placeholder="Nhập họ tên của bạn"
                                        value={name}
                                        onChangeText={setName}
                                    />
                                </View>

                                <View className="mt-4">
                                    <Text className="text-[13px] font-bold text-gray-700 ml-1 mb-1.5">Số điện thoại *</Text>
                                    <TextInput 
                                        className="w-full h-[42px] bg-white border border-gray-200 rounded-xl px-4 text-sm"
                                        placeholder="Nhập số điện thoại"
                                        keyboardType="phone-pad"
                                        value={phone}
                                        onChangeText={setPhone}
                                    />
                                </View>

                                <View className="mt-4 mb-2">
                                    <Text className="text-[13px] font-bold text-gray-700 ml-1 mb-1.5">Ghi chú</Text>
                                    <TextInput 
                                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm min-h-[100px]"
                                        placeholder="Ví dụ: Tôi cần tư vấn thuốc về bệnh đau dạ dày..."
                                        multiline
                                        textAlignVertical="top"
                                        value={note}
                                        onChangeText={setNote}
                                    />
                                </View>
                            </View>

                            {/* Section Upload Image */}
                            <View className="mt-4 pt-6 border-t border-gray-100">
                                <View className="flex-row items-center gap-2 mb-4">
                                    <Feather name="camera" size={20} color="#1D52F1" />
                                    <Text className="text-[16px] font-bold text-gray-900">Gửi ảnh đơn thuốc (nếu có)</Text>
                                </View>
                                <View className="border-2 border-dashed border-gray-200 rounded-2xl p-4 bg-gray-50 min-h-[160px] flex-row flex-wrap gap-3 items-center justify-center">
                                    {images.length === 0 ? (
                                        <TouchableOpacity onPress={pickImage} className="w-full items-center justify-center py-4">
                                            <View className="w-14 h-14 bg-white rounded-full items-center justify-center mb-3 shadow-sm border border-gray-100">
                                                <Feather name="plus" size={28} color="#9CA3AF" />
                                            </View>
                                            <Text className="text-xs text-center text-gray-500 font-medium px-4">
                                                Bấm vào đây để tải ảnh đơn thuốc hoặc chụp ảnh trực tiếp
                                            </Text>
                                        </TouchableOpacity>
                                    ) : (
                                        <View className="flex-row flex-wrap gap-3 w-full justify-center">
                                            {images.map((imgUri, index) => (
                                                <View key={index} className="relative w-20 h-20 rounded-xl overflow-hidden border border-gray-200 bg-white">
                                                    <Image source={{ uri: imgUri }} className="w-full h-full" contentFit="cover" />
                                                    <TouchableOpacity 
                                                        onPress={() => removeImage(index)}
                                                        className="absolute top-1 right-1 bg-red-500 w-5 h-5 rounded-full items-center justify-center border border-white"
                                                    >
                                                        <Feather name="x" size={12} color="white" />
                                                    </TouchableOpacity>
                                                </View>
                                            ))}
                                            <TouchableOpacity 
                                                onPress={pickImage}
                                                className="w-20 h-20 rounded-xl border border-dashed border-gray-300 items-center justify-center bg-white"
                                            >
                                                <Feather name="plus" size={24} color="#9CA3AF" />
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                </View>
                            </View>

                            {/* Section Add Medicine */}
                            <View className="mt-8 pt-6 border-t border-gray-100">
                                <View className="flex-row items-center gap-2 mb-4">
                                    <Feather name="search" size={20} color="#1D52F1" />
                                    <Text className="text-[16px] font-bold text-gray-900">Thêm thuốc cần tư vấn</Text>
                                </View>
                                <TouchableOpacity className="flex-row items-center gap-3 px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl">
                                    <Feather name="search" size={20} color="#9CA3AF" />
                                    <Text className="text-gray-400 text-sm font-medium">Tìm tên thuốc, sản phẩm...</Text>
                                </TouchableOpacity>
                                
                                <View className="items-center justify-center py-10">
                                    <View className="w-14 h-14 bg-gray-50 rounded-full items-center justify-center mb-3">
                                        <Feather name="plus" size={28} color="#9CA3AF" />
                                    </View>
                                    <Text className="text-xs font-medium text-gray-400">Thêm thuốc cần tư vấn</Text>
                                </View>
                            </View>

                            {/* Submit Section */}
                            <View className="mt-4 p-5 bg-gray-50 rounded-2xl items-center border border-gray-100">
                                <Text className="text-xs text-gray-500 font-medium text-center italic mb-4 px-2">
                                    Vui lòng để lại thông tin để dược sĩ có thể tư vấn cho bạn nhanh chóng nhất
                                </Text>
                                <TouchableOpacity 
                                    className="w-full bg-[#1D52F1] rounded-xl py-3.5 items-center shadow-md shadow-blue-500/20"
                                >
                                    <Text className="text-white font-bold text-[14px]">Gửi yêu cầu tư vấn</Text>
                                </TouchableOpacity>
                                <TouchableOpacity className="mt-4">
                                    <Text className="text-xs font-bold text-[#1D52F1]">Xem lại yêu cầu đã gửi</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                        {/* Advisory / Promo Banner */}
                        <View className="mt-8 bg-[#1D52F1] rounded-3xl p-6 overflow-hidden relative shadow-lg shadow-blue-500/20">
                            <View className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full" />
                            <View className="absolute -left-10 -bottom-10 w-32 h-32 bg-white/5 rounded-full" />
                            
                            <Text className="text-2xl font-black text-white mb-2 leading-tight mt-2">Dược Nam Việt</Text>
                            <Text className="text-white/80 font-medium text-[16px] mb-8">Tư vấn miễn phí 24/7</Text>

                            <View className="space-y-4">
                                <View className="flex-row items-center gap-4">
                                    <View className="w-12 h-12 bg-white/20 rounded-2xl items-center justify-center">
                                        <Feather name="phone-call" size={22} color="white" />
                                    </View>
                                    <View>
                                        <Text className="text-[10px] text-white/70 font-bold uppercase tracking-widest mb-0.5">Liên hệ</Text>
                                        <Text className="text-xl font-black text-white leading-tight">1800 6928</Text>
                                    </View>
                                </View>
                                
                                <View className="flex-row items-center gap-4 mt-5">
                                    <View className="w-12 h-12 bg-white/20 rounded-2xl items-center justify-center">
                                        <Feather name="clock" size={22} color="white" />
                                    </View>
                                    <View>
                                        <Text className="text-[10px] text-white/70 font-bold uppercase tracking-widest mb-0.5">Thời gian</Text>
                                        <Text className="text-[15px] font-bold text-white leading-tight">7:00 - 22:00 mỗi ngày</Text>
                                    </View>
                                </View>
                            </View>
                            
                            <View className="mt-8 pt-6 border-t border-white/10">
                                <Text className="text-xs font-medium text-white/80 leading-relaxed italic">
                                    "Dược Nam Việt luôn sẵn sàng lắng nghe và hỗ trợ bạn. Hãy để lại thông tin, chúng tôi sẽ phản hồi bạn trong thời gian sớm nhất."
                                </Text>
                            </View>
                        </View>

                        {/* Footer */}
                        <View className="mt-8 mx-[-16px] mb-[-40px]">
                            <AppFooter />
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
