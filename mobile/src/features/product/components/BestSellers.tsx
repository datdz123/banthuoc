import React from 'react';
import { View, Text, TouchableOpacity, Image, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useUIStore } from '../../../store/useUIStore';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { useCartStore } from '../../../store/useCartStore';

import { useProducts, Product } from '../api/productApi';

export default function BestSellers() {
    const { data: products, isLoading } = useProducts({ limit: 5 });

    return (
        <View className="mt-8 rounded-[32px]  bg-[#E21F4D] relative">
            {/* Top Arched Effect */}
            <View
                style={{
                    position: 'absolute',
                    top: -48,
                    left: -50,
                    right: -50,
                    height: 85,
                    backgroundColor: '#F1F3F9',
                    borderBottomLeftRadius: 150,
                    borderBottomRightRadius: 150,
                    zIndex: 1
                }}
            />

            {/* 3D Ribbon Header */}
            <View className="items-center pt-3 mb-4 relative z-20">
                <View className="relative">
                    {/* Folds */}
                    <View style={{ position: 'absolute', left: -12, top: 8, width: 15, height: 20, backgroundColor: '#950F2E', transform: [{ skewY: '25deg' }], zIndex: -1 }} />
                    <View style={{ position: 'absolute', right: -12, top: 8, width: 15, height: 20, backgroundColor: '#950F2E', transform: [{ skewY: '-25deg' }], zIndex: -1 }} />

                    <LinearGradient
                        colors={['#FFB347', '#F97316']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{ paddingVertical: 10, paddingHorizontal: 35, borderRadius: 10, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 4, elevation: 8 }}
                    >
                        <Text className="text-white font-black text-lg italic tracking-tight">Sản phẩm bán chạy</Text>
                    </LinearGradient>
                </View>
            </View>

            {/* Product List */}
            <View className="p-4 gap-3 relative z-10">
                {isLoading ? (
                    <Text className="text-white text-center py-4">Đang tải...</Text>
                ) : (
                    products?.slice(0, 3).map((product) => (
                        <ProductItem key={product.id} product={product} />
                    ))
                )}
            </View>

            <TouchableOpacity className="py-2 pb-5 items-center relative z-10">
                <Text className="text-white font-bold text-sm tracking-widest">Xem tất cả</Text>
            </TouchableOpacity>
        </View>
    );
}

const ProductItem = ({ product }: { product: Product }) => {
    const showLoginModal = useUIStore(state => state.showLoginModal);
    const navigation = useNavigation<any>();

    const imageUri = product.images?.[0] || 'https://via.placeholder.com/150';
    const hasDiscount = product.cost_price > product.retail_price;
    const priceStr = `${product.retail_price?.toLocaleString('vi-VN')}đ`;
    const originalPriceStr = hasDiscount ? `${product.cost_price?.toLocaleString('vi-VN')}đ` : '';

    return (
        <TouchableOpacity
            className="bg-white rounded-2xl p-3 flex-row relative shadow-sm"
            activeOpacity={0.9}
            onPress={() => navigation.navigate('ProductDetail', { productSlug: product.slug })}
        >
            <View className="w-[100px] h-[100px] bg-white rounded-xl overflow-hidden border border-gray-100 items-center justify-center p-1">
                <Image source={{ uri: imageUri }} className="w-full h-full" resizeMode="contain" />
                {hasDiscount && (
                    <View className="absolute top-0 left-0 bg-[#E21F4D] px-1.5 py-0.5 rounded-br-lg">
                        <Text className="text-white text-[9px] font-black">GIẢM GIÁ</Text>
                    </View>
                )}
            </View>

            <View className="flex-1 ml-3 justify-between">
                <Text className="text-[13px] text-gray-800 font-bold leading-tight" numberOfLines={3}>
                    {product.name}
                </Text>

                <View>
                    <View className="flex-row items-baseline gap-1">
                        <Text className="text-[15px] font-black text-[#1D52F1]">{priceStr}</Text>
                        <Text className="text-[11px] text-gray-600 font-bold">/ {product.unit}</Text>
                    </View>
                    {hasDiscount && <Text className="text-[11px] text-gray-400 line-through">{originalPriceStr}</Text>}
                </View>
            </View>

            <TouchableOpacity
                className="absolute bottom-3 right-3 w-8 h-8 bg-[#F0F5FF] rounded-full items-center justify-center border border-[#D0E0FF]"
                onPress={() => {
                    useCartStore.getState().addItem({
                        id: product.id,
                        name: product.name,
                        slug: product.slug,
                        image: imageUri,
                        price: product.retail_price,
                        originalPrice: product.cost_price,
                        unit: product.unit || 'Hộp',
                        quantity: 1
                    });
                    Alert.alert('Thành công', 'Đã thêm sản phẩm vào giỏ hàng');
                }}
            >
                <MaterialCommunityIcons name="plus" size={20} color="#1D52F1" />
            </TouchableOpacity>
        </TouchableOpacity>
    );
};
