import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSettings } from '../../../hooks/useSettings';

export default function ChatBanner() {
    const { data: settings } = useSettings();
    const siteName = settings?.data?.site_name || "Nhà thuốc";
    return (
        <View className="px-4 mt-4">
            <View className="w-full h-[90px] rounded-xl overflow-hidden relative">
                <View className="absolute inset-0 bg-[#1D52F1]" />

                <View className="flex-row items-center justify-between px-4 h-full">
                    <View className="bg-white rounded-full w-[60px] h-[60px] justify-center flex-row items-center gap-1 rounded-bl-sm shadow-sm">
                        <View className="w-2.5 h-2.5 bg-[#1D52F1] rounded-full" />
                        <View className="w-2.5 h-2.5 bg-[#1D52F1] rounded-full" />
                        <View className="w-2.5 h-2.5 bg-[#1D52F1] rounded-full" />
                    </View>
                    <View className="flex-1 ml-4 justify-center">
                        <Text className="text-white text-[15px] font-bold mb-2">Chat với Dược sĩ {siteName}</Text>
                        <TouchableOpacity className="bg-white rounded-full self-start px-4 py-1">
                            <Text className="text-[#1D52F1] text-xs font-bold">Chat ngay</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}
