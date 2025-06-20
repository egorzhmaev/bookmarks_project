import { defineStore } from 'pinia';
import type { LoginResponse } from '@/interfaces/auth.interface';
import { computed, ref } from 'vue';
import { API_ROUTES, client } from '../api';

const TOKEN_STORE_KEY = 'auth-store';

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string>();

  const inutualValue = localStorage.getItem(TOKEN_STORE_KEY);

  if (inutualValue) {
    token.value = inutualValue;
  }

  function setToken(newToken: string) {
    token.value = newToken;
    localStorage.setItem(TOKEN_STORE_KEY, newToken);
  }

  function clearToken() {
    token.value = undefined;
    localStorage.removeItem(TOKEN_STORE_KEY);
  }

  const getToken = computed(() => token.value);

  async function login(email: string, password: string) {
    const { data } = await client().post<LoginResponse>(API_ROUTES.auth.login, {
      email,
      password,
    });

    setToken(data.token);
  }

  return { clearToken, getToken, token, login };
});
