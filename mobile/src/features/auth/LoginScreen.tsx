import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    Modal,
    Image,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import { AntDesign, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

export default function LoginScreen({ navigation }: any) {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleContinue = () => {
        if (phoneNumber.length > 8) {
            setIsModalVisible(true);
        } else {
            alert('Vui lòng nhập số điện thoại hợp lệ');
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View className="flex-1 px-5">
                    {/* Header */}
                    <View className="flex-row items-center justify-between mt-2.5 h-[50px]">
                        <TouchableOpacity className="p-1.5" onPress={() => navigation.goBack()}>
                            <AntDesign name="close" size={24} color="black" />
                        </TouchableOpacity>

                        <View className="flex-row items-center">
                            <View className="mr-1.5">
                                <Text className="text-[#F0712E] font-bold text-base italic">FPT</Text>
                            </View>
                            <View>
                                <Text className="text-[#1D52F1] text-[10px] font-bold">NHÀ THUỐC</Text>
                                <Text className="text-[#1D52F1] text-sm font-black">LONG CHÂU</Text>
                            </View>
                        </View>
                        <View className="w-6" /> {/* Balance space */}
                    </View>

                    {/* Title & Input */}
                    <View className="items-center mt-10 mb-[30px]">
                        <Text className="text-[22px] font-bold text-[#1A1A1A] mb-5">
                            Vui lòng nhập số điện thoại
                        </Text>
                        <TextInput
                            className="text-[34px] font-bold text-[#00204d] text-center w-full tracking-[2px]"
                            placeholder="0000 000 000"
                            placeholderTextColor="#D0D5DD"
                            keyboardType="phone-pad"
                            maxLength={12}
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                        />
                    </View>

                    {/* Submit Button */}
                    <TouchableOpacity
                        className={`rounded-full py-3.5 items-center mb-5 ${phoneNumber.length > 8 ? 'bg-[#1D52F1]' : 'bg-[#EBF0FA]'
                            }`}
                        onPress={handleContinue}
                        activeOpacity={0.8}
                    >
                        <Text className={`text-base font-bold ${phoneNumber.length > 8 ? 'text-white' : 'text-[#1D52F1]'
                            }`}>
                            Tiếp tục
                        </Text>
                    </TouchableOpacity>

                    {/* VNeID Promotional Box */}
                    <View className="rounded-xl overflow-hidden mb-[30px]">
                        <View className="bg-[#1D52F1] flex-row p-3 items-center">
                            <FontAwesome5 name="gift" size={16} color="#FFF" />
                            <View className="ml-2.5 flex-1">
                                <Text className="text-white font-bold text-xs mb-0.5">Nhận ngay mã giảm 100.000đ</Text>
                                <Text className="text-white text-[10px]">Dành cho khách hàng lần đầu đăng nhập ứng dụng.</Text>
                            </View>
                        </View>
                        <TouchableOpacity className="bg-[#D82E29] flex-row p-3 items-center justify-center">
                            <Text className="text-white font-semibold text-[13px] text-center mr-2.5">
                                Đăng nhập bằng tài khoản{'\n'}định danh điện tử
                            </Text>
                            <Image
                                className="w-8 h-8"
                                resizeMode="contain"
                                source={{ uri: 'https://cdn.haitrieu.com/wp-content/uploads/2021/09/Logo-Bo-Cong-An.png' }}
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Social Login */}
                    <Text className="text-center text-[#8A92A6] text-[13px] mb-5">hoặc đăng nhập bằng</Text>
                    <View className="flex-row justify-center gap-5">
                        <TouchableOpacity className="w-11 h-11 rounded-full border border-[#EFEFEF] justify-center items-center">
                            <Image className="w-5 h-5" resizeMode="contain" source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png' }} />
                        </TouchableOpacity>
                        <TouchableOpacity className="w-11 h-11 rounded-full border border-[#EFEFEF] justify-center items-center">
                            <Image className="w-5 h-5" resizeMode="contain" source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/1024px-2021_Facebook_icon.svg.png' }} />
                        </TouchableOpacity>
                        <TouchableOpacity className="w-11 h-11 rounded-full bg-[#F0712E] justify-center items-center">
                            <Text className="text-white text-[11px] font-bold mt-0.5">FPT</Text>
                            <Text className="text-white text-[9px] -mt-0.5">iD</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>

            {/* OTP Modal */}
            <Modal
                visible={isModalVisible}
                animationType="fade"
                transparent={true}
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View className="flex-1 justify-center items-center bg-black/50">
                    <View className="bg-white w-[85%] rounded-2xl p-6 items-center relative">
                        <TouchableOpacity className="absolute top-4 right-4" onPress={() => setIsModalVisible(false)}>
                            <AntDesign name="close" size={24} color="black" />
                        </TouchableOpacity>

                        <Image
                            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3242/3242257.png' }}
                            className="w-[120px] h-[120px] mb-5 mt-2.5"
                            resizeMode="contain"
                        />

                        <Text className="text-sm text-[#1A1A1A] text-center mb-2.5">Mã xác thực được gửi đến số điện thoại</Text>

                        <View className="flex-row items-center mb-5">
                            <Text className="text-[15px] font-bold text-black">{phoneNumber}</Text>
                            <TouchableOpacity className="flex-row items-center ml-2.5" onPress={() => setIsModalVisible(false)}>
                                <MaterialCommunityIcons name="pencil" size={16} color="#1D52F1" />
                                <Text className="text-[#1D52F1] font-semibold text-sm"> Đổi số điện thoại</Text>
                            </TouchableOpacity>
                        </View>

                        <Text className="text-[#1A1A1A] text-sm mb-5">Vui lòng chọn hình thức nhận mã</Text>

                        <TouchableOpacity className="bg-[#1D52F1] w-full py-3.5 rounded-full items-center mb-3">
                            <Text className="text-white font-bold text-[15px]">Nhận mã qua Zalo</Text>
                        </TouchableOpacity>

                        <TouchableOpacity className="bg-white w-full py-3.5 rounded-full items-center">
                            <Text className="text-[#1D52F1] font-bold text-[15px]">Nhận mã qua SMS</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}
