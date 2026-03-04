import React from 'react';
import { View, Text, TouchableOpacity, Image, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface Product {
    id: string;
    name: string;
    image: string;
    price: string;
    originalPrice: string;
    unit: string;
    discount: string;
}

const BEST_SELLERS_DATA: Product[] = [
    {
        id: '1',
        name: 'Viên uống hỗ trợ làm đẹp da, giúp da trắng sáng, cải thiện thâm nám, hạn chế lão hóa da Perfect White Jpanwell (60 ...',
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80',
        price: '1.410.000đ',
        originalPrice: '1.790.000đ',
        unit: 'Hộp',
        discount: '-380.000đ',
    },
    {
        id: '2',
        name: 'Siro giúp xương răng chắc khỏe, bổ sung vitamin D3 + K2 Brauer Baby & Kids D3 + K2 High Potency MK-7 Drops (10ml)',
        image: 'https://images.unsplash.com/photo-1550572017-4fcdbb59cc32?w=400&q=80',
        price: '313.000đ',
        originalPrice: '396.000đ',
        unit: 'Hộp',
        discount: '-83.000đ',
    },
    {
        id: '3',
        name: 'Viên uống bổ não, tốt cho mắt và tim mạch Ultra Brain Lab Well (60 viên)',
        image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=400&q=80',
        price: '191.200đ',
        originalPrice: '239.000đ',
        unit: 'Hộp',
        discount: '-20%',
    },
];

export default function BestSellers() {
    return (
        <View className="mt-8 rounded-[32px]  bg-[#E21F4D] relative">
            {/* Top Arched Effect (The "Cong Conc" part) - Expanded to hide borders */}
            <View
                style={{
                    position: 'absolute',
                    top: -48,
                    left: -50, // Expand width beyond container
                    right: -50, // Expand width beyond container
                    height: 85,
                    backgroundColor: '#F1F3F9',
                    borderBottomLeftRadius: 150,
                    borderBottomRightRadius: 150,
                    zIndex: 1
                }}
            />

            {/* 3D Ribbon Header - Higher zIndex */}
            <View className="items-center pt-3 mb-4 relative z-20">
                <View className="relative">
                    {/* Left Fold */}
                    <View
                        style={{
                            position: 'absolute',
                            left: -12,
                            top: 8,
                            width: 15,
                            height: 20,
                            backgroundColor: '#950F2E', // Darker red for the fold
                            transform: [{ skewY: '25deg' }],
                            zIndex: -1,
                        }}
                    />
                    {/* Right Fold */}
                    <View
                        style={{
                            position: 'absolute',
                            right: -12,
                            top: 8,
                            width: 15,
                            height: 20,
                            backgroundColor: '#950F2E', // Darker red for the fold
                            transform: [{ skewY: '-25deg' }],
                            zIndex: -1,
                        }}
                    />

                    {/* Main Ribbon Body */}
                    <LinearGradient
                        colors={['#FFB347', '#F97316']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{
                            paddingVertical: 10,
                            paddingHorizontal: 35,
                            borderRadius: 10,
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.3,
                            shadowRadius: 4,
                            elevation: 8,
                        }}
                    >
                        <Text className="text-white font-black text-lg italic tracking-tight">Sản phẩm bán chạy</Text>
                    </LinearGradient>
                </View>
            </View>

            {/* Product List */}
            <View className="p-4 gap-3 relative z-10">
                {BEST_SELLERS_DATA.map((product) => (
                    <ProductItem key={product.id} product={product} />
                ))}
            </View>

            {/* Footer Button */}
            <TouchableOpacity className="py-2 pb-5 items-center relative z-10">
                <Text className="text-white font-bold text-sm tracking-widest">Xem tất cả</Text>
            </TouchableOpacity>
        </View>
    );
}

const ProductItem = ({ product }: { product: Product }) => (
    <TouchableOpacity
        className="bg-white rounded-2xl p-3 flex-row relative shadow-sm"
        activeOpacity={0.9}
    >
        {/* Product Image Container */}
        <View className="w-[100px] h-[100px] bg-white rounded-xl overflow-hidden border border-gray-100 items-center justify-center p-1">
            <Image
                source={{ uri: product.image }}
                className="w-full h-full"
                resizeMode="contain"
            />
            {/* Discount Badge */}
            <View className="absolute top-0 left-0 bg-[#E21F4D] px-1.5 py-0.5 rounded-br-lg">
                <Text className="text-white text-[9px] font-black">{product.discount}</Text>
            </View>
        </View>

        {/* Product Info */}
        <View className="flex-1 ml-3 justify-between">
            <Text className="text-[13px] text-gray-800 font-bold leading-tight" numberOfLines={3}>
                {product.name}
            </Text>

            <View>
                <View className="flex-row items-baseline gap-1">
                    <Text className="text-[15px] font-black text-[#1D52F1]">{product.price}</Text>
                    <Text className="text-[11px] text-gray-600 font-bold">/ {product.unit}</Text>
                </View>
                <Text className="text-[11px] text-gray-400 line-through">{product.originalPrice}</Text>
            </View>
        </View>

        {/* Add Button */}
        <TouchableOpacity className="absolute bottom-3 right-3 w-8 h-8 bg-[#F0F5FF] rounded-full items-center justify-center border border-[#D0E0FF]">
            <MaterialCommunityIcons name="plus" size={20} color="#1D52F1" />
        </TouchableOpacity>
    </TouchableOpacity>
);
