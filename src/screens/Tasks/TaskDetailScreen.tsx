import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import {
  useNavigation,
  useRoute,
  RouteProp,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '../../context/ThemeContext';
import { useTaskContext } from '../../context/TaskContext';
import { TaskStackParamList } from '../../types';
import { Header } from '../../components/Header';
import { StatusBadge } from '../../components/StatusBadge';
import { CustomButton } from '../../components/CustomButton';
import { EmptyState } from '../../components/EmptyState';
import {
  formatDate,
  getPriorityColor,
  getPriorityLabel,
} from '../../utils';

type RoutePropType = RouteProp<TaskStackParamList, 'TaskDetail'>;
type NavProp = NativeStackNavigationProp<TaskStackParamList, 'TaskDetail'>;

export const TaskDetailScreen: React.FC = () => {
  const { colors } = useTheme();
  const { getTaskById, deleteTask } = useTaskContext();
  const route = useRoute<RoutePropType>();
  const navigation = useNavigation<NavProp>();

  const task = getTaskById(route.params.taskId);

  if (!task) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <Header
          title="Detalhes"
          leftAction={{ label: '← Voltar', onPress: () => navigation.goBack() }}
        />
        <EmptyState icon="❓" title="Tarefa não encontrada" />
      </View>
    );
  }

  const priorityColor = getPriorityColor(task.priority);

  const handleDelete = () => {
    Alert.alert(
      'Excluir Tarefa',
      `Tem certeza que deseja excluir "${task.title}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            await deleteTask(task.id);
            navigation.goBack();
          },
        },
      ],
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Header
        title="Detalhes"
        leftAction={{ label: '← Voltar', onPress: () => navigation.goBack() }}
        rightAction={{
          label: 'Editar',
          onPress: () => navigation.navigate('TaskEdit', { taskId: task.id }),
        }}
      />

      <ScrollView contentContainerStyle={styles.content}>
        {/* Category */}
        <View style={styles.categoryRow}>
          <Text style={styles.catIcon}>{task.categoryIcon}</Text>
          <Text style={[styles.category, { color: colors.textSecondary }]}>
            {task.category}
          </Text>
        </View>

        {/* Title */}
        <Text style={[styles.title, { color: colors.text }]}>
          {task.title}
        </Text>

        {/* Badges */}
        <View style={styles.badgeRow}>
          <StatusBadge status={task.status} />
          <View
            style={[
              styles.priorityBadge,
              {
                backgroundColor: priorityColor + '22',
                borderColor: priorityColor,
              },
            ]}>
            <Text style={[styles.priorityText, { color: priorityColor }]}>
              {getPriorityLabel(task.priority)}
            </Text>
          </View>
        </View>

        {/* Description */}
        {task.description ? (
          <View
            style={[
              styles.descCard,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}>
            <Text style={[styles.descLabel, { color: colors.textSecondary }]}>
              Descrição
            </Text>
            <Text style={[styles.descText, { color: colors.text }]}>
              {task.description}
            </Text>
          </View>
        ) : null}

        {/* Timestamps */}
        <View
          style={[
            styles.timestampCard,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}>
          <View style={styles.timestampRow}>
            <Text style={[styles.tsLabel, { color: colors.textSecondary }]}>
              Criada em
            </Text>
            <Text style={[styles.tsValue, { color: colors.text }]}>
              {formatDate(task.createdAt)}
            </Text>
          </View>
          <View style={styles.timestampRow}>
            <Text style={[styles.tsLabel, { color: colors.textSecondary }]}>
              Atualizada em
            </Text>
            <Text style={[styles.tsValue, { color: colors.text }]}>
              {formatDate(task.updatedAt)}
            </Text>
          </View>
        </View>

        <CustomButton
          label="✏️  Editar Tarefa"
          onPress={() => navigation.navigate('TaskEdit', { taskId: task.id })}
          style={styles.editButton}
        />

        <CustomButton
          label="🗑️  Excluir Tarefa"
          onPress={handleDelete}
          variant="danger"
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  catIcon: {
    fontSize: 18,
  },
  category: {
    fontSize: 14,
    fontWeight: '500',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    lineHeight: 32,
    marginBottom: 16,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  priorityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  priorityText: {
    fontSize: 12,
    fontWeight: '600',
  },
  descCard: {
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    marginBottom: 16,
  },
  descLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  descText: {
    fontSize: 15,
    lineHeight: 23,
  },
  timestampCard: {
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    marginBottom: 24,
    gap: 10,
  },
  timestampRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tsLabel: {
    fontSize: 13,
  },
  tsValue: {
    fontSize: 13,
    fontWeight: '600',
  },
  editButton: {
    marginBottom: 12,
  },
});
