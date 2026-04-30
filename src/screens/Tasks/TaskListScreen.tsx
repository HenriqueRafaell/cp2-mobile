import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeContext';
import { useTaskContext } from '../../context/TaskContext';
import { TaskStackParamList, TaskStatus } from '../../types';
import { TaskCard } from '../../components/TaskCard';
import { FilterBar } from '../../components/FilterBar';
import { EmptyState } from '../../components/EmptyState';
import { Header } from '../../components/Header';
import { CustomButton } from '../../components/CustomButton';

type NavProp = NativeStackNavigationProp<TaskStackParamList, 'TaskList'>;

export const TaskListScreen: React.FC = () => {
  const { colors } = useTheme();
  const { tasks, deleteTask, filterByStatus } = useTaskContext();
  const navigation = useNavigation<NavProp>();
  const [filter, setFilter] = useState<TaskStatus | 'all'>('all');

  const filtered = filterByStatus(filter);

  const counts: Partial<Record<TaskStatus | 'all', number>> = {
    all: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    'in-progress': tasks.filter(t => t.status === 'in-progress').length,
    completed: tasks.filter(t => t.status === 'completed').length,
  };

  const handleDelete = (id: string, title: string) => {
    Alert.alert(
      'Excluir Tarefa',
      `Deseja excluir "${title}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => deleteTask(id),
        },
      ],
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Header
        title="Minhas Tarefas"
        subtitle={`${tasks.length} tarefa${tasks.length !== 1 ? 's' : ''}`}
      />

      <FilterBar
        selected={filter}
        onSelect={setFilter}
        counts={counts}
      />

      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <EmptyState
            icon="📝"
            title="Nenhuma tarefa encontrada"
            description={
              filter === 'all'
                ? 'Toque no botão abaixo para criar sua primeira tarefa.'
                : 'Não há tarefas com esse filtro.'
            }
            actionLabel={filter === 'all' ? '+ Nova Tarefa' : undefined}
            onAction={
              filter === 'all'
                ? () => navigation.navigate('TaskCreate')
                : undefined
            }
          />
        }
        renderItem={({ item }) => (
          <TaskCard
            task={item}
            onPress={() =>
              navigation.navigate('TaskDetail', { taskId: item.id })
            }
            onDelete={() => handleDelete(item.id, item.title)}
          />
        )}
      />

      <View
        style={[styles.fab, { backgroundColor: colors.background }]}>
        <CustomButton
          label="+ Nova Tarefa"
          onPress={() => navigation.navigate('TaskCreate')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 16,
    paddingBottom: 100,
    flexGrow: 1,
  },
  fab: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
});
