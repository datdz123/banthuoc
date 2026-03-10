import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, TextInput, Modal, Platform, Image, Alert } from 'react-native';
import { MaterialCommunityIcons, Ionicons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { useAuthStore } from '../../store/useAuthStore';

export default function UpdateProfileScreen() {
    const navigation = useNavigation<any>();
    const { user, updateUser } = useAuthStore();

    const [gender, setGender] = useState<'Nam' | 'Nữ' | null>(null);
    const [name, setName] = useState(user?.name || user?.phoneNumber || '');
    const [avatar, setAvatar] = useState(user?.avatar || null);

    const [showAvatarOptions, setShowAvatarOptions] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Quyền truy cập', 'Vui lòng cho phép quyền truy cập thư viện ảnh để thay đổi ảnh đại diện.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.7,
        });

        if (!result.canceled) {
            setAvatar(result.assets[0].uri);
            setShowAvatarOptions(false);
        }
    };

    const takePhoto = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Quyền truy cập', 'Vui lòng cho phép quyền truy cập máy ảnh để chụp ảnh đại diện.');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.7,
        });

        if (!result.canceled) {
            setAvatar(result.assets[0].uri);
            setShowAvatarOptions(false);
        }
    };

    const handleSave = async () => {
        await updateUser({
            name,
            avatar: avatar || undefined
        });
        navigation.goBack();
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1">
                {/* Header */}
                <View className="flex-row items-center px-4 py-3 bg-[#1D52F1]">
                    <TouchableOpacity onPress={() => navigation.goBack()} className="p-1">
                        <Ionicons name="chevron-back" size={28} color="white" />
                    </TouchableOpacity>
                    <View className="flex-1 items-center mr-8">
                        <Text className="text-white text-[18px] font-bold">Cập nhật thông tin</Text>
                    </View>
                </View>

                <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
                    {/* Avatar Section */}
                    <View className="items-center py-8">
                        <View className="w-24 h-24 rounded-full bg-[#E5E7EB] items-center justify-center mb-3 overflow-hidden border-2 border-gray-100">
                            {avatar ? (
                                <Image source={{ uri: avatar }} className="w-full h-full" />
                            ) : (
                                <Ionicons name="person" size={50} color="#9CA3AF" />
                            )}
                        </View>
                        <TouchableOpacity onPress={() => setShowAvatarOptions(true)}>
                            <Text className="text-[#1D52F1] font-bold text-[15px]">Thay đổi</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Form Fields */}
                    <View className="space-y-6">
                        {/* Họ và tên */}
                        <View className="bg-white border border-gray-200 rounded-xl p-3">
                            <Text className="text-gray-400 text-xs mb-1">Họ và tên</Text>
                            <TextInput
                                className="text-[#1A1A1A] text-[15px] font-medium p-0"
                                value={name}
                                onChangeText={setName}
                                placeholder="Nhập họ và tên"
                            />
                        </View>

                        {/* Giới tính */}
                        <View className="mt-4">
                            <Text className="text-[#4A5568] text-[15px] mb-3">Giới tính</Text>
                            <View className="flex-row items-center space-x-8">
                                <TouchableOpacity
                                    onPress={() => setGender('Nam')}
                                    className="flex-row items-center mr-8"
                                >
                                    <View className={`w-5 h-5 rounded-full border-2 items-center justify-center ${gender === 'Nam' ? 'border-[#1D52F1]' : 'border-gray-300'}`}>
                                        {gender === 'Nam' && <View className="w-2.5 h-2.5 rounded-full bg-[#1D52F1]" />}
                                    </View>
                                    <Text className="ml-2 text-[#1A1A1A] text-[15px]">Nam</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => setGender('Nữ')}
                                    className="flex-row items-center"
                                >
                                    <View className={`w-5 h-5 rounded-full border-2 items-center justify-center ${gender === 'Nữ' ? 'border-[#1D52F1]' : 'border-gray-300'}`}>
                                        {gender === 'Nữ' && <View className="w-2.5 h-2.5 rounded-full bg-[#1D52F1]" />}
                                    </View>
                                    <Text className="ml-2 text-[#1A1A1A] text-[15px]">Nữ</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Số điện thoại (Disabled) */}
                        <View className="bg-gray-50 border border-gray-200 rounded-xl p-3 mt-4">
                            <Text className="text-gray-400 text-xs mb-1">Số điện thoại</Text>
                            <Text className="text-[#9CA3AF] text-[15px] font-medium">{user?.phoneNumber || '0344 585 983'}</Text>
                        </View>

                        {/* Ngày sinh */}
                        <TouchableOpacity
                            onPress={() => setShowDatePicker(true)}
                            activeOpacity={0.7}
                            className="bg-white border border-gray-200 rounded-xl p-3 mt-4 flex-row justify-between items-center"
                        >
                            <View>
                                <Text className="text-gray-400 text-xs mb-1">Ngày sinh</Text>
                                <Text className="text-[#9CA3AF] text-[15px]">Ngày sinh</Text>
                            </View>
                            <FontAwesome name="calendar" size={18} color="#4A5568" />
                        </TouchableOpacity>
                    </View>
                    <View className="h-20" />
                </ScrollView>

                {/* Footer Save Button */}
                <View className="px-4 pb-[80px] pt-4 border-t border-gray-50 bg-white">
                    <TouchableOpacity
                        onPress={handleSave}
                        className="bg-[#1D52F1] py-4 rounded-full items-center shadow-md shadow-[#1D52F1]/30"
                    >
                        <Text className="text-white font-bold text-[16px]">Lưu thay đổi</Text>
                    </TouchableOpacity>
                </View>

                {/* Avatar Options Modal */}
                <Modal
                    visible={showAvatarOptions}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={() => setShowAvatarOptions(false)}
                >
                    <TouchableOpacity
                        className="flex-1 bg-black/50 justify-end"
                        activeOpacity={1}
                        onPress={() => setShowAvatarOptions(false)}
                    >
                        <View className="bg-[#F1F3F9] p-4 rounded-t-[30px]">
                            <View className="bg-white rounded-2xl overflow-hidden mb-3">
                                <TouchableOpacity
                                    className="py-4 items-center border-b border-gray-50"
                                    onPress={takePhoto}
                                >
                                    <Text className="text-[#1D52F1] font-bold text-[16px]">Chụp ảnh</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    className="py-4 items-center"
                                    onPress={pickImage}
                                >
                                    <Text className="text-[#1D52F1] font-bold text-[16px]">Chọn ảnh từ thư viện</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity
                                className="bg-white py-4 items-center rounded-2xl mb-6"
                                onPress={() => setShowAvatarOptions(false)}
                            >
                                <Text className="text-gray-500 font-bold text-[16px]">Hủy</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </Modal>

                {/* Date Picker Modal */}
                <Modal
                    visible={showDatePicker}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={() => setShowDatePicker(false)}
                >
                    <TouchableOpacity
                        className="flex-1 bg-black/50 justify-center items-center px-6"
                        activeOpacity={1}
                        onPress={() => setShowDatePicker(false)}
                    >
                        <View className="bg-white w-full rounded-2xl overflow-hidden">
                            <View className="p-4 border-b border-gray-100 items-center relative">
                                <Text className="text-[#1A1A1A] font-bold text-[17px]">Chọn ngày</Text>
                                <TouchableOpacity
                                    onPress={() => setShowDatePicker(false)}
                                    className="absolute right-4 top-4"
                                >
                                    <Ionicons name="close" size={24} color="black" />
                                </TouchableOpacity>
                            </View>

                            <View className="py-6 items-center">
                                <View className="flex-row items-center space-x-10 h-40">
                                    <View className="items-center">
                                        <Text className="text-gray-300">29</Text>
                                        <Text className="text-gray-300">30</Text>
                                        <Text className="text-gray-300">31</Text>
                                        <Text className="text-[#1A1A1A] font-bold text-xl py-2">1</Text>
                                        <Text className="text-gray-300">2</Text>
                                        <Text className="text-gray-300">3</Text>
                                        <Text className="text-gray-300">4</Text>
                                    </View>
                                    <View className="items-center">
                                        <Text className="text-gray-300">tháng 10</Text>
                                        <Text className="text-gray-300">tháng 11</Text>
                                        <Text className="text-gray-300">tháng 12</Text>
                                        <Text className="text-[#1A1A1A] font-bold text-xl py-2">tháng 1</Text>
                                        <Text className="text-gray-300">tháng 2</Text>
                                        <Text className="text-gray-300">tháng 3</Text>
                                        <Text className="text-gray-300">tháng 4</Text>
                                    </View>
                                    <View className="items-center">
                                        <Text className="text-gray-300">1987</Text>
                                        <Text className="text-gray-300">1988</Text>
                                        <Text className="text-gray-300">1989</Text>
                                        <Text className="text-[#1A1A1A] font-bold text-xl py-2">1990</Text>
                                        <Text className="text-gray-300">1991</Text>
                                        <Text className="text-gray-300">1992</Text>
                                        <Text className="text-gray-300">1993</Text>
                                    </View>
                                </View>
                            </View>

                            <View className="p-4">
                                <TouchableOpacity
                                    onPress={() => setShowDatePicker(false)}
                                    className="bg-[#1D52F1] py-3.5 rounded-full items-center"
                                >
                                    <Text className="text-white font-bold text-[16px]">Hoàn tất</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>
                </Modal>
            </View>
        </SafeAreaView>
    );
}
