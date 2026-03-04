import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Platform, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';

interface Product {
    id: string;
    name: string;
    image: string;
    price: string;
    originalPrice: string;
    discount: string;
    unit: string;
    soldPercentage: number;
    isHot?: boolean;
}

const FLASH_SALE_DATA: Product[] = [
    {
        id: '1',
        name: 'Kem dưỡng da chuyên sâu Cerave',
        image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&q=80',
        price: '266.000đ',
        originalPrice: '380.000đ',
        discount: '-30%',
        unit: 'Hũ 453g',
        soldPercentage: 71,
    },
    {
        id: '2',
        name: 'Dầu cá Omega-3 Fish Oil',
        image: 'https://images.unsplash.com/photo-1550572017-4fcdbb59cc32?w=400&q=80',
        price: '203.000đ',
        originalPrice: '290.000đ',
        discount: '-30%',
        unit: 'Lọ 100 viên',
        soldPercentage: 84,
        isHot: true,
    },
    {
        id: '3',
        name: 'Máy đo huyết áp điện tử Microlife',
        image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=400&q=80',
        price: '665.000đ',
        originalPrice: '950.000đ',
        discount: '-30%',
        unit: 'Bộ',
        soldPercentage: 47,
    },
    {
        id: '4',
        name: 'Sữa bột Similac số 1 cho trẻ sơ sinh',
        image: 'https://images.unsplash.com/photo-1555243896-c709bfa0b564?w=400&q=80',
        price: '364.000đ',
        originalPrice: '520.000đ',
        discount: '-30%',
        unit: 'Lon 900g',
        soldPercentage: 60,
    },
];

export default function FlashSale() {
    const pulseAnim = React.useRef(new Animated.Value(1)).current;
    const scrollX = React.useRef(new Animated.Value(0)).current;
    const [timeLeft, setTimeLeft] = useState({
        hours: 3,
        minutes: 44,
        seconds: 11,
    });

    const CARD_WIDTH = 160;
    const GAP = 12;
    const SNAP_INTERVAL = CARD_WIDTH + GAP;

    useEffect(() => {
        // Pulse animation for lightning
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.2,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        ).start();

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                let { hours, minutes, seconds } = prev;
                if (seconds > 0) {
                    seconds--;
                } else if (minutes > 0) {
                    minutes--;
                    seconds = 59;
                } else if (hours > 0) {
                    hours--;
                    minutes = 59;
                    seconds = 59;
                }
                return { hours, minutes, seconds };
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatNum = (num: number) => num.toString().padStart(2, '0');

    return (
        <LinearGradient
            colors={['#EF4444', '#F97316']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="mt-6 rounded-2xl p-4 relative overflow-hidden shadow-xl"
        >
            {/* Background Decorations */}
            <View
                className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none"
                style={{ opacity: 0.2 }}
            />

            {/* Header */}
            <View className="flex-row justify-between items-center mb-4">
                <View className="flex-row items-center gap-3">
                    <Animated.View
                        style={{ transform: [{ scale: pulseAnim }] }}
                        className="w-10 h-10 bg-yellow-400 rounded-xl items-center justify-center shadow-lg"
                    >
                        <MaterialCommunityIcons name="lightning-bolt" size={24} color="#DC2626" />
                    </Animated.View>
                    <View>
                        <Text className="text-white font-black text-xl tracking-tighter uppercase italic">
                            Flash Sale
                        </Text>
                        <View className="flex-row items-center gap-2 mt-1">
                            <Text className="text-white/80 text-[10px] font-bold uppercase tracking-widest">
                                Kết thúc sau
                            </Text>
                            <View className="flex-row items-center gap-1">
                                <TimeBox value={formatNum(timeLeft.hours)} />
                                <Text className="text-white font-bold">:</Text>
                                <TimeBox value={formatNum(timeLeft.minutes)} />
                                <Text className="text-white font-bold">:</Text>
                                <TimeBox value={formatNum(timeLeft.seconds)} />
                            </View>
                        </View>
                    </View>
                </View>

                <TouchableOpacity className="bg-white/10 backdrop-blur-xl px-4 py-2 rounded-xl border border-white/20 flex-row items-center">
                    <Text className="text-white text-xs font-bold">Xem tất cả</Text>
                    <Feather name="chevron-right" size={14} color="white" className="ml-1" />
                </TouchableOpacity>
            </View>

            {/* Product Slider (Snapping) */}
            <Animated.ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: GAP, paddingRight: 20 }}
                snapToInterval={SNAP_INTERVAL}
                decelerationRate="fast"
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
                scrollEventThrottle={16}
            >
                {FLASH_SALE_DATA.map((product) => (
                    <ProductCard key={product.id} product={product} width={CARD_WIDTH} />
                ))}
            </Animated.ScrollView>

            {/* Dynamic Pagination dots */}
            <View className="flex-row justify-center items-center gap-1.5 mt-5">
                {FLASH_SALE_DATA.map((_, i) => {
                    const width = scrollX.interpolate({
                        inputRange: [
                            (i - 1) * SNAP_INTERVAL,
                            i * SNAP_INTERVAL,
                            (i + 1) * SNAP_INTERVAL,
                        ],
                        outputRange: [6, 20, 6],
                        extrapolate: 'clamp',
                    });

                    const opacity = scrollX.interpolate({
                        inputRange: [
                            (i - 1) * SNAP_INTERVAL,
                            i * SNAP_INTERVAL,
                            (i + 1) * SNAP_INTERVAL,
                        ],
                        outputRange: [0.4, 1, 0.4],
                        extrapolate: 'clamp',
                    });

                    return (
                        <Animated.View
                            key={i}
                            style={{
                                width,
                                opacity,
                                height: 6,
                                borderRadius: 3,
                                backgroundColor: 'white'
                            }}
                        />
                    );
                })}
            </View>
        </LinearGradient>
    );
}

