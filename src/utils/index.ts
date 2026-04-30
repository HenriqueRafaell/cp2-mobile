import { TaskPriority, TaskStatus } from '../types';

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

export const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getPriorityColor = (priority: TaskPriority): string => {
  const colors: Record<TaskPriority, string> = {
    low: '#4CAF50',
    medium: '#FF9800',
    high: '#F44336',
  };
  return colors[priority];
};

export const getPriorityLabel = (priority: TaskPriority): string => {
  const labels: Record<TaskPriority, string> = {
    low: 'Baixa',
    medium: 'Média',
    high: 'Alta',
  };
  return labels[priority];
};

export const getStatusColor = (status: TaskStatus): string => {
  const colors: Record<TaskStatus, string> = {
    pending: '#FF9800',
    'in-progress': '#2196F3',
    completed: '#4CAF50',
  };
  return colors[status];
};

export const getStatusLabel = (status: TaskStatus): string => {
  const labels: Record<TaskStatus, string> = {
    pending: 'Pendente',
    'in-progress': 'Em Progresso',
    completed: 'Concluída',
  };
  return labels[status];
};

export const validateTaskTitle = (title: string): string | null => {
  if (!title.trim()) {
    return 'O título é obrigatório';
  }
  if (title.trim().length < 3) {
    return 'O título deve ter pelo menos 3 caracteres';
  }
  return null;
};

export const CATEGORIES = [
  { label: 'Trabalho', icon: '💼' },
  { label: 'Pessoal', icon: '👤' },
  { label: 'Saúde', icon: '🏥' },
  { label: 'Estudo', icon: '📚' },
  { label: 'Compras', icon: '🛒' },
  { label: 'Finanças', icon: '💰' },
  { label: 'Lazer', icon: '🎮' },
  { label: 'Outros', icon: '📌' },
];
