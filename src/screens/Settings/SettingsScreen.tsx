import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useTaskContext } from '../../context/TaskContext';
import { Header } from '../../components/Header';
import { CustomButton } from '../../components/CustomButton';

export const SettingsScreen: React.FC = () => {
  const { colors, isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const { tasks } = useTaskContext();

  const pendingCount = tasks.filter(t => t.status === 'pending').length;
  const completedCount = tasks.filter(t => t.status === 'completed').length;

  const handleLogout = () => {
    Alert.alert('Sair', 'Deseja encerrar a sessão?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sair', style: 'destructive', onPress: logout },
    ]);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Header title="Configurações" />
      <ScrollView contentContainerStyle={styles.content}>

        {/* Profile */}
        <View
          style={[
            styles.profileCard,
            { backgroundColor: colors.primaryLight, borderColor: colors.primary },
          ]}>
          <Text style={styles.avatar}>
            {user?.role === 'admin' ? '👑' : '👤'}
          </Text>
          <View>
            <Text style={[styles.profileName, { color: colors.text }]}>
              {user?.username}
            </Text>
            <Text style={[styles.profileRole, { color: colors.primary }]}>
              {user?.role === 'admin' ? 'Administrador' : 'Usuário'}
            </Text>
          </View>
        </View>

        {/* Stats */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Resumo
        </Text>
        <View
          style={[
            styles.statsCard,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}>
          <View style={styles.statRow}>
            <Text style={[styles.statKey, { color: colors.textSecondary }]}>
              Total de tarefas
            </Text>
            <Text style={[styles.statVal, { color: colors.text }]}>
              {tasks.length}
            </Text>
          </View>
          <View style={[styles.separator, { backgroundColor: colors.border }]} />
          <View style={styles.statRow}>
            <Text style={[styles.statKey, { color: colors.textSecondary }]}>
              Pendentes
            </Text>
            <Text style={[styles.statVal, { color: '#FF9800' }]}>
              {pendingCount}
            </Text>
          </View>
          <View style={[styles.separator, { backgroundColor: colors.border }]} />
          <View style={styles.statRow}>
            <Text style={[styles.statKey, { color: colors.textSecondary }]}>
              Concluídas
            </Text>
            <Text style={[styles.statVal, { color: '#4CAF50' }]}>
              {completedCount}
            </Text>
          </View>
        </View>

        {/* Appearance */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Aparência
        </Text>
        <View
          style={[
            styles.settingRow,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}>
          <View style={styles.settingLeft}>
            <Text style={styles.settingIcon}>{isDark ? '🌙' : '☀️'}</Text>
            <View>
              <Text style={[styles.settingLabel, { color: colors.text }]}>
                Modo escuro
              </Text>
              <Text style={[styles.settingDesc, { color: colors.textSecondary }]}>
                {isDark ? 'Ativado' : 'Desativado'}
              </Text>
            </View>
          </View>
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor="#FFFFFF"
          />
        </View>

        {/* About */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Sobre</Text>
        <View
          style={[
            styles.aboutCard,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}>
          <Text style={[styles.appNameText, { color: colors.primary }]}>
            ✅ TaskFlow
          </Text>
          <Text style={[styles.versionText, { color: colors.textSecondary }]}>
            Versão 1.0.0
          </Text>
          <Text style={[styles.aboutDesc, { color: colors.textSecondary }]}>
            Aplicativo de gerenciamento de tarefas pessoais desenvolvido com
            React Native + TypeScript.
          </Text>
        </View>

        <CustomButton
          label="Sair da Conta"
          onPress={handleLogout}
          variant="danger"
          style={styles.logoutButton}
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
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    marginBottom: 24,
  },
  avatar: {
    fontSize: 40,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  profileRole: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 10,
    marginTop: 4,
  },
  statsCard: {
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    marginBottom: 24,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  statKey: {
    fontSize: 14,
  },
  statVal: {
    fontSize: 15,
    fontWeight: '700',
  },
  separator: {
    height: 1,
    marginVertical: 4,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    marginBottom: 24,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingIcon: {
    fontSize: 22,
  },
  settingLabel: {
    fontSize: 15,
    fontWeight: '600',
  },
  settingDesc: {
    fontSize: 12,
    marginTop: 2,
  },
  aboutCard: {
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    alignItems: 'center',
    marginBottom: 24,
  },
  appNameText: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 4,
  },
  versionText: {
    fontSize: 13,
    marginBottom: 10,
  },
  aboutDesc: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
  },
  logoutButton: {
    marginTop: 8,
  },
});
