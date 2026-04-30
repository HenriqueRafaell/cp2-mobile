import { useState, useCallback } from 'react';
import { TaskFormData, TaskPriority, TaskStatus } from '../types';
import { validateTaskTitle, CATEGORIES } from '../utils';

interface UseTaskFormResult {
  formData: TaskFormData;
  errors: Partial<Record<keyof TaskFormData, string>>;
  setField: <K extends keyof TaskFormData>(key: K, value: TaskFormData[K]) => void;
  validate: () => boolean;
  reset: () => void;
}

const DEFAULT_FORM: TaskFormData = {
  title: '',
  description: '',
  status: 'pending',
  priority: 'medium',
  category: CATEGORIES[0].label,
  categoryIcon: CATEGORIES[0].icon,
};

export const useTaskForm = (initial?: Partial<TaskFormData>): UseTaskFormResult => {
  const [formData, setFormData] = useState<TaskFormData>({
    ...DEFAULT_FORM,
    ...initial,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof TaskFormData, string>>>({});

  const setField = useCallback(
    <K extends keyof TaskFormData>(key: K, value: TaskFormData[K]) => {
      setFormData(prev => ({ ...prev, [key]: value }));
      setErrors(prev => ({ ...prev, [key]: undefined }));
    },
    [],
  );

  const validate = useCallback((): boolean => {
    const newErrors: Partial<Record<keyof TaskFormData, string>> = {};
    const titleError = validateTaskTitle(formData.title);
    if (titleError) {
      newErrors.title = titleError;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const reset = useCallback(() => {
    setFormData(DEFAULT_FORM);
    setErrors({});
  }, []);

  return { formData, errors, setField, validate, reset };
};
