import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { CustomButton } from '../../components/CustomButton';
import { CustomInput } from '../../components/CustomInput';

export const LoginScreen: React.FC = () => {
  const { login } = useAuth();
  const { colors } = useTheme();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      setError('Preencha todos os campos');
      return;
    }
    setError('');
    setIsLoading(true);
    try {
      const success = await login(username.trim(), password);
      if (!success) {
        setError('Usuário ou senha inválidos');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled">
        <View style={styles.logoContainer}>
          <Text style={styles.logoIcon}>✅</Text>
          <Text style={[styles.appName, { color: colors.primary }]}>
            TaskFlow
          </Text>
          <Text style={[styles.tagline, { color: colors.textSecondary }]}>
            Organize suas tarefas com eficiência
          </Text>
        </View>

        <View
          style={[
            styles.card,
            { backgroundColor: colors.card, shadowColor: colors.text },
          ]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>
            Entrar
          </Text>

          <CustomInput
            label="Usuário"
            value={username}
            onChangeText={setUsername}
            placeholder="admin ou user"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <CustomInput
            label="Senha"
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            secureTextEntry
          />

          {error ? (
            <Text style={[styles.errorText, { color: colors.error }]}>
              ⚠️ {error}
            </Text>
          ) : null}

          <CustomButton
            label="Entrar"
            onPress={handleLogin}
            isLoading={isLoading}
            style={styles.loginButton}
          />
        </View>

        <Text style={[styles.hint, { color: colors.textSecondary }]}>
          Dica: admin/123 ou user/123
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 48,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoIcon: {
    fontSize: 64,
    marginBottom: 12,
  },
  appName: {
    fontSize: 36,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  tagline: {
    fontSize: 14,
    marginTop: 6,
    textAlign: 'center',
  },
  card: {
    borderRadius: 20,
    padding: 24,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 24,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 12,
    fontWeight: '500',
  },
  loginButton: {
    marginTop: 8,
  },
  hint: {
    textAlign: 'center',
    fontSize: 13,
    marginTop: 20,
  },
});
