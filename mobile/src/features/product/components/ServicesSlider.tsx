import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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

export default function ServicesSlider() {
    const scrollX = React.useRef(new Animated.Value(0)).current;
    const [containerWidth, setContainerWidth] = React.useState(0);
    const [contentWidth, setContentWidth] = React.useState(0);

    const indicatorWidth = 20; // Length of the blue indicator
    const scrollbarWidth = 40; // Total length of the track

    return (
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
