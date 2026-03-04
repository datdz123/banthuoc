import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, LayoutAnimation, Platform, UIManager } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

interface Category {
    id: string;
    name: string;
    icon: string;
    productCount: number;
}

const CATEGORIES_DATA: Category[] = [
    { id: '1', name: 'Thần kinh não', icon: 'brain', productCount: 59 },
    { id: '2', name: 'Vitamin & Khoáng chất', icon: 'pill', productCount: 80 },
    { id: '3', name: 'Tim mạch - Huyết áp', icon: 'heart-pulse', productCount: 23 },
    { id: '4', name: 'Miễn dịch - Đề kháng', icon: 'shield-check', productCount: 53 },
    { id: '5', name: 'Tiêu hóa', icon: 'stomach', productCount: 83 },
    { id: '6', name: 'Sinh lý - Nội tiết tố', icon: 'gender-male-female', productCount: 45 },
    { id: '7', name: 'Hỗ trợ hô hấp', icon: 'lungs', productCount: 30 },
    { id: '8', name: 'Cơ xương khớp', icon: 'bone', productCount: 120 },
    { id: '9', name: 'Chăm sóc mắt', icon: 'eye', productCount: 15 },
    { id: '10', name: 'Hỗ trợ gan', icon: 'medication', productCount: 42 },
];

export default function FeaturedCategories() {
    const [isExpanded, setIsExpanded] = useState(false);

    const initialItems = 6;
    const itemsToShow = isExpanded ? CATEGORIES_DATA : CATEGORIES_DATA.slice(0, initialItems);
    const remainingCount = CATEGORIES_DATA.length - initialItems;

    const toggleExpand = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsExpanded(!isExpanded);
    };

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

const CategoryCard = ({ category }: { category: Category }) => (
    <TouchableOpacity
        className="w-[48.5%] bg-white rounded-xl p-4 mb-3 items-center border border-[#EFEFEF]"
        activeOpacity={0.7}
    >
        <View className="w-12 h-12 justify-center items-center mb-3">
            <MaterialCommunityIcons name={category.icon as any} size={36} color="#1D52F1" />
        </View>
        <Text className="text-[#1A1A1A] text-[13px] font-bold text-center" numberOfLines={1}>
            {category.name}
        </Text>
        <Text className="text-[#8A92A6] text-[11px] mt-1">
            Có {category.productCount} sản phẩm
        </Text>
    </TouchableOpacity>
);
