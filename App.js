import React, { useEffect, useState } from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import { MaterialIcons } from '@expo/vector-icons';

import Home from './Home';
import Settings from './Settings';
import Auth from './Auth';
import Login from './Login';
import Signup from './Signup';
import Onboarding from './Onboarding';
import Profile from './Profile';
import Leave from './Leave';
import Work from './Work';
import AllLeaveApplication from './AllLeaveApplication';
import AllWorkDone from './AllWorkDone';
import AllProfile from './AllProfile';
import AllPaySlips from './AllPaySlips';
import AddLocation from './AddLocation';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const getIsSignedIn = async () => {
    const isSignedIn = await SecureStore.getItemAsync('isSignedIn');
    if (isSignedIn === null) {
      return false;
    } else {
      return true;
    }
  };

  const [isSignedIn, setIsSignedIn] = useState(getIsSignedIn());
  const [user, setUser] = useState(null);

  const handleLogout = async () => {
    try {
      await SecureStore.deleteItemAsync('token');
      await SecureStore.setItemAsync('isSignedIn', 'false');
      alert('Logout Successful!');
      setIsSignedIn(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      const token = await SecureStore.getItemAsync('token');
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setIsSignedIn(true);
      } else {
        setIsSignedIn(false);
      }
    };
    checkAuth();
  }, [isSignedIn, setIsSignedIn, SecureStore]);

  useEffect(() => {
    const getUser = async () => {
      const user = await SecureStore.getItemAsync('user');
      setUser(JSON.parse(user));
    };
    getUser();
  }, []);

  console.log(user?.role);

  return (
    <NavigationContainer>
      {isSignedIn ? (
        <Drawer.Navigator
          initialRouteName="Home"
          drawerContent={(props) => (
            <DrawerContentScrollView {...props}>
              <DrawerItemList {...props} />
              <DrawerItem
                label="Logout"
                icon={({ focused, size }) => (
                  <AntDesign
                    name="logout"
                    size={size}
                    color={focused ? '#7cc' : '#ccc'}
                  />
                )}
                onPress={() => {
                  handleLogout();
                }}
              />
            </DrawerContentScrollView>
          )}
        >
          <Drawer.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
              drawerIcon: ({ focused, size }) => (
                <AntDesign
                  name="home"
                  size={size}
                  color={focused ? '#7cc' : '#ccc'}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="My Profile"
            component={Profile}
            options={{
              headerShown: false,
              drawerIcon: ({ focused, size }) => (
                <AntDesign
                  name="idcard"
                  size={size}
                  color={focused ? '#7cc' : '#ccc'}
                />
              ),
            }}
          />

          {user?.role === 'admin' && (
            <Drawer.Screen
              name="All Employees"
              component={AllProfile}
              options={{
                headerShown: false,
                drawerIcon: ({ focused, size }) => (
                  <AntDesign
                    name="team"
                    size={size}
                    color={focused ? '#7cc' : '#ccc'}
                  />
                ),
              }}
            />
          )}
          {user?.role === 'admin' && (
            <Drawer.Screen
              name="AllWorkDone"
              component={AllWorkDone}
              initialParams={{ user: user }}
              options={{
                headerShown: false,
                drawerItemStyle: { height: 0 },
                drawerIcon: ({ focused, size }) => (
                  <AntDesign
                    name="tool"
                    size={size}
                    color={focused ? '#7cc' : '#ccc'}
                  />
                ),
              }}
            />
          )}
          {user?.role === 'admin' && (
            <Drawer.Screen
              name="All PaySlips"
              component={AllPaySlips}
              options={{
                headerShown: false,
                drawerIcon: ({ focused, size }) => (
                  <AntDesign
                    name="pay-circle1"
                    size={size}
                    color={focused ? '#7cc' : '#ccc'}
                  />
                ),
              }}
            />
          )}
          {user?.role === 'admin' && (
            <Drawer.Screen
              name="All Leave Application"
              component={AllLeaveApplication}
              options={{
                headerShown: false,
                drawerIcon: ({ focused, size }) => (
                  <AntDesign
                    name="retweet"
                    size={size}
                    color={focused ? '#7cc' : '#ccc'}
                  />
                ),
              }}
            />
          )}
          {user?.role === 'admin' && (
            <Drawer.Screen
              name="Add Location"
              component={AddLocation}
              options={{
                headerShown: false,
                drawerIcon: ({ focused, size }) => (
                  <MaterialIcons
                    name="add-location"
                    size={size}
                    color={focused ? '#7cc' : '#ccc'}
                  />
                ),
              }}
            />
          )}
          <Drawer.Screen
            name="Work Done"
            component={Work}
            options={{
              headerShown: false,
              drawerIcon: ({ focused, size }) => (
                <AntDesign
                  name="linechart"
                  size={size}
                  color={focused ? '#7cc' : '#ccc'}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="Leave Application"
            component={Leave}
            options={{
              headerShown: false,
              drawerIcon: ({ focused, size }) => (
                <AntDesign
                  name="deleteuser"
                  size={size}
                  color={focused ? '#7cc' : '#ccc'}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="Onboarding"
            component={Onboarding}
            options={{
              headerShown: false,
              drawerIcon: ({ focused, size }) => (
                <AntDesign
                  name="rocket1"
                  size={size}
                  color={focused ? '#7cc' : '#ccc'}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="Settings"
            component={Settings}
            options={{
              headerShown: false,
              drawerIcon: ({ focused, size }) => (
                <AntDesign
                  name="setting"
                  size={size}
                  color={focused ? '#7cc' : '#ccc'}
                />
              ),
            }}
          />
        </Drawer.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="Auth">
          <Stack.Screen
            name="Login"
            options={{
              headerShown: false,
              drawerIcon: ({ focused, size }) => (
                <AntDesign
                  name="login"
                  size={size}
                  color={focused ? '#7cc' : '#ccc'}
                />
              ),
            }}
          >
            {(props) => <Login {...props} setIsSignedIn={setIsSignedIn} />}
          </Stack.Screen>
          <Stack.Screen
            name="Signup"
            options={{
              headerShown: false,
              drawerIcon: ({ focused, size }) => (
                <AntDesign
                  name="login"
                  size={size}
                  color={focused ? '#7cc' : '#ccc'}
                />
              ),
            }}
          >
            {(props) => <Signup {...props} setIsSignedIn={setIsSignedIn} />}
          </Stack.Screen>
          <Stack.Screen
            name="Auth"
            component={Auth}
            options={{
              headerShown: false,
              drawerIcon: ({ focused, size }) => (
                <AntDesign
                  name="login"
                  size={size}
                  color={focused ? '#7cc' : '#ccc'}
                />
              ),
            }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
