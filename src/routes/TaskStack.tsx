import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TaskStackParamList } from '../types';
import { TaskListScreen } from '../screens/Tasks/TaskListScreen';
import { TaskCreateScreen } from '../screens/Tasks/TaskCreateScreen';
import { TaskDetailScreen } from '../screens/Tasks/TaskDetailScreen';
import { TaskEditScreen } from '../screens/Tasks/TaskEditScreen';

const Stack = createNativeStackNavigator<TaskStackParamList>();

export const TaskStack: React.FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="TaskList" component={TaskListScreen} />
    <Stack.Screen name="TaskCreate" component={TaskCreateScreen} />
    <Stack.Screen name="TaskDetail" component={TaskDetailScreen} />
    <Stack.Screen name="TaskEdit" component={TaskEditScreen} />
  </Stack.Navigator>
);
