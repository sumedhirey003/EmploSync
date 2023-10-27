import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import CardWork from './CardWork';

export default function AllWorkDone({ route }) {
  const nav = useNavigation();
  const [user, setUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log('route.params.user', route.params.user);

  const getEmployees = async () => {
    setLoading(true);
    setCurrentUser(route.params.user);
    try {
      const res = await axios.get(
        `https://employsyncapi.onrender.com/workdone/${currentUser?.id}`
      );
      console.log('Leaves:', res?.data);
      setEmployees(res?.data?.work?.entries);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setEmployees([]);
      console.log(error);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      const user = await SecureStore.getItemAsync('user');
      setUser(JSON.parse(user));
    };
    getUser();
    getEmployees();
  }, [route.params?.user]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View
        style={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          marginTop: 50,
          marginLeft: 30,
          marginRight: 30,
        }}
      >
        <Feather
          name="menu"
          size={40}
          color="black"
          onPress={() => nav.toggleDrawer()}
        />
        {user?.pic ? (
          <TouchableOpacity onPress={() => nav.navigate('Profile')}>
            <Image
              source={{
                uri: user?.pic,
              }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 50,
              }}
            />
          </TouchableOpacity>
        ) : (
          <Ionicons name="person-circle-outline" size={50} color="black" />
        )}
      </View>
      <View>
        <Pressable
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            padding: 12,
          }}
        >
          <Pressable style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 15, fontWeight: '500', marginLeft: 8 }}>
              All works done by{' '}
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: 'bold',
                }}
              >
                {currentUser?.name}
              </Text>
            </Text>
          </Pressable>
        </Pressable>

        {loading ? (
          <Text>Fetching works....</Text>
        ) : (
          <ScrollView
            style={{
              backgroundColor: '#e5fef2',
              marginBottom: 160,
            }}
          >
            {employees?.map((emp, index) => (
              <CardWork key={index} user={emp} />
            ))}
          </ScrollView>
        )}

        {employees?.length === 0 && !loading && (
          <View style={{ alignItems: 'center', marginTop: 100 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
              No work done yet
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5fef2',
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
    marginLeft: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
});
