import React, { useState } from 'react';
import { View, Text, TouchableOpacity, LayoutAnimation, Platform, UIManager, ActivityIndicator } from 'react-native';
import { useCategories, Category } from '../../../api/productApi';
import { useNavigation } from '@react-navigation/native';

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

export default function FeaturedCategories() {
    const [isExpanded, setIsExpanded] = useState(false);
    const { data: categories = [], isLoading } = useCategories();

    const initialItems = 6;
    const itemsToShow = isExpanded ? categories : categories.slice(0, initialItems);
    const remainingCount = categories.length - initialItems;

    const toggleExpand = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsExpanded(!isExpanded);
    };

    if (isLoading) {
        return (
            <View className="mt-8 items-center py-4">
                <ActivityIndicator size="small" color="#1D52F1" />
            </View>
        );
    }

    if (!categories || categories.length === 0) {
        return null;
    }

    return (
        <View className="mt-8">
            <Text className="text-[#1A1A1A] text-lg font-bold mb-4">Danh mục nổi bật</Text>

            <View className="flex-row flex-wrap justify-between">
                {itemsToShow.map((item) => (
                    <CategoryCard key={item.id} category={item} />
                ))}
            </View>

            {remainingCount > 0 && (
                <TouchableOpacity
                    onPress={toggleExpand}
                    className="py-4 items-center"
                >
                    <Text className="text-[#1D52F1] font-bold text-sm">
                        {isExpanded
                            ? 'Thu gọn danh mục'
                            : `Xem thêm ${remainingCount} danh mục`
                        }
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

const CategoryCard = ({ category }: { category: Category }) => {
    const navigation = useNavigation<any>();
    
    return (
        <TouchableOpacity
            className="w-[48.5%] bg-white rounded-xl p-4 mb-3 items-center border border-[#EFEFEF]"
            activeOpacity={0.7}
            onPress={() => navigation.navigate('MainTabs', { 
                screen: 'Category', 
                params: { categoryId: category.id } 
            })}
        >
            <View className="w-12 h-12 justify-center items-center mb-3 bg-blue-50/50 rounded-full">
                <Text className="text-[28px]">{category.icon || '🛍️'}</Text>
            </View>
            <Text className="text-[#1A1A1A] text-[13px] font-bold text-center" numberOfLines={2}>
                {category.name}
            </Text>
        </TouchableOpacity>
    );
};
