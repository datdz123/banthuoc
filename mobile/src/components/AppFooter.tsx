import React from 'react';
import { View, Text, TouchableOpacity, Image, Linking } from 'react-native';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';

const AppFooter = () => {
    const features = [
        {
            icon: 'shield-check',
            title: 'Thuốc chính hãng',
            desc: 'đa dạng và chuyên sâu',
            color: '#1D52F1'
        },
        {
            icon: 'package-variant-closed',
            title: 'Đổi trả trong 30 ngày',
            desc: 'kể từ ngày mua hàng',
            color: '#1D52F1'
        },
        {
            icon: 'thumb-up',
            title: 'Cam kết 100%',
            desc: 'chất lượng sản phẩm',
            color: '#1D52F1'
        },
        {
            icon: 'truck-delivery',
            title: 'Miễn phí vận chuyển',
            desc: 'theo chính sách giao hàng',
            color: '#1D52F1'
        }
    ];

    return (
        <View className="bg-white pt-6">
            {/* Features Grid */}
            <View className="flex-row flex-wrap px-4 mb-8">
                {features.map((item, index) => (
                    <View key={index} className="w-1/2 items-center mb-6">
                        <View className="w-14 h-14 bg-[#EEF2FF] rounded-full justify-center items-center mb-2">
                            <MaterialCommunityIcons name={item.icon as any} size={28} color={item.color} />
                        </View>
                        <Text className="text-[#1A1A1A] text-sm font-bold text-center">{item.title}</Text>
                        <Text className="text-[#8A92A6] text-[10px] text-center">{item.desc}</Text>
                    </View>
                ))}
            </View>

            {/* Company Info Section */}
            <View className="bg-[#F8FAFC] px-5 pt-8 pb-24">
                <Text className="text-[#4A5568] text-[13px] leading-5 font-medium mb-4">
                    © 2007 - 2026 Công ty Cổ Phần Dược Phẩm FPT Long Châu Số ĐKKD 0315275368 cấp ngày 17/09/2018 tại Sở Kế hoạch Đầu tư TPHCM
                </Text>

                <Text className="text-[#4A5568] text-[13px] leading-5 mb-4 font-medium">
                    Địa chỉ: 379-381 Hai Bà Trưng, P. Xuân Hoà, TP. HCM.
                </Text>

                <View className="space-y-2 mb-6">
                    <View className="flex-row items-start mr-2">
                        <Text className="text-[#4A5568] text-[13px]">• </Text>
                        <Text className="text-[#4A5568] text-[13px]">Số điện thoại: </Text>
                        <TouchableOpacity onPress={() => Linking.openURL('tel:02873023456')}>
                            <Text className="text-[#1D52F1] text-[13px]">(028) 7302 3456</Text>
                        </TouchableOpacity>
                    </View>

                    <View className="flex-row items-start mr-2">
                        <Text className="text-[#4A5568] text-[13px]">• </Text>
                        <Text className="text-[#4A5568] text-[13px]">Email: </Text>
                        <TouchableOpacity onPress={() => Linking.openURL('mailto:sale@nhathuoclongchau.com.vn')}>
                            <Text className="text-[#1D52F1] text-[13px]">sale@nhathuoclongchau.com.vn</Text>
                        </TouchableOpacity>
                    </View>

                    <View className="flex-row items-start">
                        <Text className="text-[#4A5568] text-[13px]">• </Text>
                        <Text className="text-[#4A5568] text-[13px]">Người quản lý nội dung: Nguyễn Bạch Điệp</Text>
                    </View>
                </View>

                {/* Logo Bo Cong Thuong Placeholder */}
                <View className="items-center mb-8">
                    <View className="bg-[#0070B8] flex-row items-center px-3 py-1.5 rounded-md self-center">
                        <View className="bg-white rounded-full p-0.5 mr-2">
                            <MaterialCommunityIcons name="check-circle" size={12} color="#0070B8" />
                        </View>
                        <View>
                            <Text className="text-white text-[8px] font-bold uppercase tracking-widest leading-none">Đã thông báo</Text>
                            <Text className="text-white text-[9px] font-black uppercase leading-none">Bộ Công Thương</Text>
                        </View>
                    </View>
                </View>

                {/* Decoration Image/Illustration */}
                <View className="-mx-5 mt-4">
                    <Image
                        source={require('../../assets/images/footer_illustration.png')}
                        style={{ width: '100%', height: 250 }}
                        resizeMode="cover"
                    />
                    <View className="py-6 items-center bg-[#F8FAFC]">
                        <Text className="text-[#64748B] text-[10px] font-medium opacity-60">© Long Châu Pharmacy - Sức khỏe cho mọi nhà</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default AppFooter;
