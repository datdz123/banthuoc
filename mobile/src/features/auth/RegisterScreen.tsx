import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function RegisterScreen({ navigation }: any) {
    useEffect(() => {
        // Automatically go back or stay as a placeholder since registration is not supported
        setTimeout(() => {
            navigation.goBack();
        }, 2000);
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Không có màn đăng ký.</Text>
            <Text style={styles.subText}>Hệ thống chỉ sử dụng đăng nhập.</Text>
            <Text style={styles.redirectText}>Đang quay lại màn hình đăng nhập...</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1A1A1A',
        marginBottom: 8,
    },
    subText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 20,
    },
    redirectText: {
        fontSize: 12,
        color: '#1D52F1',
        fontStyle: 'italic',
    }
});
