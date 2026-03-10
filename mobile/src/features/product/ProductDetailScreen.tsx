import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Image, Modal, Platform } from 'react-native';
import { MaterialCommunityIcons, Ionicons, Feather, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function ProductDetailScreen() {
    const navigation = useNavigation<any>();
    const [showPurchaseOptions, setShowPurchaseOptions] = useState(false);
    const [showRatingModal, setShowRatingModal] = useState(false);
    const [ratingScore, setRatingScore] = useState(0);
    const [quantity, setQuantity] = useState(1);

    // Static data matching the image
    const productInfo = {
        name: 'Kem bôi viêm da cơ địa Uriage Xemose Crème Replipidante Anti-irriations 200ml',
        price: '371.200đ',
        originalPrice: '464.000đ',
        discount: '-20%',
        unit: 'Hộp',
        points: '+371 điểm thưởng',
        brand: 'Uriage',
        origin: 'Pháp',
        images: [
            'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80',
            'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80',
        ]
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1">
                {/* Header */}
                <View className="flex-row items-center justify-between px-4 py-3 bg-white z-10">
                    <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2">
                        <Ionicons name="chevron-back" size={28} color="black" />
                    </TouchableOpacity>
                    <View className="flex-row items-center space-x-4">
                        <TouchableOpacity className="p-2">
                            <Feather name="share" size={24} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity className="p-2 mr-[-8px]">
                            <MaterialCommunityIcons name="cart-outline" size={26} color="#1D52F1" />
                        </TouchableOpacity>
                    </View>
                </View>

                <ScrollView className="flex-1 bg-[#F1F3F9]" showsVerticalScrollIndicator={false}>
                    {/* Images Section */}
                    <View className="bg-white pb-4">
                        <View className="w-full aspect-square items-center justify-center p-8">
                            <Image
                                source={{ uri: productInfo.images[0] }}
                                className="w-full h-full"
                                resizeMode="contain"
                            />
                        </View>
                        {/* Thumbnails */}
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4 mt-2">
                            <View className="flex-row space-x-3 mb-1">
                                {[1, 2, 3, 4, 5, 6].map((item, index) => (
                                    <View key={item} className={`w-14 h-14 rounded-lg border items-center justify-center overflow-hidden ${index === 0 ? 'border-[#1D52F1]' : 'border-gray-200'} mr-3`}>
                                        <Image source={{ uri: productInfo.images[0] }} className="w-full h-full" resizeMode="contain" />
                                    </View>
                                ))}
                            </View>
                        </ScrollView>
                        <Text className="text-center text-gray-500 text-xs mt-3">Mẫu mã sản phẩm có thể thay đổi theo lô hàng</Text>
                    </View>

                    {/* Product Info Section */}
                    <View className="bg-white mt-2 p-4 pt-5 pb-6">
                        <View className="flex-row items-center mb-2">
                            <View className="flex-row items-center bg-gray-100 px-2 py-1 rounded">
                                <Text className="text-xs font-bold mr-1">🇫🇷</Text>
                                <Text className="text-xs text-gray-600">Pháp</Text>
                            </View>
                            <Text className="text-gray-500 text-[13px] ml-3">Thương hiệu: </Text>
                            <Text className="text-[#1D52F1] text-[13px]">{productInfo.brand}</Text>
                        </View>

                        <Text className="text-[#1A1A1A] text-[18px] font-bold leading-6 mb-3">
                            {productInfo.name}
                        </Text>

                        <View className="flex-row items-center mb-4">
                            <Text className="text-gray-500 text-sm">00045847</Text>
                            <TouchableOpacity className="ml-3">
                                <Text className="text-[#1D52F1] text-sm font-medium">6 bình luận</Text>
                            </TouchableOpacity>
                        </View>

                        <View className="mb-2">
                            <View className="flex-row items-baseline">
                                <Text className="text-[#1D52F1] text-[26px] font-bold">{productInfo.price}</Text>
                                <Text className="text-[#1D52F1] text-sm font-bold ml-1">/ {productInfo.unit}</Text>
                            </View>
                            <View className="flex-row items-center mt-1">
                                <Text className="text-gray-400 text-sm line-through mr-3">{productInfo.originalPrice}</Text>
                                <View className="bg-red-500 px-1.5 py-0.5 rounded">
                                    <Text className="text-white text-xs font-bold">{productInfo.discount}</Text>
                                </View>
                            </View>
                        </View>

                        <View className="flex-row items-center mt-3">
                            <View className="w-5 h-5 bg-yellow-400 rounded-full items-center justify-center mr-2">
                                <Text className="text-[#1D52F1] text-[10px] font-black italic">F</Text>
                            </View>
                            <Text className="text-orange-500 font-bold">{productInfo.points}</Text>
                            <MaterialCommunityIcons name="help-circle" size={16} color="#9CA3AF" className="ml-1" />
                        </View>

                        <View className="mt-6">
                            <Text className="text-[#4A5568] text-sm font-medium mb-2">Chọn đơn vị tính</Text>
                            <TouchableOpacity className="border border-[#1D52F1] rounded-full px-6 py-2 self-start bg-blue-50 relative overflow-hidden">
                                <Text className="text-[#1D52F1] font-bold">Hộp</Text>
                                <View className="absolute top-0 right-0 w-4 h-4 bg-[#1D52F1] items-center justify-center rounded-bl" style={{ borderBottomLeftRadius: 10 }}>
                                    <Ionicons name="checkmark" size={10} color="white" />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Promotions Section */}
                    <View className="bg-white mt-2 p-4">
                        <View className="bg-orange-50 rounded-lg border border-orange-100 overflow-hidden">
                            <View className="bg-orange-100 flex-row items-center px-3 py-2">
                                <MaterialCommunityIcons name="brightness-percent" size={16} color="#EA580C" />
                                <Text className="text-orange-600 font-bold ml-2">Khuyến mại được áp dụng</Text>
                            </View>
                            <View className="p-3">
                                <Text className="text-[#1A1A1A] font-bold mb-3">Ưu đãi thêm:</Text>
                                <View className="flex-row items-center bg-white border border-gray-100 rounded-lg p-3">
                                    <View className="w-10 h-10 bg-blue-50 rounded items-center justify-center mr-3">
                                        <MaterialCommunityIcons name="ticket-percent-outline" size={24} color="#1D52F1" />
                                    </View>
                                    <Text className="flex-1 text-[13px] text-[#4A5568]">Giảm ngay 20% áp dụng đến 31/03</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Product Specs */}
                    <View className="bg-white mt-2 p-4">
                        <Text className="text-[#1A1A1A] text-[18px] font-bold mb-4">Thông tin sản phẩm</Text>

                        <View className="space-y-4">
                            <View className="flex-row">
                                <Text className="text-gray-500 text-sm w-32">Danh mục</Text>
                                <Text className="flex-1 text-[#1D52F1] text-sm">Chăm sóc cơ thể</Text>
                            </View>
                            <View className="flex-row">
                                <Text className="text-gray-500 text-sm w-32">Quy cách</Text>
                                <Text className="flex-1 text-[#1A1A1A] text-sm">Hộp x 200ml</Text>
                            </View>
                            <View className="flex-row">
                                <Text className="text-gray-500 text-sm w-32">Mô tả ngắn</Text>
                                <Text className="flex-1 text-[#1A1A1A] text-sm leading-5">Kem chăm sóc da Uriage Xémose Crème Relipidante Anti-Irritations giúp giữ ẩm và làm mềm da, giúp giảm tình trạng khô da.</Text>
                            </View>
                            <View className="flex-row">
                                <Text className="text-gray-500 text-sm w-32">Nước sản xuất</Text>
                                <Text className="flex-1 text-[#1A1A1A] text-sm">Pháp</Text>
                            </View>
                            <View className="flex-row">
                                <Text className="text-gray-500 text-sm w-32">Nhà sản xuất</Text>
                                <Text className="flex-1 text-[#1A1A1A] text-sm">LABORATOIRES DERMATOLOGIQUES D'URIAGE</Text>
                            </View>
                            <View className="flex-row">
                                <Text className="text-gray-500 text-sm w-32">Hạn sử dụng</Text>
                                <Text className="flex-1 text-[#1A1A1A] text-sm">36 tháng</Text>
                            </View>
                        </View>

                        <TouchableOpacity className="flex-row items-center mt-4">
                            <Text className="text-[#1D52F1] font-bold">Xem tất cả</Text>
                            <MaterialCommunityIcons name="chevron-right" size={20} color="#1D52F1" />
                        </TouchableOpacity>
                    </View>

                    {/* FAQ and Ratings Demo Area */}
                    <View className="bg-white mt-2 p-4">
                        <Text className="text-[#1A1A1A] text-[18px] font-bold mb-4">Câu hỏi thường gặp</Text>
                        <View className="space-y-4 border-b border-gray-100 pb-4">
                            <View className="flex-row justify-between items-center">
                                <View className="flex-row items-center flex-1">
                                    <View className="w-5 h-5 bg-gray-200 rounded-full items-center justify-center mr-2">
                                        <Text className="text-gray-500 text-xs font-bold">?</Text>
                                    </View>
                                    <Text className="text-[#1A1A1A] font-medium flex-1">Các bước chăm sóc cơ thể để làm trắng da?</Text>
                                </View>
                                <MaterialCommunityIcons name="chevron-down" size={20} color="#9CA3AF" />
                            </View>
                        </View>
                    </View>

                    {/* Ratings Demo Area */}
                    <View className="bg-white mt-2 p-4 items-center">
                        <Text className="text-[#1A1A1A] text-[18px] font-bold mb-2 self-start">Đánh giá sản phẩm</Text>
                        <MaterialCommunityIcons name="star" size={80} color="#FBBF24" className="my-4" />
                        <Text className="text-gray-500 text-center text-[13px] px-8 mb-4 leading-5">Hãy sử dụng sản phẩm và trở thành người đầu tiên đánh giá trải nghiệm nha.</Text>
                        <TouchableOpacity
                            className="bg-[#1D52F1] rounded-full px-8 py-2.5"
                            onPress={() => setShowRatingModal(true)}
                        >
                            <Text className="text-white font-bold text-[14px]">Gửi đánh giá</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Q&A Demo Area */}
                    <View className="bg-white mt-2 p-4 mb-4">
                        <View className="flex-row justify-between items-center mb-4">
                            <Text className="text-[#1A1A1A] text-[18px] font-bold">Hỏi đáp</Text>
                            <Text className="text-gray-500 text-[13px]">(6 bình luận)</Text>
                        </View>
                        <TouchableOpacity className="bg-[#1D52F1] rounded-full px-6 py-2.5 self-start shadow-sm">
                            <Text className="text-white font-bold text-[14px]">Gửi bình luận</Text>
                        </TouchableOpacity>
                    </View>

                    <View className="h-32" />
                </ScrollView>

                {/* Bottom Bar */}
                <View className="bg-white px-4 py-3 pb-8 border-t border-gray-100 flex-row space-x-3 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
                    <TouchableOpacity className="w-12 h-12 bg-[#F1F3F9] rounded-full items-center justify-center">
                        <MaterialCommunityIcons name="headset" size={24} color="#1D52F1" />
                    </TouchableOpacity>

                    <TouchableOpacity className="flex-1 bg-[#F1F3F9] h-12 rounded-full items-center justify-center">
                        <Text className="text-[#1D52F1] font-bold text-[16px]">Tìm nhà thuốc</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="flex-1 bg-[#1D52F1] h-12 rounded-full items-center justify-center"
                        onPress={() => setShowPurchaseOptions(true)}
                    >
                        <Text className="text-white font-bold text-[16px]">Chọn mua</Text>
                    </TouchableOpacity>
                </View>

                {/* Purchase Options Bottom Sheet */}
                <Modal
                    visible={showPurchaseOptions}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={() => setShowPurchaseOptions(false)}
                >
                    <View className="flex-1 bg-black/50 justify-end">
                        <TouchableOpacity
                            className="flex-1"
                            activeOpacity={1}
                            onPress={() => setShowPurchaseOptions(false)}
                        />
                        <View className="bg-white rounded-t-[20px] pt-4 pb-8">
                            <View className="px-4 border-b border-gray-100 pb-4 mb-4">
                                <View className="flex-row justify-between items-center mb-4">
                                    <Text className="text-[18px] font-bold text-center flex-1 ml-6">Chọn số lượng, đơn vị</Text>
                                    <TouchableOpacity onPress={() => setShowPurchaseOptions(false)}>
                                        <Ionicons name="close" size={24} color="black" />
                                    </TouchableOpacity>
                                </View>

                                {/* Product Header in Modal */}
                                <View className="flex-row mr-4 items-center">
                                    <View className="w-16 h-16 border border-gray-200 rounded-lg p-1 mr-3">
                                        <Image source={{ uri: productInfo.images[0] }} className="w-full h-full" resizeMode="contain" />
                                    </View>
                                    <View className="flex-1">
                                        <Text className="text-[14px] font-bold text-[#1A1A1A] leading-5 mb-1" numberOfLines={2}>
                                            {productInfo.name}
                                        </Text>
                                        <View className="flex-row items-baseline mb-0.5">
                                            <Text className="text-[#1D52F1] font-bold">{productInfo.price}</Text>
                                            <Text className="text-[#1D52F1] text-xs"> / Hộp</Text>
                                        </View>
                                        <Text className="text-gray-400 text-xs line-through">{productInfo.originalPrice}</Text>
                                    </View>
                                </View>
                            </View>

                            <View className="px-4">
                                <Text className="text-[#4A5568] font-bold mb-3">Đơn vị</Text>
                                <TouchableOpacity className="border border-[#1D52F1] rounded-full px-6 py-2 self-start bg-blue-50 relative overflow-hidden mb-6">
                                    <Text className="text-[#1D52F1] font-bold">Hộp</Text>
                                    <View className="absolute top-0 right-0 w-4 h-4 bg-[#1D52F1] items-center justify-center rounded-bl" style={{ borderBottomLeftRadius: 10 }}>
                                        <Ionicons name="checkmark" size={10} color="white" />
                                    </View>
                                </TouchableOpacity>

                                <Text className="text-[#4A5568] font-bold mb-3">Số lượng</Text>
                                <View className="flex-row items-center bg-white border border-gray-200 rounded-lg self-start mb-6">
                                    <TouchableOpacity
                                        className="px-4 py-2"
                                        onPress={() => quantity > 1 && setQuantity(quantity - 1)}
                                    >
                                        <MaterialCommunityIcons name="minus" size={20} color={quantity > 1 ? "black" : "#D1D5DB"} />
                                    </TouchableOpacity>
                                    <View className="px-4 py-2 border-x border-gray-200 min-w-[50px] items-center">
                                        <Text className="font-bold text-[16px]">{quantity}</Text>
                                    </View>
                                    <TouchableOpacity
                                        className="px-4 py-2"
                                        onPress={() => setQuantity(quantity + 1)}
                                    >
                                        <MaterialCommunityIcons name="plus" size={20} color="black" />
                                    </TouchableOpacity>
                                </View>

                                <View className="flex-row justify-between items-center mb-1">
                                    <Text className="text-gray-500 font-medium text-[15px]">Tạm tính</Text>
                                    <Text className="text-[#1A1A1A] font-bold text-[18px]">{productInfo.price}</Text>
                                </View>
                                <View className="flex-row justify-between items-center mb-6">
                                    <Text className="text-gray-500 text-[13px]">Tiết kiệm được</Text>
                                    <Text className="text-red-500 font-medium text-[13px]">92.800đ</Text>
                                </View>

                                <View className="flex-row space-x-3">
                                    <TouchableOpacity className="flex-1 bg-[#F1F3F9] py-3.5 rounded-full items-center justify-center mr-2">
                                        <Text className="text-[#1D52F1] font-bold text-[16px]">Thêm vào giỏ</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        className="flex-1 bg-[#1D52F1] py-3.5 rounded-full items-center justify-center ml-2"
                                        onPress={() => setShowPurchaseOptions(false)}
                                    >
                                        <Text className="text-white font-bold text-[16px]">Mua ngay</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>

                {/* Rating Modal */}
                <Modal
                    visible={showRatingModal}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={() => setShowRatingModal(false)}
                >
                    <View className="flex-1 bg-black/50 justify-end">
                        <TouchableOpacity
                            className="flex-1"
                            activeOpacity={1}
                            onPress={() => setShowRatingModal(false)}
                        />
                        <View className="bg-white rounded-t-[20px] pt-4 pb-8">
                            <View className="px-4 border-b border-gray-100 pb-4 mb-4">
                                <View className="flex-row justify-between items-center mb-4">
                                    <View className="w-6" />
                                    <Text className="text-[18px] font-bold text-center flex-1">Đánh giá sản phẩm</Text>
                                    <TouchableOpacity onPress={() => setShowRatingModal(false)}>
                                        <Ionicons name="close" size={24} color="black" />
                                    </TouchableOpacity>
                                </View>

                                {/* Product Header in Rating Modal */}
                                <View className="flex-row items-center bg-gray-50 p-2 rounded-lg">
                                    <View className="w-12 h-12 border border-gray-200 rounded p-1 mr-3 bg-white">
                                        <Image source={{ uri: productInfo.images[0] }} className="w-full h-full" resizeMode="contain" />
                                    </View>
                                    <Text className="text-[13px] font-bold text-[#1A1A1A] leading-4 flex-1" numberOfLines={2}>
                                        {productInfo.name}
                                    </Text>
                                </View>
                            </View>

                            <View className="px-4 items-center">
                                {/* Stars */}
                                <View className="flex-row space-x-2 mb-2 items-center justify-center">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <TouchableOpacity key={star} onPress={() => setRatingScore(star)}>
                                            <MaterialCommunityIcons
                                                name="star"
                                                size={40}
                                                color={star <= ratingScore ? "#FBBF24" : "#E5E7EB"}
                                            />
                                        </TouchableOpacity>
                                    ))}
                                    {ratingScore > 0 && (
                                        <Text className="text-gray-500 font-medium ml-2">{ratingScore === 5 ? 'Tuyệt vời' : ratingScore + ' sao'}</Text>
                                    )}
                                </View>

                                <View className="w-full border border-gray-200 rounded-xl p-4 min-h-[100px] mt-4 mb-6">
                                    <Text className="text-gray-400">Nhập nội dung đánh giá (Không bắt buộc - Vui lòng gõ Tiếng Việt có dấu)</Text>
                                </View>

                                <TouchableOpacity
                                    className="w-full bg-[#1D52F1] py-3.5 rounded-full items-center justify-center shadow-md shadow-[#1D52F1]/30 opacity-90"
                                    onPress={() => setShowRatingModal(false)}
                                >
                                    <Text className="text-white font-bold text-[16px]">Gửi đánh giá</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    );
}

