import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Platform, StatusBar, Image } from 'react-native';
import { MaterialCommunityIcons, AntDesign, FontAwesome5, Ionicons, Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuthStore } from '../../store/useAuthStore';
import { useUIStore } from '../../store/useUIStore';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
    const { isLoggedIn, user, logout } = useAuthStore();
    const { showLoginModal } = useUIStore();
    const navigation = useNavigation<any>();

    useEffect(() => {
        if (!isLoggedIn) {
            showLoginModal();
        }
    }, [isLoggedIn]);

    if (!isLoggedIn) {
        return (
            <View className="flex-1 bg-[#F1F3F9] items-center justify-center px-10">
                <Ionicons name="person-circle-outline" size={80} color="#D1D5DB" />
                <Text className="text-gray-500 text-center mt-4 mb-8">
                    Vui lòng đăng nhập để xem thông tin cá nhân và quản lý đơn hàng của bạn.
                </Text>
                <TouchableOpacity
                    onPress={showLoginModal}
                    className="bg-[#1D52F1] px-10 py-3 rounded-full"
                >
                    <Text className="text-white font-bold">Đăng nhập ngay</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-[#F1F3F9]">
            {Platform.OS === 'ios' && <StatusBar barStyle="light-content" backgroundColor="#1D52F1" />}

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                {/* Header Profile - Blue Gradient */}
                <LinearGradient
                    colors={['#1D52F1', '#1D52F1']}
                    className="pt-14 pb-8 px-4 flex-row items-center justify-between"
                >
                    <View className="flex-row items-center">
                        <View className="w-16 h-16 rounded-full border border-white/40 items-center justify-center bg-white/10 mr-4 overflow-hidden">
                            {user?.avatar ? (
                                <Image source={{ uri: user.avatar }} className="w-full h-full" />
                            ) : (
                                <FontAwesome5 name="user-alt" size={30} color="#8fb2ff" />
                            )}
                        </View>
                        <View>
                            <Text className="text-white text-[19px] font-bold mb-0.5">{user?.name || user?.phoneNumber || '0344585983'}</Text>
                            <Text className="text-white/80 text-[13px]">{user?.phoneNumber ? `${user.phoneNumber.substring(0, 4)} ${user.phoneNumber.substring(4, 7)} ${user.phoneNumber.substring(7, 10)}` : '0344 585 983'}</Text>
                        </View>
                    </View>

                    <View className="bg-black/20 rounded-full px-2.5 py-1.5 flex-row items-center">
                        <View className="w-4 h-4 rounded-full bg-yellow-400 items-center justify-center mr-1.5">
                            <Text className="text-[#1D52F1] text-[10px] font-black italic">F</Text>
                        </View>
                        <Text className="text-white font-bold text-sm">0</Text>
                    </View>
                </LinearGradient>

                <View className="px-4 -mt-4 pb-10">
                    {/* Đơn của tôi */}
                    <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-gray-100">
                        <View className="flex-row justify-between items-center mb-4">
                            <Text className="text-gray-500 font-bold text-[14px]">Đơn của tôi</Text>
                            <TouchableOpacity>
                                <Text className="text-[#1D52F1] font-bold text-[13px]">Xem tất cả</Text>
                            </TouchableOpacity>
                        </View>
                        <View className="flex-row justify-between items-center px-2">
                            <OrderStatus icon="archive-outline" label="Đang xử lý" />
                            <OrderStatus icon="truck-fast-outline" label="Đang giao" />
                            <OrderStatus icon="archive-check-outline" label="Đã giao" />
                            <OrderStatus icon="swap-horizontal" label="Đổi/Trả" />
                        </View>
                    </View>

                    {/* Cài đặt giao diện */}
                    <View className="flex-row items-center mb-2 px-1">
                        <Text className="text-gray-500 font-bold text-[14px]">Cài đặt giao diện</Text>
                        <View className="bg-red-500 px-1.5 py-0.5 rounded-md ml-2">
                            <Text className="text-white text-[9px] font-bold">Mới</Text>
                        </View>
                    </View>
                    <View className="bg-white rounded-2xl mb-4 overflow-hidden border border-gray-100 shadow-sm">
                        <ProfileItem iconType="Ionicons" icon="phone-portrait-outline" title="Chuyển sang bản cá nhân hóa" />
                    </View>

                    {/* Tài khoản */}
                    <Text className="text-gray-500 font-bold text-[14px] mb-2 px-1">Tài khoản</Text>
                    <View className="bg-white rounded-2xl mb-4 overflow-hidden border border-gray-100 shadow-sm">
                        <ProfileItem iconType="MaterialCommunityIcons" icon="qrcode-scan" title="Mã QR của tôi" />
                        <ProfileItem
                            iconType="Ionicons"
                            icon="person-circle-outline"
                            title="Thông tin cá nhân"
                            onPress={() => navigation.navigate('PersonalDetail')}
                        />
                        <ProfileItem iconType="Ionicons" icon="location-outline" title="Quản lý sổ địa chỉ" />
                        <ProfileItem iconType="Ionicons" icon="card-outline" title="Quản lý phương thức thanh toán" />
                        <ProfileItem iconType="MaterialCommunityIcons" icon="notebook-plus-outline" title="Đơn thuốc của tôi" isLast />
                    </View>

                    {/* Về Nhà thuốc */}
                    <Text className="text-gray-500 font-bold text-[14px] mb-2 px-1">Về Nhà thuốc FPT Long Châu</Text>
                    <View className="bg-white rounded-2xl mb-6 overflow-hidden border border-gray-100 shadow-sm">
                        <ProfileItem iconType="Ionicons" icon="help-circle-outline" title="Giới thiệu nhà thuốc" />
                        <ProfileItem iconType="MaterialCommunityIcons" icon="check-decagram-outline" title="Giấy phép kinh doanh" />
                        <ProfileItem iconType="Ionicons" icon="document-text-outline" title="Quy chế hoạt động" />
                        <ProfileItem iconType="Ionicons" icon="wallet-outline" title="Chính sách đặt cọc" />
                        <ProfileItem iconType="Ionicons" icon="pencil-outline" title="Chính sách nội dung" />
                        <ProfileItem iconType="Ionicons" icon="refresh-outline" title="Chính sách đổi trả thuốc" />
                        <ProfileItem iconType="MaterialCommunityIcons" icon="needle" title="Chính sách hoàn hủy đổi trả Vắc xin" />
                        <ProfileItem iconType="MaterialCommunityIcons" icon="truck-outline" title="Chính sách giao hàng" />
                        <ProfileItem iconType="Ionicons" icon="shield-checkmark-outline" title="Chính sách bảo mật" />
                        <ProfileItem iconType="Ionicons" icon="card-outline" title="Chính sách thanh toán" />
                        <ProfileItem iconType="MaterialCommunityIcons" icon="shield-account-outline" title="Chính sách bảo mật dữ liệu cá nhân" />
                        <ProfileItem iconType="Ionicons" icon="ribbon-outline" title="Thông tin trung tâm bảo hành máy thiết bị y tế từng hãng" />
                        <ProfileItem iconType="Ionicons" icon="gift-outline" title={`Thể lệ chương trình "Tích điểm nhận đặc quyền"`} />
                        <ProfileItem iconType="MaterialCommunityIcons" icon="shield-search" title="Điều khoản sử dụng Long Châu 247" />
                        <ProfileItem iconType="Ionicons" icon="headset-outline" title="Liên hệ & Hỗ trợ" isLast />
                    </View>

                    {/* Đăng xuất Button */}
                    <TouchableOpacity
                        onPress={logout}
                        className="flex-row justify-center items-center py-4 bg-transparent mb-10"
                        activeOpacity={0.7}
                    >
                        <MaterialCommunityIcons name="logout" size={20} color="#4A5568" className="mt-0.5" />
                        <Text className="text-[#4A5568] font-bold text-[15px] ml-2">Đăng xuất</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

const OrderStatus = ({ icon, label }: { icon: string, label: string }) => (
    <TouchableOpacity className="items-center">
        <MaterialCommunityIcons name={icon as any} size={28} color="#1D52F1" />
        <Text className="text-[#1A1A1A] text-[11px] font-bold mt-2">{label}</Text>
    </TouchableOpacity>
);

const ProfileItem = ({ iconType, icon, title, isLast = false, onPress }: { iconType: 'Ionicons' | 'MaterialCommunityIcons' | 'FontAwesome5', icon: string, title: string, isLast?: boolean, onPress?: () => void }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            className={`flex-row items-center p-4 bg-white ${!isLast ? 'border-b border-gray-50' : ''}`}
            activeOpacity={0.7}
        >
            <View className="w-6 items-center">
                {iconType === 'Ionicons' && <Ionicons name={icon as any} size={22} color="#1D52F1" />}
                {iconType === 'MaterialCommunityIcons' && <MaterialCommunityIcons name={icon as any} size={22} color="#1D52F1" />}
                {iconType === 'FontAwesome5' && <FontAwesome5 name={icon as any} size={20} color="#1D52F1" />}
            </View>
            <Text className="flex-1 ml-4 text-[15px] text-[#1A1A1A] font-medium leading-5 pr-2">{title}</Text>
            <MaterialCommunityIcons name="chevron-right" size={20} color="#9CA3AF" />
        </TouchableOpacity>
    );
};
