import React, { useState, useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Welcome from './screens/welcome';
import AdminLogin from './screens/adminLogin';
import EmployeeLogin from './screens/employeeLogin';
import AdminDashboard from './screens/adminDashboard';
import ManageTasks from './screens/manageTasks';
import ManageEmployee from './screens/manageEmployee';
import AdminProfileSettings from './screens/adminProfileSettings';
import Setting from './screens/settings';
import EmployeeDashboard from './screens/employeeDashboard';
import EmployeeTasks from './screens/manageTasksEmp';
import LeaveManagementAdmin from './screens/leavesAdmin';
import LeaveManagementEmployee from './screens/leavesEmp';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
        <Stack.Screen name="adminLogin" component={AdminLogin} options={{ headerShown: false }} />
        <Stack.Screen name="employeeLogin" component={EmployeeLogin} options={{ headerShown: false }} />
        <Stack.Screen name="AdminDash" component={AdminDashboard} options={{ headerShown: false }} />
        <Stack.Screen name="AdminSetting" component={AdminProfileSettings} options={{ headerShown: false }} />
        <Stack.Screen name="Setting" component={Setting} options={{ headerShown: false }} />
        <Stack.Screen name="MngTask" component={ManageTasks} options={{ headerShown: false }} />
        <Stack.Screen name="MngEmp" component={ManageEmployee} options={{ headerShown: false }} />
        <Stack.Screen name="Empdash" component={EmployeeDashboard} options={{ headerShown: false }} />
        <Stack.Screen name="EmpTask" component={EmployeeTasks} options={{ headerShown: false }} /> 
        <Stack.Screen name="LeaveAdmin" component={LeaveManagementAdmin} options={{ headerShown: false }} /> 
        <Stack.Screen name="LeaveEmp" component={LeaveManagementEmployee} options={{ headerShown: false }} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
