import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, Feather, Octicons } from '@expo/vector-icons';

const TOPICS_DATA = [
    {
        id: '1',
        title: 'Bệnh theo mùa',
        icon: 'pulse',
        iconFamily: 'MaterialCommunityIcons',
        items: ['Cúm mùa', 'Sốt xuất huyết', 'Viêm phổi', 'Tay chân miệng']
    },
    {
        id: '2',
        title: 'Sức khỏe gia đình',
        icon: 'heart',
        iconFamily: 'Feather',
        items: ['Tăng đề kháng', 'Bổ sung vitamin', 'Kiểm soát huyết áp', 'Sức khỏe tiêu hóa']
    },
    {
        id: '3',
        title: 'Mẹ và bé',
        icon: 'baby-face-outline',
        iconFamily: 'MaterialCommunityIcons',
        items: ['Dinh dưỡng bà bầu', 'Sữa cho trẻ nhỏ', 'Vắc xin trẻ em', 'Chăm sóc sau sinh']
    },
    {
        id: '4',
        title: 'Người cao tuổi',
        icon: 'user-check',
        iconFamily: 'Feather',
        items: ['Xương khớp', 'Tim mạch', 'Trí nhớ', 'Mắt và thị lực']
    }
];

export default function HealthTopics() {
    return (
        <View className="mt-8 px-4 mb-6">
            <View className="bg-[#F8FAFF] rounded-[32px] border border-[#E1E7FF] p-5 shadow-sm">
                <View className="flex-row items-center mb-6 pl-3 border-l-4 border-[#1D52F1]">
                    <Text className="text-xl font-black text-[#1A1A1A] uppercase tracking-tight">
                        Chủ đề sức khỏe
                    </Text>
                </View>

                <View className="flex-row flex-wrap justify-between">
                    {TOPICS_DATA.map((topic) => (
                        <View key={topic.id} className="w-[48%] bg-white rounded-2xl p-4 mb-4 shadow-sm border border-[#F1F5F9]">
                            <View className="flex-row items-center gap-3 mb-4">
                                <View className="w-10 h-10 rounded-xl bg-[#EEF2FF] items-center justify-center">
                                    {topic.iconFamily === 'MaterialCommunityIcons' ? (
                                        <MaterialCommunityIcons name={topic.icon as any} size={20} color="#1D52F1" />
                                    ) : (
                                        <Feather name={topic.icon as any} size={20} color="#1D52F1" />
                                    )}
                                </View>
                            </View>

                            <Text className="text-[13px] font-bold text-[#1A1A1A] uppercase mb-3" numberOfLines={1}>
                                {topic.title}
                            </Text>

                            <View className="gap-y-2">
                                {topic.items.map((item, idx) => (
                                    <TouchableOpacity key={idx} className="flex-row items-center">
                                        <View className="w-1.5 h-1.5 rounded-full bg-[#CBD5E1] mr-2" />
                                        <Text className="text-[11px] text-[#64748B] font-medium flex-1" numberOfLines={1}>
                                            {item}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    ))}
                </View>
            </View>
        </View>
    );
}
