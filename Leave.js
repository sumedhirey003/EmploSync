import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
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
export default function Leave() {
  const nav = useNavigation();
  const [user, setUser] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [showEnd, setShowEnd] = useState(false);
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);

  const leave = async () => {
    setLoading(true);

    try {
      await axios
        .post('https://employsyncapi.onrender.com/leave', {
          id: user?.id,
          startDate: startDate,
          endDate: endDate,
          reason: reason,
        })
        .then((response) => {
          console.log(response.data);
          if (response?.data?.status === 200) {
            SecureStore.setItemAsync('token', response.data.token);
            SecureStore.setItemAsync('isSignedIn', 'true');
            SecureStore.setItemAsync(
              'user',
              JSON.stringify(response.data.user)
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

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setStartDate(currentDate);
    setShow(false);
  };

  const onChangeEnd = (event, selectedDate) => {
    const currentDate = selectedDate;
    setEndDate(currentDate);
    setShowEnd(false);
  };

  useEffect(() => {
    const getUser = async () => {
      const user = await SecureStore.getItemAsync('user');
      setUser(JSON.parse(user));
    };
    getUser();

    console.log(user);
  }, []);

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
              Apply for Leave
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
                Start Date:
              </Text>
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}
            >
              <Text>Start Date: {startDate.toString().substr(4, 12)}</Text>

              <Button onPress={() => setShow(true)} title="Select Date" />
            </View>
            {show ? (
              <DateTimePicker
                testID="dateTimePicker"
                value={startDate}
                mode={'date'}
                is24Hour={true}
                onChange={onChange}
              />
            ) : (
              <></>
            )}
            <View
              style={{
                flexDirection: 'row',
                marginTop: 20,
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                End Date:
              </Text>
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}
            >
              <Text>End Date: {endDate.toString().substr(4, 12)}</Text>

              <Button onPress={() => setShowEnd(true)} title="Select Date" />
            </View>
            {showEnd ? (
              <DateTimePicker
                testID="dateTimePicker"
                value={endDate}
                mode={'date'}
                is24Hour={true}
                onChange={onChangeEnd}
              />
            ) : (
              <></>
            )}

            <TextInput
              placeholder="Reason for Leave"
              value={reason}
              onChangeText={(text) => setReason(text)}
              multiline={true}
              numberOfLines={4}
              style={{
                borderWidth: 1,
                borderColor: 'black',
                borderRadius: 10,
                marginTop: 40,
                margin: 2,
                paddingHorizontal: 10,
                backgroundColor: '#f2f2f2',
              }}
            />
          </View>
          <View style={{ alignItems: 'center', paddingBottom: 50 }}>
            <TouchableOpacity
              onPress={() => leave()}
              style={{
                backgroundColor: '#90c8da',
                borderRadius: 20,
                padding: 10,
                width: 200,
                alignItems: 'center',
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                {loading ? 'Loading...' : 'Apply'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
