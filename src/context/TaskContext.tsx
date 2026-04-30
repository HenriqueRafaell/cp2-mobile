import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import { Task, TaskContextType, TaskFormData, TaskStatus } from '../types';
import { StorageService } from '../services/storageService';
import { generateId } from '../utils';

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const saved = await StorageService.loadTasks();
        setTasks(saved);
      } catch {
        setError('Erro ao carregar tarefas');
      } finally {
        setIsLoading(false);
      }
    };
    loadTasks();
  }, []);

  const persistTasks = useCallback(async (updated: Task[]) => {
    setTasks(updated);
    await StorageService.saveTasks(updated);
  }, []);

  const addTask = useCallback(
    async (data: TaskFormData) => {
      const now = new Date().toISOString();
      const newTask: Task = {
        id: generateId(),
        ...data,
        createdAt: now,
        updatedAt: now,
      };
      await persistTasks([newTask, ...tasks]);
    },
    [tasks, persistTasks],
  );

  const updateTask = useCallback(
    async (id: string, data: Partial<TaskFormData>) => {
      const updated = tasks.map(t =>
        t.id === id ? { ...t, ...data, updatedAt: new Date().toISOString() } : t,
      );
      await persistTasks(updated);
    },
    [tasks, persistTasks],
  );

  const deleteTask = useCallback(
    async (id: string) => {
      const updated = tasks.filter(t => t.id !== id);
      await persistTasks(updated);
    },
    [tasks, persistTasks],
  );

  const getTaskById = useCallback(
    (id: string) => tasks.find(t => t.id === id),
    [tasks],
  );

  const filterByStatus = useCallback(
    (status: TaskStatus | 'all'): Task[] => {
      if (status === 'all') {
        return tasks;
      }
      return tasks.filter(t => t.status === status);
    },
    [tasks],
  );

  return (
    <TaskContext.Provider
      value={{
        tasks,
        isLoading,
        error,
        addTask,
        updateTask,
        deleteTask,
        getTaskById,
        filterByStatus,
      }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within TaskProvider');
  }
  return context;
};