const TimeBox = ({ value }: { value: string }) => (
    <View className="bg-white rounded-md px-1.5 py-0.5 min-w-[24px] items-center">
        <Text className="text-red-600 font-black text-xs">{value}</Text>
    </View>
);

const ProductCard = ({ product, width }: { product: Product, width: number }) => (
    <TouchableOpacity
        style={{ width }}
        className="bg-white rounded-2xl p-2 relative shadow-sm border border-white/60"
        activeOpacity={0.9}
    >
        {/* Discount Badge */}
        <View className="absolute top-2 left-2 z-10 bg-red-500 rounded-lg px-2 py-0.5">
            <Text className="text-white text-[10px] font-black">{product.discount}</Text>
        </View>

        {/* Product Image */}
        <View className="w-full aspect-square rounded-xl overflow-hidden mb-2">
            <Image
                source={{ uri: product.image }}
                className="w-full h-full"
                resizeMode="cover"
            />
        </View>

        {/* Product Info */}
        <View className="px-1">
            <Text className="text-[12px] text-gray-800 font-bold leading-tight h-[32px]" numberOfLines={2}>
                {product.name}
            </Text>
            <Text className="text-[10px] text-gray-400 mt-0.5 mb-1">{product.unit}</Text>

            <View className="mt-auto">
                <Text className="text-[15px] font-black text-red-600">{product.price}</Text>
                <Text className="text-[10px] text-gray-400 line-through">{product.originalPrice}</Text>

                {/* Progress Bar */}
                <View className="mt-2 space-y-1">
                    <View className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <View
                            className="h-full bg-orange-500 rounded-full"
                            style={{ width: `${product.soldPercentage}%` }}
                        />
                    </View>
                    <View className="flex-row justify-between items-center">
                        <Text className="text-[9px] font-bold text-gray-400 uppercase">
                            Đã bán {product.soldPercentage}%
                        </Text>
                        {product.isHot && (
                            <Text className="text-[9px] font-black text-red-500 italic">🔥 Sắp hết</Text>
                        )}
                    </View>
                </View>
            </View>
        </View>

        {/* Floating Cart Button (hidden by default in some designs, but shown here for accessibility) */}
        {/* <View className="absolute bottom-12 right-2 bg-red-500 rounded-full p-2 shadow-lg">
            <MaterialCommunityIcons name="cart-plus" size={16} color="white" />
        </View> */}
    </TouchableOpacity>
);
