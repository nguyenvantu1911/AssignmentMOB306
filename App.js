import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home'
import Login from './Login';
import SignUp from './SignUp';
import Follow from './Follow';
import Profile from './Profile';
import { Image } from 'react-native';
import ChangePass from './ChangePass';
import Post from './Post';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const TabMenu = () => {
  return (
    
    <Tab.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Tab.Screen name='Trang chủ' component={Home}
        options={{
          tabBarIcon: () => (
            <Image style={{ width: 30, height: 30 }} source={require('./image/homeicon.png')} resizeMode="stretch" />

          )
        }}
      />
      <Tab.Screen name='Follow' component={Follow}
        options={{
          tabBarIcon: () => (
            <Image style={{ width: 30, height: 30 }} source={require('./image/shopping.png')} resizeMode="stretch" />

          )
        }}
      />
      <Tab.Screen name='Profile' component={Profile}
        options={{
          tabBarIcon: () => (
            <Image style={{ width: 30, height: 30 }} source={require('./image/profile.png')} resizeMode="stretch" />

          )
        }}
      />
    </Tab.Navigator>
  )

}
const TabMenuadmin = () => {
  return (
    
    <Tab.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Tab.Screen name='Trang chủ' component={Home}
        options={{
          tabBarIcon: () => (
            <Image style={{ width: 30, height: 30 }} source={require('./image/homeicon.png')} resizeMode="stretch" />

          )
        }}
      />
      <Tab.Screen name='Đăng bài' component={Post}
        options={{
          tabBarIcon: () => (
            <Image style={{ width: 30, height: 30 }} source={require('./image/shopping.png')} resizeMode="stretch" />

          )
        }}
      />
      <Tab.Screen name='Profile' component={Profile}
        options={{
          tabBarIcon: () => (
            <Image style={{ width: 30, height: 30 }} source={require('./image/profile.png')} resizeMode="stretch" />

          )
        }}
      />
    </Tab.Navigator>
  )

}
const StackNavigator = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name='SignUp' component={SignUp} />
      <Stack.Screen name='TabMenu' component={TabMenu} />
      <Stack.Screen name='TabMenuadmin' component={TabMenuadmin} />
      <Stack.Screen name='Profile' component={Profile} />
      <Stack.Screen name='ChangePass' component={ChangePass} />
      <Stack.Screen name='Post' component={Post} />
    </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
