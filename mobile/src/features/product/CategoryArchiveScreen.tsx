import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, ActivityIndicator, Platform, Dimensions } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useCategories, Category } from './api/productApi';
import HomeHeader from '../../components/HomeHeader';
import AppFooter from '../../components/AppFooter';

const { width } = Dimensions.get('window');

export default function CategoryArchiveScreen() {
    const route = useRoute();
    
    // Default active category ID passed from route
    const initialCategoryId = (route.params as any)?.categoryId;
    
    const [activeCategoryId, setActiveCategoryId] = useState<number | null>(initialCategoryId || null);

    const { data: allCategories = [], isLoading } = useCategories();

    // Group categories into parent and children based on parent_id
    // If the API does not strictly have parent_id relations for these mock data, 
    // we will treat categories without parent_id as root.
    const rootCategories = useMemo(() => {
        return allCategories.filter(c => !c.parent_id);
    }, [allCategories]);

    const getSubCategories = (parentId: number) => {
        const subs = allCategories.filter(c => c.parent_id === parentId);
        // Fallback: If no subs found in mock data, create some dummy subs to visualize the design!
        if (subs.length === 0) {
            const currentCat = allCategories.find(c => c.id === parentId);
            return [
                { id: parentId * 100 + 1, name: `${currentCat?.name} - Loại 1`, icon: '💊' },
                { id: parentId * 100 + 2, name: `${currentCat?.name} - Loại 2`, icon: '💉' },
                { id: parentId * 100 + 3, name: `${currentCat?.name} - Loại 3`, icon: '🏥' },
                { id: parentId * 100 + 4, name: `${currentCat?.name} - Loại 4`, icon: '🛡️' },
            ];
        }
        return subs;
    };

    // Auto-select first category if no initial provided and data loaded
    useEffect(() => {
        if (!activeCategoryId && rootCategories.length > 0) {
            setActiveCategoryId(rootCategories[0].id);
        }
    }, [rootCategories, activeCategoryId]);

    // Active items to display on the right
    const activeSubCategories = useMemo(() => {
        if (!activeCategoryId) return [];
        return getSubCategories(activeCategoryId);
    }, [activeCategoryId, allCategories]);

    return (
        <View className="flex-1 bg-[#F5F7FA]">
            {/* Global Header */}
            <HomeHeader />

            {isLoading ? (
                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#1D52F1" />
                </View>
            ) : (
                <ScrollView 
                    className="flex-1"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 20 }}
                >
                    {/* Top Horizontal Categories */}
                    <View className="bg-white py-3 pl-4 border-b border-[#E8ECEF]">
                        <ScrollView 
                            horizontal 
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ paddingRight: 16 }}
                        >
                            {rootCategories.map((category: Category) => {
                                const isActive = activeCategoryId === category.id;
                                return (
                                    <TouchableOpacity
                                        key={category.id}
                                        onPress={() => setActiveCategoryId(category.id)}
                                        className={`mr-3 px-4 py-2 rounded-full border ${
                                            isActive 
                                                ? 'bg-blue-50 border-[#1D52F1]' 
                                                : 'bg-[#F4F6F9] border-transparent'
                                        }`}
                                    >
                                        <Text 
                                            className={`${
                                                isActive ? 'text-[#1D52F1] font-bold' : 'text-[#4A4A4A] font-medium'
                                            } text-[13px]`}
                                        >
                                            {category.name}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </ScrollView>
                    </View>

                    {/* Right Content Area (Subcategories) -> Now Below */}
                    <View className="p-4">
                        <Text className="text-[#1A1A1A] font-bold text-base mb-4">
                            {allCategories.find(c => c.id === activeCategoryId)?.name || 'Khám phá'}
                        </Text>

                        <View className="flex-row flex-wrap" style={{ gap: '2%' }}>
                            {activeSubCategories.map((sub: any) => (
                                <TouchableOpacity
                                    key={sub.id}
                                    activeOpacity={0.8}
                                    className="w-[32%] bg-white rounded-2xl mb-4 p-3 shadow-sm items-center border border-[#E9ECEF]"
                                    style={{
                                        shadowColor: '#1D52F1',
                                        shadowOffset: { width: 0, height: 4 },
                                        shadowOpacity: 0.04,
                                        shadowRadius: 10,
                                        elevation: 2,
                                    }}
                                >
                                    <View className="w-12 h-12 bg-indigo-50/60 rounded-full mb-2 justify-center items-center">
                                        {sub.icon ? (
                                            <Text className="text-[24px]">{sub.icon}</Text>
                                        ) : (
                                            <MaterialCommunityIcons name="pill" size={24} color="#1D52F1" />
                                        )}
                                    </View>
                                    <Text className="text-[#1A1A1A] font-bold text-[11px] text-center" numberOfLines={2}>
                                        {sub.name}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {activeSubCategories.length === 0 && (
                            <View className="items-center justify-center py-10 opacity-60">
                                <MaterialCommunityIcons name="folder-open-outline" size={48} color="#9BA4B5" />
                                <Text className="text-[#9BA4B5] mt-3 font-medium">Chưa có danh mục con</Text>
                            </View>
                        )}
                    </View>

                    {/* Global Footer */}
                    <View className="mt-4">
                        <AppFooter />
                    </View>
                </ScrollView>
            )}
        </View>
    );
}
