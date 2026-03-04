import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions, Animated, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const SLIDER_WIDTH = width - 32; // Horizontal padding 16 * 2
const ITEM_WIDTH = SLIDER_WIDTH;

interface Slide {
    id: string;
    image: string;
    title: string;
    description: string;
    badge: string;
}

const SLIDES_DATA: Slide[] = [
    {
        id: '1',
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80',
        title: 'Vitamin & Thực phẩm chức năng',
        description: 'Tăng cường đề kháng, bổ sung dinh dưỡng cho cả gia đình. Giảm đến 40% các sản phẩm chọn lọc.',
        badge: 'Nhà Thuốc Hoàng Anh'
    },
    {
        id: '2',
        image: 'https://images.unsplash.com/photo-1576091160550-217359f481c3?w=800&q=80',
        title: 'Dược mỹ phẩm\nchính hãng',
        description: 'La Roche-Posay, CeraVe, Bioderma, Klairs. Chăm sóc da an toàn, hiệu quả.',
        badge: 'Ưu Đãi Đặc Biệt'
    },
    {
        id: '3',
        image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?w=800&q=80',
        title: 'Thiết bị y tế\ngia đình',
        description: 'Máy đo huyết áp, tiểu đường, nhiệt kế hồng ngoại chuyên dụng.',
        badge: 'Hệ Thống Nhà Thuốc'
    }
];

export default function MainSlider() {
    const scrollX = useRef(new Animated.Value(0)).current;

    return (
        <View className="mt-5">
            <Animated.ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                snapToInterval={ITEM_WIDTH}
                decelerationRate="fast"
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
                scrollEventThrottle={16}
                contentContainerStyle={{ borderRadius: 32 }}
            >
                {SLIDES_DATA.map((slide) => (
                    <View key={slide.id} style={{ width: ITEM_WIDTH }} className="h-[280px] rounded-[32px] overflow-hidden">
                        {/* Background Image */}
                        <Image
                            source={{ uri: slide.image }}
                            className="absolute inset-0 w-full h-full"
                            resizeMode="cover"
                        />

                        {/* More Vibrant Green/Teal Gradient Overlay */}
                        <LinearGradient
                            colors={['rgba(20, 83, 45, 0.9)', 'rgba(21, 128, 61, 0.6)', 'rgba(34, 197, 94, 0.2)']}
                            start={{ x: 0, y: 0.2 }}
                            end={{ x: 1, y: 0.8 }}
                            className="absolute inset-0"
                        />

                        {/* Content */}
                        <View className="flex-1 justify-center px-8 pt-4">
                            <View className="bg-white/20 self-start px-4 py-1.5 rounded-full mb-4">
                                <Text className="text-white text-[10px] font-black uppercase tracking-widest">
                                    {slide.badge}
                                </Text>
                            </View>

                            <Text className="text-white text-[28px] font-black leading-[1.1] mb-4">
                                {slide.title}
                            </Text>

                            <Text className="text-white/90 text-[13px] font-medium leading-[1.4] max-w-[85%] mb-8">
                                {slide.description}
                            </Text>

                            <View className="flex-row gap-3">
                                <TouchableOpacity className="bg-white px-8 py-3.5 rounded-2xl shadow-lg">
                                    <Text className="text-[#15803D] text-[13px] font-black">Xem ưu đãi</Text>
                                </TouchableOpacity>
                                <TouchableOpacity className="bg-white/20 border border-white/40 px-8 py-3.5 rounded-2xl">
                                    <Text className="text-white text-[13px] font-black">Tìm kiếm</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                ))}
            </Animated.ScrollView>

            {/* Pagination Dots at Bottom */}
            <View className="flex-row justify-center items-center gap-1.5 absolute bottom-6 left-0 right-0">
                {SLIDES_DATA.map((_, i) => {
                    const dotWidth = scrollX.interpolate({
                        inputRange: [
                            (i - 1) * ITEM_WIDTH,
                            i * ITEM_WIDTH,
                            (i + 1) * ITEM_WIDTH,
                        ],
                        outputRange: [6, 24, 6],
                        extrapolate: 'clamp',
                    });

                    const opacity = scrollX.interpolate({
                        inputRange: [
                            (i - 1) * ITEM_WIDTH,
                            i * ITEM_WIDTH,
                            (i + 1) * ITEM_WIDTH,
                        ],
                        outputRange: [0.4, 1, 0.4],
                        extrapolate: 'clamp',
                    });

                    return (
                        <Animated.View
                            key={i}
                            style={{
                                width: dotWidth,
                                opacity,
                                height: 6,
                                borderRadius: 3,
                                backgroundColor: 'white'
                            }}
                        />
                    );
                })}
            </View>
        </View>
    );
}
