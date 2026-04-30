import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { TaskStatus } from '../types';
import { useTheme } from '../context/ThemeContext';

type FilterOption = TaskStatus | 'all';

interface FilterBarProps {
  selected: FilterOption;
  onSelect: (filter: FilterOption) => void;
  counts?: Partial<Record<FilterOption, number>>;
}

const FILTERS: { key: FilterOption; label: string }[] = [
  { key: 'all', label: 'Todas' },
  { key: 'pending', label: 'Pendente' },
  { key: 'in-progress', label: 'Em Progresso' },
  { key: 'completed', label: 'Concluída' },
];

export const FilterBar: React.FC<FilterBarProps> = ({
  selected,
  onSelect,
  counts,
}) => {
  const { colors } = useTheme();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={[styles.scroll, { backgroundColor: colors.surface }]}
      contentContainerStyle={styles.content}>
      {FILTERS.map(filter => {
        const isActive = selected === filter.key;
        const count = counts?.[filter.key];
        return (
          <TouchableOpacity
            key={filter.key}
            onPress={() => onSelect(filter.key)}
            style={[
              styles.chip,
              {
                backgroundColor: isActive ? colors.primary : colors.inputBackground,
                borderColor: isActive ? colors.primary : colors.border,
              },
            ]}>
            <Text
              style={[
                styles.chipText,
                { color: isActive ? '#FFFFFF' : colors.textSecondary },
              ]}>
              {filter.label}
              {count !== undefined ? ` (${count})` : ''}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 0,
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    marginRight: 8,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
  },
});
