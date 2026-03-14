import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, SafeAreaView, Platform, Alert } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useCartStore } from '../../store/useCartStore';
import ScreenHeader from '../../components/ScreenHeader';

export default function CartScreen() {
    const navigation = useNavigation<any>();
    const { 
        items, 
        updateQuantity, 
        removeItem, 
        toggleSelection, 
        toggleAllSelection, 
        getTotalPrice, 
        getTotalSelectedItems,
        getBadgeCount
    } = useCartStore();

    const totalPrice = getTotalPrice();
    const totalSelectedItems = getTotalSelectedItems();
    const totalItemsCount = getBadgeCount();
    
    // Check if every item is selected to show "Select All" checked state
    const isAllSelected = items.length > 0 && items.every(i => i.selected);

    const handleDelete = (id: number) => {
        if (Platform.OS === 'web') {
            if (window.confirm("Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?")) {
                removeItem(id);
            }
        } else {
            Alert.alert(
                "Xác nhận",
                "Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?",
                [
                    { text: "Hủy", style: "cancel" },
                    { text: "Xóa", onPress: () => removeItem(id), style: "destructive" }
                ]
            );
        }
    };

    if (items.length === 0) {
        return (
            <SafeAreaView className="flex-1 bg-white flex-col">
                <ScreenHeader title="Giỏ hàng" showShare={false} />
                <View className="flex-1 justify-center items-center px-6" style={{ paddingBottom: Platform.OS === 'web' ? 70 : 0 }}>
                    <MaterialCommunityIcons name="cart-off" size={80} color="#E2E8F0" className="mb-4" />
                    <Text className="text-[#1A1A1A] font-bold text-[18px] mb-2">Giỏ hàng trống</Text>
                    <Text className="text-gray-500 text-center text-[14px] mb-6">Chưa có sản phẩm nào trong giỏ hàng. Hãy lướt và tìm các sản phẩm chăm sóc sức khỏe nhé!</Text>
                    <TouchableOpacity 
                        className="bg-[#1D52F1] rounded-full px-8 py-3.5 shadow-sm"
                        onPress={() => navigation.navigate('Home')}
                    >
                        <Text className="text-white font-bold text-[15px]">Tiếp tục mua sắm</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-[#F5F7FA]">
            <ScreenHeader title={`Giỏ hàng (${totalItemsCount})`} showShare={false} />

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                <View className="p-4">
                    {/* Header Controls */}
                    <View className="flex-row justify-between items-center mb-4 px-2">
                        <TouchableOpacity 
                            className="flex-row items-center"
                            onPress={() => toggleAllSelection(!isAllSelected)}
                        >
                            <MaterialCommunityIcons 
                                name={isAllSelected ? "check-circle" : "checkbox-blank-circle-outline"} 
                                size={24} 
                                color={isAllSelected ? "#1D52F1" : "#D1D5DB"} 
                                className="mr-3" 
                            />
                            <Text className="text-[#1A1A1A] font-medium text-[15px]">Chọn tất cả</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Cart Items */}
                    {items.map((item) => (
                        <View key={item.id} className="bg-white rounded-2xl p-4 mb-3 shadow-sm border border-gray-100/50">
                            <View className="flex-row items-center justify-between mb-3 border-b border-gray-100 pb-3">
                                <View className="flex-row items-center flex-1">
                                    <TouchableOpacity onPress={() => toggleSelection(item.id)}>
                                        <MaterialCommunityIcons 
                                            name={item.selected ? "check-circle" : "checkbox-blank-circle-outline"} 
                                            size={24} 
                                            color={item.selected ? "#1D52F1" : "#D1D5DB"} 
                                            className="mr-3" 
                                        />
                                    </TouchableOpacity>
                                    <View className="w-16 h-16 border border-gray-100 rounded-lg p-1 bg-white mr-3">
                                        <Image source={{ uri: item.image }} className="w-full h-full" resizeMode="contain" />
                                    </View>
                                    <View className="flex-1 pr-2">
                                        <Text className="text-[13px] font-bold text-[#1A1A1A] leading-5 mb-1" numberOfLines={2}>
                                            {item.name}
                                        </Text>
                                        <Text className="text-gray-500 text-xs">Phân loại: {item.unit}</Text>
                                    </View>
                                </View>
                                
                                <TouchableOpacity 
                                    className="p-1 h-8 w-8 items-center justify-center bg-red-50 rounded-full flex-shrink-0"
                                    onPress={() => handleDelete(item.id)}
                                    activeOpacity={0.6}
                                >
                                    <Ionicons name="trash-outline" size={18} color="#EF4444" />
                                </TouchableOpacity>
                            </View>

                            <View className="flex-row justify-between items-end">
                                <View>
                                    <Text className="text-[#1D52F1] font-bold text-[16px] mb-0.5">{item.price.toLocaleString('vi-VN')}đ</Text>
                                    {item.originalPrice > item.price && (
                                        <Text className="text-gray-400 text-[11px] line-through">{item.originalPrice.toLocaleString('vi-VN')}đ</Text>
                                    )}
                                </View>

                                {/* Quantity Control */}
                                <View className="flex-row items-center border border-gray-200 rounded-lg bg-gray-50">
                                    <TouchableOpacity 
                                        className="w-8 h-8 items-center justify-center"
                                        onPress={() => updateQuantity(item.id, item.quantity - 1)}
                                    >
                                        <MaterialCommunityIcons name="minus" size={16} color={item.quantity > 1 ? "#1A1A1A" : "#9CA3AF"} />
                                    </TouchableOpacity>
                                    
                                    <View className="w-9 h-8 items-center justify-center bg-white border-x border-gray-200">
                                        <Text className="font-bold text-[13px]">{item.quantity}</Text>
                                    </View>
                                    
                                    <TouchableOpacity 
                                        className="w-8 h-8 items-center justify-center"
                                        onPress={() => updateQuantity(item.id, item.quantity + 1)}
                                    >
                                        <MaterialCommunityIcons name="plus" size={16} color="#1A1A1A" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    ))}
                    
                    {/* Bill Info */}
                    {items.length > 0 && (
                        <View className="bg-white rounded-2xl p-4 mt-2 shadow-sm border border-gray-100 mb-[70px]">
                            <Text className="font-bold text-[#1A1A1A] text-[16px] mb-4">Chi tiết thanh toán</Text>
                            <View className="flex-row justify-between mb-2.5">
                                <Text className="text-gray-500">Tạm tính ({totalSelectedItems} sản phẩm)</Text>
                                <Text className="text-[#1A1A1A] font-medium">{totalPrice.toLocaleString('vi-VN')}đ</Text>
                            </View>
                            <View className="flex-row justify-between mb-4">
                                <Text className="text-gray-500">Giảm giá</Text>
                                <Text className="text-[#10B981] font-medium">-0đ</Text>
                            </View>
                            <View className="flex-row justify-between pt-4 border-t border-gray-100/80 items-center">
                                <Text className="text-[#1A1A1A] font-bold text-[16px]">Tổng cộng</Text>
                                <View className="items-end">
                                    <Text className="text-[#1D52F1] font-bold text-[20px]">{totalPrice.toLocaleString('vi-VN')}đ</Text>
                                    <Text className="text-gray-400 text-[10px] mt-0.5">(Đã bao gồm VAT nếu có)</Text>
                                </View>
                            </View>
                        </View>
                    )}
                </View>
            </ScrollView>

            {/* Bottom Action wrapper with padding for web tabbar overlay if necessary */}
            <View style={{ paddingBottom: Platform.OS === 'web' ? 70 : 0 }}>
                <View className="p-4 bg-white border-t border-gray-100 flex-row items-center justify-between">
                    <View className="flex-1 mr-4">
                        <Text className="text-gray-500 text-[13px] mb-1">Tổng thanh toán</Text>
                        <Text className="text-[#1D52F1] font-bold text-[18px]">{totalPrice.toLocaleString('vi-VN')}đ</Text>
                    </View>
                    <TouchableOpacity 
                        className={`px-8 py-3.5 rounded-full flex-row justify-center items-center ${totalSelectedItems > 0 ? 'bg-[#1D52F1] shadow-md shadow-blue-500/20' : 'bg-gray-300'}`}
                        onPress={() => totalSelectedItems > 0 ? navigation.navigate('Checkout') : null}
                        activeOpacity={totalSelectedItems > 0 ? 0.8 : 1}
                    >
                        <Text className="text-white font-bold text-[15px]">Mua hàng ({totalSelectedItems})</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}
