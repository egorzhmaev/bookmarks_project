import axios from 'axios';
import { useAuthStore } from './stores/auth.store';

export const API_ROUTES = {
  profile: `/profile`,
  categories: {
    get: `/categories`,
    update: (id: number) => `categories/${id}`,
    delete: (id: number) => `categories/${id}`,
  },
  bookmarks: {
    get: (id: number) => `categories/${id}/bookmarks`,
    post: `/bookmarks`,
    delete: (id: number) => `bookmarks/${id}`,
  },
  auth: {
    login: `auth/login`,
    profile: `auth/profile`,
  },
};

export function client() {
  const authStore = useAuthStore();
  return axios.create({
    baseURL: 'http://localhost:3000/api',
    timeout: 10000,
    headers: {
      Authorization: `Bearer ${authStore.getToken}`,
    },
  });
}
