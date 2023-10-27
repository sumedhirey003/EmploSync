import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import * as Location from 'expo-location';
import {
  Image,
  View,
  Platform,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Button,
  ScrollView,
} from 'react-native';
export default function AddLocation() {
  const nav = useNavigation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
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
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
    })();

    const getUser = async () => {
      const user = await SecureStore.getItemAsync('user');
      setUser(JSON.parse(user));
    };
    getUser();

    console.log(user);
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  console.log(region);
  const locationFunc = async () => {
    setLoading(true);

    try {
      await axios
        .post('https://employsyncapi.onrender.com/location', {
          latitude: region.latitude,
          longitude: region.longitude,
        })
        .then((response) => {
          console.log(response.data);
          if (response?.data?.status === 200) {
            // set location
            SecureStore.setItemAsync(
              'location',
              JSON.stringify(response?.data?.location)
            );

            alert(response?.data?.message);
            setLoading(false);
            nav.navigate('Home');
            // reload the page
          } else {
            setLoading(false);
            alert(response?.data?.message);
          }
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
          alert('Something went wrong');
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
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
        ) : (
          <Ionicons name="person-circle-outline" size={50} color="black" />
        )}
      </View>
      <ScrollView
        style={{
          height: '100%',
          marginTop: 20,
        }}
      >
        <View
          style={{
            marginHorizontal: 20,
          }}
        >
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
              Add Construction Location
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'column',
              marginVertical: 20,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                marginTop: 20,
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                Latitude:
              </Text>
            </View>
            <TextInput
              placeholder="Latitude"
              value={region.latitude}
              defaultValue="37.78825"
              onChangeText={(text) => setRegion({ ...region, latitude: text })}
              style={{
                borderWidth: 1,
                borderColor: 'black',
                borderRadius: 10,
                marginTop: 10,
                margin: 2,
                padding: 10,
                paddingHorizontal: 10,
                backgroundColor: '#f2f2f2',
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                marginTop: 20,
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                Longitude:
              </Text>
            </View>
            <TextInput
              placeholder="Longitude"
              value={region.longitude}
              defaultValue="-122.4324"
              onChangeText={(text) => setRegion({ ...region, longitude: text })}
              style={{
                borderWidth: 1,
                borderColor: 'black',
                borderRadius: 10,
                marginTop: 10,
                margin: 2,
                padding: 10,
                paddingHorizontal: 10,
                backgroundColor: '#f2f2f2',
              }}
            />
          </View>

          <View style={{ alignItems: 'center', paddingBottom: 50 }}>
            <TouchableOpacity
              onPress={() => locationFunc()}
              style={{
                backgroundColor: '#90c8da',
                borderRadius: 20,
                padding: 10,
                width: 200,
                alignItems: 'center',
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                {loading ? 'Loading...' : 'Change Location'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
