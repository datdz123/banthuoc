import React, { useEffect } from 'react';
import { View, Text, Image, StatusBar, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

export default function SplashScreen() {
    const navigation = useNavigation<any>();
    const fadeAnim = React.useRef(new Animated.Value(0)).current;
    const scaleAnim = React.useRef(new Animated.Value(0.9)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 4,
                useNativeDriver: true,
            })
        ]).start();

        const timer = setTimeout(() => {
            navigation.replace('MainTabs');
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View className="flex-1">
            <StatusBar barStyle="light-content" backgroundColor="#1D52F1" />
            <LinearGradient
                colors={['#1D52F1', '#1742C1']}
                className="flex-1 items-center justify-center px-10"
            >
                <Animated.View
                    style={{
                        opacity: fadeAnim,
                        transform: [{ scale: scaleAnim }]
                    }}
                    className="items-center"
                >
                    {/* Logo Area */}
                    <View className="flex-row items-center mb-10">
                        <View className="flex-row items-center gap-1 mr-3">
                            <View className="w-4 h-8 bg-blue-800 rounded-sm rotate-12" />
                            <View className="w-4 h-10 bg-orange-500 rounded-sm -rotate-6" />
                            <View className="w-4 h-8 bg-green-500 rounded-sm rotate-12" />
                        </View>
                        <View>
                            <Text className="text-white text-sm font-medium tracking-tight">FPT Retail</Text>
                            <Text className="text-white text-2xl font-black uppercase tracking-tighter">NHÀ THUỐC</Text>
                            <Text className="text-white text-3xl font-black uppercase tracking-tighter -mt-2">LONG CHÂU</Text>
                        </View>
                    </View>

                    {/* Features Area */}
                    <View className="flex-row justify-between w-full mt-10">
                        <FeatureIcon icon="truck-fast" label="Miễn phí\nvận chuyển" />
                        <FeatureIcon icon="medal-outline" label="Số 1\nthuốc kê đơn" />
                        <FeatureIcon icon="clock-fast" label="Giao nhanh\ntrong 1 giờ" />
                    </View>
                </Animated.View>

                {/* Loading Indicator Placeholder */}
                <View className="absolute bottom-20 items-center">
                    <View className="w-12 h-1 bg-white/30 rounded-full overflow-hidden">
                        <Animated.View
                            className="h-full bg-white"
                            style={{
                                width: '100%',
                                transform: [{
                                    translateX: fadeAnim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [-50, 0]
                                    })
                                }]
                            }}
                        />
                    </View>
                </View>
            </LinearGradient>
        </View>
    );
}

const FeatureIcon = ({ icon, label }: { icon: string, label: string }) => (
    <View className="items-center w-1/3">
        <View className="bg-white/20 p-3 rounded-full mb-2">
            <MaterialCommunityIcons name={icon as any} size={24} color="white" />
        </View>
        <Text className="text-white text-[10px] text-center font-bold leading-tight">
            {label.replace('\\n', '\n')}
        </Text>
    </View>
);
