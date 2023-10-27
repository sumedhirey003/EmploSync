import React, { useState, useEffect } from 'react';
import arrowRight from './assets/arrow.png';
import { StatusBar } from 'expo-status-bar';
import { Text, View, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import SwipeButton from 'rn-swipe-button';
import * as SecureStore from 'expo-secure-store';
import { TouchableOpacity } from 'react-native';
import axios from 'axios';
import { getDistance } from 'geolib';
export default function Home() {
  const nav = useNavigation();

  const [token, setToken] = useState(null);

  const [user, setUser] = useState(null);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [constructionLocation, setConstructionLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });
  const [isPunchIn, setIsPunchIn] = useState(true);

  const getLocation = async () => {
    try {
      await axios
        .get('https://employsyncapi.onrender.com/location')
        .then((response) => {
          console.log(response.data);
          if (response?.data?.status === 200) {
            setConstructionLocation({
              latitude: response?.data?.location?.latitude,
              longitude: response?.data?.location?.longitude,
            });
          } else {
            alert(response?.data?.message);
          }
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const punchIn = async () => {
    let distance = getDistance(
      {
        latitude: region.latitude,
        longitude: region.longitude,
      },
      {
        latitude: constructionLocation.latitude,
        longitude: constructionLocation.longitude,
      }
    );
    console.log(distance);
    if (distance > 100) {
      alert('You are not inside the construction location');
      return;
    }

    try {
      await axios
        .post('https://employsyncapi.onrender.com/punchin', {
          id: user?.id,
          date: new Date(),
          time: new Date(),
          latitude: region.latitude,
          longitude: region.longitude,
        })
        .then((response) => {
          console.log(response.data);
          if (response?.data?.status === 200) {
            alert(response?.data?.message);
            setIsPunchIn(false);
          } else {
            alert(response?.data?.message);
          }
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const punchOut = async () => {
    let distance = getDistance(
      {
        latitude: region.latitude,
        longitude: region.longitude,
      },
      {
        latitude: constructionLocation.latitude,
        longitude: constructionLocation.longitude,
      }
    );
    console.log(distance);
    if (distance > 100) {
      alert('You are not inside the construction location');
      return;
    }
    try {
      await axios
        .post('https://employsyncapi.onrender.com/punchout', {
          id: user?.id,
          date: new Date(),
          time: new Date(),
          latitude: region.latitude,
          longitude: region.longitude,
        })
        .then((response) => {
          console.log(response.data);
          if (response?.data?.status === 200) {
            alert(response?.data?.message);
            setIsPunchIn(true);
          } else {
            alert(response?.data?.message);
          }
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    })();

    const getUser = async () => {
      const token = await SecureStore.getItemAsync('token');
      const user = await SecureStore.getItemAsync('user');
      setUser(JSON.parse(user));
      setToken(token);
    };
    getUser();
    getLocation();

    console.log(user);
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  console.log('isPunchIn', isPunchIn);

  return (
    <View
      style={{
        backgroundColor: '#e5fef2',
        height: '100%',
      }}
    >
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
      <Text
        style={{
          textAlign: 'left',
          fontSize: 20,
          margin: 20,
          marginBottom: 0,
        }}
      >
        Hi! {user ? user?.name : 'User'}
      </Text>
      <Text
        style={{
          textAlign: 'left',
          fontSize: 13,
          margin: 20,
          marginTop: 5,
        }}
      >
        Emp ID: {user ? user?.id : 'XXXXX'}
      </Text>

      <View
        style={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          marginTop: 50,
          backgroundColor: '#90c8da',
          borderRadius: 20,
          marginLeft: 20,
          marginRight: 20,
          padding: 10,
        }}
      >
        <Text
          style={{
            textAlign: 'center',
            fontSize: 25,
            marginBottom: 20,
          }}
        >
          Mark your attendance
        </Text>
        <MapView
          style={{
            width: 300,
            height: 300,
            borderRadius: 20,
          }}
          region={region}
        >
          <Marker
            coordinate={{
              latitude: region.latitude,
              longitude: region.longitude,
            }}
            title="My Marker"
            description="Some description"
          />
        </MapView>

        <View
          style={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            margin: 50,
          }}
        >
          <SwipeButton
            disabled={false}
            swipeSuccessThreshold={60}
            height={45}
            width={300}
            title={!isPunchIn ? 'Punch Out' : 'Punch In'}
            titleColor="black"
            shouldResetAfterSuccess={true}
            onSwipeSuccess={() => {
              if (!isPunchIn) {
                punchOut();
              } else {
                punchIn();
              }
            }}
            railFillBackgroundColor="black"
            railFillBorderColor="black"
            thumbIconBackgroundColor="#ffffff"
            thumbIconBorderColor="#c1c1c1"
            railBackgroundColor="#7FBCD2"
            thumbIconImageSource={arrowRight}
            railBorderColor="black"
            railStyles={{
              backgroundColor: isPunchIn ? '#7FBCD2' : 'black',
            }}
            thumbIconStyles={{
              backgroundColor: isPunchIn ? '#ffffff' : 'black',
            }}
          />
        </View>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    margin: 8,
    padding: 8,
    borderColor: '#000000',
    borderWidth: 1,
    alignSelf: 'stretch',
  },
});
