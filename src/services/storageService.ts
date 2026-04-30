import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task, User } from '../types';

const KEYS = {
  TASKS: '@taskflow:tasks',
  USER: '@taskflow:user',
} as const;

export const StorageService = {
  async saveTasks(tasks: Task[]): Promise<void> {
    await AsyncStorage.setItem(KEYS.TASKS, JSON.stringify(tasks));
  },

  async loadTasks(): Promise<Task[]> {
    const data = await AsyncStorage.getItem(KEYS.TASKS);
    return data ? (JSON.parse(data) as Task[]) : [];
  },

  async saveUser(user: User): Promise<void> {
    await AsyncStorage.setItem(KEYS.USER, JSON.stringify(user));
  },

  async loadUser(): Promise<User | null> {
    const data = await AsyncStorage.getItem(KEYS.USER);
    return data ? (JSON.parse(data) as User) : null;
  },

  async clearUser(): Promise<void> {
    await AsyncStorage.removeItem(KEYS.USER);
  },

  async clearAll(): Promise<void> {
    await AsyncStorage.removeItem(KEYS.TASKS);
    await AsyncStorage.removeItem(KEYS.USER);
  },
};
