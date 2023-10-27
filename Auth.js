import React, { useEffect, useState } from 'react';
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { height, width } = Dimensions.get('window');

export default function Auth() {
  const navigation = useNavigation();
  return (
    <ImageBackground
      resizeMode="cover"
      source={require('./assets/auth.png')}
      style={{
        height: height + 100,
        zIndex: -1,
      }}
    >
      <SafeAreaView>
        <View
          style={{
            height: height,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <View
            style={{
              marginTop: 200,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 40,
                fontWeight: 'bold',
                color: '#fff000',
                textAlign: 'center',
              }}
            >
              Welcome to EmploySync
            </Text>
          </View>
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Login');
              }}
              style={{
                backgroundColor: '#90c8da',
                borderRadius: 20,
                margin: 20,
                padding: 15,
                shadowOpacity: 0.25,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
              }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 30,
                  fontWeight: 'bold',
                }}
              >
                Login
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Signup');
              }}
              style={{
                backgroundColor: '#90c8da',
                borderRadius: 20,
                margin: 20,
                padding: 15,
                shadowOpacity: 0.25,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
              }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 30,
                  fontWeight: 'bold',
                }}
              >
                Signup
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
