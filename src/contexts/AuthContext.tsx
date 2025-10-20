import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types';
import { apiService } from '@/services/api';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; user: User }>;
  register: (userData: RegisterData) => Promise<{ success: boolean; user: User }>;
  logout: () => void;
  loading: boolean;
  isAuthenticated: boolean;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: 'student' | 'teacher' | 'admin';
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('genzed_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('genzed_user');
      }
    }

    // Initialize demo users locally if none exist (offline demo fallback)
    const existingUsers = localStorage.getItem('genzed_users');
    if (!existingUsers) {
      const demoUsers = [
        {
          id: '1',
          name: 'Dr. Smith',
          email: 'teacher@genzed.com',
          password: 'password123',
          role: 'teacher',
          createdAt: new Date(),
          isActive: true,
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dr.Smith'
        },
        {
          id: '2',
          name: 'Alice Johnson',
          email: 'student@genzed.com',
          password: 'password123',
          role: 'student',
          createdAt: new Date(),
          isActive: true,
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice'
        },
        {
          id: '3',
          name: 'Admin User',
          email: 'admin@genzed.com',
          password: 'password123',
          role: 'admin',
          createdAt: new Date(),
          isActive: true,
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin'
        }
      ];
      localStorage.setItem('genzed_users', JSON.stringify(demoUsers));
    }

    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Try backend login first
      const resp = await apiService.login(email, password);
      const { user: userResp, token } = resp;
      // store token for apiService
      localStorage.setItem('genzed_token', token);
      localStorage.setItem('genzed_user', JSON.stringify(userResp));
      setUser(userResp);
      return { success: true, user: userResp };
    } catch (err) {
      // Fallback to local demo users if backend unavailable or login fails
      try {
        const users = JSON.parse(localStorage.getItem('genzed_users') || '[]');
        const found = users.find((u: any) => u.email === email && u.password === password);
        if (!found) throw err;
        const { password: _, ...userWithoutPassword } = found;
        setUser(userWithoutPassword);
        localStorage.setItem('genzed_user', JSON.stringify(userWithoutPassword));
        return { success: true, user: userWithoutPassword };
      } catch (fallbackErr) {
        console.error('Login error:', err);
        throw err;
      }
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: RegisterData) => {
    setLoading(true);
    try {
      // Try backend register first
      const resp = await apiService.register(userData);
      const { user: userResp, token } = resp;
      localStorage.setItem('genzed_token', token);
      localStorage.setItem('genzed_user', JSON.stringify(userResp));
      setUser(userResp);
      return { success: true, user: userResp };
    } catch (err) {
      // Fallback to local demo registration
      try {
        const users = JSON.parse(localStorage.getItem('genzed_users') || '[]');
        const existingUser = users.find((u: any) => u.email === userData.email);
        if (existingUser) throw new Error('User with this email already exists');
        const newUser = {
          id: Date.now().toString(),
          ...userData,
          createdAt: new Date(),
          isActive: true,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.name}`
        };
        users.push(newUser);
        localStorage.setItem('genzed_users', JSON.stringify(users));
        const { password: _, ...userWithoutPassword } = newUser;
        setUser(userWithoutPassword);
        localStorage.setItem('genzed_user', JSON.stringify(userWithoutPassword));
        return { success: true, user: userWithoutPassword };
      } catch (fallbackErr) {
        console.error('Registration error:', err);
        throw err;
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('genzed_user');
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
