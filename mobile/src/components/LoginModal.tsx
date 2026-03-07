import React from 'react';
import { View, Text, TouchableOpacity, Modal, Image, StyleSheet, Dimensions } from 'react-native';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import { navigationRef } from '../navigation/navigationRef';

interface LoginModalProps {
    visible: boolean;
    onClose: () => void;
}

const { width } = Dimensions.get('window');

export default function LoginModal({ visible, onClose }: LoginModalProps) {
    const handleLogin = () => {
        onClose();
        if (navigationRef.isReady()) {
            navigationRef.navigate('Login');
        }
    };

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.container}>
                    {/* Close Button */}
                    <TouchableOpacity
                        onPress={onClose}
                        className="absolute top-4 right-4 z-10"
                    >
                        <AntDesign name="close" size={24} color="#1A1A1A" />
                    </TouchableOpacity>

                    {/* Illustration */}
                    <View className="items-center mt-10 mb-6">
                        <Image
                            source={require('../../assets/images/login_door_illustration.png')}
                            style={{ width: 140, height: 140 }}
                            resizeMode="contain"
                        />
                    </View>

                    {/* Content */}
                    <View className="items-center px-4">
                        <Text className="text-xl font-black text-gray-900 mb-2">Thông báo</Text>
                        <Text className="text-sm text-gray-500 text-center mb-8 px-2 leading-5">
                            Đăng nhập để hưởng những đặc quyền dành cho thành viên.
                        </Text>

                        {/* Feature Icons */}
                        <View className="flex-row justify-between w-full mb-10 px-2">
                            <FeatureItem icon="truck-fast" label={"Miễn phí\nvận chuyển"} />
                            <FeatureItem icon="medal-outline" label={"Số 1\nthuốc kê đơn"} />
                            <FeatureItem icon="clock-fast" label={"Giao nhanh\ntrong 1 giờ"} />
                        </View>

                        {/* Buttons */}
                        <View className="flex-row gap-3 w-full">
                            <TouchableOpacity
                                onPress={onClose}
                                className="flex-1 bg-[#F1F5F9] py-4 rounded-full items-center"
                            >
                                <Text className="text-[#1D52F1] font-bold text-base">Trở lại</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleLogin}
                                className="flex-1 bg-[#1D52F1] py-4 rounded-full items-center"
                            >
                                <Text className="text-white font-bold text-base">Đăng nhập</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const FeatureItem = ({ icon, label }: { icon: string, label: string }) => (
    <View className="items-center w-1/3">
        <View className="w-10 h-10 bg-[#EEF2FF] rounded-full items-center justify-center mb-2">
            <MaterialCommunityIcons name={icon as any} size={20} color="#1D52F1" />
        </View>
        <Text className="text-[10px] text-center font-bold text-gray-800 leading-tight">
            {label}
        </Text>
    </View>
);

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: width * 0.85,
        backgroundColor: 'white',
        borderRadius: 24,
        paddingBottom: 24,
        position: 'relative',
        overflow: 'hidden'
    },
});
