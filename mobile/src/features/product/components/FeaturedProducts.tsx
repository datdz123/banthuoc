import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useFeaturedProducts, Product } from '../../../api/productApi';
import { useCartStore } from '../../../store/useCartStore';

export default function FeaturedProducts() {
    // Không truyền param bestseller=1 ở đây
    const { data: products, isLoading } = useFeaturedProducts({ limit: 10 });

    // Nếu không có sản phẩm nào và đã load xong, có thể ẩn đi
    if (!isLoading && (!products || products.length === 0)) {
        return null;
    }

    return (
        <View className="mt-4 bg-white py-4 rounded-2xl w-full">
            {/* Header Component */}
            <View className="flex-row justify-between items-center px-4 mb-4">
                <View className="flex-row items-center gap-2">
                    <MaterialCommunityIcons name="star-circle" size={24} color="#F59E0B" />
                    <Text className="text-gray-800 font-bold text-lg">Sản phẩm nổi bật</Text>
                </View>
                <TouchableOpacity>
                    <Text className="text-[#1D52F1] text-sm font-semibold">Xem tất cả</Text>
                </TouchableOpacity>
            </View>

            {/* List */}
            {isLoading ? (
                <Text className="text-center text-gray-400 py-6">Đang tải...</Text>
            ) : (
                <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false} 
                    contentContainerStyle={{ paddingHorizontal: 16 }}
                >
                    {products?.map((product) => (
                        <FeaturedProductItem key={product.id} product={product} />
                    ))}
                </ScrollView>
            )}
        </View>
    );
}

const FeaturedProductItem = ({ product }: { product: Product }) => {
    const navigation = useNavigation<any>();
    
    const imageUri = product.images?.[0] || 'https://via.placeholder.com/150';
    const hasDiscount = product.cost_price > product.retail_price;
    const priceStr = `${product.retail_price?.toLocaleString('vi-VN')}đ`;
    const originalPriceStr = hasDiscount ? `${product.cost_price?.toLocaleString('vi-VN')}đ` : '';

    return (
        <TouchableOpacity 
            className="w-[140px] bg-white rounded-xl border border-gray-100 p-2 shadow-sm relative mr-3"
            activeOpacity={0.9}
            onPress={() => navigation.navigate('ProductDetail', { productSlug: product.slug })}
        >
            <View className="h-[120px] bg-white rounded-lg items-center justify-center mb-2 overflow-hidden border border-gray-50 p-1">
                <Image source={{ uri: imageUri }} className="w-full h-full" resizeMode="contain" />
                {hasDiscount && (
                    <View className="absolute top-0 left-0 bg-[#E21F4D] px-1.5 py-0.5 rounded-br-lg z-10">
                        <Text className="text-white text-[9px] font-black">GIẢM GIÁ</Text>
                    </View>
                )}
            </View>
            
            <View className="flex-1">
                <Text className="text-[13px] text-gray-800 font-bold mb-1 leading-tight h-[38px]" numberOfLines={2}>
                    {product.name}
                </Text>

                <View className="mt-auto">
                    {hasDiscount && <Text className="text-[11px] text-gray-400 line-through mb-0.5">{originalPriceStr}</Text>}
                    <View className="flex-row items-baseline gap-1">
                        <Text className="text-[14px] font-bold text-[#1D52F1]">{priceStr}</Text>
                        <Text className="text-[10px] text-gray-500">/{product.unit}</Text>
                    </View>
                </View>
            </View>

            <TouchableOpacity 
                className="absolute bottom-2 right-2 w-7 h-7 bg-[#F0F5FF] rounded-full items-center justify-center border border-[#D0E0FF]"
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
                <MaterialCommunityIcons name="cart-plus" size={16} color="#1D52F1" />
            </TouchableOpacity>
        </TouchableOpacity>
    );
};
