import { useQuery } from '@tanstack/react-query';
import axiosClient from './axiosClient';

export interface Article {
    id: number;
    title: string;
    slug: string;
    excerpt?: string;
    content: string;
    thumbnail: string;
    category: string;
    tags?: string[];
    author: string;
    is_published: boolean;
    view_count: number;
    created_at: string;
    updated_at: string;
}

export const fetchArticles = async (params?: any): Promise<Article[]> => {
    const response = await axiosClient.get<any, any>('/public/articles', { params });
    // Bởi vì interceptor trả về response.data, response ở đây chính là payload của API
    return response.data || [];
};

export const useArticles = (params?: any) => {
    return useQuery({
        queryKey: ['articles', params],
        queryFn: () => fetchArticles(params),
    });
};
