import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import ResetPasswordScreen from './ResetPasswordScreen';
import Home from './Home';
import Subject from './Subject';
import CreateClassroom from './CreateClassroom';
import Classroom from './Classroom';
import About from './About';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
        <Stack.Screen name="HomePage" component={Home} />
        <Stack.Screen name="Subject" component={Subject}/>
        <Stack.Screen name="CreateClassroom" component={CreateClassroom} />
        <Stack.Screen name="Classroom" component={Classroom} />
        <Stack.Screen name="About" component={About} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}
