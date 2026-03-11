import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Image, Switch } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useCartStore } from '../../store/useCartStore';

export default function CheckoutScreen() {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    // If navigating directly from "Mua ngay", we pass `directItem`
    const { directItem } = route.params || {};

    const { items: cartItems, getTotalPrice } = useCartStore();
    
    // Choose items to checkout -> either direct item or full cart items
    const checkoutItems = directItem ? [directItem] : cartItems;
    
    const totalPrice = checkoutItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const originalTotalPrice = checkoutItems.reduce((sum, item) => sum + (item.originalPrice * item.quantity), 0);
    const savedAmount = originalTotalPrice - totalPrice;
    const bonusPoints = Math.floor(totalPrice / 1000);

    return (
        <SafeAreaView className="flex-1 bg-[#F1F3F9]">
            {/* Header */}
            <View className="flex-row items-center px-4 py-3 bg-[#1D52F1]">
                <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2">
                    <Ionicons name="chevron-back" size={28} color="white" />
                </TouchableOpacity>
                <Text className="flex-1 text-white text-[18px] font-bold text-center mr-8">Xác nhận đơn hàng</Text>
            </View>

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                {/* Delivery Method */}
                <View className="bg-white px-4 py-4 mb-2">
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="font-bold text-[#1A1A1A] text-[16px]">Hình thức nhận hàng</Text>
                        <TouchableOpacity className="flex-row items-center">
                            <Text className="text-[#1D52F1] font-medium mr-1">Giao hàng tận nơi</Text>
                            <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
                        </TouchableOpacity>
                    </View>

                    <View className="flex-row justify-between items-center mb-3">
                        <Text className="text-gray-500 font-medium">Giao hàng tới</Text>
                        <TouchableOpacity>
                            <Text className="text-[#1D52F1] font-medium">Thay đổi</Text>
                        </TouchableOpacity>
                    </View>

                    <View className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 mb-4">
                        <Text className="text-[#1A1A1A] font-bold text-[16px] mb-1">Bạn chưa có</Text>
                        <Text className="text-[#1A1A1A] font-medium mb-4">địa chỉ nhận hàng</Text>
                        <TouchableOpacity className="bg-[#1D52F1] self-start px-6 py-2.5 rounded-full shadow-sm">
                            <Text className="text-white font-bold">Thêm địa chỉ</Text>
                        </TouchableOpacity>
                    </View>

                    <View className="border border-gray-200 rounded-xl p-3 bg-white h-24">
                        <Text className="text-gray-400">Thêm ghi chú...</Text>
                    </View>
                </View>

                {/* E-invoice */}
                <View className="bg-white px-4 py-4 mb-2 flex-row justify-between items-center">
                    <Text className="text-[#1A1A1A] font-bold text-[15px]">Yêu cầu xuất hóa đơn điện tử</Text>
                    <Switch value={false} trackColor={{ false: '#D1D5DB', true: '#BFDBFE' }} thumbColor="#fff" />
                </View>

                {/* Product List */}
                <View className="bg-white mb-2">
                    <View className="flex-row justify-between items-center px-4 py-3 bg-gray-50 border-b border-gray-100">
                        <Text className="text-gray-500 font-bold">Danh sách sản phẩm</Text>
                        <TouchableOpacity>
                            <Text className="text-[#1D52F1] font-medium">Thêm sản phẩm khác</Text>
                        </TouchableOpacity>
                    </View>
                    
                    {checkoutItems.map((item, index) => (
                        <View key={index} className="flex-row p-4 border-b border-gray-100">
                            <View className="w-16 h-16 border border-gray-200 rounded-lg p-1 mr-3 bg-white">
                                <Image source={{ uri: item.image }} className="w-full h-full" resizeMode="contain" />
                            </View>
                            <View className="flex-1 justify-between">
                                <Text className="text-[14px] text-[#1A1A1A] leading-5" numberOfLines={2}>
                                    {item.name}
                                </Text>
                                <View className="flex-row justify-between items-baseline mt-2">
                                    <Text className="font-bold text-[16px]">{item.price.toLocaleString('vi-VN')}đ</Text>
                                    <Text className="text-gray-500 text-[13px]">x{item.quantity} {item.unit}</Text>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>

                {/* Promotions */}
                <View className="bg-white mb-2 py-1">
                    <TouchableOpacity className="flex-row justify-between items-center px-4 py-3 border-b border-gray-100">
                        <Text className="text-[#1D52F1] font-medium">Áp dụng ưu đãi để được giảm giá</Text>
                        <Ionicons name="chevron-forward" size={16} color="#1D52F1" />
                    </TouchableOpacity>
                    <View className="flex-row justify-between items-center px-4 py-3">
                        <View className="flex-row items-center">
                            <View className="w-5 h-5 bg-yellow-400 rounded-full items-center justify-center mr-2">
                                <Text className="text-white text-[10px] font-bold">F</Text>
                            </View>
                            <Text className="text-[#1A1A1A]">Đổi <Text className="font-bold text-orange-500">0</Text> điểm (≈0đ)</Text>
                        </View>
                        <Switch value={false} trackColor={{ false: '#D1D5DB', true: '#BFDBFE' }} thumbColor="#fff" />
                    </View>
                </View>

                {/* Payment info */}
                <View className="bg-white p-4 pb-8 mb-6">
                    <Text className="font-bold text-[16px] mb-4 text-[#1A1A1A]">Thông tin thanh toán</Text>
                    
                    <View className="space-y-3 mb-4">
                        <View className="flex-row justify-between items-center">
                            <Text className="text-gray-500">Tổng tiền</Text>
                            <Text className="font-bold text-[15px]">{totalPrice.toLocaleString('vi-VN')}đ</Text>
                        </View>
                        <View className="flex-row justify-between items-center">
                            <Text className="text-gray-500">Giảm giá trực tiếp</Text>
                            <Text className="font-bold text-orange-500">{savedAmount > 0 ? '-' : ''}{savedAmount.toLocaleString('vi-VN')}đ</Text>
                        </View>
                        <View className="flex-row justify-between items-center">
                            <Text className="text-gray-500">Phí vận chuyển</Text>
                            <Text className="text-[#1D52F1] font-medium text-[15px]">Miễn phí</Text>
                        </View>
                    </View>

                    <View className="border-t border-gray-100 pt-4 border-dashed mb-4">
                        <View className="flex-row justify-between items-center mb-2">
                            <Text className="font-bold text-[16px]">Thành tiền</Text>
                            <Text className="text-[#1D52F1] font-bold text-[20px]">{totalPrice.toLocaleString('vi-VN')}đ</Text>
                        </View>
                        <View className="flex-row justify-between items-center">
                            <Text className="text-gray-500">Điểm thưởng</Text>
                            <View className="flex-row items-center bg-yellow-50 px-2 py-0.5 rounded-full border border-yellow-100">
                                <MaterialCommunityIcons name="star-circle" size={14} color="#F59E0B" />
                                <Text className="text-orange-500 font-bold ml-1 text-xs">+{bonusPoints}</Text>
                            </View>
                        </View>
                    </View>

                    <Text className="text-center text-xs text-gray-500 px-4 leading-5 mt-4">
                        Bằng việc tiến hành đặt mua hàng, bạn đồng ý với <Text className="text-[#1A1A1A] font-medium underline">Điều khoản dịch vụ</Text> của Nhà thuốc
                    </Text>
                </View>

            </ScrollView>

            {/* Bottom Bar */}
            <View className="bg-white px-4 py-3 pb-8 border-t border-gray-100 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
                <View className="flex-row justify-between items-center mb-4 px-1">
                    <Text className="text-gray-500 text-[13px]">Ẩn thông tin sản phẩm khi giao hàng</Text>
                    <Switch value={false} trackColor={{ false: '#D1D5DB', true: '#BFDBFE' }} thumbColor="#fff" style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }} />
                </View>
                <TouchableOpacity className="w-full bg-[#1D52F1] py-3.5 rounded-full items-center justify-center shadow-md shadow-blue-500/30">
                    <Text className="text-white font-bold text-[16px]">Thanh toán</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
