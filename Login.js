import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
export default function Login({ setIsSignedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const login = async () => {
    setLoading(true);
    await axios
      .post('https://employsyncapi.onrender.com/login', {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
        if (response?.data?.status === 200) {
          SecureStore.setItemAsync('token', response.data.token);
          SecureStore.setItemAsync('isSignedIn', 'true');
          SecureStore.setItemAsync('user', JSON.stringify(response.data.user));
          alert('Login Successful!');
          setLoading(false);
          setIsSignedIn(true);
          // reload the page
        } else {
          setLoading(false);
          alert(response?.data?.message);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        alert(error);
      });
  };

  return (
    <SafeAreaView>
      <View
        style={{
          padding: 20,
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Login Here</Text>
        </View>
        <View
          style={{
            flexDirection: 'column',
            marginVertical: 20,
          }}
        >
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            textContentType="emailAddress"
            style={{
              borderWidth: 1,
              borderColor: 'black',
              borderRadius: 10,
              margin: 10,
              padding: 20,
              backgroundColor: '#f2f2f2',
            }}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
            style={{
              borderWidth: 1,
              borderColor: 'black',
              borderRadius: 10,
              margin: 10,
              padding: 20,
              backgroundColor: '#f2f2f2',
            }}
          />
        </View>
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => login()}
            style={{
              backgroundColor: '#90c8da',
              borderRadius: 20,
              padding: 10,
              width: 200,
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
              {loading ? 'Loading...' : 'Login'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
