import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeContext';
import { useTaskContext } from '../../context/TaskContext';
import { useTaskForm } from '../../hooks/useTaskForm';
import { CustomInput } from '../../components/CustomInput';
import { CustomButton } from '../../components/CustomButton';
import { Header } from '../../components/Header';
import { TaskPriority, TaskStatus } from '../../types';
import { CATEGORIES, getPriorityLabel, getStatusLabel } from '../../utils';

export const TaskCreateScreen: React.FC = () => {
  const { colors } = useTheme();
  const { addTask } = useTaskContext();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const { formData, errors, setField, validate } = useTaskForm();

  const handleSave = async () => {
    if (!validate()) {
      return;
    }
    if (!formData.title.trim()) {
      Alert.alert('Atenção', 'Tarefas vazias não são salvas.');
      return;
    }
    setIsLoading(true);
    try {
      await addTask(formData);
      navigation.goBack();
    } finally {
      setIsLoading(false);
    }
  };

  const STATUSES: TaskStatus[] = ['pending', 'in-progress', 'completed'];
  const PRIORITIES: TaskPriority[] = ['low', 'medium', 'high'];

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Header
        title="Nova Tarefa"
        leftAction={{ label: '← Voltar', onPress: () => navigation.goBack() }}
      />
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled">

        <CustomInput
          label="Título *"
          value={formData.title}
          onChangeText={v => setField('title', v)}
          placeholder="Ex: Revisar relatório"
          error={errors.title}
        />

        <CustomInput
          label="Descrição"
          value={formData.description}
          onChangeText={v => setField('description', v)}
          placeholder="Descreva os detalhes da tarefa..."
          multiline
        />

        {/* Status */}
        <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>
          Status
        </Text>
        <View style={styles.chipRow}>
          {STATUSES.map(s => (
            <TouchableOpacity
              key={s}
              onPress={() => setField('status', s)}
              style={[
                styles.chip,
                {
                  backgroundColor:
                    formData.status === s ? colors.primary : colors.inputBackground,
                  borderColor:
                    formData.status === s ? colors.primary : colors.border,
                },
              ]}>
              <Text
                style={{
                  color: formData.status === s ? '#fff' : colors.text,
                  fontSize: 13,
                  fontWeight: '600',
                }}>
                {getStatusLabel(s)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Priority */}
        <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>
          Prioridade
        </Text>
        <View style={styles.chipRow}>
          {PRIORITIES.map(p => (
            <TouchableOpacity
              key={p}
              onPress={() => setField('priority', p)}
              style={[
                styles.chip,
                {
                  backgroundColor:
                    formData.priority === p ? colors.primary : colors.inputBackground,
                  borderColor:
                    formData.priority === p ? colors.primary : colors.border,
                },
              ]}>
              <Text
                style={{
                  color: formData.priority === p ? '#fff' : colors.text,
                  fontSize: 13,
                  fontWeight: '600',
                }}>
                {getPriorityLabel(p)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Category */}
        <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>
          Categoria
        </Text>
        <View style={styles.categoryGrid}>
          {CATEGORIES.map(cat => (
            <TouchableOpacity
              key={cat.label}
              onPress={() => {
                setField('category', cat.label);
                setField('categoryIcon', cat.icon);
              }}
              style={[
                styles.categoryChip,
                {
                  backgroundColor:
                    formData.category === cat.label
                      ? colors.primaryLight
                      : colors.inputBackground,
                  borderColor:
                    formData.category === cat.label
                      ? colors.primary
                      : colors.border,
                },
              ]}>
              <Text style={styles.catIcon}>{cat.icon}</Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '500',
                  color:
                    formData.category === cat.label ? colors.primary : colors.text,
                }}>
                {cat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <CustomButton
          label="Salvar Tarefa"
          onPress={handleSave}
          isLoading={isLoading}
          style={styles.saveButton}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    marginTop: 4,
  },
  chipRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 20,
    borderWidth: 1.5,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1.5,
    gap: 4,
  },
  catIcon: {
    fontSize: 14,
  },
  saveButton: {
    marginTop: 8,
  },
});
