import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '../context/ThemeContext';
import { HomeStack } from './HomeStack';
import { TaskStack } from './TaskStack';
import { SettingsStack } from './SettingsStack';

const Tab = createBottomTabNavigator();

interface TabIconProps {
  focused: boolean;
  icon: string;
  label: string;
  color: string;
}

const TabIcon: React.FC<TabIconProps> = ({ icon, label, focused, color }) => (
  <Text style={{ fontSize: focused ? 22 : 20, color }}>{icon}</Text>
);

export const MainTabs: React.FC = () => {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.tabBar,
          borderTopColor: colors.border,
          paddingBottom: 8,
          paddingTop: 6,
          height: 62,
        },
        tabBarActiveTintColor: colors.tabBarActive,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 2,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: 'Início',
          tabBarIcon: ({ focused, color }) => (
            <TabIcon icon="🏠" label="Início" focused={focused} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Tasks"
        component={TaskStack}
        options={{
          tabBarLabel: 'Tarefas',
          tabBarIcon: ({ focused, color }) => (
            <TabIcon icon="✅" label="Tarefas" focused={focused} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsStack}
        options={{
          tabBarLabel: 'Config.',
          tabBarIcon: ({ focused, color }) => (
            <TabIcon icon="⚙️" label="Config." focused={focused} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
