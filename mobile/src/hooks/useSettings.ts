import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface SettingsResponse {
  status: number;
  success: boolean;
  message: string;
  data: {
    id: number;
    site_name: string;
    site_description: string;
    logo_url: string;
    logo_type: string;
    favicon_url: string;
    og_image_url: string;
    keywords: string;
    contact_phone: string;
    contact_email: string;
    contact_address: string;
    meta_title: string;
    meta_description: string;
    footer_text: string;
    primary_color: string;
    [key: string]: any;
  };
}

const fetchSettings = async () => {
  const response = await axios.get<SettingsResponse>('https://api.duocnamviet.site/api/public/settings');
  return response.data;
};

export const useSettings = () => {
  return useQuery({
    queryKey: ['settings'],
    queryFn: fetchSettings,
    staleTime: 1000 * 60 * 60 * 24, // Cache for 24 hours
  });
};
