/**
 * API Client for AJ NOVA Backend
 * Handles all HTTP requests to FastAPI backend
 */

import axios, { AxiosInstance, AxiosError } from 'axios';
import { createClient } from '@/lib/supabase/client';

// API Base URL from environment
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds
});

// Request interceptor - Add Supabase auth token
apiClient.interceptors.request.use(
  async (config) => {
    // Get Supabase session token (client-side only)
    if (typeof window !== 'undefined') {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();

      if (session?.access_token) {
        config.headers.Authorization = `Bearer ${session.access_token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Unauthorized - sign out and redirect to login
      if (typeof window !== 'undefined') {
        const supabase = createClient();
        await supabase.auth.signOut();
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// =======================
// Authentication APIs
// =======================

export const auth = {
  googleLogin: () => {
    window.location.href = `${API_BASE_URL}/api/v1/auth/google`;
  },
  
  getCurrentUser: async () => {
    const response = await apiClient.get('/api/v1/auth/me');
    return response.data;
  },
  
  logout: async () => {
    await apiClient.post('/api/v1/auth/logout');
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  },
};

// =======================
// Profile APIs
// =======================

export const profiles = {
  getMyProfile: async () => {
    const response = await apiClient.get('/api/v1/profiles/me');
    return response.data;
  },
  
  updateMyProfile: async (data: any) => {
    const response = await apiClient.put('/api/v1/profiles/me', data);
    return response.data;
  },
  
  getCompletion: async () => {
    const response = await apiClient.get('/api/v1/profiles/me/completion');
    return response.data;
  },
};

// =======================
// Document APIs
// =======================

export const documents = {
  list: async () => {
    const response = await apiClient.get('/api/v1/documents');
    return response.data;
  },
  
  generate: async (data: {
    type: string;
    university: string;
    program: string;
    additional_info?: string;
  }) => {
    const response = await apiClient.post('/api/v1/documents/generate', data);
    return response.data;
  },
  
  get: async (id: string) => {
    const response = await apiClient.get(`/api/v1/documents/${id}`);
    return response.data;
  },
  
  update: async (id: string, data: any) => {
    const response = await apiClient.put(`/api/v1/documents/${id}`, data);
    return response.data;
  },
  
  submit: async (id: string) => {
    const response = await apiClient.post(`/api/v1/documents/${id}/submit`);
    return response.data;
  },
  
  review: async (id: string, data: { status: string; review_comments: string }) => {
    const response = await apiClient.post(`/api/v1/documents/${id}/review`, data);
    return response.data;
  },
  
  delete: async (id: string) => {
    await apiClient.delete(`/api/v1/documents/${id}`);
  },
};

// =======================
// Eligibility APIs
// =======================

export const eligibility = {
  check: async (data: any) => {
    const response = await apiClient.post('/api/v1/eligibility/check', data);
    return response.data;
  },
  
  getLastResult: async () => {
    const response = await apiClient.get('/api/v1/eligibility/me');
    return response.data;
  },
};

// =======================
// APS APIs
// =======================

export const aps = {
  get: async () => {
    const response = await apiClient.get('/api/v1/aps/me');
    return response.data;
  },

  submit: async (formData: any) => {
    const response = await apiClient.post('/api/v1/aps/me', { form_data: formData });
    return response.data;
  },

  update: async (data: { form_data?: any; status?: string }) => {
    const response = await apiClient.put('/api/v1/aps/me', data);
    return response.data;
  },
};

// =======================
// Application APIs
// =======================

export const applications = {
  list: async (withStats = false) => {
    const response = await apiClient.get('/api/v1/applications', {
      params: { stats: withStats },
    });
    return response.data;
  },
  
  get: async (id: string) => {
    const response = await apiClient.get(`/api/v1/applications/${id}`);
    return response.data;
  },
  
  create: async (data: any) => {
    const response = await apiClient.post('/api/v1/applications', data);
    return response.data;
  },
  
  update: async (id: string, data: any) => {
    const response = await apiClient.put(`/api/v1/applications/${id}`, data);
    return response.data;
  },
};

// =======================
// Message APIs
// =======================

export const messages = {
  list: async (conversationId?: string) => {
    const response = await apiClient.get('/api/v1/messages', {
      params: conversationId ? { conversation_id: conversationId } : undefined,
    });
    return response.data;
  },
  
  send: async (data: { receiver_id: string; message: string; conversation_id?: string }) => {
    const response = await apiClient.post('/api/v1/messages', data);
    return response.data;
  },
  
  markRead: async (id: string) => {
    const response = await apiClient.put(`/api/v1/messages/${id}/read`);
    return response.data;
  },
};

// =======================
// Consultation APIs
// =======================

export const consultations = {
  list: async (type?: string) => {
    // Handle special endpoints for slots and counsellors
    if (type === 'slots') {
      const response = await apiClient.get('/api/v1/consultations/slots');
      return response.data;
    }
    if (type === 'counsellors') {
      const response = await apiClient.get('/api/v1/consultations/counsellors');
      return response.data;
    }

    const response = await apiClient.get('/api/v1/consultations', {
      params: type ? { type } : undefined,
    });
    return response.data;
  },

  book: async (data: any) => {
    const response = await apiClient.post('/api/v1/consultations', data);
    return response.data;
  },

  get: async (id: string) => {
    const response = await apiClient.get(`/api/v1/consultations/${id}`);
    return response.data;
  },

  update: async (id: string, data: any) => {
    const response = await apiClient.put(`/api/v1/consultations/${id}`, data);
    return response.data;
  },

  cancel: async (id: string) => {
    await apiClient.delete(`/api/v1/consultations/${id}`);
  },
};

// =======================
// Notification APIs
// =======================

export const notifications = {
  list: async (params?: { limit?: number; offset?: number; type?: string; is_read?: boolean }) => {
    const response = await apiClient.get('/api/v1/notifications', { params });
    return response.data;
  },

  getUnreadCount: async () => {
    const response = await apiClient.get('/api/v1/notifications/unread');
    return response.data;
  },

  markAsRead: async (id: string) => {
    const response = await apiClient.put(`/api/v1/notifications/${id}/read`);
    return response.data;
  },

  markAllAsRead: async () => {
    const response = await apiClient.put('/api/v1/notifications/read-all');
    return response.data;
  },

  delete: async (id: string) => {
    await apiClient.delete(`/api/v1/notifications/${id}`);
  },
};

// =======================
// Admin APIs
// =======================

export const admin = {
  getUsers: async (role?: string) => {
    const response = await apiClient.get('/api/v1/admin/users', {
      params: role ? { role } : undefined,
    });
    return response.data;
  },

  getStudents: async () => {
    const response = await apiClient.get('/api/v1/admin/students');
    return response.data;
  },

  getReviewQueue: async () => {
    const response = await apiClient.get('/api/v1/admin/reviews');
    return response.data;
  },

  getLeads: async () => {
    const response = await apiClient.get('/api/v1/admin/leads');
    return response.data;
  },

  createLead: async (leadData: any) => {
    const response = await apiClient.post('/api/v1/admin/leads', leadData);
    return response.data;
  },

  updateLead: async (leadId: string, leadData: any) => {
    const response = await apiClient.put(`/api/v1/admin/leads/${leadId}`, leadData);
    return response.data;
  },

  updateLeadStatus: async (leadId: string, status: string) => {
    const response = await apiClient.patch(`/api/v1/admin/leads/${leadId}/status`, { status });
    return response.data;
  },

  assignLead: async (leadId: string, counsellorId: string) => {
    const response = await apiClient.patch(`/api/v1/admin/leads/${leadId}/assign`, { counsellor_id: counsellorId });
    return response.data;
  },

  getAnalytics: async (days: number = 30) => {
    const response = await apiClient.get('/api/v1/admin/analytics', {
      params: { days }
    });
    return response.data;
  },

  getCounsellorPerformance: async () => {
    const response = await apiClient.get('/api/v1/admin/counsellor-performance');
    return response.data;
  },

  getAPSSubmissions: async () => {
    const response = await apiClient.get('/api/v1/admin/aps-submissions');
    return response.data;
  },

  getAllDocuments: async () => {
    const response = await apiClient.get('/api/v1/admin/documents');
    return response.data;
  },

  getAllConsultations: async () => {
    const response = await apiClient.get('/api/v1/admin/consultations');
    return response.data;
  },

  getAllApplications: async () => {
    const response = await apiClient.get('/api/v1/admin/applications');
    return response.data;
  },
};

// =======================
// Utility Functions
// =======================
// Note: Auth tokens are now managed by Supabase Auth
// Use supabase.auth.getSession() to get the current session

// Export the axios instance for custom requests
export default apiClient;
























