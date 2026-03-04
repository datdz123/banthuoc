import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    Animated,
    ScrollView,
    Dimensions,
    Pressable,
    Platform,
    StatusBar,
    LayoutAnimation
} from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';

interface HomeMenuProps {
    visible: boolean;
    onClose: () => void;
}

const { width } = Dimensions.get('window');
const DRAWER_WIDTH = width * 0.85;

const MENU_DATA = [
    {
        title: 'Thực phẩm chức năng',
        hasSub: true,
        subItems: ['Hỗ trợ tim mạch', 'Hỗ trợ tiêu hóa', 'Vitamin & khoáng chất', 'Thảo dược/Trị liệu']
    },
    {
        title: 'Dược mỹ phẩm',
        hasSub: true,
        subItems: ['Sửa rửa mặt', 'Kem chống nắng', 'Tẩy trang', 'Chăm sóc tóc']
    },
    {
        title: 'Thuốc',
        hasSub: true,
        subItems: ['Thuốc giảm đau', 'Thuốc dạ dày', 'Thuốc đau họng', 'Kháng sinh']
    },
    {
        title: 'Chăm sóc cá nhân',
        hasSub: true,
        subItems: ['Chăm sóc cơ thể', 'Chăm sóc răng miệng', 'Sản phẩm cho nam']
    },
    {
        title: 'Thiết bị y tế',
        hasSub: true,
        subItems: ['Máy đo huyết áp', 'Máy đo đường huyết', 'Khẩu trang/Y tế']
    },
    { title: 'Tiêm chủng', hasSub: false },
    {
        title: 'Bệnh & Góc sức khỏe',
        hasSub: true,
        subItems: ['Bệnh tiểu đường', 'Bệnh dạ dày', 'Sức khỏe người già', 'Mẹo sống khỏe']
    },
    { title: 'Hệ thống nhà thuốc', hasSub: false },
];

export default function HomeMenu({ visible, onClose }: HomeMenuProps) {
    const [showModal, setShowModal] = useState(visible);
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const slideAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;

    useEffect(() => {
        if (visible) {
            setShowModal(true);
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(slideAnim, {
                toValue: -DRAWER_WIDTH,
                duration: 250,
                useNativeDriver: true,
            }).start(() => {
                setShowModal(false);
            });
        }
    }, [visible]);

    const toggleExpand = (index: number) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <Modal
            transparent
            visible={showModal}
            animationType="fade"
            onRequestClose={onClose}
        >
            <View className="flex-1 flex-row">
                {/* Backdrop Layer */}
                <Pressable
                    style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}
                    onPress={onClose}
                />

                {/* Drawer Content */}
                <Animated.View
                    style={{
                        transform: [{ translateX: slideAnim }],
                        width: DRAWER_WIDTH,
                        backgroundColor: '#ffffff'
                    }}
                    className="flex-1 h-full shadow-2xl"
                >
                    {/* Header */}
                    <View
                        className="bg-[#2F63F6]"
                        style={{ paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 45 }}
                    >
                        <View className="px-4 py-2 flex-row justify-end">
                            <TouchableOpacity onPress={onClose} className="p-1">
                                <AntDesign name="close" size={20} color="white" />
                            </TouchableOpacity>
                        </View>

                        <View className="px-5 pb-5">
                            <Text className="text-white text-[15px] font-bold leading-6 mb-4">
                                Đăng nhập để hưởng những đặc quyền dành riêng cho thành viên.
                            </Text>

                            <View className="flex-row">
                                <TouchableOpacity className="bg-white rounded-full px-5 py-2 mr-3 active:opacity-80">
                                    <Text className="text-[#2F63F6] font-semibold">Đăng nhập</Text>
                                </TouchableOpacity>

                                <TouchableOpacity className="bg-[#1D4ED8] rounded-full px-5 py-2 active:opacity-80">
                                    <Text className="text-white font-semibold">Đăng ký</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {/* Body (Scrollable List) */}
                    <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                        <View className="pt-2 pb-6">
                            {MENU_DATA.map((item, index) => (
                                <View key={index}>
                                    <TouchableOpacity
                                        onPress={() => item.hasSub ? toggleExpand(index) : null}
                                        className="px-5 py-4 flex-row justify-between items-center active:bg-gray-100"
                                    >
                                        <Text className="text-[#1A1A1A] font-bold text-[16px]">
                                            {item.title}
                                        </Text>
                                        {item.hasSub && (
                                            <Feather
                                                name={expandedIndex === index ? "chevron-up" : "chevron-down"}
                                                size={18}
                                                color="#5A5A5A"
                                            />
                                        )}
                                    </TouchableOpacity>

                                    {/* Sub Items */}
                                    {expandedIndex === index && item.hasSub && item.subItems && (
                                        <View className="bg-gray-50 pb-2">
                                            {item.subItems.map((sub, sIdx) => (
                                                <TouchableOpacity
                                                    key={sIdx}
                                                    className="pl-10 py-3 active:bg-blue-50"
                                                >
                                                    <Text className="text-[#4A4A4A] text-[15px]">
                                                        {sub}
                                                    </Text>
                                                </TouchableOpacity>
                                            ))}
                                        </View>
                                    )}
                                </View>
                            ))}
                        </View>
                    </ScrollView>

                    {/* Bottom Sticky Section */}
                    <View className="border-t border-gray-100 px-5 py-4 bg-white">
                        <Text className="text-[#5A5A5A] text-[13px] font-medium mb-3">
                            Trải nghiệm tốt hơn với ứng dụng Long Châu
                        </Text>

                        <TouchableOpacity className="bg-[#1D52F1] rounded-full py-2.5 flex-row items-center justify-center mb-3 active:opacity-80">
                            <Feather name="download" size={18} color="white" />
                            <Text className="text-white font-bold text-[15px] ml-2">Tải ngay</Text>
                        </TouchableOpacity>

                        <TouchableOpacity className="bg-[#EBF1FF] rounded-full py-2.5 flex-row items-center justify-center active:opacity-80">
                            <Feather name="phone" size={18} color="#1D52F1" />
                            <Text className="text-[#1D52F1] font-bold text-[15px] ml-2">
                                Tư vấn: 1800 6928 (Miễn phí)
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </View>
        </Modal>
    );
}
