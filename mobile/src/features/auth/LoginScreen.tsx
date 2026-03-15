import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    Modal,
    Image,
    Keyboard,
    ActivityIndicator,
    Alert,
    ScrollView,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { AntDesign, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuthStore } from '../../store/useAuthStore';
import { Image as ExpoImage } from 'expo-image';
import { useSettings } from '../../hooks/useSettings';

export default function LoginScreen({ navigation }: any) {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [isOtpModalVisible, setIsOtpModalVisible] = useState(false);
    const [isOtpInputVisible, setIsOtpInputVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showDigitIndex, setShowDigitIndex] = useState<number | null>(null);
    const [otpError, setOtpError] = useState<string | null>(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const { login } = useAuthStore();
    const { data: settings } = useSettings();
    const logoUrl = settings?.data?.logo_url;
    const siteName = settings?.data?.site_name || "NHÀ THUỐC";

    useEffect(() => {
        if (otpError && otp.length > 0) {
            setOtpError(null);
        }
        if (otp.length > 0) {
            setShowDigitIndex(otp.length - 1);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => {
                setShowDigitIndex(null);
            }, 600);
        }
    }, [otp]);

    const handleContinue = () => {
        // Tắt bàn phím khi bấm tiếp tục
        Keyboard.dismiss();
        if (phoneNumber.length > 8) {
            setIsOtpModalVisible(true);
        } else {
            Alert.alert('Vui lòng nhập số điện thoại hợp lệ');
        }
    };

    const handleSendOtp = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setIsOtpInputVisible(true);
        }, 1200);
    };

    const handleVerifyOtp = async () => {
        if (otp === '123456') {
            await login(phoneNumber);
            if (navigation.canGoBack()) {
                navigation.goBack();
            } else {
                navigation.replace('MainTabs');
            }
        } else {
            setOtpError('Mã xác thực không chính xác.');
        }
    };


    return (
        <SafeAreaView className="flex-1 bg-white">
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <View className="flex-1 px-5">
                        {/* Header */}
                        <View className="flex-row items-center justify-between mt-2.5 h-[50px]">
                            <TouchableOpacity className="p-1.5" onPress={() => navigation.navigate('MainTabs')}>
                                <AntDesign name="close" size={24} color="black" />
                            </TouchableOpacity>

                            <View className="flex-row items-center">
                                {logoUrl ? (
                                    <ExpoImage source={{ uri: logoUrl }} style={{ width: 40, height: 40, marginRight: 8 }} contentFit="contain" />
                                ) : (
                                    <View className="mr-1.5">
                                        <Text className="text-[#F0712E] font-bold text-base italic">FPT</Text>
                                    </View>
                                )}
                                <View className="justify-center">
                                    <Text className="text-[#1D52F1] text-[15px] font-black uppercase tracking-wider">{siteName}</Text>
                                </View>
                            </View>
                            <View className="w-6" />
                        </View>

                        {/* Title & Input */}
                        <View className="items-center mt-10 mb-[30px]">
                            <Text className="text-[22px] font-bold text-[#1A1A1A] mb-5">
                                Vui lòng nhập số điện thoại
                            </Text>
                            <TextInput
                                className="text-[34px] font-bold text-[#00204d] text-center w-full tracking-[2px]"
                                placeholder="0000000000"
                                placeholderTextColor="#D0D5DD"
                                keyboardType="phone-pad"
                                maxLength={12}
                                value={phoneNumber}
                                onChangeText={setPhoneNumber}
                                autoFocus={false}
                            />
                        </View>

                        {/* Submit Button */}
                        <TouchableOpacity
                            className={`rounded-full py-3.5 items-center mb-5 ${phoneNumber.length > 8 ? 'bg-[#1D52F1]' : 'bg-[#EBF0FA]'}`}
                            onPress={handleContinue}
                            activeOpacity={0.8}
                        >
                            <Text className={`text-base font-bold ${phoneNumber.length > 8 ? 'text-white' : 'text-[#1D52F1]'}`}>
                                Tiếp tục
                            </Text>
                        </TouchableOpacity>

                        {/* Promo & Social Logic */}
                        <View className="rounded-xl overflow-hidden mb-[30px]">
                            <View className="bg-[#1D52F1] flex-row p-3 items-center">
                                <FontAwesome5 name="gift" size={16} color="#FFF" />
                                <View className="ml-2.5 flex-1">
                                    <Text className="text-white font-bold text-xs mb-0.5">Nhận ngay mã giảm 100.000đ</Text>
                                    <Text className="text-white text-[10px]">Dành cho khách hàng lần đầu...</Text>
                                </View>
                            </View>
                            <TouchableOpacity className="bg-[#D82E29] flex-row p-3 items-center justify-center">
                                <Text className="text-white font-semibold text-[13px] text-center mr-2.5">Đăng nhập bằng VNeID</Text>
                                <Image className="w-8 h-8" resizeMode="contain" source={{ uri: 'https://cdn.haitrieu.com/wp-content/uploads/2021/09/Logo-Bo-Cong-An.png' }} />
                            </TouchableOpacity>
                        </View>

                        <Text className="text-center text-[#8A92A6] text-[13px] mb-5">hoặc đăng nhập bằng</Text>
                        <View className="flex-row justify-center gap-5 pb-5">
                            <TouchableOpacity className="w-11 h-11 rounded-full border border-[#EFEFEF] justify-center items-center">
                                <Image className="w-5 h-5" resizeMode="contain" source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png' }} />
                            </TouchableOpacity>
                            <TouchableOpacity className="w-11 h-11 rounded-full border border-[#EFEFEF] justify-center items-center">
                                <Image className="w-5 h-5" resizeMode="contain" source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/1024px-2021_Facebook_icon.svg.png' }} />
                            </TouchableOpacity>
                            <TouchableOpacity className="w-11 h-11 rounded-full bg-[#F0712E] justify-center items-center">
                                <Text className="text-white text-[11px] font-bold mt-0.5">FPTiD</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            {/* Combined Modal for Selection and Input */}
            <Modal
                visible={isOtpModalVisible}
                animationType="fade"
                transparent={true}
                onRequestClose={() => setIsOtpModalVisible(false)}
            >
                <View className="flex-1 justify-center items-center bg-black/50">
                    <View className="bg-white w-[88%] rounded-3xl p-6 items-center shadow-2xl">
                        <TouchableOpacity className="absolute top-4 right-4" onPress={() => setIsOtpModalVisible(false)}>
                            <AntDesign name="close" size={24} color="#9CA3AF" />
                        </TouchableOpacity>

                        <Image
                            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3242/3242257.png' }}
                            className="w-[100px] h-[100px] mb-4"
                            resizeMode="contain"
                        />

                        {!isOtpInputVisible ? (
                            <>
                                <Text className="text-lg font-black text-gray-900 mb-1">Mã OTP</Text>
                                <Text className="text-[13px] text-gray-500 text-center mb-6">
                                    Bạn muốn nhận mã xác thực gởi tới số{"\n"}<Text className="font-bold text-gray-900">{phoneNumber}</Text> qua hình thức nào?
                                </Text>

                                {isLoading ? (
                                    <ActivityIndicator size="large" color="#1D52F1" className="mb-4" />
                                ) : (
                                    <>
                                        <TouchableOpacity className="bg-[#1D52F1] w-full py-4 rounded-full items-center mb-3 shadow-sm" onPress={handleSendOtp}>
                                            <Text className="text-white font-bold text-base">Nhận qua Zalo/SMS</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity className="bg-white w-full py-4 rounded-full border border-gray-100 items-center mb-4" onPress={() => setIsOtpModalVisible(false)}>
                                            <Text className="text-gray-500 font-bold">Quay lại</Text>
                                        </TouchableOpacity>
                                    </>
                                )}
                            </>
                        ) : (
                            <>
                                <Text className="text-lg font-black text-gray-900 mb-1">Nhập mã OTP</Text>
                                <Text className="text-[13px] text-gray-500 text-center mb-6 leading-5">
                                    Vui lòng nhập mã OTP vừa được gửi đến số điện thoại của bạn (OTP: 123456).
                                </Text>

                                <View className={`flex-row justify-center gap-3 relative w-full h-[54px] items-center ${otpError ? 'mb-2' : 'mb-6'}`}>
                                    {[0, 1, 2, 3, 4, 5].map((index) => {
                                        const isFilled = otp.length > index;
                                        const isCurrent = otp.length === index;
                                        return (
                                            <View
                                                key={index}
                                                className={`w-11 h-11 rounded-full items-center justify-center border-2 
                                                ${otpError ? 'border-red-500 bg-red-50' : (isCurrent ? 'border-[#1D52F1] bg-white scale-110 shadow-sm' : (isFilled ? 'border-[#1D52F1] bg-white' : 'border-gray-200 bg-gray-50'))}
                                                `}
                                            >
                                                <Text className={`text-xl font-black ${isFilled ? (otpError ? 'text-red-600' : 'text-gray-900') : 'text-gray-300'} ${(showDigitIndex !== index && isFilled) ? 'text-2xl mt-1' : ''}`}>
                                                    {isFilled ? (showDigitIndex === index ? otp[index] : '•') : ''}
                                                </Text>
                                            </View>
                                        );
                                    })}
                                    <TextInput
                                        className="absolute w-full h-full opacity-0"
                                        keyboardType="number-pad"
                                        maxLength={6}
                                        value={otp}
                                        onChangeText={setOtp}
                                        autoFocus
                                        caretHidden
                                    />
                                </View>
                                {otpError && (
                                    <Text className="text-red-500 text-xs font-bold mb-4">{otpError}</Text>
                                )}

                                <TouchableOpacity
                                    className={`w-full py-4 rounded-full items-center mb-4 shadow-sm ${otp.length === 6 ? 'bg-[#1D52F1]' : 'bg-gray-200'}`}
                                    onPress={handleVerifyOtp}
                                    disabled={otp.length !== 6}
                                >
                                    <Text className="text-white font-bold text-base">Xác thực</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => setIsOtpInputVisible(false)}>
                                    <Text className="text-[#1D52F1] text-xs font-bold uppercase tracking-wider">Đổi hình thức nhận mã</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}
