import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useArticles } from '../../../api/articleApi';

export default function HealthCorner() {
    // Chỉ lấy 3 bài viết mới nhất ra trang chủ
    const { data: articles, isLoading } = useArticles({ limit: 3 });
    const displayArticles = articles?.slice(0, 3) || [];

    return (
        <View className="mt-8 px-4">
            <View className="flex-row justify-between items-center mb-4">
                <Text className="text-xl font-bold text-[#1A1A1A]">Góc sức khỏe</Text>
                <TouchableOpacity>
                    <Text className="text-[#1D52F1] font-bold">Xem tất cả</Text>
                </TouchableOpacity>
            </View>

            <View className="gap-y-4">
                {isLoading ? (
                    <Text className="text-gray-500">Đang tải...</Text>
                ) : displayArticles.length > 0 ? (
                    displayArticles.map((article) => (
                        <TouchableOpacity key={article.id} className="flex-row items-center">
                            <Image
                                source={{ uri: article.thumbnail || 'https://duocnamviet.site/images/placeholder.png' }}
                                className="w-[120px] h-[85px] rounded-xl bg-gray-200"
                                resizeMode="cover"
                            />
                            <View className="flex-1 ml-4 justify-center">
                                <Text className="text-[#1D52F1] text-[13px] font-bold mb-1 uppercase">
                                    {article.category?.replace(/-/g, ' ') || 'Sức khỏe'}
                                </Text>
                                <Text className="text-[#1A1A1A] text-sm font-bold leading-tight" numberOfLines={3}>
                                    {article.title}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))
                ) : (
                    <Text className="text-gray-500 text-sm">Chưa có bài viết nào.</Text>
                )}
            </View>
        </View>
    );
}
