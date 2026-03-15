import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

export default function ARCameraScreen() {
    const navigation = useNavigation<any>();

    return (
        <SafeAreaView className="flex-1 bg-black">
            <View className="flex-row justify-between items-center px-4 py-2 absolute top-10 w-full z-10">
                <TouchableOpacity onPress={() => navigation.goBack()} className="w-10 h-10 bg-black/40 rounded-full items-center justify-center backdrop-blur-md border border-white/20">
                    <Feather name="x" size={24} color="white" />
                </TouchableOpacity>
                <View className="bg-black/40 px-4 py-1.5 rounded-full backdrop-blur-md border border-white/20">
                    <Text className="text-white font-bold text-xs uppercase tracking-wider">AR Scan Mode</Text>
                </View>
                <TouchableOpacity className="w-10 h-10 bg-black/40 rounded-full items-center justify-center backdrop-blur-md border border-white/20">
                    <MaterialCommunityIcons name="flash" size={24} color="white" />
                </TouchableOpacity>
            </View>

            <View className="flex-1 items-center justify-center relative">
                <View className="absolute w-full h-full bg-gray-900 items-center justify-center overflow-hidden">
                    <MaterialCommunityIcons name="camera-iris" size={160} color="#1D52F1" style={{ opacity: 0.1 }} />
                    <View className="absolute inset-0 border-2 border-[#1D52F1]/30 m-8 rounded-3xl" />
                    
                    {/* Scanning Area Outline */}
                    <View className="w-64 h-64 relative">
                        <View className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-xl" />
                        <View className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-xl" />
                        <View className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-xl" />
                        <View className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-xl" />
                        <View className="absolute top-1/2 -left-16 w-[150%] h-[2px] bg-green-400 shadow-[0_0_10px_2px_rgba(74,222,128,0.5)]" />
                    </View>
                </View>
            </View>

            <View className="absolute bottom-0 w-full p-8 pb-12 items-center bg-black/40 backdrop-blur-xl">
                <Text className="text-white font-medium text-center mb-6 text-sm">Hướng camera vào hộp thuốc để nhận dạng tự động</Text>
                <TouchableOpacity className="w-20 h-20 bg-white/20 rounded-full items-center justify-center p-1 border-2 border-white">
                    <View className="w-full h-full bg-white rounded-full items-center justify-center">
                        <View className="w-16 h-16 bg-[#1D52F1] rounded-full" />
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
