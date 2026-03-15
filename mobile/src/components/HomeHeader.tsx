import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, SafeAreaView, Platform, StatusBar } from 'react-native';
import { Entypo, MaterialCommunityIcons, AntDesign, FontAwesome5 } from '@expo/vector-icons';
import HomeMenu from './HomeMenu';
import { Image } from 'expo-image';
import { useSettings } from '../hooks/useSettings';

export default function HomeHeader() {
    const [menuVisible, setMenuVisible] = useState(false);
    const { data: settings } = useSettings();
    const logoUrl = settings?.data?.logo_url;
    const siteName = settings?.data?.site_name || "NHÀ THUỐC";

    // Typewriter effect logic
    const placeholders = [
        "Tìm tên thuốc...",
        "Tìm triệu chứng bệnh lý...",
        "Tìm thực phẩm chức năng...",
        "Tìm dược mỹ phẩm..."
    ];
    const [index, setIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [reverse, setReverse] = useState(false);

    useEffect(() => {
        if (subIndex === placeholders[index].length + 1 && !reverse) {
            const timeout = setTimeout(() => setReverse(true), 1500);
            return () => clearTimeout(timeout);
        }

        if (subIndex === 0 && reverse) {
            setReverse(false);
            setIndex((prev) => (prev + 1) % placeholders.length);
            return;
        }

        const timeout = setTimeout(() => {
            setSubIndex((prev) => prev + (reverse ? -1 : 1));
        }, reverse ? 40 : 80);

        return () => clearTimeout(timeout);
    }, [subIndex, index, reverse]);

    const placeholderText = placeholders[index].substring(0, subIndex);

    return (
        <View className="bg-[#1D52F1] pb-3" style={{ paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 40 }}>
            <HomeMenu visible={menuVisible} onClose={() => setMenuVisible(false)} />

            {/* Top Row */}
            <View className="flex-row justify-between items-center px-4 py-2">
                <TouchableOpacity onPress={() => setMenuVisible(true)}>
                    <Entypo name="menu" size={28} color="white" />
                </TouchableOpacity>

                <View className="flex-row items-center">
                    {logoUrl ? (
                         <Image source={{ uri: logoUrl }} style={{ width: 44, height: 44, marginRight: 8 }} contentFit="contain" />
                    ) : (
                         <MaterialCommunityIcons name="medical-bag" size={24} color="#F0712E" className="mr-2" />
                    )}
                    <View className="justify-center">
                        <Text className="text-white text-base font-black tracking-wider uppercase">{siteName}</Text>
                    </View>
                </View>

                <TouchableOpacity>
                    <MaterialCommunityIcons name="bell" size={24} color="white" />
                    <View className="absolute top-0 right-0 bg-red-500 w-2.5 h-2.5 rounded-full border border-[#1D52F1]" />
                </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <View className="px-4 mt-2">
                <View className="bg-white rounded-full flex-row items-center px-4 py-2.5">
                    <TextInput
                        placeholder={placeholderText}
                        className="flex-1 text-sm text-[#1A1A1A] py-1"
                        placeholderTextColor="#8A92A6"
                    />
                    <TouchableOpacity className="mx-2">
                        <MaterialCommunityIcons name="microphone" size={22} color="#1D52F1" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <MaterialCommunityIcons name="line-scan" size={22} color="#1D52F1" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Banner Link */}
            <View className="flex-row items-center px-4 mt-3">
                <AntDesign name="search" size={14} color="white" />
                <Text className="text-white text-xs ml-2">
                    Trung tâm tiêm chủng {siteName} <Text className="underline font-bold">Tìm hiểu ngay</Text>
                </Text>
            </View>
        </View>
    );
}
