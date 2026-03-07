import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const HEALTH_ARTICLES = [
    {
        id: '1',
        category: 'Truyền thông',
        title: 'Long Châu phối hợp STADA Pymepharco lan toả kiến thức y',
        image: 'https://cdn.nhathuoclongchau.com.vn/unsafe/375x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/DSC_0788_6950275817.JPG'
    },
    {
        id: '2',
        category: 'Truyền thông',
        title: 'Long Châu đóng góp sáng kiến về y tế số tại Diễn đàn Kinh tế Thụy Sĩ',
        image: 'https://cdn.nhathuoclongchau.com.vn/unsafe/375x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/Z_5076632313665_95819077209707_3473188554.jpg'
    },
    {
        id: '3',
        category: 'Truyền thông',
        title: 'Long Châu cùng Abbott – tập đoàn chăm sóc sức khỏe hàng đầu thế giới nâng cao sức khỏe cho người Việt',
        image: 'https://cdn.nhathuoclongchau.com.vn/unsafe/375x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/Z_5103433602120_8140417242137_8783683060.jpg'
    }
];

export default function HealthCorner() {
    return (
        <View className="mt-8 px-4">
            <View className="flex-row justify-between items-center mb-4">
                <Text className="text-xl font-bold text-[#1A1A1A]">Góc sức khỏe</Text>
                <TouchableOpacity>
                    <Text className="text-[#1D52F1] font-bold">Xem tất cả</Text>
                </TouchableOpacity>
            </View>

            <View className="gap-y-4">
                {HEALTH_ARTICLES.map((article) => (
                    <TouchableOpacity key={article.id} className="flex-row items-center">
                        <Image
                            source={{ uri: article.image }}
                            className="w-[120px] h-[85px] rounded-xl bg-gray-200"
                            resizeMode="cover"
                        />
                        <View className="flex-1 ml-4 justify-center">
                            <Text className="text-[#1D52F1] text-sm font-medium mb-1">{article.category}</Text>
                            <Text className="text-[#1A1A1A] text-sm font-bold leading-tight" numberOfLines={3}>
                                {article.title}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}
