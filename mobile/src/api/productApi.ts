import { useQuery } from '@tanstack/react-query';
import axiosClient from './axiosClient';

export interface Product {
    id: number;
    sku: string;
    name: string;
    slug: string;
    category_id: number;
    category_name: string;
    unit: string;
    images: string[];
    cost_price: number;
    retail_price: number;
    wholesale_price: number;
    vat_rate: number;
    min_stock: number;
    stock_quantity: number;
    is_active: boolean;
    // Detail fields
    ingredients?: string;
    usage?: string;
    side_effects?: string;
    warnings?: string;
    storage?: string;
    faq?: Array<{ question: string; answer: string; }>;
}

export interface Category {
    id: number;
    name: string;
    slug: string;
    parent_id?: number | null;
    icon?: string;
    sort_order?: number;
    is_active?: boolean;
}

export interface ApiResponse<T> {
    status: number;
    success: boolean;
    message: string;
    data: T;
}

// Nếu API trả về phân trang
export interface PaginatedData<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
}

// Fetch list products
export const fetchProducts = async (params?: any): Promise<Product[]> => {
    const response = await axiosClient.get<any, ApiResponse<Product[] | PaginatedData<Product>>>('/public/products', { params });
    // Handle both array and paginated format just in case
    if (Array.isArray(response.data)) {
        return response.data;
    } else if (response.data && Array.isArray((response.data as PaginatedData<Product>).data)) {
        return (response.data as PaginatedData<Product>).data;
    }
    return [];
};

// Fetch product detail
export const fetchProductDetail = async (slug: string): Promise<Product> => {
    const response = await axiosClient.get<any, ApiResponse<Product>>(`/public/products/${slug}`);
    return response.data;
};

// React Query Hooks
export const useProducts = (params?: any) => {
    return useQuery({
        queryKey: ['products', params],
        queryFn: () => fetchProducts(params),
    });
};

export const useProductDetail = (slug: string) => {
    return useQuery({
        queryKey: ['product', slug],
        queryFn: () => fetchProductDetail(slug),
        enabled: !!slug,
    });
};

// Fetch featured products
export const fetchFeaturedProducts = async (params?: any): Promise<Product[]> => {
    const response = await axiosClient.get<any, ApiResponse<Product[] | PaginatedData<Product>>>('/public/featured-products', { params });
    if (Array.isArray(response.data)) {
        return response.data;
    } else if (response.data && Array.isArray((response.data as PaginatedData<Product>).data)) {
        return (response.data as PaginatedData<Product>).data;
    }
    return [];
};

export const useFeaturedProducts = (params?: any) => {
    return useQuery({
        queryKey: ['featured-products', params],
        queryFn: () => fetchFeaturedProducts(params),
    });
};

// Fetch categories
export const fetchCategories = async (params?: any): Promise<Category[]> => {
    const response = await axiosClient.get<any, ApiResponse<Category[]>>('/public/categories', { params });
    return response.data;
};

// React Query Hooks
export const useCategories = (params?: any) => {
    return useQuery({
        queryKey: ['categories', params],
        queryFn: () => fetchCategories(params),
    });
};
