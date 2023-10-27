import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
export default function Signup({ setIsSignedIn }) {
  const nav = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const signup = async () => {
    setLoading(true);
    await axios
      .post('https://employsyncapi.onrender.com/register', {
        name: name,
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
        if (response?.data?.status === 200) {
          alert('Signup Successful!');
          setLoading(false);
          setIsSignedIn(true);
          nav.navigate('Login');
          // reload the page
        } else {
          setLoading(false);
          alert('Signup Failed!');
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
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
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Signup Here</Text>
        </View>
        <View
          style={{
            flexDirection: 'column',
            marginVertical: 20,
          }}
        >
          <TextInput
            placeholder="Full Name"
            value={name}
            onChangeText={(text) => setName(text)}
            textContentType="name"
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
            onPress={() => signup()}
            style={{
              backgroundColor: '#90c8da',
              borderRadius: 20,
              padding: 10,
              width: 200,
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
              {loading ? 'Loading...' : 'Signup'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
