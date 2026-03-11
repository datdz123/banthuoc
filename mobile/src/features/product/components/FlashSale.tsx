import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Platform, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { useUIStore } from '../../../store/useUIStore';
import { useNavigation } from '@react-navigation/native';

import { useProducts, Product } from '../api/productApi';

export default function FlashSale() {
    const { data: products } = useProducts({ limit: 4 });
    const flashSaleData = products?.slice(0, 4) || [];
    const pulseAnim = React.useRef(new Animated.Value(1)).current;
    const scrollX = React.useRef(new Animated.Value(0)).current;
    const [timeLeft, setTimeLeft] = useState({ hours: 3, minutes: 44, seconds: 11 });

    const CARD_WIDTH = 160;
    const GAP = 12;
    const SNAP_INTERVAL = CARD_WIDTH + GAP;

    useEffect(() => {
        Animated.loop(Animated.sequence([Animated.timing(pulseAnim, { toValue: 1.2, duration: 1000, useNativeDriver: true }), Animated.timing(pulseAnim, { toValue: 1, duration: 1000, useNativeDriver: true })])).start();
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                let { hours, minutes, seconds } = prev;
                if (seconds > 0) seconds--;
                else if (minutes > 0) { minutes--; seconds = 59; }
                else if (hours > 0) { hours--; minutes = 59; seconds = 59; }
                return { hours, minutes, seconds };
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatNum = (num: number) => num.toString().padStart(2, '0');

    return (
        <LinearGradient colors={['#EF4444', '#F97316']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} className="mt-6 rounded-2xl p-4 relative overflow-hidden shadow-xl">
            <View className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" style={{ opacity: 0.2 }} />
            <View className="flex-row justify-between items-center mb-4">
                <View className="flex-row items-center gap-3">
                    <Animated.View style={{ transform: [{ scale: pulseAnim }] }} className="w-10 h-10 bg-yellow-400 rounded-xl items-center justify-center shadow-lg">
                        <MaterialCommunityIcons name="lightning-bolt" size={24} color="#DC2626" />
                    </Animated.View>
                    <View>
                        <Text className="text-white font-black text-xl tracking-tighter uppercase italic">Flash Sale</Text>
                        <View className="flex-row items-center gap-2 mt-1">
                            <Text className="text-white/80 text-[10px] font-bold uppercase tracking-widest">Kết thúc sau</Text>
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

            <Animated.ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: GAP, paddingRight: 20 }} snapToInterval={SNAP_INTERVAL} decelerationRate="fast" onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })} scrollEventThrottle={16}>
                {flashSaleData.map((product) => (
                    <ProductCard key={product.id} product={product} width={CARD_WIDTH} />
                ))}
            </Animated.ScrollView>

            <View className="flex-row justify-center items-center gap-1.5 mt-5">
                {flashSaleData.map((_, i) => (
                    <Animated.View key={i} style={{ width: scrollX.interpolate({ inputRange: [(i - 1) * SNAP_INTERVAL, i * SNAP_INTERVAL, (i + 1) * SNAP_INTERVAL], outputRange: [6, 20, 6], extrapolate: 'clamp' }), opacity: scrollX.interpolate({ inputRange: [(i - 1) * SNAP_INTERVAL, i * SNAP_INTERVAL, (i + 1) * SNAP_INTERVAL], outputRange: [0.4, 1, 0.4], extrapolate: 'clamp' }), height: 6, borderRadius: 3, backgroundColor: 'white' }} />
                ))}
            </View>
        </LinearGradient>
    );
}

const TimeBox = ({ value }: { value: string }) => (
    <View className="bg-white rounded-md px-1.5 py-0.5 min-w-[24px] items-center">
        <Text className="text-red-600 font-black text-xs">{value}</Text>
    </View>
);

const ProductCard = ({ product, width }: { product: Product, width: number }) => {
    const showLoginModal = useUIStore(state => state.showLoginModal);
    const navigation = useNavigation<any>();

    const imageUri = product.images?.[0] || 'https://via.placeholder.com/150';
    const hasDiscount = product.cost_price > product.retail_price;
    const priceStr = `${product.retail_price?.toLocaleString('vi-VN')}đ`;
    const originalPriceStr = hasDiscount ? `${product.cost_price?.toLocaleString('vi-VN')}đ` : '';
    const soldPercentage = Math.floor(Math.random() * 50) + 40; // mock sold logic

    return (
        <TouchableOpacity
            style={{ width }}
            className="bg-white rounded-2xl p-2 relative shadow-sm border border-white/60"
            activeOpacity={0.9}
            onPress={() => navigation.navigate('ProductDetail', { productSlug: product.slug })}
        >
            {hasDiscount && (
                <View className="absolute top-2 left-2 z-10 bg-red-500 rounded-lg px-2 py-0.5">
                    <Text className="text-white text-[10px] font-black">GIẢM GIÁ</Text>
                </View>
            )}
            <View className="w-full aspect-square rounded-xl overflow-hidden mb-2">
                <Image source={{ uri: imageUri }} className="w-full h-full" resizeMode="cover" />
            </View>
            <View className="px-1">
                <Text className="text-[12px] text-gray-800 font-bold leading-tight h-[32px]" numberOfLines={2}>{product.name}</Text>
                <Text className="text-[10px] text-gray-400 mt-0.5 mb-1">{product.unit || 'Hộp'}</Text>
                <View className="mt-auto">
                    <Text className="text-[15px] font-black text-red-600">{priceStr}</Text>
                    {hasDiscount && <Text className="text-[10px] text-gray-400 line-through">{originalPriceStr}</Text>}
                    <View className="mt-2 space-y-1">
                        <View className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <View className="h-full bg-orange-500 rounded-full" style={{ width: `${soldPercentage}%` }} />
                        </View>
                        <View className="flex-row justify-between items-center">
                            <Text className="text-[9px] font-bold text-gray-400 uppercase">Đã bán {soldPercentage}%</Text>
                            {soldPercentage > 80 && <Text className="text-[9px] font-black text-red-500 italic">🔥 Sắp hết</Text>}
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};
