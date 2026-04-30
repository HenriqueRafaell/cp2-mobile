import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Task } from '../types';
import { useTheme } from '../context/ThemeContext';
import { StatusBadge } from './StatusBadge';
import { formatDate, getPriorityColor, getPriorityLabel } from '../utils';

interface TaskCardProps {
  task: Task;
  onPress: () => void;
  onDelete?: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onPress, onDelete }) => {
  const { colors } = useTheme();
  const priorityColor = getPriorityColor(task.priority);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderLeftColor: priorityColor,
          shadowColor: colors.text,
        },
      ]}>
      <View style={styles.top}>
        <View style={styles.categoryRow}>
          <Text style={styles.icon}>{task.categoryIcon}</Text>
          <Text style={[styles.category, { color: colors.textSecondary }]}>
            {task.category}
          </Text>
        </View>
        {onDelete && (
          <TouchableOpacity onPress={onDelete} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Text style={[styles.deleteIcon, { color: colors.error }]}>🗑️</Text>
          </TouchableOpacity>
        )}
      </View>

      <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
        {task.title}
      </Text>

      {task.description ? (
        <Text
          style={[styles.description, { color: colors.textSecondary }]}
          numberOfLines={2}>
          {task.description}
        </Text>
      ) : null}

      <View style={styles.footer}>
        <StatusBadge status={task.status} />
        <View style={[styles.priorityBadge, { backgroundColor: priorityColor + '22', borderColor: priorityColor }]}>
          <Text style={[styles.priorityText, { color: priorityColor }]}>
            {getPriorityLabel(task.priority)}
          </Text>
        </View>
      </View>

      <Text style={[styles.date, { color: colors.placeholder }]}>
        {formatDate(task.updatedAt)}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  icon: {
    fontSize: 14,
  },
  category: {
    fontSize: 12,
    fontWeight: '500',
  },
  deleteIcon: {
    fontSize: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
    lineHeight: 22,
  },
  description: {
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  priorityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
  },
  priorityText: {
    fontSize: 12,
    fontWeight: '600',
  },
  date: {
    fontSize: 11,
    marginTop: 2,
  },
});
