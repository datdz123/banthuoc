import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, SafeAreaView, Platform, StatusBar } from 'react-native';
import { Entypo, MaterialCommunityIcons, AntDesign, FontAwesome5 } from '@expo/vector-icons';
import HomeHeader from '../../components/HomeHeader';

export default function HomeScreen() {
    return (
        <View className="flex-1 bg-[#F5F7FA]">
            {Platform.OS === 'ios' && <StatusBar barStyle="light-content" backgroundColor="#1D52F1" />}

            <HomeHeader />

            <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
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

                {/* Services Grid */}
                <View className="flex-row justify-between mt-5">
                    <ServiceItem icon="pill" title="Cần mua thuốc" color="#1D52F1" />
                    <ServiceItem icon="human-baby-board-cradle" title="Mẹ và bé" color="#F0712E" badge="MỚI" />
                    <ServiceItem icon="needle" title="Tiêm vắc xin" color="#1D52F1" />
                    <ServiceItem icon="clipboard-text" title="Đơn của tôi" color="#1D52F1" />
                    <ServiceItem icon="map-marker" title="Tìm nhà thuốc" color="#1D52F1" />
                </View>

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
                        <Text className="text-white text-3xl font-[Cursive] font-black italic shadow-sm">Siêu deal đón Tết</Text>
                        <TouchableOpacity className="bg-[#FFD700] rounded-full px-6 py-1.5 mt-2">
                            <Text className="text-[#D82E29] font-bold text-sm">XEM NGAY</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const ServiceItem = ({ icon, title, color, badge }: any) => (
    <View className="items-center w-[65px]">
        <View className="w-[50px] h-[50px] bg-white rounded-xl shadow-sm justify-center items-center relative mb-2 border border-[#EFEFEF]">
            <MaterialCommunityIcons name={icon} size={28} color={color} />
            {badge && (
                <View className="absolute -top-1 -right-2 bg-red-500 rounded-full px-1 py-0.5 border-2 border-white">
                    <Text className="text-white text-[8px] font-bold">{badge}</Text>
                </View>
            )}
        </View>
        <Text className="text-xs text-[#1A1A1A] text-center font-medium leading-tight">{title}</Text>
    </View>
);
