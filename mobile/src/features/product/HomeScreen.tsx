import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, SafeAreaView, Platform, StatusBar, Animated } from 'react-native';
import { Entypo, MaterialCommunityIcons, AntDesign, FontAwesome5 } from '@expo/vector-icons';
import HomeHeader from '../../components/HomeHeader';
import FlashSale from './components/FlashSale';
import FeaturedCategories from './components/FeaturedCategories';
import MainSlider from './components/MainSlider';
import BestSellers from './components/BestSellers';

const SERVICES_DATA = [
    { icon: 'pill', title: 'Cần mua thuốc', color: '#1D52F1' },
    { icon: 'human-baby-board-cradle', title: 'Mẹ và bé', color: '#F0712E', badge: 'MỚI' },
    { icon: 'needle', title: 'Tiêm vắc xin', color: '#1D52F1' },
    { icon: 'clipboard-text', title: 'Đơn của tôi', color: '#1D52F1' },
    { icon: 'map-marker', title: 'Tìm nhà thuốc', color: '#1D52F1' },
    { icon: 'clock-outline', title: 'Nhắc uống thuốc', color: '#1D52F1' },
    { icon: 'heart-pulse', title: 'Kiểm tra sức khỏe', color: '#1D52F1' },
    { icon: 'camera-outline', title: 'AR Camera', color: '#1D52F1' },
];

export default function HomeScreen() {
    const scrollX = React.useRef(new Animated.Value(0)).current;
    const [containerWidth, setContainerWidth] = React.useState(0);
    const [contentWidth, setContentWidth] = React.useState(0);

    const indicatorWidth = 20; // Length of the blue indicator
    const scrollbarWidth = 40; // Total length of the track

    return (
        <View className="flex-1 bg-[#F1F3F9]">
            {Platform.OS === 'ios' && <StatusBar barStyle="light-content" backgroundColor="#1D52F1" />}

            <HomeHeader />

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                <View className="px-4">
                    {/* Welcome & Orders */}
                    <View className="flex-row justify-between items-center mt-5">
                        <View>
                            <Text className="text-[#8A92A6] text-xs">Chào mừng bạn đến với</Text>
                            <Text className="text-[#1A1A1A] text-sm font-bold mt-1">Nhà thuốc Long Châu</Text>
                        </View>
                        <TouchableOpacity className="flex-row items-center bg-white border border-[#EFEFEF] rounded-full px-3 py-1.5 shadow-sm">
                            <MaterialCommunityIcons name="clipboard-text-outline" size={16} color="#1D52F1" />
                            <Text className="text-[#1A1A1A] text-xs font-bold ml-2">Đơn của tôi</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Chat Banner */}
                    <View className="w-full h-[90px] rounded-xl overflow-hidden mt-4 relative">
                        <View className="absolute inset-0 bg-[#1D52F1]" /> {/* Background */}
                        <View className="flex-row items-center justify-between px-4 h-full">
                            <View className="bg-white rounded-full w-[60px] h-[60px] justify-center flex-row items-center gap-1 rounded-bl-sm">
                                <View className="w-2.5 h-2.5 bg-[#1D52F1] rounded-full" />
                                <View className="w-2.5 h-2.5 bg-[#1D52F1] rounded-full" />
                                <View className="w-2.5 h-2.5 bg-[#1D52F1] rounded-full" />
                            </View>
                            <View className="flex-1 ml-4 justify-center">
                                <Text className="text-white text-[15px] font-bold mb-2">Chat với Dược sĩ Long Châu</Text>
                                <TouchableOpacity className="bg-white rounded-full self-start px-4 py-1">
                                    <Text className="text-[#1D52F1] text-xs font-bold">Chat ngay</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Services Slide */}
                <View className="mt-5">
                    <Animated.ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        onContentSizeChange={(w) => setContentWidth(w)}
                        onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                            { useNativeDriver: false }
                        )}
                        scrollEventThrottle={16}
                        contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}
                    >
                        {SERVICES_DATA.map((item, index) => (
                            <ServiceItem key={index} {...item} />
                        ))}
                    </Animated.ScrollView>

                    {/* Custom Scroll Indicator */}
                    <View className="items-center mt-3">
                        <View
                            style={{ width: scrollbarWidth }}
                            className="h-[6px] bg-white rounded-full overflow-hidden"
                        >
                            <Animated.View
                                style={{
                                    width: indicatorWidth,
                                    height: '100%',
                                    backgroundColor: '#1D52F1',
                                    borderRadius: 3,
                                    transform: [{
                                        translateX: scrollX.interpolate({
                                            inputRange: [0, (contentWidth - containerWidth) || 1],
                                            outputRange: [0, scrollbarWidth - indicatorWidth],
                                            extrapolate: 'clamp'
                                        })
                                    }]
                                }}
                            />
                        </View>
                    </View>
                </View>

                {/* Main Image Slider */}
                <View className="px-4">
                    <MainSlider />
                </View>

                <View className="px-4 pb-10">
                    {/* Flash Sale */}
                    <FlashSale />

                    {/* Featured Categories */}
                    <FeaturedCategories />

                    {/* Best Sellers */}
                    <BestSellers />

                    {/* Promo Banner 1 */}
                    <View className="w-full h-[180px] rounded-xl overflow-hidden mt-6 bg-[#2167F5]">
                        {/* Placeholder for Promo Banner */}
                        <View className="p-4 items-center">
                            <View className="border border-white rounded-full px-4 py-1 mb-2">
                                <Text className="text-white font-bold text-xs">durex</Text>
                            </View>
                            <Text className="text-[#FFD700] text-lg font-bold text-center">Năm mới bắn như pháo</Text>
                            <Text className="text-white text-2xl font-black text-center uppercase">Gieo duyên{'\n'}nhớ đeo bao</Text>

                            <TouchableOpacity className="bg-[#00E5FF] rounded-full px-6 py-2 mt-4 flex-row items-center">
                                <MaterialCommunityIcons name="cart-outline" size={16} color="#1A1A1A" />
                                <Text className="text-[#1A1A1A] font-bold text-xs ml-1">Mua ngay</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Promo Banner 2 */}
                    <View className="w-full h-[120px] rounded-xl overflow-hidden mt-4 bg-[#FF4081] mb-10">
                        {/* Placeholder for Promo Banner */}
                        <View className="p-4 justify-center items-center h-full">
                            <Text className="text-white text-3xl font-black italic shadow-sm">Siêu deal đón Tết</Text>
                            <TouchableOpacity className="bg-[#FFD700] rounded-full px-6 py-1.5 mt-2">
                                <Text className="text-[#D82E29] font-bold text-sm">XEM NGAY</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const ServiceItem = ({ icon, title, color, badge }: any) => (
    <TouchableOpacity className="items-center w-[72px] bg-white rounded-2xl p-2  border border-white relative">
        <View className="w-[42px] h-[42px] justify-center items-center mb-1">
            <MaterialCommunityIcons name={icon} size={28} color={color} />
            {badge && (
                <View className="absolute -top-1 -right-2 bg-[#EF4444] rounded-full px-1.5 py-0.5 border-2 border-white">
                    <Text className="text-white text-[7px] font-black">{badge}</Text>
                </View>
            )}
        </View>
        <Text className="text-[10px] text-[#1A1A1A] text-center font-bold leading-tight h-[28px]" numberOfLines={2}>
            {title}
        </Text>
    </TouchableOpacity>
);
