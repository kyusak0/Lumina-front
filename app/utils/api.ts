import React from "react";

const API_URL = 'http://localhost:8001/api';

interface RegistrationData {
  name: string,
  email: string,
  password: string,
  password_confirmation: string,
}

interface LoginData {
  email: string,
  password: string,
}

interface AppUser {
  id: number;
  name: string;
  login: string;
  role: string;
  created_at: string;
  updated_at: string;
}

interface AuthResponse {
  user: AppUser;
  message: string;
}

class ApiClient {
  private csrfToken: string | null = null;
  
  constructor() {
    // Загружаем CSRF токен из cookie при инициализации
    this.loadCSRFToken();
  }

  // Получаем CSRF токен из cookie
  private getCSRFTokenFromCookie(): string | null {
    if (typeof document === 'undefined') return null;
    
    const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
    return match ? decodeURIComponent(match[1]) : null;
  }

  // Загружаем CSRF токен
  private loadCSRFToken(): void {
    this.csrfToken = this.getCSRFTokenFromCookie();
  }

  // Получаем новый CSRF токен с сервера
  private async fetchCSRFToken(): Promise<void> {
    try {
      await fetch(`${API_URL}/csrf-cookie`, {
        method: 'GET',
        credentials: 'include',
      });
      this.loadCSRFToken();
    } catch (error) {
      console.error('Failed to fetch CSRF token:', error);
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    // Перед каждым запросом проверяем наличие CSRF токена
    if (!this.csrfToken) {
      await this.fetchCSRFToken();
    }

    const url = `${API_URL}${endpoint}`;
    const headers: Record<string, string> = {
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    };

    // Добавляем CSRF токен для POST, PUT, PATCH, DELETE запросов
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(options.method || '')) {
      if (this.csrfToken) {
        headers['X-XSRF-TOKEN'] = this.csrfToken;
      }
    }

    // Для FormData не устанавливаем Content-Type, браузер сделает это сам
    if (options.body && !(options.body instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }

    const defaultOptions: RequestInit = {
      headers,
      credentials: 'include',
      ...options,
    };

    const response = await fetch(url, defaultOptions);

    // Если получили 419 ошибку, обновляем CSRF токен и повторяем запрос
    if (response.status === 419) {
      console.log('CSRF token expired, refreshing...');
      await this.fetchCSRFToken();
      
      // Обновляем заголовок с новым токеном
      if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(options.method || '') && this.csrfToken) {
        (defaultOptions.headers as Record<string, string>)['X-XSRF-TOKEN'] = this.csrfToken;
      }
      
      // Повторяем запрос с обновленным токеном
      const retryResponse = await fetch(url, defaultOptions);
      if (!retryResponse.ok) {
        return this.handleError(retryResponse);
      }
      return retryResponse.json();
    }

    if (!response.ok) {
      return this.handleError(response);
    }

    return response.json();
  }

  private async handleError(response: Response): Promise<never> {
    let errorData: any;
    try {
      errorData = await response.json();
    } catch {
      errorData = { message: 'Ошибка сети' };
    }

    const errorMessages = {
      401: 'Не авторизован',
      403: 'Доступ запрещен',
      404: 'Ресурс не найден',
      422: 'Ошибка валидации',
      419: 'Сессия истекла',
      500: 'Внутренняя ошибка сервера',
    };

    const defaultMessage = errorMessages[response.status as keyof typeof errorMessages] || 'Ошибка запроса';

    const message = 
      errorData.message ||
      errorData.errors?.email?.[0] ||
      errorData.errors?.password?.[0] ||
      errorData.error ||
      defaultMessage;

    throw new Error(message);
  }

  // Инициализация CSRF токена (вызывать при загрузке приложения)
  async init(): Promise<void> {
    await this.fetchCSRFToken();
  }

  async register(data: RegistrationData): Promise<AuthResponse> {
    return this.request('/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async login(data: LoginData): Promise<AuthResponse> {
    return this.request('/login', { // Исправлено с '/register' на '/login'
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Дополнительные методы
  async logout(): Promise<{ message: string }> {
    return this.request('/logout', {
      method: 'POST',
    });
  }

  async getUser(): Promise<AppUser> {
    return this.request('/user', {
      method: 'GET',
    });
  }

  // Метод для проверки авторизации
  async checkAuth(): Promise<boolean> {
    try {
      await this.getUser();
      return true;
    } catch {
      return false;
    }
  }
}

// Создаем глобальный экземпляр
export const apiClient = new ApiClient();

// Экспортируем типы
export type { RegistrationData, LoginData, AppUser, AuthResponse };

// Хук для React (если используете)
export const useApiClient = () => {
  // Инициализация при загрузке приложения
  React.useEffect(() => {
    apiClient.init().catch(console.error);
  }, []);

  return apiClient;
};