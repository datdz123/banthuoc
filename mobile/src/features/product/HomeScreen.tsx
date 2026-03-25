import React from 'react';
import { View, ScrollView, Platform, StatusBar } from 'react-native';
import HomeHeader from '../../components/HomeHeader';
import AppFooter from '../../components/AppFooter';

// Feature Components
import FlashSale from './components/FlashSale';
import FeaturedCategories from './components/FeaturedCategories';
import MainSlider from './components/MainSlider';
import BestSellers from './components/BestSellers';
import WelcomeSection from './components/WelcomeSection';
import ChatBanner from './components/ChatBanner';
import ServicesSlider from './components/ServicesSlider';
import PromoBanners from './components/PromoBanners';
import HealthCorner from './components/HealthCorner';
import HealthTopics from './components/HealthTopics';
import FeaturedProducts from './components/FeaturedProducts';

export default function HomeScreen() {
    return (
        <View className="flex-1 bg-[#F1F3F9]">
            {Platform.OS === 'ios' && <StatusBar barStyle="light-content" backgroundColor="#1D52F1" />}

            <HomeHeader />

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                {/* Lời chào & Đơn hàng */}
                <WelcomeSection />

                {/* Banner Chat Dược sĩ */}
                <ChatBanner />

                {/* Menu dịch vụ slide */}
                <ServicesSlider />

                {/* Slider chính (Banner quảng cáo) */}
                <View className="px-4 mt-5">
                    <MainSlider />
                </View>

                <View className="px-4">
                    {/* Flash Sale */}
                    <FlashSale />

                    {/* Danh mục nổi bật */}
                    <FeaturedCategories />

                    {/* Sản phẩm bán chạy */}
                    <BestSellers />

                    {/* Sản phẩm nổi bật */}
                    <FeaturedProducts />
                </View>

                {/* Góc sức khỏe */}
                <HealthCorner />

                {/* Chủ đề sức khỏe (Mới) */}
                <HealthTopics />

                <View className="px-4">
                    {/* Banner khuyến mãi */}
                    <PromoBanners />
                </View>

                {/* Chân trang */}
                <AppFooter />
            </ScrollView>
        </View>
    );
}
