import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Image } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '../../store/useAuthStore';

export default function PersonalDetailScreen() {
    const navigation = useNavigation<any>();
    const { user } = useAuthStore();

    const DetailItem = ({ label, value, isLast = false, onPress }: { label: string, value: string, isLast?: boolean, onPress?: () => void }) => (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.7}
            className={`flex-row justify-between items-center py-4 ${!isLast ? 'border-b border-gray-100' : ''}`}
        >
            <Text className="text-[#4A5568] text-[15px]">{label}</Text>
            <View className="flex-row items-center">
                <Text className={`text-[15px] font-bold ${value === 'Thêm thông tin' || !value ? 'text-[#1D52F1]' : 'text-[#1A1A1A]'}`}>
                    {value || 'Thêm thông tin'}
                </Text>
                {onPress && <MaterialCommunityIcons name="chevron-right" size={20} color="#9CA3AF" />}
            </View>
        </TouchableOpacity>
    );

    const handleEdit = () => {
        navigation.navigate('UpdateProfile');
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
                        <Text className="text-white text-[18px] font-bold">Thông tin cá nhân</Text>
                    </View>
                </View>

                <ScrollView className="flex-1 px-4">
                    {/* Avatar Section */}
                    <View className="items-center py-8">
                        <View className="w-24 h-24 rounded-full bg-[#E5E7EB] items-center justify-center mb-3 overflow-hidden border-2 border-gray-100">
                            {user?.avatar ? (
                                <Image source={{ uri: user.avatar }} className="w-full h-full" />
                            ) : (
                                <Ionicons name="person" size={50} color="#9CA3AF" />
                            )}
                        </View>
                        <TouchableOpacity onPress={handleEdit}>
                            <Text className="text-[#1D52F1] font-bold text-[15px]">Thay đổi ảnh đại diện</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Info list */}
                    <View className="bg-white">
                        <DetailItem
                            label="Họ và tên"
                            value={user?.name || user?.phoneNumber || ''}
                            onPress={handleEdit}
                        />
                        <DetailItem
                            label="Số điện thoại"
                            value={user?.phoneNumber || ''}
                            onPress={handleEdit}
                        />
                        <DetailItem
                            label="Giới tính"
                            value="Thêm thông tin"
                            onPress={handleEdit}
                        />
                        <DetailItem
                            label="Ngày sinh"
                            value="Thêm thông tin"
                            isLast
                            onPress={handleEdit}
                        />
                    </View>
                </ScrollView>

                {/* Footer Edit Button - Fixed position above Tab bar */}
                <View className="px-4 pb-[100px] pt-4 border-t border-gray-50 bg-white shadow-sm">
                    <TouchableOpacity
                        onPress={handleEdit}
                        className="bg-[#F1F3F9] py-4 rounded-full items-center border border-[#1D52F1]/10"
                    >
                        <Text className="text-[#1D52F1] font-bold text-[16px]">Chỉnh sửa thông tin</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}
