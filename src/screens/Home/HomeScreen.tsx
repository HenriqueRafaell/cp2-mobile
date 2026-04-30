import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useTaskContext } from '../../context/TaskContext';
import { useQuote } from '../../hooks/useQuote';
import { TaskCard } from '../../components/TaskCard';
import { EmptyState } from '../../components/EmptyState';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TaskStackParamList } from '../../types';

type HomeNavigationProp = NativeStackNavigationProp<TaskStackParamList, 'TaskList'>;

export const HomeScreen: React.FC = () => {
  const { colors } = useTheme();
  const { user } = useAuth();
  const { tasks } = useTaskContext();
  const { quote, isLoading: quoteLoading, error: quoteError, refresh } = useQuote();
  const navigation = useNavigation<HomeNavigationProp>();

  const recentTasks = tasks.slice(0, 3);
  const pendingCount = tasks.filter(t => t.status === 'pending').length;
  const inProgressCount = tasks.filter(t => t.status === 'in-progress').length;
  const completedCount = tasks.filter(t => t.status === 'completed').length;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={styles.content}
      refreshControl={
        <RefreshControl refreshing={quoteLoading} onRefresh={refresh} />
      }>
      {/* Greeting */}
      <View style={styles.greeting}>
        <Text style={[styles.greetingText, { color: colors.textSecondary }]}>
          Olá, bom dia! 👋
        </Text>
        <Text style={[styles.username, { color: colors.text }]}>
          {user?.username ?? 'Usuário'}
        </Text>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={[styles.statCard, { backgroundColor: '#FF980022' }]}>
          <Text style={styles.statIcon}>⏳</Text>
          <Text style={[styles.statCount, { color: '#FF9800' }]}>{pendingCount}</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Pendentes</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: '#2196F322' }]}>
          <Text style={styles.statIcon}>🔄</Text>
          <Text style={[styles.statCount, { color: '#2196F3' }]}>{inProgressCount}</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Em Progresso</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: '#4CAF5022' }]}>
          <Text style={styles.statIcon}>✅</Text>
          <Text style={[styles.statCount, { color: '#4CAF50' }]}>{completedCount}</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Concluídas</Text>
        </View>
      </View>

      {/* Quote */}
      <View
        style={[
          styles.quoteCard,
          { backgroundColor: colors.primaryLight, borderColor: colors.primary },
        ]}>
        <Text style={[styles.quoteTitle, { color: colors.primary }]}>
          💡 Citação do Dia
        </Text>
        {quoteLoading ? (
          <ActivityIndicator color={colors.primary} style={{ marginTop: 8 }} />
        ) : quoteError ? (
          <TouchableOpacity onPress={refresh}>
            <Text style={[styles.quoteError, { color: colors.textSecondary }]}>
              {quoteError} Toque para tentar novamente.
            </Text>
          </TouchableOpacity>
        ) : quote ? (
          <>
            <Text style={[styles.quoteText, { color: colors.text }]}>
              "{quote.quote}"
            </Text>
            <Text style={[styles.quoteAuthor, { color: colors.textSecondary }]}>
              — {quote.author}
            </Text>
          </>
        ) : null}
      </View>

      {/* Recent Tasks */}
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Tarefas Recentes
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('TaskList')}>
          <Text style={[styles.seeAll, { color: colors.primary }]}>
            Ver todas
          </Text>
        </TouchableOpacity>
      </View>

      {recentTasks.length === 0 ? (
        <EmptyState
          icon="📋"
          title="Nenhuma tarefa ainda"
          description="Crie sua primeira tarefa e comece a organizar seu dia."
          actionLabel="+ Nova Tarefa"
          onAction={() => navigation.navigate('TaskCreate')}
        />
      ) : (
        recentTasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onPress={() => navigation.navigate('TaskDetail', { taskId: task.id })}
          />
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  greeting: {
    marginBottom: 24,
  },
  greetingText: {
    fontSize: 14,
    marginBottom: 2,
  },
  username: {
    fontSize: 26,
    fontWeight: '800',
    textTransform: 'capitalize',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    borderRadius: 14,
    padding: 12,
    alignItems: 'center',
  },
  statIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  statCount: {
    fontSize: 24,
    fontWeight: '800',
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 2,
  },
  quoteCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
  },
  quoteTitle: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 8,
  },
  quoteText: {
    fontSize: 14,
    lineHeight: 22,
    fontStyle: 'italic',
  },
  quoteAuthor: {
    fontSize: 13,
    marginTop: 8,
    fontWeight: '500',
  },
  quoteError: {
    fontSize: 13,
    marginTop: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '600',
  },
});
